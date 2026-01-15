import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCatalogItem, useDeleteCatalog } from '../hooks/useCatalog';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';
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

export const CatalogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { data: item, isLoading, error } = useCatalogItem(id);
  const deleteMutation = useDeleteCatalog();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/catalog');
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading catalog item...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading catalog item</p>
        <Link to="/catalog">
          <Button variant="outline" className="mt-4">
            Back to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/catalog">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <p className="text-gray-500 mt-1">{item.type}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          {hasPermission('CATALOG_EDIT') && (
            <Link to={`/catalog/${id}/edit`}>
              <Button>
                <Pencil1Icon className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
          {hasPermission('CATALOG_DELETE') && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Catalog Item</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this catalog item? This action cannot be
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
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1">{item.description || 'No description provided'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags?.length > 0 ? (
                    item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No tags</p>
                  )}
                </div>
              </div>

              {item.metadata && Object.keys(item.metadata).length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Metadata</h3>
                  <div className="mt-2 space-y-2">
                    {Object.entries(item.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium">{key}:</span>
                        <span className="text-gray-600">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Associated Media</CardTitle>
              <CardDescription>{item.mediaCount || 0} media files</CardDescription>
            </CardHeader>
            <CardContent>
              {item.media && item.media.length > 0 ? (
                <div className="space-y-2">
                  {item.media.map((media) => (
                    <Link
                      key={media.id}
                      to={`/media/${media.id}`}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center space-x-3">
                        <FileIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{media.fileName}</p>
                          <p className="text-xs text-gray-500">{media.filePath}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{media.state}</Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No associated media files</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Type</p>
                <Badge variant="secondary" className="mt-1">
                  {item.type}
                </Badge>
              </div>
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium mt-1">{formatDate(item.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium mt-1">{formatDate(item.updatedAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">Media Count</p>
                <p className="font-medium mt-1">{item.mediaCount || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
