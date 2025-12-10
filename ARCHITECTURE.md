# AutomationOS Architecture

This document provides a comprehensive overview of the AutomationOS architecture, design decisions, and implementation details.

## 📐 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  Next.js 14 (App Router) + React + TypeScript + Tailwind   │
│  - Prompt Interface  - Template Library  - Visual Editor    │
│  - Connections Hub   - Analytics Dashboard  - Run Logs      │
└─────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                       │
│              Next.js API Routes + tRPC v11                   │
│  - Auth Middleware  - Rate Limiting  - Request Validation   │
└─────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌──────────────────┬──────────────────┬──────────────────────┐
│   AI ENGINE      │  WORKFLOW ENGINE │   INTEGRATION HUB    │
│                  │                  │                      │
│ • Gemini 2.5 Pro │ • Temporal.io    │ • OAuth Manager      │
│ • Prompt Parser  │ • Durable Exec   │ • Connector Registry │
│ • Intent Mapper  │ • State Machine  │ • Credential Vault   │
│ • Code Generator │ • Retry Logic    │ • API Adapters       │
└──────────────────┴──────────────────┴──────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  Supabase (Postgres 15 + Auth + Storage + Realtime)        │
│  - Multi-tenant DB  - RLS Policies  - Encrypted Secrets     │
└─────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                       │
│  • Redis (caching, rate limiting, job queue)                │
│  • S3-compatible storage (workflow artifacts, logs)         │
│  • Temporal Server (workflow orchestration)                 │
│  • Vector DB (Pinecone/Qdrant for semantic search)         │
└─────────────────────────────────────────────────────────────┘
```

## 🏗️ Core Components

### 1. Frontend Layer (Next.js 14)

**Technology Stack:**
- Next.js 14 with App Router
- React 19 with Server Components
- TypeScript for type safety
- Tailwind CSS + shadcn/ui for styling
- React Flow for visual workflow editor
- tRPC for type-safe API calls

**Key Features:**
- Server-side rendering for performance
- Streaming for AI responses
- Optimistic updates for better UX
- Real-time updates via Supabase Realtime

### 2. API Layer (tRPC)

**Why tRPC?**
- End-to-end type safety
- No code generation needed
- Automatic client generation
- Built-in error handling
- Middleware support

**Routers:**
- `workflows` - Workflow CRUD operations
- `connections` - OAuth and credential management
- `runs` - Execution history and logs
- `templates` - Template library
- `analytics` - Usage statistics
- `workspace` - Team management

### 3. AI Engine (Gemini 2.5 Pro)

**Capabilities:**
- Natural language to workflow conversion
- Intent classification
- Entity extraction
- Workflow optimization
- Code generation
- Error explanation

**Flow:**
```
User Prompt
    ↓
Intent Classification
    ↓
Entity Extraction
    ↓
Connector Mapping
    ↓
Workflow Graph Generation
    ↓
Validation & Refinement
    ↓
Executable Workflow
```

### 4. Workflow Engine (Temporal)

**Why Temporal?**
- Durable execution guarantees
- Automatic retries with backoff
- State persistence across failures
- Distributed tracing
- Versioning support

**Workflow Lifecycle:**
```
Trigger Event
    ↓
Temporal Workflow Started
    ↓
Execute Nodes in Order
    ↓
Handle Errors & Retries
    ↓
Update Run Status
    ↓
