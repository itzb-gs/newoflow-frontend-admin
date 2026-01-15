import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';

export const useCatalogFilters = () => {
  const [type, setType] = useState('');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const pagination = usePagination();

  const filters = {
    type: type || undefined,
    search: debouncedSearch || undefined,
    tags: tags.length > 0 ? tags : undefined,
    page: pagination.page,
    perPage: pagination.perPage,
  };

  const resetFilters = () => {
    setType('');
    setSearch('');
    setTags([]);
    pagination.reset();
  };

  return {
    filters,
    type,
    setType,
    search,
    setSearch,
    tags,
    setTags,
    pagination,
    resetFilters,
  };
};
