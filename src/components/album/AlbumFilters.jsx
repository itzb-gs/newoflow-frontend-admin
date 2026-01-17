import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MUSIC_GENRES } from '@/lib/constants';

export const AlbumFilters = ({ filters, onFiltersChange }) => {
  const handleGenreToggle = (genre) => {
    if (filters.genre === genre) {
      onFiltersChange({ ...filters, genre: undefined });
    } else {
      onFiltersChange({ ...filters, genre });
    }
  };

  const handleClearFilters = () => {
    onFiltersChange({ search: '', genre: undefined, artist_id: undefined });
  };

  const hasActiveFilters = filters.search || filters.genre || filters.artist_id;

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
          placeholder="Search by album title..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div>
        <Label>Genre</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {MUSIC_GENRES.slice(0, 8).map((genre) => (
            <Badge
              key={genre}
              variant={filters.genre === genre ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleGenreToggle(genre)}
            >
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
