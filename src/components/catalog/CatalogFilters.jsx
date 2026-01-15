import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CONTENT_TYPES } from '@/lib/constants';
import { X } from 'lucide-react';

export const CatalogFilters = ({ filters, onFiltersChange }) => {
  const [tagInput, setTagInput] = useState('');

  const handleTypeToggle = (type) => {
    if (filters.type === type) {
      onFiltersChange({ ...filters, type: undefined });
    } else {
      onFiltersChange({ ...filters, type });
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !filters.tags?.includes(tagInput.trim())) {
      onFiltersChange({
        ...filters,
        tags: [...(filters.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    onFiltersChange({
      ...filters,
      tags: filters.tags?.filter((t) => t !== tag),
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({ search: '', type: undefined, tags: [] });
    setTagInput('');
  };

  const hasActiveFilters = filters.search || filters.type || filters.tags?.length > 0;

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
          placeholder="Search by title or description..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div>
        <Label>Content Type</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.values(CONTENT_TYPES).map((type) => (
            <Badge
              key={type}
              variant={filters.type === type ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleTypeToggle(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <form onSubmit={handleAddTag} className="flex space-x-2 mt-2">
          <Input
            id="tags"
            placeholder="Add tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <Button type="submit" size="sm">Add</Button>
        </form>
        {filters.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
