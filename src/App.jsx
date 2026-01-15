import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { CatalogListPage } from '@/features/catalog/pages/CatalogListPage';
import { CatalogDetailPage } from '@/features/catalog/pages/CatalogDetailPage';
import { CatalogFormPage } from '@/features/catalog/pages/CatalogFormPage';
import { MediaListPage } from '@/features/media/pages/MediaListPage';
import { MediaDetailPage } from '@/features/media/pages/MediaDetailPage';
import { MediaUploadPage } from '@/features/media/pages/MediaUploadPage';
import { PluginManagerPage } from '@/features/plugins/pages/PluginManagerPage';
import { PERMISSIONS } from '@/lib/permissions';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
      <p className="text-xl text-gray-600">Unauthorized Access</p>
      <p className="text-gray-500 mt-2">
        You don&apos;t have permission to access this page.
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
                <ProtectedRoute requiredPermission="CATALOG_VIEW">
                  <CatalogListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalog/:id"
              element={
                <ProtectedRoute requiredPermission="CATALOG_VIEW">
                  <CatalogDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalog/new"
              element={
                <ProtectedRoute requiredPermission="CATALOG_CREATE">
                  <CatalogFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="catalog/:id/edit"
              element={
                <ProtectedRoute requiredPermission="CATALOG_EDIT">
                  <CatalogFormPage />
                </ProtectedRoute>
              }
            />

            {/* Media Routes */}
            <Route
              path="media"
              element={
                <ProtectedRoute requiredPermission="MEDIA_VIEW">
                  <MediaListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="media/upload"
              element={
                <ProtectedRoute requiredPermission="MEDIA_UPLOAD">
                  <MediaUploadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="media/:id"
              element={
                <ProtectedRoute requiredPermission="MEDIA_VIEW">
                  <MediaDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Plugin Routes */}
            <Route
              path="plugins"
              element={
                <ProtectedRoute requiredPermission="PLUGIN_VIEW">
                  <PluginManagerPage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
