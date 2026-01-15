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
- NeWoFlow backend API running

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

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Deployment Options

#### Static Hosting (Vercel, Netlify, Cloudflare Pages)

1. Connect your repository to the platform
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables in the platform's dashboard

#### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Build and run:

```bash
docker build -t newoflow-frontend .
docker run -p 3000:80 newoflow-frontend
```

### Environment Configuration

For production, update these variables:

```bash
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=30000
VITE_MAX_UPLOAD_SIZE=524288000
```

## API Integration

The frontend connects to the NeWoFlow backend API. See [API_INTEGRATION.md](./API_INTEGRATION.md) for detailed endpoint documentation.

**Important**: All API endpoints follow the OpenAPI 3.1.0 specification. Ensure your backend is running and accessible at the URL specified in `VITE_API_BASE_URL`.

## Documentation

- [API Integration Guide](./API_INTEGRATION.md) - Complete API endpoint documentation
- [Features Overview](./FEATURES.md) - Detailed feature descriptions
- [Contributing Guide](./CONTRIBUTING.md) - Development guidelines

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Bundle size: ~403 KB (gzipped: ~126 KB)
- Build time: ~3 seconds
- Lighthouse score: 90+ (Performance, Accessibility, Best Practices)

## Troubleshooting

### Build Issues

If you encounter build errors:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CORS Issues

If you see CORS errors in development, ensure the backend API allows requests from `http://localhost:3000`. See the backend CORS configuration.

### Authentication Issues

If login fails:
1. Check that `VITE_API_BASE_URL` is correct
2. Verify the backend is running
3. Clear browser localStorage and cookies
4. Check browser console for errors

## License

Proprietary - All rights reserved
