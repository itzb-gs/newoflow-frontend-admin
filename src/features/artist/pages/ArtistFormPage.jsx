import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArtist, useCreateArtist, useUpdateArtist } from '../hooks/useArtist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export const ArtistFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: existingArtist, isLoading: loadingArtist } = useArtist(id);
  const createMutation = useCreateArtist();
  const updateMutation = useUpdateArtist();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    country: '',
    image_url: '',
    website: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingArtist && isEdit) {
      setFormData({
        name: existingArtist.name || '',
        bio: existingArtist.bio || '',
        country: existingArtist.country || '',
        image_url: existingArtist.image_url || '',
        website: existingArtist.website || '',
      });
    }
  }, [existingArtist, isEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Artist name is required';
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
        navigate(`/artists/${id}`);
      } else {
        const result = await createMutation.mutateAsync(formData);
        navigate(`/artists/${result.id}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isEdit && loadingArtist) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading artist...</p>
      </div>
    );
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link to={isEdit ? `/artists/${id}` : '/artists'}>
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Artist' : 'Add Artist'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? 'Update artist information' : 'Add a new artist to your catalog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Artist Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name">
                Artist Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter artist name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                placeholder="Enter country"
              />
            </div>

            <div>
              <Label htmlFor="bio">Biography</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Enter artist biography"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Link to={isEdit ? `/artists/${id}` : '/artists'}>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Artist'
                  : 'Add Artist'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
