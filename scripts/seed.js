#!/usr/bin/env node

/**
 * Database Seed Script
 * Populates database with initial workflow templates
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Workflow Templates
const templates = [
  {
    name: 'Email to Slack Notification',
    description: 'Forward important emails to a Slack channel',
    category: 'Communication',
    tags: ['email', 'slack', 'notifications'],
    is_public: true,
    definition: {
      nodes: [
        {
          id: 'trigger',
          type: 'trigger',
          data: { provider: 'gmail', event: 'new_email' }
        },
        {
          id: 'filter',
          type: 'filter',
          data: { condition: 'subject contains "urgent"' }
        },
        {
          id: 'action',
          type: 'action',
          data: { provider: 'slack', action: 'send_message' }
        }
      ],
      edges: [
        { source: 'trigger', target: 'filter' },
        { source: 'filter', target: 'action' }
      ]
    }
  },
  {
    name: 'Shopify Order to Google Sheets',
    description: 'Log new Shopify orders to a Google Sheet',
    category: 'E-commerce',
    tags: ['shopify', 'google-sheets', 'orders'],
    is_public: true,
    definition: {
      nodes: [
        {
          id: 'trigger',
          type: 'trigger',
          data: { provider: 'shopify', event: 'order_created' }
        },
        {
          id: 'transform',
          type: 'transform',
          data: { mapping: { order_id: '$.id', total: '$.total_price' } }
        },
        {
          id: 'action',
          type: 'action',
          data: { provider: 'google-sheets', action: 'append_row' }
        }
      ],
      edges: [
        { source: 'trigger', target: 'transform' },
        { source: 'transform', target: 'action' }
      ]
    }
  },
  {
    name: 'Daily Sales Report',
    description: 'Generate and email daily sales summary',
    category: 'Analytics',
    tags: ['reporting', 'email', 'analytics'],
    is_public: true,
    definition: {
      nodes: [
        {
          id: 'trigger',
          type: 'trigger',
          data: { type: 'schedule', cron: '0 9 * * *' }
        },
        {
          id: 'fetch',
          type: 'action',
          data: { provider: 'stripe', action: 'get_transactions' }
        },
        {
          id: 'aggregate',
          type: 'transform',
          data: { operation: 'sum', field: 'amount' }
        },
        {
          id: 'email',
          type: 'action',
          data: { provider: 'gmail', action: 'send_email' }
        }
      ],
      edges: [
        { source: 'trigger', target: 'fetch' },
        { source: 'fetch', target: 'aggregate' },
        { source: 'aggregate', target: 'email' }
      ]
    }
  },
  {
    name: 'Customer Onboarding Flow',
    description: 'Automated welcome sequence for new customers',
    category: 'CRM',
    tags: ['onboarding', 'email', 'crm'],
    is_public: true,
    definition: {
      nodes: [
        {
          id: 'trigger',
          type: 'trigger',
          data: { provider: 'stripe', event: 'customer_created' }
        },
        {
          id: 'welcome_email',
          type: 'action',
          data: { provider: 'sendgrid', action: 'send_email', template: 'welcome' }
        },
        {
          id: 'delay',
          type: 'delay',
          data: { duration: '1 day' }
        },
        {
          id: 'followup_email',
          type: 'action',
          data: { provider: 'sendgrid', action: 'send_email', template: 'getting_started' }
        }
      ],
      edges: [
        { source: 'trigger', target: 'welcome_email' },
        { source: 'welcome_email', target: 'delay' },
        { source: 'delay', target: 'followup_email' }
      ]
    }
  },
  {
    name: 'Social Media Cross-Posting',
    description: 'Post content across multiple social platforms',
    category: 'Marketing',
    tags: ['social-media', 'marketing', 'automation'],
    is_public: true,
    definition: {
      nodes: [
        {
          id: 'trigger',
          type: 'trigger',
          data: { type: 'manual' }
        },
        {
          id: 'twitter',
          type: 'action',
          data: { provider: 'twitter', action: 'post_tweet' }
        },
        {
          id: 'linkedin',
          type: 'action',
          data: { provider: 'linkedin', action: 'create_post' }
        },
        {
          id: 'facebook',
          type: 'action',
          data: { provider: 'facebook', action: 'create_post' }
        }
      ],
      edges: [
        { source: 'trigger', target: 'twitter' },
        { source: 'trigger', target: 'linkedin' },
        { source: 'trigger', target: 'facebook' }
      ]
    }
  },
  {
    name: 'Invoice Payment Reminder',
    description: 'Send reminders for overdue invoices',
    category: 'Finance',
    tags: ['invoicing', 'reminders', 'payments'],
    is_public: true,
    definition: {
      nodes: [
        {
          id: 'trigger',
          type: 'trigger',
          data: { type: 'schedule', cron: '0 10 * * *' }
        },
        {
          id: 'fetch_overdue',
          type: 'action',
          data: { provider: 'stripe', action: 'get_overdue_invoices' }
        },
        {
          id: 'loop',
          type: 'loop',
          data: { iterate: 'invoices' }
        },
        {
          id: 'send_reminder',
          type: 'action',
          data: { provider: 'gmail', action: 'send_email', template: 'payment_reminder' }
        }
      ],
      edges: [
        { source: 'trigger', target: 'fetch_overdue' },
        { source: 'fetch_overdue', target: 'loop' },
        { source: 'loop', target: 'send_reminder' }
      ]
    }
  },
  {
    name: 'Lead Capture to CRM',
    description: 'Add form submissions to CRM automatically',
    category: 'Sales',
    tags: ['leads', 'crm', 'forms'],
    is_public: true,
    definition: {
      nodes: [
        {
          id: 'trigger',
          type: 'trigger',
          data: { type: 'webhook' }
        },
        {
          id: 'validate',
          type: 'transform',
          data: { validation: { email: 'required|email', name: 'required' } }
        },
        {
          id: 'create_contact',
          type: 'action',
          data: { provider: 'hubspot', action: 'create_contact' }
        },
        {
          id: 'notify_sales',
          type: 'action',
          data: { provider: 'slack', action: 'send_message', channel: '#sales' }
        }
      ],
      edges: [
        { source: 'trigger', target: 'validate' },
        { source: 'validate', target: 'create_contact' },
        { source: 'create_contact', target: 'notify_sales' }
      ]
    }
  }
];

async function seedTemplates() {
  console.log('🌱 Seeding workflow templates...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const template of templates) {
    try {
      const { data, error } = await supabase
        .from('templates')
        .insert(template)
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed to insert "${template.name}":`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Inserted: ${template.name}`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error inserting "${template.name}":`, error.message);
      errorCount++;
    }
  }

  console.log(`\n📊 Seeding complete:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`\n🎉 Database is ready! Run: npm run dev\n`);
}

// Main execution
(async () => {
  try {
    await seedTemplates();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
})();
