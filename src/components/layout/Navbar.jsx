import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ROLE_COLORS } from '@/lib/constants';

export const Navbar = () => {
  const { logout } = useAuth();
  const { user, role } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  return (
    <nav className="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-40">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/dashboard" className="text-xl font-bold text-primary">
            NeWoFlow
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {role && (
            <Badge className={ROLE_COLORS[role]}>
              {role.toUpperCase()}
            </Badge>
          )}
          {user && (
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
