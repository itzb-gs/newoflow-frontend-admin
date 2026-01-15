import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderOpen, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';

export const CatalogCard = ({ item }) => {
  const { hasPermission } = usePermissions();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FolderOpen className="h-10 w-10 text-gray-400" />
            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.type}</p>
            </div>
          </div>
          <Badge variant="secondary">{item.type}</Badge>
        </div>

        {item.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags?.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>Media Count: {item.mediaCount || 0}</p>
          <p>Created: {formatDate(item.createdAt)}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Link to={`/catalog/${item.id}`}>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
        </Link>
        {hasPermission(PERMISSIONS.CATALOG_EDIT) && (
          <Link to={`/catalog/${item.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
