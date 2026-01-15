import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatalogList } from '../hooks/useCatalog';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';
import { usePagination } from '@/hooks/usePagination';
import { useDebounce } from '@/hooks/useDebounce';
import { CatalogCard } from '@/components/catalog/CatalogCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { Button } from '@/components/ui/button';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export const CatalogListPage = () => {
  const { hasPermission } = usePermissions();
  const { page, perPage, nextPage, prevPage } = usePagination(1, 12);
  const [filters, setFilters] = useState({ search: '', type: undefined, tags: [] });
  const debouncedSearch = useDebounce(filters.search, 500);

  const queryFilters = {
    page,
    perPage,
    search: debouncedSearch,
    type: filters.type,
    tags: filters.tags,
  };

  const { data, isLoading, error } = useCatalogList(queryFilters);

  const totalPages = data ? Math.ceil(data.total / perPage) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Catalog</h1>
          <p className="text-gray-500 mt-1">Manage your content catalog</p>
        </div>
        {hasPermission('CATALOG_CREATE') && (
          <Link to="/catalog/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Catalog
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <CatalogFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading catalog items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading catalog items</p>
            </div>
          ) : data?.items?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No catalog items found</p>
              {hasPermission('CATALOG_CREATE') && (
                <Link to="/catalog/new">
                  <Button className="mt-4">Create your first catalog item</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {data?.items?.map((item) => (
                  <CatalogCard key={item.id} item={item} />
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
