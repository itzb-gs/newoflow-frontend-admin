import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { PERMISSIONS } from '@/lib/permissions';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Placeholder pages (to be implemented)
const CatalogListPage = () => <div>Catalog List Page (Coming Soon)</div>;
const CatalogDetailPage = () => <div>Catalog Detail Page (Coming Soon)</div>;
const CatalogFormPage = () => <div>Catalog Form Page (Coming Soon)</div>;
const MediaListPage = () => <div>Media List Page (Coming Soon)</div>;
const MediaDetailPage = () => <div>Media Detail Page (Coming Soon)</div>;
const MediaUploadPage = () => <div>Media Upload Page (Coming Soon)</div>;
const PluginManagerPage = () => <div>Plugin Manager Page (Coming Soon)</div>;
const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
      <p className="text-xl text-gray-600">Unauthorized Access</p>
      <p className="text-gray-500 mt-2">
        You don't have permission to access this page.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Catalog Routes */}
            <Route
              path="catalog"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.CATALOG_VIEW}>
                  <CatalogListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalog/:id"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.CATALOG_VIEW}>
                  <CatalogDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalog/new"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.CATALOG_CREATE}>
                  <CatalogFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalog/:id/edit"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.CATALOG_EDIT}>
                  <CatalogFormPage />
                </ProtectedRoute>
              }
            />

            {/* Media Routes */}
            <Route
              path="media"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.MEDIA_VIEW}>
                  <MediaListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="media/upload"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.MEDIA_UPLOAD}>
                  <MediaUploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="media/:id"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.MEDIA_VIEW}>
                  <MediaDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Plugin Routes */}
            <Route
              path="plugins"
              element={
                <ProtectedRoute requiredPermission={PERMISSIONS.PLUGIN_VIEW}>
                  <PluginManagerPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
