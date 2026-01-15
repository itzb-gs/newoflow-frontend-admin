# API Integration Guide

This document explains how to integrate the NeWoFlow Frontend with the backend API.

## Environment Configuration

Configure the following environment variables in your `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
VITE_MAX_UPLOAD_SIZE=524288000
VITE_ENABLE_MOCK_API=false
```

## Authentication

### Login Endpoint

**POST** `/api/auth/login`

Request:
```json
{
  "username": "string",
  "password": "string"
}
```

Response:
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string",
    "role": "admin|editor|viewer|artist"
  }
}
```

The JWT token is stored in localStorage and automatically included in all subsequent requests via the Authorization header.

## API Endpoints

### Dashboard

- **GET** `/api/dashboard/stats` - Get dashboard statistics
- **GET** `/api/dashboard/activity?limit=10` - Get recent activity feed

### Catalog

- **GET** `/api/catalog` - List catalog items (supports filtering)
- **GET** `/api/catalog/:id` - Get single catalog item
- **POST** `/api/catalog` - Create catalog item
- **PUT** `/api/catalog/:id` - Update catalog item
- **DELETE** `/api/catalog/:id` - Delete catalog item

Query parameters for listing:
- `type`: Content type filter
- `search`: Search query
- `tags`: Comma-separated tags
- `page`: Page number
- `perPage`: Items per page

### Media

- **GET** `/api/media` - List media files (supports filtering)
- **GET** `/api/media/:id` - Get single media file
- **POST** `/api/media/upload` - Upload media file (multipart/form-data)
- **POST** `/api/media/scan` - Trigger directory scan
- **PUT** `/api/media/:id` - Update media file
- **DELETE** `/api/media/:id` - Delete media file
- **GET** `/api/media/:id/lifecycle` - Get lifecycle history

Query parameters for listing:
- `state`: Lifecycle state filter (ingested, organized, error, disabled)
- `type`: File type filter (audio, video, image)
- `page`: Page number
- `perPage`: Items per page

### Plugins (Admin only)

- **GET** `/api/plugins` - List all plugins
- **GET** `/api/plugins/:id` - Get single plugin
- **POST** `/api/plugins/:id/enable` - Enable plugin
- **POST** `/api/plugins/:id/disable` - Disable plugin

### Hooks (Admin only)

- **GET** `/api/hooks/logs` - Get hook execution logs (supports filtering)
- **POST** `/api/hooks/logs/:id/retry` - Retry failed hook

Query parameters for logs:
- `plugin`: Filter by plugin name
- `status`: Filter by status (success, failure)
- `mediaId`: Filter by media file ID
- `page`: Page number
- `perPage`: Items per page

## Response Format

All API responses follow this structure:

### Success Response
```json
{
  "data": { ... },
  "message": "Success message (optional)"
}
```

### Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "statusCode": 400
}
```

### Paginated Response
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "perPage": 10,
  "totalPages": 10
}
```

## Error Handling

The Axios client automatically handles:

1. **401 Unauthorized**: Clears auth token and redirects to login
2. **Network errors**: Shows error toast notification
3. **Validation errors**: Returns error details for form handling

## File Upload

Media file uploads use multipart/form-data with progress tracking:

```javascript
const formData = new FormData();
formData.append('file', file);
formData.append('metadata', JSON.stringify({ title, description }));

await uploadMediaFile(formData, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});
```

Maximum upload size is configured via `VITE_MAX_UPLOAD_SIZE` (default: 500MB).

## CORS Configuration

Ensure your backend API allows requests from the frontend origin and includes these headers:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

## Development Proxy

In development, Vite proxies `/api/*` requests to the backend:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

## Production Deployment

For production, configure your web server (nginx, Apache) to proxy API requests or update `VITE_API_BASE_URL` to point to the production API endpoint.
