import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTrack, useDeleteTrack } from '../hooks/useTrack';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil1Icon, TrashIcon, ArrowLeftIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

export const TrackDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { data: track, isLoading, error } = useTrack(id);
  const deleteMutation = useDeleteTrack();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/tracks');
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading track...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading track</p>
        <Link to="/tracks">
          <Button variant="outline" className="mt-4">
            Back to Tracks
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/tracks">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <MixerHorizontalIcon className="h-16 w-16 text-gray-400" />
            <div>
              <h1 className="text-3xl font-bold">{track.title}</h1>
              {track.artist_name && (
                <p className="text-gray-500 mt-1">
                  by{' '}
                  <Link
                    to={`/artists/${track.artist_id}`}
                    className="hover:underline text-blue-600"
                  >
                    {track.artist_name}
                  </Link>
                </p>
              )}
              {track.album_title && (
                <p className="text-gray-500">
                  from{' '}
                  <Link
                    to={`/albums/${track.album_id}`}
                    className="hover:underline text-blue-600"
                  >
                    {track.album_title}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {hasPermission('TRACK_EDIT') && (
            <Link to={`/tracks/${id}/edit`}>
              <Button>
                <Pencil1Icon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {hasPermission('TRACK_DELETE') && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Track</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this track? This action cannot be
                    undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {track.lyrics && (
            <Card>
              <CardHeader>
                <CardTitle>Lyrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-line">{track.lyrics}</p>
              </CardContent>
            </Card>
          )}

          {track.media_id && (
            <Card>
              <CardHeader>
                <CardTitle>Associated Media</CardTitle>
                <CardDescription>Linked media file</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  to={`/media/${track.media_id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Media File #{track.media_id}</h4>
                      <p className="text-sm text-gray-500">View media details</p>
                    </div>
                    <Badge variant="secondary">Linked</Badge>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {track.track_number && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Track Number</p>
                  <Badge>{track.track_number}</Badge>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-sm">{formatDuration(track.duration)}</p>
              </div>
              {track.created_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Added</p>
                  <p className="text-sm">{formatDate(track.created_at)}</p>
                </div>
              )}
              {track.updated_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-sm">{formatDate(track.updated_at)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relationships</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {track.artist_name && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Artist</p>
                  <Link
                    to={`/artists/${track.artist_id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {track.artist_name}
                  </Link>
                </div>
              )}
              {track.album_title && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Album</p>
                  <Link
                    to={`/albums/${track.album_id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {track.album_title}
                  </Link>
                </div>
              )}
              {track.media_id && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Media</p>
                  <Link
                    to={`/media/${track.media_id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Media File #{track.media_id}
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
