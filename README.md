# NeWoFlow Frontend

A React-based web application MVP for managing multimedia catalogs (music, videos, concerts, series, movies, and podcasts) and their file lifecycle.

## Features

- **Authentication & Authorization**: Role-based access control (Admin, Editor, Viewer, Artist)
- **Catalog Management**: Create, edit, and organize media catalogs
- **Media Management**: Upload, track, and manage media files with lifecycle states
- **Plugin System**: Admin-only plugin management and hook execution monitoring
- **Dashboard**: Role-based statistics and activity feed

## Tech Stack

- React 18.3+ with JSX
- Vite 6+ (build tool)
- Tailwind CSS 4+ (styling)
- TanStack Query v5 (server state)
- Zustand (client state)
- React Router v6 (routing)
- React Hook Form + Zod (forms & validation)
- Axios (HTTP client)
- shadcn/ui components
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env` to point to your backend API

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

Format code with Prettier:

```bash
npm run format
```

## Project Structure

```
src/
├── api/                  # API client and endpoints
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── auth/            # Auth-related components
│   ├── catalog/         # Catalog components
│   ├── media/           # Media components
│   ├── plugins/         # Plugin components
│   └── layout/          # Layout components
├── features/            # Feature-based modules
│   ├── auth/           # Authentication feature
│   ├── catalog/        # Catalog feature
│   ├── media/          # Media feature
│   ├── plugins/        # Plugins feature
│   └── dashboard/      # Dashboard feature
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── stores/             # Zustand stores
├── styles/             # Global styles
└── App.jsx             # Main app component
```

## User Roles & Permissions

### Admin
- Full access to all features
- User management
- Plugin configuration
- System settings

### Editor
- Create/edit/delete catalog entries
- Upload media files
- Trigger hooks
- Cannot manage users or plugins

### Viewer
- Read-only access
- View catalogs and media
- Search and filter
- Cannot upload or edit

### Artist/Owner
- Upload their own media
- Edit their own content metadata
- View usage statistics
- Limited to own content

## Environment Variables

- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:8000)
- `VITE_API_TIMEOUT`: API request timeout in ms (default: 30000)
- `VITE_MAX_UPLOAD_SIZE`: Maximum file upload size in bytes (default: 524288000)
- `VITE_ENABLE_MOCK_API`: Enable mock API for development (default: false)

## License

Proprietary - All rights reserved
