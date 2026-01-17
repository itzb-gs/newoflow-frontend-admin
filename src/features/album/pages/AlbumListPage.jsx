import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAlbums } from '../hooks/useAlbum';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { AlbumCard } from '@/components/album/AlbumCard';
import { AlbumFilters } from '@/components/album/AlbumFilters';
import { Button } from '@/components/ui/button';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export const AlbumListPage = () => {
  const { hasPermission } = usePermissions();
  const { page, perPage, nextPage, prevPage } = usePagination(1, 12);
  const [filters, setFilters] = useState({ search: '', genre: undefined, artist_id: undefined });
  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = {
    skip: (page - 1) * perPage,
    limit: perPage,
    search: debouncedSearch,
    genre: filters.genre,
    artist_id: filters.artist_id,
  };

  const { data: albums, isLoading, error } = useAlbums(queryFilters);

  const totalItems = albums?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Albums</h1>
          <p className="text-gray-500 mt-1">Manage albums in your catalog</p>
        </div>
        {hasPermission('ALBUM_CREATE') && (
          <Link to="/albums/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Album
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <AlbumFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading albums...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading albums</p>
              <p className="text-sm text-gray-500 mt-2">
                {error.message || 'Failed to fetch albums'}
              </p>
            </div>
          ) : !albums || albums.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No albums found</p>
              {hasPermission('ALBUM_CREATE') && (
                <Link to="/albums/new">
                  <Button className="mt-4">Add your first album</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {albums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">
                    Showing page {page} of {totalPages}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevPage}
                      disabled={page === 1}
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextPage}
                      disabled={page >= totalPages}
                    >
                      Next
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
