# Contributing to NeWoFlow Frontend

Thank you for your interest in contributing to NeWoFlow Frontend!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/newoflow-frontend-admin.git`
3. Install dependencies: `npm install`
4. Create a `.env` file based on `.env.example`
5. Start the dev server: `npm run dev`

## Code Style

We use ESLint and Prettier to maintain code quality:

```bash
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```

### Guidelines

- Use functional components with hooks
- Follow existing naming conventions
- Keep components small and focused
- Use JSDoc comments for complex functions
- Always use the permission system for access control

## Component Structure

- Place reusable UI components in `src/components/ui/`
- Place feature-specific components in `src/components/{feature}/`
- Place page components in `src/features/{feature}/pages/`
- Place hooks in `src/features/{feature}/hooks/` or `src/hooks/` for shared hooks

## State Management

- Use TanStack Query for server state
- Use Zustand for client state (auth, UI)
- Use local state (useState) for component-specific state

## Testing

Before submitting a PR:

1. Ensure the build passes: `npm run build`
2. Fix any linting errors: `npm run lint`
3. Test your changes in the browser
4. Verify role-based access control works correctly

## Submitting Changes

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Commit with descriptive messages: `git commit -m "feat: add new feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

## Commit Message Convention

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Questions?

If you have questions, please open an issue or reach out to the maintainers.
