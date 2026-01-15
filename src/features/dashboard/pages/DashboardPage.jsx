import { useDashboardStats, useRecentActivity } from '../hooks/useDashboardStats';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileIcon,
  MixIcon,
  UploadIcon,
  ComponentInstanceIcon,
  ActivityLogIcon,
} from '@radix-ui/react-icons';
import { formatDateTime } from '@/lib/utils';
import { STATE_COLORS } from '@/lib/constants';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

const QuickActions = () => {
  const { hasPermission } = usePermissions();

  const actions = [
    {
      name: 'Upload Media',
      path: '/media/upload',
      icon: UploadIcon,
      permission: 'MEDIA_UPLOAD',
    },
    {
      name: 'Create Catalog',
      path: '/catalog/new',
      icon: FileIcon,
      permission: 'CATALOG_CREATE',
    },
    {
      name: 'Manage Plugins',
      path: '/plugins',
      icon: ComponentInstanceIcon,
      permission: 'PLUGIN_MANAGE',
    },
  ];

  const filteredActions = actions.filter(
    (action) => !action.permission || hasPermission(action.permission)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredActions.map((action) => (
          <Link key={action.path} to={action.path}>
            <Button variant="outline" className="w-full justify-start">
              <action.icon className="h-4 w-4 mr-2" />
              {action.name}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

const RecentActivityFeed = () => {
  const { data: activities, isLoading } = useRecentActivity(10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest operations and events</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : activities && activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <ActivityLogIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm">{activity.message || activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {(activity.status || activity.state) && (
                      <Badge
                        className={STATE_COLORS[activity.status || activity.state]}
                        variant="secondary"
                      >
                        {activity.status || activity.state}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDateTime(activity.created_at || activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No recent activity</p>
        )}
      </CardContent>
    </Card>
  );
};

export const DashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome to NeWoFlow - Manage your media catalog
        </p>
      </div>

      {isLoading ? (
        <div>Loading statistics...</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Media"
              value={stats?.totalMedia || 0}
              icon={MixIcon}
              description="All media files"
            />
            <StatCard
              title="Catalog Items"
              value={stats?.totalCatalog || 0}
              icon={FileIcon}
              description="Organized content"
            />
            <StatCard
              title="Active Plugins"
              value={stats?.activePlugins || 0}
              icon={ComponentInstanceIcon}
              description="Running plugins"
            />
            <StatCard
              title="Failed Operations"
              value={stats?.failedOperations || 0}
              icon={ActivityLogIcon}
              description="Needs attention"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <RecentActivityFeed />
            <QuickActions />
          </div>
        </>
      )}
    </div>
  );
};
