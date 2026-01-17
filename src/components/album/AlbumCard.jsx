import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileIcon, Pencil1Icon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { usePermissions } from '@/features/auth/hooks/usePermissions';

export const AlbumCard = ({ album }) => {
  const { hasPermission } = usePermissions();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {album.cover_url ? (
              <img
                src={album.cover_url}
                alt={album.title}
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <FileIcon className="h-12 w-12 text-gray-400" />
            )}
            <div>
              <h3 className="font-semibold text-lg">{album.title}</h3>
              {album.artist_name && (
                <p className="text-sm text-gray-500">{album.artist_name}</p>
              )}
            </div>
          </div>
          {album.genre && (
            <Badge variant="secondary">{album.genre}</Badge>
          )}
        </div>

        {album.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {album.description}
          </p>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>Tracks: {album.track_count || 0}</p>
          {album.release_date && (
            <p>Released: {formatDate(album.release_date)}</p>
          )}
          {album.created_at && <p>Added: {formatDate(album.created_at)}</p>}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Link to={`/albums/${album.id}`}>
          <Button variant="outline" size="sm">
            <EyeOpenIcon className="h-4 w-4 mr-1" />
            View
          </Button>
        </Link>
        {hasPermission('ALBUM_EDIT') && (
          <Link to={`/albums/${album.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil1Icon className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
