import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAlbum, useCreateAlbum, useUpdateAlbum } from '../hooks/useAlbum';
import { useArtists } from '@/features/artist/hooks/useArtist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { MUSIC_GENRES } from '@/lib/constants';

export const AlbumFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: existingAlbum, isLoading: loadingAlbum } = useAlbum(id);
  const { data: artists } = useArtists({ limit: 100 });
  const createMutation = useCreateAlbum();
  const updateMutation = useUpdateAlbum();

  const [formData, setFormData] = useState({
    title: '',
    artist_id: '',
    release_date: '',
    description: '',
    cover_url: '',
    genre: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingAlbum && isEdit) {
      setFormData({
        title: existingAlbum.title || '',
        artist_id: existingAlbum.artist_id || '',
        release_date: existingAlbum.release_date || '',
        description: existingAlbum.description || '',
        cover_url: existingAlbum.cover_url || '',
        genre: existingAlbum.genre || '',
      });
    }
  }, [existingAlbum, isEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Album title is required';
    }

    if (!formData.artist_id) {
      newErrors.artist_id = 'Artist is required';
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
      const submitData = {
        ...formData,
        artist_id: parseInt(formData.artist_id),
      };

      if (isEdit) {
        await updateMutation.mutateAsync({ id, data: submitData });
        navigate(`/albums/${id}`);
      } else {
        const result = await createMutation.mutateAsync(submitData);
        navigate(`/albums/${result.id}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isEdit && loadingAlbum) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading album...</p>
      </div>
    );
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link to={isEdit ? `/albums/${id}` : '/albums'}>
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Album' : 'Add Album'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? 'Update album information' : 'Add a new album to your catalog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Album Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">
                Album Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter album title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="artist_id">
                Artist <span className="text-red-500">*</span>
              </Label>
              <select
                id="artist_id"
                value={formData.artist_id}
                onChange={(e) =>
                  setFormData({ ...formData, artist_id: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.artist_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select an artist</option>
                {artists?.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
              {errors.artist_id && (
                <p className="text-sm text-red-500 mt-1">{errors.artist_id}</p>
              )}
            </div>

            <div>
              <Label htmlFor="release_date">Release Date</Label>
              <Input
                id="release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) =>
                  setFormData({ ...formData, release_date: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {MUSIC_GENRES.map((genre) => (
                  <Badge
                    key={genre}
                    variant={formData.genre === genre ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setFormData({ ...formData, genre })}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter album description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="cover_url">Cover Image URL</Label>
              <Input
                id="cover_url"
                type="url"
                value={formData.cover_url}
                onChange={(e) =>
                  setFormData({ ...formData, cover_url: e.target.value })
                }
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Link to={isEdit ? `/albums/${id}` : '/albums'}>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Album'
                  : 'Add Album'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
