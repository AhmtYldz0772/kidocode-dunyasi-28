import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User, Moon, Sun, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  toggleTheme?: () => void;
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDark }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Yönetici';
      case 'team_leader': return 'Takım Lideri';
      case 'student': return 'Öğrenci';
      case 'teacher': return 'Öğretmen';
      default: return role;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              KidoCode Dünyası
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Tema Değiştirici */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-accent"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Dil Seçici */}
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Globe className="h-4 w-4" />
          </Button>

          {/* Kullanıcı Menüsü */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {user.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {getRoleDisplayName(user.role)}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profilim</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Ayarlar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Çıkış Yap</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;