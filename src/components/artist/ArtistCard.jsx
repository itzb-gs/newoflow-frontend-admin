import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PersonIcon, Pencil1Icon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { usePermissions } from '@/features/auth/hooks/usePermissions';

export const ArtistCard = ({ artist }) => {
  const { hasPermission } = usePermissions();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {artist.image_url ? (
              <img
                src={artist.image_url}
                alt={artist.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <PersonIcon className="h-12 w-12 text-gray-400" />
            )}
            <div>
              <h3 className="font-semibold text-lg">{artist.name}</h3>
              {artist.country && (
                <p className="text-sm text-gray-500">{artist.country}</p>
              )}
            </div>
          </div>
        </div>

        {artist.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {artist.bio}
          </p>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>Albums: {artist.album_count || 0}</p>
          {artist.created_at && <p>Added: {formatDate(artist.created_at)}</p>}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Link to={`/artists/${artist.id}`}>
          <Button variant="outline" size="sm">
            <EyeOpenIcon className="h-4 w-4 mr-1" />
            View
          </Button>
        </Link>
        {hasPermission('ARTIST_EDIT') && (
          <Link to={`/artists/${artist.id}/edit`}>
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
