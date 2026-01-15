import { NavLink } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import { usePermissions } from '@/features/auth/hooks/usePermissions';
import { PERMISSIONS } from '@/lib/permissions';
import {
  LayoutDashboard,
  FolderOpen,
  FileMusic,
  Plug,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    permission: null,
  },
  {
    name: 'Catalog',
    path: '/catalog',
    icon: FolderOpen,
    permission: PERMISSIONS.CATALOG_VIEW,
  },
  {
    name: 'Media',
    path: '/media',
    icon: FileMusic,
    permission: PERMISSIONS.MEDIA_VIEW,
  },
  {
    name: 'Upload',
    path: '/media/upload',
    icon: Upload,
    permission: PERMISSIONS.MEDIA_UPLOAD,
  },
  {
    name: 'Plugins',
    path: '/plugins',
    icon: Plug,
    permission: PERMISSIONS.PLUGIN_VIEW,
  },
];

export const Sidebar = () => {
  const { sidebarOpen } = useUIStore();
  const { hasPermission } = usePermissions();

  const filteredNavItems = navItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

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
