import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  BookOpen,
  Trophy,
  User,
  Users,
  Settings,
  GraduationCap,
  BarChart3,
  FileText,
  MessageCircle
} from 'lucide-react';

const AppSidebar = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-accent/50";

  // Rol bazlı menü öğeleri
  const getMenuItems = () => {
    const baseItems = [
      { title: 'Ana Sayfa', url: '/', icon: Home }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { title: 'Kullanıcı Yönetimi', url: '/admin/users', icon: Users },
          { title: 'Kurs Yönetimi', url: '/admin/courses', icon: BookOpen },
          { title: 'Sistem Ayarları', url: '/admin/settings', icon: Settings },
          { title: 'Raporlar', url: '/admin/reports', icon: BarChart3 }
        ];

      case 'team_leader':
        return [
          ...baseItems,
          { title: 'Öğrenci Grupları', url: '/team-leader/groups', icon: Users },
          { title: 'Kurs Yönetimi', url: '/team-leader/courses', icon: BookOpen },
          { title: 'Öğrenci Yönetimi', url: '/team-leader/students', icon: Users },
          { title: 'Öğretmen Yönetimi', url: '/team-leader/teachers', icon: GraduationCap },
          { title: 'Performans', url: '/team-leader/performance', icon: BarChart3 }
        ];

      case 'student':
        return [
          ...baseItems,
          { title: 'Kurslarım', url: '/student/courses', icon: BookOpen },
          { title: 'Başarımlarım', url: '/student/achievements', icon: Trophy },
          { title: 'Liderlik Tablosu', url: '/student/leaderboard', icon: BarChart3 },
          { title: 'Profilim', url: '/student/profile', icon: User },
          { title: 'WhatsApp Grubu', url: '/student/whatsapp', icon: MessageCircle }
        ];

      case 'teacher':
        return [
          ...baseItems,
          { title: 'Gruplarım', url: '/teacher/groups', icon: Users },
          { title: 'Kurslarım', url: '/teacher/courses', icon: BookOpen },
          { title: 'Ödevler', url: '/teacher/assignments', icon: FileText },
          { title: 'Performans', url: '/teacher/performance', icon: BarChart3 },
          { title: 'Profilim', url: '/teacher/profile', icon: User }
        ];

      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar
      className={isCollapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {!isCollapsed && 'Ana Menü'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;