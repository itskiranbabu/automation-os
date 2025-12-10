# 🚀 AutomationOS

<div align="center">

![AutomationOS Logo](https://img.shields.io/badge/AutomationOS-Next--Gen%20Automation-blue?style=for-the-badge)

**The AI-First Automation Platform for Everyone**

[![GitHub Stars](https://img.shields.io/github/stars/itskiranbabu/automation-os?style=social)](https://github.com/itskiranbabu/automation-os)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

AutomationOS is a **production-ready, open-source, AI-first automation platform** that makes workflow automation accessible to everyone—from solo creators to enterprise teams. Unlike traditional automation tools, AutomationOS lets you build workflows using **natural language** or a powerful **visual editor**.

### 🎯 Why AutomationOS?

- **🤖 AI-First**: Describe what you want in plain English, and AI builds the workflow for you
- **🎨 Visual or Code**: Choose between drag-and-drop visual editor or custom code
- **🔌 200+ Integrations**: Connect with Gmail, Slack, Shopify, Stripe, Notion, and more
- **⚡ Durable Execution**: Powered by Temporal for guaranteed workflow completion
- **🔒 Enterprise-Ready**: Multi-tenancy, RBAC, audit logs, and compliance-friendly
- **🌐 Self-Hostable**: Deploy on your infrastructure or use our cloud

---

## ✨ Features

### 🎤 Natural Language Workflows
```
"When I get a Shopify order over $100, send WhatsApp confirmation 
and add a row to Google Sheets"
```
→ AI automatically creates the complete workflow

### 🎨 Visual Workflow Builder
- Drag-and-drop node-based editor
- Real-time testing and debugging
- Branching, loops, and error handling
- Custom code nodes (TypeScript/JavaScript)

### 🔌 Extensive Integrations
- **Email**: Gmail, Outlook, SendGrid
- **Communication**: Slack, Discord, WhatsApp, Telegram
- **E-commerce**: Shopify, WooCommerce, Stripe
- **Productivity**: Notion, Google Sheets, Airtable
- **CRM**: HubSpot, Salesforce, Pipedrive
- **And 200+ more...**

### 🤖 AI-Powered Features
- Prompt-to-workflow generation
- Workflow optimization suggestions
- Natural language explanations
- Smart data transformations
- Content classification and summarization

### 🏢 Enterprise Features
- Multi-workspace support
- Role-based access control (RBAC)
- Audit logs and compliance
- SSO integration
- Advanced analytics
- SLA guarantees

### 🛡️ Reliability & Security
- Durable workflow execution (Temporal)
- Automatic retries with exponential backoff
- End-to-end encryption
- Row-level security (RLS)
- OAuth 2.0 support
- Webhook verification

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Supabase account (or self-hosted)
- Temporal (included in docker-compose)

### Installation

```bash
# Clone the repository
git clone https://github.com/itskiranbabu/automation-os.git
cd automation-os

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your environment variables
# Edit .env.local with your API keys

# Start infrastructure (Postgres, Redis, Temporal)
docker-compose up -d

# Run database migrations
npm run migrate

# Seed workflow templates
npm run seed

# Start development server
npm run dev

# In a separate terminal, start the Temporal worker
npm run worker
```

Visit `http://localhost:3000` and start building automations! 🎉

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Next.js 14)               │
│  Prompt Interface • Visual Editor • Template Library        │
└─────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (tRPC + Next.js)                │
│  Type-safe APIs • Authentication • Rate Limiting            │
└─────────────────────────────────────────────────────────────┘
                              ↓ ↑
┌──────────────────┬──────────────────┬──────────────────────┐
│   AI ENGINE      │  WORKFLOW ENGINE │   INTEGRATION HUB    │
│  Gemini 2.5 Pro  │   Temporal.io    │  OAuth Manager       │
│  Prompt Parser   │   Durable Exec   │  200+ Connectors     │
└──────────────────┴──────────────────┴──────────────────────┘
                              ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              DATA LAYER (Supabase + Redis)                  │
│  Postgres • Auth • Storage • Realtime • Caching             │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, tRPC, Node.js
- **Database**: PostgreSQL (Supabase), Redis
- **Workflow Engine**: Temporal.io
- **AI**: Google Gemini 2.5 Pro
- **Auth**: Supabase Auth (OAuth 2.0, JWT)
- **Deployment**: Docker, Kubernetes, Vercel

---

## 📚 Documentation

### User Guides
- [Getting Started](./docs/getting-started.md)
- [Creating Your First Workflow](./docs/first-workflow.md)
- [Using Templates](./docs/templates.md)
- [Connecting Apps](./docs/connections.md)
- [Visual Editor Guide](./docs/visual-editor.md)

### Developer Guides
- [Architecture Overview](./docs/architecture.md)
- [Building Connectors](./docs/connector-sdk.md)
- [API Reference](./docs/api-reference.md)
- [Self-Hosting Guide](./docs/self-hosting.md)
- [Contributing Guide](./CONTRIBUTING.md)

### Examples
- [E-commerce Workflows](./docs/examples/ecommerce.md)
- [Marketing Automation](./docs/examples/marketing.md)
- [Sales & CRM](./docs/examples/sales.md)
- [Custom Code Examples](./docs/examples/custom-code.md)

---

## 🎯 Use Cases

### E-commerce
- Order confirmation & tracking
- Abandoned cart recovery
- Inventory synchronization
- Customer feedback collection
- Invoice generation

### Marketing
- Social media cross-posting
- Email campaign automation
- Lead nurturing sequences
- Content scheduling
- Analytics reporting

### Sales & CRM
- Lead capture & enrichment
- Follow-up automation
- Deal stage updates
- Meeting scheduling
- Proposal generation

### Operations
- Invoice processing
- Expense tracking
- Report generation
- Data synchronization
- Backup automation

---

## 🛠️ Development

### Project Structure

```
automation-os/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── workflow/         # Workflow editor
│   └── prompt/           # AI prompt interface
├── lib/                   # Core business logic
│   ├── ai/               # AI integration
│   ├── connectors/       # Integration connectors
│   ├── trpc/             # tRPC routers
│   └── utils/            # Utilities
├── temporal/              # Temporal workflows
│   ├── workflows/        # Workflow definitions
│   ├── activities/       # Activity functions
│   └── worker.ts         # Worker process
├── types/                 # TypeScript types
├── public/                # Static assets
└── docs/                  # Documentation
```

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Building for Production

```bash
# Build application
npm run build

# Start production server
npm start

# Build Docker image
docker build -t automation-os .

# Deploy to Kubernetes
kubectl apply -f k8s/
```

---

## 🤝 Contributing

We love contributions! AutomationOS is built by the community, for the community.

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔌 Build new connectors
- 🎨 Enhance UI/UX
- 🧪 Write tests
- 🌍 Translate to other languages

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 📊 Roadmap

### ✅ Phase 1: MVP (Completed)
- [x] Core workflow engine
- [x] Visual editor
- [x] AI prompt-to-workflow
- [x] 5 core connectors
- [x] Template library

### 🚧 Phase 2: Beta (In Progress)
- [ ] 50+ connectors
- [ ] Advanced analytics
- [ ] Team collaboration
- [ ] Webhook triggers
- [ ] API access

### 🔮 Phase 3: Production
- [ ] 200+ connectors
- [ ] Enterprise features
- [ ] Marketplace
- [ ] Mobile apps
- [ ] Advanced AI features

### 🌟 Phase 4: Scale
- [ ] Multi-region deployment
- [ ] Advanced monitoring
- [ ] Custom branding
- [ ] White-label solution
- [ ] Enterprise SLA

---

## 📄 License

AutomationOS is open-source software licensed under the [MIT License](./LICENSE).

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:

- [Next.js](https://nextjs.org/) - React framework
- [Temporal](https://temporal.io/) - Durable execution
- [Supabase](https://supabase.com/) - Backend platform
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [React Flow](https://reactflow.dev/) - Visual editor
- [tRPC](https://trpc.io/) - Type-safe APIs

---

## 📞 Support & Community

- 📧 Email: support@automationos.dev
- 💬 Discord: [Join our community](https://discord.gg/automationos)
- 🐦 Twitter: [@AutomationOS](https://twitter.com/automationos)
- 📖 Documentation: [docs.automationos.dev](https://docs.automationos.dev)
- 🐛 Issues: [GitHub Issues](https://github.com/itskiranbabu/automation-os/issues)

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=itskiranbabu/automation-os&type=Date)](https://star-history.com/#itskiranbabu/automation-os&Date)

---

<div align="center">

**Made with ❤️ by the AutomationOS Team**

[Website](https://automationos.dev) • [Documentation](https://docs.automationos.dev) • [Blog](https://blog.automationos.dev)

</div>