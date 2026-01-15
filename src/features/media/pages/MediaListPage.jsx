import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaList } from '../hooks/useMedia';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';
import { usePagination } from '@/hooks/usePagination';
import { MediaCard } from '@/components/media/MediaCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { UploadIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { LIFECYCLE_STATES, FILE_TYPES } from '@/lib/constants';

export const MediaListPage = () => {
  const { hasPermission } = usePermissions();
  const { page, perPage, nextPage, prevPage } = usePagination(1, 12);
  const [filters, setFilters] = useState({ state: undefined, type: undefined });

  const queryFilters = {
    page,
    perPage,
    state: filters.state,
    type: filters.type,
  };

  const { data, isLoading, error } = useMediaList(queryFilters);

  const totalPages = data ? Math.ceil(data.total / perPage) : 0;

  const handleStateFilter = (state) => {
    setFilters((prev) => ({
      ...prev,
      state: prev.state === state ? undefined : state,
    }));
  };

  const handleTypeFilter = (type) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type === type ? undefined : type,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ state: undefined, type: undefined });
  };

  const hasActiveFilters = filters.state || filters.type;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Files</h1>
          <p className="text-gray-500 mt-1">Manage your media library</p>
        </div>
        {hasPermission('MEDIA_UPLOAD') && (
          <Link to="/media/upload">
            <Button>
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-4 p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Clear
                </Button>
              )}
            </div>

            <div>
              <Label>Lifecycle State</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.values(LIFECYCLE_STATES).map((state) => (
                  <Badge
                    key={state}
                    variant={filters.state === state ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleStateFilter(state)}
                  >
                    {state}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>File Type</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.values(FILE_TYPES).map((type) => (
                  <Badge
                    key={type}
                    variant={filters.type === type ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleTypeFilter(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading media files...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading media files</p>
            </div>
          ) : data?.items?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No media files found</p>
              {hasPermission('MEDIA_UPLOAD') && (
                <Link to="/media/upload">
                  <Button className="mt-4">Upload your first media file</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {data?.items?.map((item) => (
                  <MediaCard key={item.id} item={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">
                    Showing {(page - 1) * perPage + 1} to{' '}
                    {Math.min(page * perPage, data.total)} of {data.total} items
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
                    <span className="text-sm">
                      Page {page} of {totalPages}
                    </span>
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
