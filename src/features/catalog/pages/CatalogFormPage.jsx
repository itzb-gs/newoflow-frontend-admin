import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCatalogItem, useCreateCatalog, useUpdateCatalog } from '../hooks/useCatalog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, X } from 'lucide-react';
import { CONTENT_TYPES } from '@/lib/constants';

export const CatalogFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: existingItem, isLoading: loadingItem } = useCatalogItem(id);
  const createMutation = useCreateCatalog();
  const updateMutation = useUpdateCatalog();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: CONTENT_TYPES.MUSIC,
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingItem && isEdit) {
      setFormData({
        title: existingItem.title || '',
        description: existingItem.description || '',
        type: existingItem.type || CONTENT_TYPES.MUSIC,
        tags: existingItem.tags || [],
      });
    }
  }, [existingItem, isEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id, data: formData });
        navigate(`/catalog/${id}`);
      } else {
        const result = await createMutation.mutateAsync(formData);
        navigate(`/catalog/${result.id}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  if (isEdit && loadingItem) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading catalog item...</p>
      </div>
    );
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link to={isEdit ? `/catalog/${id}` : '/catalog'}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Catalog Item' : 'Create Catalog Item'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? 'Update catalog item details' : 'Add a new item to your catalog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Catalog Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter catalog title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter catalog description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label>
                Content Type <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.values(CONTENT_TYPES).map((type) => (
                  <Badge
                    key={type}
                    variant={formData.type === type ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, type })}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
              {errors.type && (
                <p className="text-sm text-red-500 mt-1">{errors.type}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tags">Tags</Label>
              <form onSubmit={handleAddTag} className="flex space-x-2 mt-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                />
                <Button type="submit" variant="outline">
                  Add
                </Button>
              </form>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
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

            <div className="flex justify-end space-x-3 pt-4">
              <Link to={isEdit ? `/catalog/${id}` : '/catalog'}>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Catalog'
                  : 'Create Catalog'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
