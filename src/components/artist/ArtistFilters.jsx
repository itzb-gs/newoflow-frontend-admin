import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const ArtistFilters = ({ filters, onFiltersChange }) => {
  const handleClearFilters = () => {
    onFiltersChange({ search: '' });
  };

  const hasActiveFilters = filters.search;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by artist name..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>
    </div>
  );
};
