import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtists } from '../hooks/useArtist';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { ArtistCard } from '@/components/artist/ArtistCard';
import { ArtistFilters } from '@/components/artist/ArtistFilters';
import { Button } from '@/components/ui/button';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export const ArtistListPage = () => {
  const { hasPermission } = usePermissions();
  const { page, perPage, nextPage, prevPage, setPage } = usePagination(1, 12);
  const [filters, setFilters] = useState({ search: '' });
  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = {
    skip: (page - 1) * perPage,
    limit: perPage,
    search: debouncedSearch,
  };

  const { data: artists, isLoading, error } = useArtists(queryFilters);

  // Calculate total pages - adjust based on actual API response structure
  const totalItems = artists?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Artists</h1>
          <p className="text-gray-500 mt-1">Manage artists in your catalog</p>
        </div>
        {hasPermission('ARTIST_CREATE') && (
          <Link to="/artists/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Artist
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ArtistFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading artists...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading artists</p>
              <p className="text-sm text-gray-500 mt-2">
                {error.message || 'Failed to fetch artists'}
              </p>
            </div>
          ) : !artists || artists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No artists found</p>
              {hasPermission('ARTIST_CREATE') && (
                <Link to="/artists/new">
                  <Button className="mt-4">Add your first artist</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {artists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
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
