import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAlbum, useDeleteAlbum, useAlbumTracks } from '../hooks/useAlbum';
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
import { Pencil1Icon, TrashIcon, ArrowLeftIcon, FileIcon } from '@radix-ui/react-icons';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

export const AlbumDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { data: album, isLoading, error } = useAlbum(id);
  const { data: tracks } = useAlbumTracks(id);
  const deleteMutation = useDeleteAlbum();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/albums');
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading album...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading album</p>
        <Link to="/albums">
          <Button variant="outline" className="mt-4">
            Back to Albums
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/albums">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            {album.cover_url ? (
              <img
                src={album.cover_url}
                alt={album.title}
                className="h-16 w-16 rounded object-cover"
              />
            ) : (
              <FileIcon className="h-16 w-16 text-gray-400" />
            )}
            <div>
              <h1 className="text-3xl font-bold">{album.title}</h1>
              {album.artist_name && (
                <p className="text-gray-500 mt-1">
                  by{' '}
                  <Link
                    to={`/artists/${album.artist_id}`}
                    className="hover:underline text-blue-600"
                  >
                    {album.artist_name}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {hasPermission('ALBUM_EDIT') && (
            <Link to={`/albums/${id}/edit`}>
              <Button>
                <Pencil1Icon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {hasPermission('ALBUM_DELETE') && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Album</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this album? This action cannot be
                    undone and will also remove all associated tracks.
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
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              {album.description ? (
                <p className="text-gray-600 whitespace-pre-line">{album.description}</p>
              ) : (
                <p className="text-gray-400 italic">No description available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tracks</CardTitle>
              <CardDescription>
                {tracks?.length || 0} track{tracks?.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tracks && tracks.length > 0 ? (
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <Link
                      key={track.id}
                      to={`/tracks/${track.id}`}
                      className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {track.track_number && (
                            <span className="text-gray-400 font-medium w-8">
                              {track.track_number}
                            </span>
                          )}
                          <div>
                            <h4 className="font-semibold">{track.title}</h4>
                            {track.duration && (
                              <p className="text-sm text-gray-500">
                                {Math.floor(track.duration / 60)}:
                                {String(track.duration % 60).padStart(2, '0')}
                              </p>
                            )}
                          </div>
                        </div>
                        {track.media_id && (
                          <Badge variant="secondary">Has Media</Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 italic mb-4">No tracks yet</p>
                  {hasPermission('TRACK_CREATE') && (
                    <Link to={`/tracks/new?album=${id}`}>
                      <Button size="sm">Add Track</Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {album.genre && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Genre</p>
                  <Badge>{album.genre}</Badge>
                </div>
              )}
              {album.release_date && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Release Date</p>
                  <p className="text-sm">{formatDate(album.release_date)}</p>
                </div>
              )}
              {album.created_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Added</p>
                  <p className="text-sm">{formatDate(album.created_at)}</p>
                </div>
              )}
              {album.updated_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-sm">{formatDate(album.updated_at)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Tracks</p>
                <p className="text-2xl font-bold">{tracks?.length || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Duration</p>
                <p className="text-2xl font-bold">
                  {tracks?.reduce((sum, track) => sum + (track.duration || 0), 0) || 0}s
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
