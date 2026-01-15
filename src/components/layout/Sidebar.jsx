import { NavLink } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';
import {
  DashboardIcon,
  FileIcon,
  MixIcon,
  ComponentInstanceIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: DashboardIcon,
    permission: null,
  },
  {
    name: 'Catalog',
    path: '/catalog',
    icon: FileIcon,
    permission: 'CATALOG_VIEW',
  },
  {
    name: 'Media',
    path: '/media',
    icon: MixIcon,
    permission: 'MEDIA_VIEW',
  },
  {
    name: 'Upload',
    path: '/media/upload',
    icon: UploadIcon,
    permission: 'MEDIA_UPLOAD',
  },
  {
    name: 'Plugins',
    path: '/plugins',
    icon: ComponentInstanceIcon,
    permission: 'PLUGIN_VIEW',
  },
];

export const Sidebar = () => {
  const { sidebarOpen } = useUIStore();
  const { hasPermission, role } = usePermissions();

  // Show all items if no role is set (dev mode) or if user has permissions
  const filteredNavItems = navItems.filter((item) => {
    // No permission requirement means always show
    if (!item.permission) return true;
    // Otherwise check permission
    return hasPermission(item.permission);
  });

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
