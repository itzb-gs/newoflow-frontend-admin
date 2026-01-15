import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime } from '@/lib/utils';
import { StateBadge } from './StateBadge';
import { CheckCircledIcon, CircleIcon } from '@radix-ui/react-icons';

export const LifecycleTimeline = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lifecycle Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No lifecycle events recorded</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lifecycle Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                {event.state === 'organized' || event.state === 'ingested' ? (
                  <CheckCircledIcon className="h-5 w-5 text-green-500" />
                ) : event.state === 'error' ? (
                  <CircleIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <CircleIcon className="h-5 w-5 text-gray-400" />
                )}
                {index < events.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                )}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <StateBadge state={event.state} />
                  <span className="text-xs text-gray-500">
                    {formatDateTime(event.timestamp)}
                  </span>
                </div>
                {event.message && (
                  <p className="text-sm text-gray-600 mt-1">{event.message}</p>
                )}
                {event.metadata && (
                  <div className="text-xs text-gray-500 mt-2 space-y-1">
                    {Object.entries(event.metadata).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span> {String(value)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
