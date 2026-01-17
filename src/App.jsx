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
import { ArtistListPage } from '@/features/artist/pages/ArtistListPage';
import { ArtistDetailPage } from '@/features/artist/pages/ArtistDetailPage';
import { ArtistFormPage } from '@/features/artist/pages/ArtistFormPage';
import { AlbumListPage } from '@/features/album/pages/AlbumListPage';
import { AlbumDetailPage } from '@/features/album/pages/AlbumDetailPage';
import { AlbumFormPage } from '@/features/album/pages/AlbumFormPage';
import { TrackListPage } from '@/features/track/pages/TrackListPage';
import { TrackDetailPage } from '@/features/track/pages/TrackDetailPage';
import { TrackFormPage } from '@/features/track/pages/TrackFormPage';
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

            {/* Artist Routes */}
            <Route
              path="artists"
              element={
                <ProtectedRoute requiredPermission="ARTIST_VIEW">
                  <ArtistListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="artists/new"
              element={
                <ProtectedRoute requiredPermission="ARTIST_CREATE">
                  <ArtistFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="artists/:id"
              element={
                <ProtectedRoute requiredPermission="ARTIST_VIEW">
                  <ArtistDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="artists/:id/edit"
              element={
                <ProtectedRoute requiredPermission="ARTIST_EDIT">
                  <ArtistFormPage />
                </ProtectedRoute>
              }
            />

            {/* Album Routes */}
            <Route
              path="albums"
              element={
                <ProtectedRoute requiredPermission="ALBUM_VIEW">
                  <AlbumListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="albums/new"
              element={
                <ProtectedRoute requiredPermission="ALBUM_CREATE">
                  <AlbumFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="albums/:id"
              element={
                <ProtectedRoute requiredPermission="ALBUM_VIEW">
                  <AlbumDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="albums/:id/edit"
              element={
                <ProtectedRoute requiredPermission="ALBUM_EDIT">
                  <AlbumFormPage />
                </ProtectedRoute>
              }
            />

            {/* Track Routes */}
            <Route
              path="tracks"
              element={
                <ProtectedRoute requiredPermission="TRACK_VIEW">
                  <TrackListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="tracks/new"
              element={
                <ProtectedRoute requiredPermission="TRACK_CREATE">
                  <TrackFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="tracks/:id"
              element={
                <ProtectedRoute requiredPermission="TRACK_VIEW">
                  <TrackDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="tracks/:id/edit"
              element={
                <ProtectedRoute requiredPermission="TRACK_EDIT">
                  <TrackFormPage />
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
