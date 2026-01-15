import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileIcon, VideoIcon, Pencil1Icon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { formatBytes, formatDate } from '@/lib/utils';
import { STATE_COLORS } from '@/lib/constants';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';

export const MediaCard = ({ item }) => {
  const { hasPermission } = usePermissions();

  const getFileIcon = () => {
    if (item.fileType?.startsWith('audio')) {
      return <FileIcon className="h-10 w-10 text-blue-500" />;
    }
    if (item.fileType?.startsWith('video')) {
      return <VideoIcon className="h-10 w-10 text-purple-500" />;
    }
    return <FileIcon className="h-10 w-10 text-gray-400" />;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getFileIcon()}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{item.fileName}</h3>
              <p className="text-sm text-gray-500 truncate">{item.filePath}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <Badge className={STATE_COLORS[item.state]} variant="secondary">
              {item.state}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Size:</span>
            <span>{formatBytes(item.fileSize)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Type:</span>
            <span>{item.fileType}</span>
          </div>
          {item.catalogTitle && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Catalog:</span>
              <span className="truncate max-w-[150px]">{item.catalogTitle}</span>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500">
          <p>Created: {formatDate(item.createdAt)}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Link to={`/media/${item.id}`}>
          <Button variant="outline" size="sm">
            <EyeOpenIcon className="h-4 w-4 mr-1" />
            View
          </Button>
        </Link>
        {hasPermission('MEDIA_EDIT') && (
          <Button variant="outline" size="sm" disabled>
            <Pencil1Icon className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
