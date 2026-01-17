import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useTrack, useCreateTrack, useUpdateTrack } from '../hooks/useTrack';
import { useAlbums } from '@/features/album/hooks/useAlbum';
import { useArtists } from '@/features/artist/hooks/useArtist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export const TrackFormPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: existingTrack, isLoading: loadingTrack } = useTrack(id);
  const { data: albums } = useAlbums({ limit: 100 });
  const { data: artists } = useArtists({ limit: 100 });
  const createMutation = useCreateTrack();
  const updateMutation = useUpdateTrack();

  const [formData, setFormData] = useState({
    title: '',
    album_id: searchParams.get('album') || '',
    artist_id: '',
    track_number: '',
    duration: '',
    lyrics: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingTrack && isEdit) {
      setFormData({
        title: existingTrack.title || '',
        album_id: existingTrack.album_id || '',
        artist_id: existingTrack.artist_id || '',
        track_number: existingTrack.track_number || '',
        duration: existingTrack.duration || '',
        lyrics: existingTrack.lyrics || '',
      });
    }
  }, [existingTrack, isEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Track title is required';
    }

    if (!formData.album_id) {
      newErrors.album_id = 'Album is required';
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
        title: formData.title,
        album_id: parseInt(formData.album_id),
        artist_id: parseInt(formData.artist_id),
        track_number: formData.track_number ? parseInt(formData.track_number) : undefined,
        duration: formData.duration ? parseInt(formData.duration) : undefined,
        lyrics: formData.lyrics || undefined,
      };

      if (isEdit) {
        await updateMutation.mutateAsync({ id, data: submitData });
        navigate(`/tracks/${id}`);
      } else {
        const result = await createMutation.mutateAsync(submitData);
        navigate(`/tracks/${result.id}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (isEdit && loadingTrack) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading track...</p>
      </div>
    );
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link to={isEdit ? `/tracks/${id}` : '/tracks'}>
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Track' : 'Add Track'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? 'Update track information' : 'Add a new track to your catalog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Track Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">
                Track Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter track title"
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
              <Label htmlFor="album_id">
                Album <span className="text-red-500">*</span>
              </Label>
              <select
                id="album_id"
                value={formData.album_id}
                onChange={(e) =>
                  setFormData({ ...formData, album_id: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.album_id ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select an album</option>
                {albums?.map((album) => (
                  <option key={album.id} value={album.id}>
                    {album.title}
                  </option>
                ))}
              </select>
              {errors.album_id && (
                <p className="text-sm text-red-500 mt-1">{errors.album_id}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="track_number">Track Number</Label>
                <Input
                  id="track_number"
                  type="number"
                  min="1"
                  value={formData.track_number}
                  onChange={(e) =>
                    setFormData({ ...formData, track_number: e.target.value })
                  }
                  placeholder="1"
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="180"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="lyrics">Lyrics</Label>
              <textarea
                id="lyrics"
                value={formData.lyrics}
                onChange={(e) =>
                  setFormData({ ...formData, lyrics: e.target.value })
                }
                placeholder="Enter track lyrics (optional)"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Link to={isEdit ? `/tracks/${id}` : '/tracks'}>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Track'
                  : 'Add Track'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
