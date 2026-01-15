# API Integration Guide

This document explains how to integrate the NeWoFlow Frontend with the backend API based on the OpenAPI 3.1.0 specification.

## Environment Configuration

Configure the following environment variables in your `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
VITE_MAX_UPLOAD_SIZE=524288000
VITE_ENABLE_MOCK_API=false
```

## Authentication

### Register User

**POST** `/api/v1/auth/register`

Request:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "admin|editor|viewer|artist" (optional, defaults to "viewer")
}
```

Response:
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "role": "admin|editor|viewer|artist",
  "is_active": "string",
  "created_at": "2024-01-01T00:00:00"
}
```

### Login

**POST** `/api/v1/auth/login`

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
  "access_token": "jwt-token-string",
  "token_type": "bearer"
}
```

After receiving the token, the frontend automatically fetches user information using `/api/v1/auth/me`.

The JWT token is stored in localStorage and automatically included in all subsequent requests via the Authorization header as `Bearer <token>`.

### Get Current User

**GET** `/api/v1/auth/me`

Requires: Authorization header with Bearer token

Response:
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "role": "admin|editor|viewer|artist",
  "is_active": "string",
  "created_at": "2024-01-01T00:00:00"
}
```

### User Management (Admin only)

- **GET** `/api/v1/auth/users?skip=0&limit=100` - List users
- **GET** `/api/v1/auth/users/{user_id}` - Get user by ID
- **PUT** `/api/v1/auth/users/{user_id}` - Update user
- **DELETE** `/api/v1/auth/users/{user_id}` - Delete user

## Media Catalog

### Create Media Item

**POST** `/api/v1/media/media`

Request:
```json
{
  "title": "string",
  "media_type": "music|video|series|movie|podcast",
  "file_path": "string",
  "description": "string (optional)",
  "media_metadata": "string (optional, JSON string)"
}
```

### List Media Items

**GET** `/api/v1/media/media`

Query parameters:
- `skip`: Number of records to skip (default: 0)
- `limit`: Number of records to return (default: 100)
- `media_type`: Filter by type (music, video, series, movie, podcast)
- `state`: Filter by state (ingested, organized, error, disabled)

Response: Array of media items

### Get Media Item

**GET** `/api/v1/media/media/{media_id}`

### Update Media Item

**PUT** `/api/v1/media/media/{media_id}`

Request:
```json
{
  "title": "string (optional)",
  "media_type": "music|video|series|movie|podcast (optional)",
  "state": "ingested|organized|error|disabled (optional)",
  "file_path": "string (optional)",
  "description": "string (optional)",
  "media_metadata": "string (optional)"
}
```

### Delete Media Item

**DELETE** `/api/v1/media/media/{media_id}`

Returns: 204 No Content

## Media Ingestion

### Upload Media File

**POST** `/api/v1/ingest/ingest/upload`

Content-Type: multipart/form-data

Query parameters:
- `title`: Optional title
- `media_type`: Optional media type

Form data:
- `file`: File to upload (required)

Response: Object with upload result

### Scan Directory

**POST** `/api/v1/ingest/ingest/scan`

Request:
```json
{
  "directory_path": "string",
  "recursive": true (optional, default: true)
}
```

Response:
```json
{
  "id": 1,
  "source_path": "string",
  "status": "string",
  "error_message": "string (optional)",
  "files_processed": 0,
  "files_failed": 0,
  "created_at": "2024-01-01T00:00:00",
  "completed_at": "2024-01-01T00:00:00 (optional)"
}
```

### List Ingestion Jobs

**GET** `/api/v1/ingest/ingest/jobs?skip=0&limit=100`

### Get Ingestion Job

**GET** `/api/v1/ingest/ingest/jobs/{job_id}`

## Hooks & Plugins

### List Hook Logs

**GET** `/api/v1/hooks/hooks/logs`

Query parameters:
- `skip`: Number of records to skip (default: 0)
- `limit`: Number of records to return (default: 100)
- `hook_name`: Filter by hook name
- `status`: Filter by status

Response: Array of hook logs

### Get Hook Log

**GET** `/api/v1/hooks/hooks/logs/{log_id}`

Response:
```json
{
  "id": 1,
  "hook_name": "string",
  "media_item_id": 1 (optional),
  "status": "string",
  "message": "string (optional)",
  "details": "string (optional)",
  "created_at": "2024-01-01T00:00:00"
}
```

## Response Format

All API responses follow the OpenAPI specification.

### Error Response
```json
{
  "detail": [
    {
      "loc": ["body", "field_name"],
      "msg": "Error message",
      "type": "validation_error"
    }
  ]
}
```

## Missing Endpoints

The following features in the frontend do not have corresponding backend endpoints yet:

1. **Catalog Management** - The frontend uses media items as catalogs. Separate catalog endpoints may need to be implemented.

2. **Plugin Management** - Endpoints for listing, enabling/disabling plugins are not available.

3. **Hook Retry** - Endpoint to retry failed hooks is not available.

4. **Dashboard Stats** - Aggregated statistics endpoint is not available.

5. **Media Lifecycle History** - Timeline of state changes is not available.

These features will display placeholder data or show "not implemented" messages until backend support is added.

## CORS Configuration

Ensure your backend API allows requests from the frontend origin:

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

For production, update `VITE_API_BASE_URL` to point to your production API endpoint.

