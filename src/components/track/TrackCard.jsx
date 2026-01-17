import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MixerHorizontalIcon, Pencil1Icon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { usePermissions } from '@/features/auth/hooks/usePermissions';

export const TrackCard = ({ track }) => {
  const { hasPermission } = usePermissions();

  const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <MixerHorizontalIcon className="h-10 w-10 text-gray-400" />
            <div>
              <h3 className="font-semibold text-lg">{track.title}</h3>
              {track.artist_name && (
                <p className="text-sm text-gray-500">{track.artist_name}</p>
              )}
            </div>
          </div>
          {track.track_number && (
            <Badge variant="outline">#{track.track_number}</Badge>
          )}
        </div>

        {track.album_title && (
          <p className="text-sm text-gray-600 mb-2">
            Album:{' '}
            <Link to={`/albums/${track.album_id}`} className="hover:underline text-blue-600">
              {track.album_title}
            </Link>
          </p>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>Duration: {formatDuration(track.duration)}</p>
          {track.media_id && (
            <Badge variant="secondary" className="text-xs">
              Has Media
            </Badge>
          )}
          {track.created_at && <p>Added: {formatDate(track.created_at)}</p>}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Link to={`/tracks/${track.id}`}>
          <Button variant="outline" size="sm">
            <EyeOpenIcon className="h-4 w-4 mr-1" />
            View
          </Button>
        </Link>
        {hasPermission('TRACK_EDIT') && (
          <Link to={`/tracks/${track.id}/edit`}>
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
