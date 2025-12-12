#!/usr/bin/env node

/**
 * Database Migration Script
 * Runs SQL migrations against Supabase database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigrations() {
  console.log('🚀 Starting database migrations...\n');

  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error('❌ Migrations directory not found:', migrationsDir);
    process.exit(1);
  }

  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();

  if (migrationFiles.length === 0) {
    console.log('⚠️  No migration files found');
    return;
  }

  console.log(`Found ${migrationFiles.length} migration(s):\n`);

  for (const file of migrationFiles) {
    console.log(`📄 Running migration: ${file}`);
    
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    try {
      // Execute the SQL migration
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
      
      if (error) {
        // If exec_sql doesn't exist, try direct execution
        // Note: This requires proper permissions
        console.log('   Attempting direct SQL execution...');
        
        // Split by semicolons and execute each statement
        const statements = sql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('--'));

        for (const statement of statements) {
          const { error: execError } = await supabase.rpc('exec', { 
            sql: statement 
          });
          
          if (execError) {
            throw execError;
          }
        }
      }

      console.log(`   ✅ ${file} completed successfully\n`);
    } catch (error) {
      console.error(`   ❌ Error in ${file}:`, error.message);
      console.error('\n⚠️  Migration failed. Please run migrations manually via Supabase Dashboard.');
      console.error('   Dashboard: ' + supabaseUrl.replace('.supabase.co', '.supabase.co/project/_/sql'));
      process.exit(1);
    }
  }

  console.log('✅ All migrations completed successfully!\n');
  console.log('📊 Next steps:');
  console.log('   1. Run: npm run seed (to add template data)');
  console.log('   2. Run: npm run dev (to start the app)\n');
}

// Create migrations tracking table
async function createMigrationsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      version VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  try {
    await supabase.rpc('exec', { sql });
  } catch (error) {
    // Table might already exist, ignore error
  }
}

// Main execution
(async () => {
  try {
    await createMigrationsTable();
    await runMigrations();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
})();
