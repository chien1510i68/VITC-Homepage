# Contributing to VITC Homepage

Thank you for your interest in contributing to the VITC Homepage project! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Keep discussions professional and on-topic

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/vitc-homepage.git
   cd vitc-homepage
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/vitc-homepage.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 💻 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `style/` - Code style changes
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, maintainable code
- Follow the coding standards (see below)
- Add tests if applicable
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run the development server
npm run dev

# Build the project
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when available)
npm test
```

### 4. Commit Your Changes

Follow the commit message guidelines (see below).

### 5. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

## 📝 Coding Standards

### TypeScript

- **Use TypeScript for all new files**
- **Enable strict mode** - Already configured in `tsconfig.json`
- **No `any` types** - Use proper types or `unknown` with type guards
- **Use type imports**
  ```typescript
  import type { Program } from '@/types';
  ```

### React & Next.js

- **Use functional components** with hooks
- **Server Components by default** - Add `'use client'` only when needed
- **Proper file naming**
  - Components: PascalCase (e.g., `HeroSection.tsx`)
  - Utilities: camelCase (e.g., `formatDate.ts`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_ROUTES.ts`)

- **Component structure**
  ```typescript
  'use client'; // Only if needed
  
  import type { ComponentProps } from '@/types';
  
  /**
   * Component description
   * @param props - Component props
   */
  export function MyComponent({ prop1, prop2 }: ComponentProps) {
    // Component logic
    return (
      // JSX
    );
  }
  ```

### Styling

- **Use Tailwind CSS** for styling
- **Follow the design system** - Use predefined colors from `lib/colors.ts`
- **Mobile-first approach** - Start with mobile styles, then add responsive breakpoints
- **Avoid inline styles** unless absolutely necessary

### File Organization

```
types/          # Global TypeScript types
lib/            # Utilities, helpers, API clients
  api/          # API related code
  hooks/        # Custom React hooks
  utils/        # Utility functions
components/     # Reusable components
  ui/           # UI primitives (shadcn/ui)
  layout/       # Layout components
  sections/     # Page sections
app/            # Next.js app router
  (routes)/     # Route groups
  api/          # API routes
config/         # Configuration files
```

### Imports

Use path aliases for cleaner imports:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button';
import { env } from '@/lib/env';
import type { Program } from '@/types';

// ❌ Bad
import { Button } from '../../components/ui/button';
```

### Code Quality

- **Write JSDoc comments** for public APIs and complex functions
- **Keep functions small** and focused (single responsibility)
- **Extract magic numbers** to named constants
- **Use meaningful variable names**
- **Avoid deep nesting** - Use early returns

## 📬 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Feature
feat(courses): add course filtering functionality

# Bug fix
fix(header): resolve mobile menu not closing on route change

# Documentation
docs(readme): update installation instructions

# Refactor
refactor(api): migrate to centralized error handling
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console warnings or errors
- [ ] Tested on multiple screen sizes
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested responsiveness
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged

## 🏗️ Project Structure

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed project structure and architecture.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🆘 Getting Help

- Open an issue for bugs or feature requests
- Join discussions in GitHub Discussions
- Contact maintainers via email

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to VITC Homepage! 🎉
