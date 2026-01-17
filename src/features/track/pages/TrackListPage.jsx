import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTracks } from '../hooks/useTrack';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { TrackCard } from '@/components/track/TrackCard';
import { TrackFilters } from '@/components/track/TrackFilters';
import { Button } from '@/components/ui/button';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export const TrackListPage = () => {
  const { hasPermission } = usePermissions();
  const { page, perPage, nextPage, prevPage } = usePagination(1, 12);
  const [filters, setFilters] = useState({ search: '', album_id: undefined, artist_id: undefined });
  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = {
    skip: (page - 1) * perPage,
    limit: perPage,
    search: debouncedSearch,
    album_id: filters.album_id,
    artist_id: filters.artist_id,
  };

  const { data: tracks, isLoading, error } = useTracks(queryFilters);

  const totalItems = tracks?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tracks</h1>
          <p className="text-gray-500 mt-1">Manage tracks in your catalog</p>
        </div>
        {hasPermission('TRACK_CREATE') && (
          <Link to="/tracks/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Track
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <TrackFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading tracks...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading tracks</p>
              <p className="text-sm text-gray-500 mt-2">
                {error.message || 'Failed to fetch tracks'}
              </p>
            </div>
          ) : !tracks || tracks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tracks found</p>
              {hasPermission('TRACK_CREATE') && (
                <Link to="/tracks/new">
                  <Button className="mt-4">Add your first track</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {tracks.map((track) => (
                  <TrackCard key={track.id} track={track} />
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
