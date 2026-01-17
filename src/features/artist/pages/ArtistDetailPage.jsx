import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArtist, useDeleteArtist, useArtistAlbums } from '../hooks/useArtist';
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
import { Pencil1Icon, TrashIcon, ArrowLeftIcon, PersonIcon, GlobeIcon } from '@radix-ui/react-icons';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

export const ArtistDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { data: artist, isLoading, error } = useArtist(id);
  const { data: albums } = useArtistAlbums(id);
  const deleteMutation = useDeleteArtist();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/artists');
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading artist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading artist</p>
        <Link to="/artists">
          <Button variant="outline" className="mt-4">
            Back to Artists
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/artists">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            {artist.image_url ? (
              <img
                src={artist.image_url}
                alt={artist.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <PersonIcon className="h-16 w-16 text-gray-400" />
            )}
            <div>
              <h1 className="text-3xl font-bold">{artist.name}</h1>
              {artist.country && (
                <p className="text-gray-500 mt-1">{artist.country}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {hasPermission('ARTIST_EDIT') && (
            <Link to={`/artists/${id}/edit`}>
              <Button>
                <Pencil1Icon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {hasPermission('ARTIST_DELETE') && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Artist</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this artist? This action cannot be
                    undone and will also remove all associated albums and tracks.
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
              {artist.bio ? (
                <p className="text-gray-600 whitespace-pre-line">{artist.bio}</p>
              ) : (
                <p className="text-gray-400 italic">No biography available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Albums</CardTitle>
              <CardDescription>
                {albums?.length || 0} album{albums?.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {albums && albums.length > 0 ? (
                <div className="space-y-3">
                  {albums.map((album) => (
                    <Link
                      key={album.id}
                      to={`/albums/${album.id}`}
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{album.title}</h4>
                          {album.release_date && (
                            <p className="text-sm text-gray-500">
                              Released: {formatDate(album.release_date)}
                            </p>
                          )}
                        </div>
                        {album.track_count && (
                          <Badge variant="secondary">
                            {album.track_count} track{album.track_count !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No albums yet</p>
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
              {artist.website && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <GlobeIcon className="h-4 w-4 mr-1" />
                    {artist.website}
                  </a>
                </div>
              )}
              {artist.created_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Added</p>
                  <p className="text-sm">{formatDate(artist.created_at)}</p>
                </div>
              )}
              {artist.updated_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-sm">{formatDate(artist.updated_at)}</p>
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
                <p className="text-sm text-gray-500">Albums</p>
                <p className="text-2xl font-bold">{albums?.length || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Tracks</p>
                <p className="text-2xl font-bold">
                  {albums?.reduce((sum, album) => sum + (album.track_count || 0), 0) || 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
