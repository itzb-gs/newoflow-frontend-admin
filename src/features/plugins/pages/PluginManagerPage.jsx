import { useState } from 'react';
import { usePluginsList, useEnablePlugin, useDisablePlugin } from '../hooks/usePlugins';
import { useHookLogs, useRetryHook } from '../hooks/useHookLogs';
import { usePagination } from '@/hooks/usePagination';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ComponentInstanceIcon, LightningBoltIcon, CircleIcon, UpdateIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { formatDateTime } from '@/lib/utils';

const PluginCard = ({ plugin, onToggle, isToggling }) => {
  const isEnabled = plugin.enabled;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <ComponentInstanceIcon className="h-8 w-8 text-blue-500" />
            <div>
              <CardTitle>{plugin.name}</CardTitle>
              <CardDescription>{plugin.version}</CardDescription>
            </div>
          </div>
          <Badge variant={isEnabled ? 'default' : 'secondary'}>
            {isEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{plugin.description}</p>

        {plugin.hooks && plugin.hooks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Registered Hooks:</h4>
            <div className="flex flex-wrap gap-2">
              {plugin.hooks.map((hook) => (
                <Badge key={hook} variant="outline" className="text-xs">
                  {hook}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-gray-500">
            {plugin.lastExecuted && (
              <p>Last executed: {formatDateTime(plugin.lastExecuted)}</p>
            )}
          </div>
          <Button
            variant={isEnabled ? 'outline' : 'default'}
            size="sm"
            onClick={() => onToggle(plugin.id, isEnabled)}
            disabled={isToggling}
          >
            {isEnabled ? (
              <>
                <CircleIcon className="h-4 w-4 mr-2" />
                Disable
              </>
            ) : (
              <>
                <LightningBoltIcon className="h-4 w-4 mr-2" />
                Enable
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const HookLogViewer = () => {
  const { page, perPage, nextPage, prevPage } = usePagination(1, 20);
  const [statusFilter, setStatusFilter] = useState(undefined);

  const { data: logs, isLoading } = useHookLogs({
    page,
    perPage,
    status: statusFilter,
  });

  const retryMutation = useRetryHook();
  const totalPages = logs ? Math.ceil(logs.total / perPage) : 0;

  const handleRetry = async (logId) => {
    await retryMutation.mutateAsync(logId);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Hook Execution Logs</CardTitle>
            <CardDescription>Recent plugin hook executions</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={statusFilter === undefined ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter(undefined)}
            >
              All
            </Badge>
            <Badge
              variant={statusFilter === 'success' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('success')}
            >
              Success
            </Badge>
            <Badge
              variant={statusFilter === 'failed' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setStatusFilter('failed')}
            >
              Failed
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading logs...</p>
        ) : logs && logs.items?.length > 0 ? (
          <>
            <div className="space-y-3">
              {logs.items.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border rounded-lg space-y-2 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">{log.pluginName}</Badge>
                      <span className="text-sm font-medium">{log.hookName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={log.status === 'success' ? 'default' : 'destructive'}
                      >
                        {log.status}
                      </Badge>
                      {log.status === 'failed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRetry(log.id)}
                          disabled={retryMutation.isPending}
                        >
                          <UpdateIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Media ID: {log.mediaId}</span>
                    <span>{formatDateTime(log.executedAt)}</span>
                  </div>

                  {log.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                      <p className="text-xs font-mono text-red-800">{log.error}</p>
                    </div>
                  )}

                  {log.result && (
                    <div className="mt-2 p-2 bg-gray-50 border rounded">
                      <p className="text-xs font-mono text-gray-700">
                        {JSON.stringify(log.result, null, 2)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Showing {(page - 1) * perPage + 1} to{' '}
                  {Math.min(page * perPage, logs.total)} of {logs.total} logs
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={page === 1}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={page >= totalPages}
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">No logs found</p>
        )}
      </CardContent>
    </Card>
  );
};

export const PluginManagerPage = () => {
  const { data: plugins, isLoading } = usePluginsList();
  const enableMutation = useEnablePlugin();
  const disableMutation = useDisablePlugin();

  const handleToggle = async (pluginId, isEnabled) => {
    if (isEnabled) {
      await disableMutation.mutateAsync(pluginId);
    } else {
      await enableMutation.mutateAsync(pluginId);
    }
  };

  const isToggling = enableMutation.isPending || disableMutation.isPending;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Plugin Manager</h1>
        <p className="text-gray-500 mt-1">
          Manage plugins and view execution logs
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Installed Plugins</h2>
        {isLoading ? (
          <p className="text-gray-500">Loading plugins...</p>
        ) : plugins && plugins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plugins.map((plugin) => (
              <PluginCard
                key={plugin.id}
                plugin={plugin}
                onToggle={handleToggle}
                isToggling={isToggling}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No plugins installed</p>
            </CardContent>
          </Card>
        )}
      </div>

      <HookLogViewer />
    </div>
  );
};
