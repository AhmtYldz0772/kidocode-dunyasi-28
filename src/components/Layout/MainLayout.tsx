import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Tema tercihini localStorage'dan kontrol et
    const savedTheme = localStorage.getItem('kidocode_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kidocode_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kidocode_theme', 'light');
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <Header toggleTheme={toggleTheme} isDark={isDark} />
          
          <div className="flex items-center p-4 border-b">
            <SidebarTrigger className="-ml-1" />
          </div>
          
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;