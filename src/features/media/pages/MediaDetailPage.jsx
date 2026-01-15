import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMediaItem, useMediaLifecycle, useDeleteMedia } from '../hooks/useMedia';
import { useHookLogs } from '@/features/plugins/hooks/useHookLogs';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';
import { useState } from 'react';
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
import { LifecycleTimeline } from '@/components/media/LifecycleTimeline';
import { StateBadge } from '@/components/media/StateBadge';
import { ArrowLeft, Trash2, FileMusic, ExternalLink } from 'lucide-react';
import { formatBytes, formatDateTime } from '@/lib/utils';

export const MediaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const { data: item, isLoading, error } = useMediaItem(id);
  const { data: lifecycle } = useMediaLifecycle(id);
  const { data: hookLogs } = useHookLogs({ mediaId: id, page: 1, perPage: 10 });
  const deleteMutation = useDeleteMedia();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(id);
    navigate('/media');
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading media file...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading media file</p>
        <Link to="/media">
          <Button variant="outline" className="mt-4">
            Back to Media
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/media">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <FileMusic className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold">{item.fileName}</h1>
              <p className="text-gray-500 mt-1">{item.filePath}</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {hasPermission(PERMISSIONS.MEDIA_DELETE) && (
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Media File</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this media file? This action cannot be
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
              <CardTitle>File Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <StateBadge state={item.state} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">File Size</p>
                  <p className="font-medium">{formatBytes(item.fileSize)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">File Type</p>
                  <p className="font-medium">{item.fileType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Checksum</p>
                  <p className="font-mono text-xs truncate">{item.checksum}</p>
                </div>
              </div>

              {item.metadata && Object.keys(item.metadata).length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Metadata</h3>
                  <div className="space-y-2">
                    {Object.entries(item.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-medium">{key}:</span>
                        <span className="text-gray-600 truncate max-w-xs">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {item.catalogId && (
            <Card>
              <CardHeader>
                <CardTitle>Associated Catalog</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  to={`/catalog/${item.catalogId}`}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{item.catalogTitle}</p>
                    <p className="text-sm text-gray-500">{item.catalogType}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </Link>
              </CardContent>
            </Card>
          )}

          <LifecycleTimeline events={lifecycle} />

          {hookLogs && hookLogs.items?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Hook Execution Logs</CardTitle>
                <CardDescription>Recent plugin hook executions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {hookLogs.items.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 border rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{log.pluginName}</span>
                        <Badge
                          variant={log.status === 'success' ? 'default' : 'destructive'}
                        >
                          {log.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        {log.hookName} - {formatDateTime(log.executedAt)}
                      </p>
                      {log.error && (
                        <p className="text-xs text-red-600 font-mono bg-red-50 p-2 rounded">
                          {log.error}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium mt-1">{formatDateTime(item.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p className="font-medium mt-1">{formatDateTime(item.updatedAt)}</p>
              </div>
              <div>
                <p className="text-gray-500">File Path</p>
                <p className="font-mono text-xs break-all mt-1">{item.filePath}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
