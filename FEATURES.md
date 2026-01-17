# NeWoFlow Frontend - Features Overview

## Application Structure

The NeWoFlow Frontend is a comprehensive React application for multimedia catalog management with the following key features:

## 1. Authentication System

### Login Page
- Clean, centered login form
- Username and password authentication
- JWT token management
- Automatic redirection based on authentication status

**Key Features:**
- Form validation
- Loading states during login
- Error handling with toast notifications
- Persistent authentication (localStorage)

## 2. Dashboard (Home)

### Role-Based Dashboard
- **Statistics Cards**: Display key metrics
  - Total Media count
  - Catalog Items count
  - Active Plugins count
  - Failed Operations count

- **Recent Activity Feed**: Shows latest operations with:
  - Activity descriptions
  - State badges (color-coded)
  - Timestamps
  
- **Quick Actions**: Role-specific action buttons
  - Admin: Upload Media, Create Catalog, Manage Plugins, Add Artist
  - Editor: Upload Media, Create Catalog, Add Artist, Add Album, Add Track
  - Artist: Upload Media, Add Track
  - Viewer: Browse Catalog only

## 3. Artist Management

### Artist List View
- Grid layout with artist cards
- **Filters:**
  - Search by artist name
- Pagination controls
- Add new artist button (Editor/Admin only)

### Artist Detail View
- Artist biography and information
- Profile image display
- Country and website information
- Associated albums list with track counts
- Statistics (total albums and tracks)
- Edit and Delete actions (permission-based)

### Artist Form (Create/Edit)
- Name field (required)
- Country field
- Biography textarea
- Image URL input
- Website URL input
- Form validation
- Success/error feedback

## 4. Album Management

### Album List View
- Grid layout with album cards
- **Filters:**
  - Search by album title
  - Filter by genre
- Pagination controls
- Add new album button (Editor/Admin only)

### Album Detail View
- Album cover image
- Artist information with link
- Description and genre
- Track list with track numbers and durations
- Release date
- Statistics (total tracks, total duration)
- Edit and Delete actions (permission-based)

### Album Form (Create/Edit)
- Title field (required)
- Artist selection dropdown (required)
- Release date picker
- Genre badges for selection
- Description textarea
- Cover image URL input
- Form validation
- Success/error feedback

## 5. Track Management

### Track List View
- Grid layout with track cards
- **Filters:**
  - Search by track title
- Pagination controls
- Add new track button (Editor/Admin only)

### Track Detail View
- Track information with album and artist links
- Track number and duration display
- Lyrics display (if available)
- Associated media file link
- Relationship information
- Edit and Delete actions (permission-based)

### Track Form (Create/Edit)
- Title field (required)
- Artist selection dropdown (required)
- Album selection dropdown (required)
- Track number input
- Duration input (in seconds)
- Lyrics textarea
- Form validation
- Success/error feedback

## 6. Catalog Management

### Catalog List View
- Grid layout with catalog cards
- **Filters:**
  - Content type (music, video, concert, series, movie, podcast)
  - Search by title/description
  - Filter by tags
- Pagination controls
- Create new catalog button (Editor/Admin only)

### Catalog Detail View
- Complete metadata display
- Cover image/thumbnail
- Tags display
- Associated media files list
- Edit and Delete actions (permission-based)

### Catalog Form (Create/Edit)
- Title and description fields
- Type selector (dropdown)
- Tags input (comma-separated)
- Form validation with Zod
- Success/error feedback

## 7. Media Management

### Media List View
- Grid layout with media cards
- **Filters:**
  - Lifecycle state (ingested, organized, error, disabled)
  - File type (audio, video, image)
- State badges (color-coded)
- Pagination controls
- Upload button (Artist/Editor/Admin only)

### Media Detail View
- File metadata and information
- **Lifecycle Timeline**: Visual timeline of state changes
- Associated catalog information
- **Hook Execution Logs**: Shows plugin hook executions
- Edit and Delete actions (permission-based)

### Media Upload Page
- **Drag & Drop Interface**:
  - Drop zone with visual feedback
  - File browser fallback