Complete or Fail
```

### 5. Integration Hub

**Connector Architecture:**
- Base connector interface
- Plugin system for extensibility
- OAuth 2.0 flow management
- Credential encryption
- Rate limit handling
- Webhook management

**Supported Auth Types:**
- OAuth 2.0
- API Keys
- Basic Auth
- Custom auth flows

## 🗄️ Data Model

### Core Tables

**workspaces**
- Multi-tenant isolation
- Team collaboration
- Billing and usage tracking

**workflows**
- Workflow definitions (JSON)
- Version history
- Status tracking
- Execution statistics

**connections**
- Encrypted credentials
- OAuth tokens
- Connection status
- Last verified timestamp

**workflow_runs**
- Execution history
- Input/output data
- Error details
- Performance metrics

**workflow_run_steps**
- Step-by-step execution log
- Node-level details
- Retry attempts
- Duration tracking

### Security

**Row-Level Security (RLS):**
```sql
CREATE POLICY "Users can access workspace data"
  ON workflows FOR ALL
  USING (
    workspace_id IN (
      SELECT workspace_id 
      FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  );
```

**Credential Encryption:**
- AES-256-GCM encryption
- Unique IV per credential
- Key rotation support
- Secure key storage

## 🔄 Workflow Execution

### Execution Flow

1. **Trigger Detection**
   - Webhook received
   - Schedule fired
   - Manual execution
   - Event detected

2. **Workflow Initialization**
   - Load workflow definition
   - Validate connections
   - Initialize Temporal workflow
   - Create run record

3. **Node Execution**
   - Topological sort of nodes
   - Execute in dependency order
   - Resolve template variables
   - Handle branching logic

4. **Error Handling**
   - Automatic retries
   - Exponential backoff
   - Error notifications
   - Fallback paths

5. **Completion**
   - Update run status
   - Store output data
   - Trigger webhooks
   - Send notifications

### Retry Strategy

```typescript
{
  maxAttempts: 3,
  backoffMultiplier: 2,
  initialInterval: 1000, // 1s
  // Retry at: 1s, 2s, 4s
}
```

## 🔌 Connector System

### Connector Interface

```typescript
interface BaseConnector {
  config: ConnectorConfig;
  authenticate(credentials: any): Promise<boolean>;
  execute(operation: string, params: any, credentials: any): Promise<any>;
  testConnection(credentials: any): Promise<boolean>;
  setupWebhook?(config: any, url: string, credentials: any): Promise<{webhookId: string}>;
  removeWebhook?(webhookId: string, credentials: any): Promise<void>;
  poll?(config: any, credentials: any, lastPoll?: Date): Promise<any[]>;
}
```

### Connector Registry

Centralized registry for all connectors:
- Dynamic loading
- Version management
- Capability discovery
- Dependency resolution

## 🚀 Deployment Architecture

### Development

```
Local Machine
├── Next.js Dev Server (port 3000)
├── Docker Compose
│   ├── PostgreSQL (port 5432)
│   ├── Redis (port 6379)
│   ├── Temporal (port 7233)
│   └── Temporal UI (port 8080)
└── Temporal Worker (Node.js process)
```

### Production

```
Cloud Infrastructure
├── Vercel (Next.js App)
│   ├── Edge Functions
│   ├── Serverless Functions
│   └── Static Assets (CDN)
├── Supabase (Database + Auth)
│   ├── PostgreSQL
│   ├── Auth Service
│   └── Storage
├── Temporal Cloud (Workflow Engine)
│   └── Workers (Kubernetes)
├── Redis Cloud (Caching)
└── Monitoring
    ├── Sentry (Errors)
    ├── Prometheus (Metrics)
    └── Grafana (Dashboards)
```

## 📊 Scalability

### Horizontal Scaling

- **Web Tier**: Auto-scale Next.js instances
- **Worker Tier**: Scale Temporal workers based on queue depth
- **Database**: Read replicas for queries
- **Cache**: Redis cluster for high availability

### Performance Optimizations

- Server-side rendering for initial load
- Incremental static regeneration for templates
- Edge caching for static assets
- Database query optimization
- Connection pooling
- Lazy loading of components

## 🔒 Security

### Authentication & Authorization

- Supabase Auth (JWT-based)
- OAuth 2.0 for integrations
- Role-based access control (RBAC)
- Row-level security (RLS)

### Data Protection

- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Credential vault with rotation
- Audit logging
- GDPR compliance

### API Security

- Rate limiting (Redis-based)
- Request validation (Zod)
- CSRF protection
- XSS prevention
- SQL injection prevention

## 📈 Monitoring & Observability

### Metrics

- Workflow execution count
- Success/failure rates
- Execution duration
- API response times
- Error rates
- Resource utilization

### Logging

- Structured logging (Pino)
- Log aggregation
- Error tracking (Sentry)
- Audit trails
- Debug traces

### Alerting

- Error rate thresholds
- Performance degradation
- Resource exhaustion
- Security incidents
- SLA violations

## 🔄 CI/CD Pipeline

```
GitHub Push
    ↓
Lint & Type Check
    ↓
Run Tests
    ↓
Build Application
    ↓
Build Docker Image
    ↓
Deploy to Staging
    ↓
Run E2E Tests
    ↓
Deploy to Production
    ↓
Health Checks
    ↓
Rollback if Failed
```

## 🎯 Design Decisions

### Why Next.js?

- Server-side rendering for SEO
- API routes for backend logic
- File-based routing
- Built-in optimization
- Great developer experience

### Why Temporal?

- Durable execution guarantees
- Battle-tested at scale
- Built-in retry logic
- Workflow versioning
- Excellent observability

### Why Supabase?

- PostgreSQL with modern API
- Built-in authentication
- Real-time subscriptions
- Row-level security
- Easy to self-host

### Why tRPC?

- End-to-end type safety
- No code generation
- Excellent DX
- Built-in error handling
- Easy to test

## 📚 Further Reading

- [Getting Started Guide](./docs/getting-started.md)
- [Connector SDK](./docs/connector-sdk.md)
- [API Reference](./docs/api-reference.md)
- [Self-Hosting Guide](./docs/self-hosting.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

**Last Updated:** December 2025  
**Version:** 0.1.0