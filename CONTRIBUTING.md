# Contributing to AutomationOS

First off, thank you for considering contributing to AutomationOS! 🎉

It's people like you that make AutomationOS such a great tool. We welcome contributions from everyone, whether you're fixing a typo, adding a feature, or building a new connector.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Building Connectors](#building-connectors)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@automationos.dev.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other tools**

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues perfect for beginners
- `help wanted` - Issues where we need community help
- `documentation` - Documentation improvements

### Building New Connectors

We're always looking for new integrations! See the [Building Connectors](#building-connectors) section below.

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Git
- A code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**

```bash
# Click the "Fork" button on GitHub
```

2. **Clone your fork**

```bash
git clone https://github.com/YOUR_USERNAME/automation-os.git
cd automation-os
```

3. **Add upstream remote**

```bash
git remote add upstream https://github.com/itskiranbabu/automation-os.git
```

4. **Install dependencies**

```bash
npm install
```

5. **Set up environment variables**

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

6. **Start infrastructure**

```bash
docker-compose up -d
```

7. **Run migrations**

```bash
npm run migrate
```

8. **Start development server**

```bash
npm run dev
```

9. **Start Temporal worker** (in a separate terminal)

```bash
npm run worker
```

Visit `http://localhost:3000` to see the app running!

## 🔄 Pull Request Process

1. **Create a branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. **Make your changes**

- Write clean, readable code
- Follow our coding standards
- Add tests for new features
- Update documentation as needed

3. **Commit your changes**

```bash
git add .
git commit -m "feat: add amazing feature"
```

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

4. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

5. **Create a Pull Request**

- Go to the original repository
- Click "New Pull Request"
- Select your fork and branch
- Fill in the PR template
- Link any related issues

6. **Code Review**

- Respond to feedback
- Make requested changes
- Push updates to your branch

7. **Merge**

Once approved, a maintainer will merge your PR!

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types from `types/` directory

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow the component structure:

```tsx
// Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Types
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  const [state, setState] = useState(false);
  
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas
- Use semicolons
- Run `npm run format` before committing

## 🔌 Building Connectors

Connectors are the heart of AutomationOS! Here's how to build one:

### 1. Create Connector File

```typescript
// lib/connectors/my-app.ts

import { BaseConnector, ConnectorConfig } from './base';

export class MyAppConnector extends BaseConnector {
  constructor() {
    super({
      id: 'my_app',
      name: 'My App',
      description: 'Integration with My App',
      category: 'productivity',
      icon: '/connectors/my-app.svg',
      authType: 'oauth2',
      authConfig: {
        oauth2: {
          authorizationUrl: 'https://myapp.com/oauth/authorize',
          tokenUrl: 'https://myapp.com/oauth/token',
          scopes: ['read', 'write'],
          clientIdEnv: 'MY_APP_CLIENT_ID',
          clientSecretEnv: 'MY_APP_CLIENT_SECRET'
        }
      },
      triggers: [
        // Define triggers
      ],
      actions: [
        // Define actions
      ]
    });
  }

  async authenticate(credentials: any): Promise<boolean> {
    // Implement authentication
  }

  async execute(operation: string, params: any, credentials: any): Promise<any> {
    // Implement operations
  }

  async testConnection(credentials: any): Promise<boolean> {
    // Test connection
  }
}
```

### 2. Register Connector

```typescript
// lib/connectors/registry.ts

import { MyAppConnector } from './my-app';

ConnectorRegistry.register(new MyAppConnector());
```

### 3. Add Tests

```typescript
// lib/connectors/__tests__/my-app.test.ts

describe('MyAppConnector', () => {
  it('should authenticate successfully', async () => {
    // Test authentication
  });

  it('should execute actions', async () => {
    // Test actions
  });
});
```

### 4. Add Documentation

Create `docs/connectors/my-app.md` with:

- Overview
- Authentication setup
- Available triggers
- Available actions
- Examples

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Writing Tests

- Write tests for all new features
- Aim for >80% code coverage
- Use descriptive test names
- Test edge cases and error handling

```typescript
describe('MyFeature', () => {
  it('should handle success case', () => {
    // Test success
  });

  it('should handle error case', () => {
    // Test error
  });

  it('should validate input', () => {
    // Test validation
  });
});
```

## 📚 Documentation

Good documentation is crucial! When contributing:

### Code Documentation

- Add JSDoc comments for functions
- Explain complex logic
- Document parameters and return types

```typescript
/**
 * Executes a workflow with the given configuration
 * @param workflowId - Unique workflow identifier
 * @param input - Workflow input data
 * @returns Workflow execution result
 * @throws {WorkflowError} If execution fails
 */
async function executeWorkflow(
  workflowId: string,
  input: WorkflowInput
): Promise<WorkflowResult> {
  // Implementation
}
```

### User Documentation

- Update relevant docs in `docs/`
- Add examples and screenshots
- Keep language simple and clear
- Test instructions yourself

## 🎯 Areas We Need Help

- **Connectors**: Build integrations with popular apps
- **Templates**: Create workflow templates for common use cases
- **Documentation**: Improve guides and tutorials
- **Testing**: Increase test coverage
- **UI/UX**: Enhance user interface and experience
- **Performance**: Optimize slow operations
- **Accessibility**: Improve a11y compliance
- **Internationalization**: Translate to other languages

## 💬 Getting Help

- **Discord**: Join our [Discord community](https://discord.gg/automationos)
- **GitHub Discussions**: Ask questions in [Discussions](https://github.com/itskiranbabu/automation-os/discussions)
- **Email**: Contact us at dev@automationos.dev

## 🏆 Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- Our website's contributors page

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to AutomationOS! Together, we're building the future of automation.** 🚀