- **Upload Progress**:
  - Individual file progress bars
  - Percentage display
  - Success/error status per file
- **Batch Upload Support**: Multiple files at once
- File validation (type and size)
- **Directory Scan Trigger**: Form for scanning server directories

## 8. Plugin Management (Admin Only)

### Plugin Manager
- List of all registered plugins
- **Plugin Cards** showing:
  - Plugin name and description
  - Version number
  - Status badge (active/inactive)
  - Enable/Disable toggle switch

### Hook Execution Logs
- Filterable log viewer
- **Columns:**
  - Timestamp
  - Plugin name
  - Status (success/failure)
  - Duration
  - Media file association
- **Error Details**: Expandable stack traces for failures
- **Retry Button**: Retry failed hook executions
- Pagination controls

## 9. Layout & Navigation

### Navbar (Top Bar)
- NeWoFlow branding/logo
- Sidebar toggle button
- **User Info Display**:
  - Username
  - Role badge (color-coded)
- Logout button

### Sidebar (Left Panel)
- **Collapsible navigation**
- **Role-Based Menu Items**:
  - Dashboard (all roles)
  - Catalog (all roles)
  - Media (all roles)
  - Upload (Artist/Editor/Admin)
  - Plugins (Admin only)
- Active page highlighting
- Icons for each menu item

## 10. UI Components Library

### Custom Components
- **Button**: Multiple variants (default, destructive, outline, ghost, link)
- **Input**: Text, password, email inputs with validation styling
- **Label**: Form labels with accessibility
- **Card**: Content containers with header, content, footer sections
- **Badge**: Status indicators (color variants)
- **Dialog**: Modal dialogs for confirmations
- **Select**: Dropdown selections with search
- **Textarea**: Multi-line text input

### Feedback Components
- **Toast Notifications** (Sonner):
  - Success messages (green)
  - Error messages (red)
  - Info messages (blue)
  - Auto-dismiss with manual close option

## 11. Role-Based Access Control

### Four User Roles

#### 🔴 Admin
- Full system access
- User management capability
- Plugin configuration
- All Editor/Viewer/Artist permissions

#### 🟠 Editor
- Create/edit/delete catalog entries
- Upload and manage all media
- Trigger system hooks
- Cannot manage users/plugins

#### 🟢 Viewer
- Read-only access
- View catalogs and media
- Search and filter
- No upload/edit capabilities

#### 🔵 Artist/Owner
- Upload own media
- Edit own content
- View personal statistics
- Limited to own content

### Permission System
- Declarative permission checks
- Route-level protection
- Component-level guards
- UI element conditional rendering

## 12. Responsive Design

### Breakpoints
- **Mobile**: < 768px (single column, stacked layout)
- **Tablet**: 768px - 1024px (2-column grids)
- **Desktop**: > 1024px (3-4 column grids)

### Responsive Features
- Collapsible sidebar on mobile
- Responsive navigation menu
- Grid layouts adapt to screen size
- Touch-friendly buttons and controls

## 13. Data Management

### State Management
- **TanStack Query**: Server state with caching
  - Automatic refetching
  - Optimistic updates
  - Cache invalidation
- **Zustand**: Client state (auth, UI)
  - Persistent auth storage
  - UI preferences

### API Integration
- Axios HTTP client
- JWT token injection
- Automatic token refresh
- Error handling interceptors
- Request/response logging (dev mode)

## Technical Highlights

### Performance
- Code splitting by route
- Lazy loading components
- Optimized bundle size (~403 KB)
- Gzipped assets (~125 KB)

### Development Experience
- Hot Module Replacement (HMR)
- Fast builds with Vite 6
- ESLint for code quality
- Prettier for formatting
- JSDoc for type safety

### Security
- JWT-based authentication
- Role-based authorization
- Protected routes
- CSRF protection ready
- XSS prevention

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Screen reader compatible

---

**Ready for Production**: The application is fully functional and ready to be connected to the NeWoFlow backend API. See `API_INTEGRATION.md` for integration details.
