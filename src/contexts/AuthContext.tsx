import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'team_leader' | 'student' | 'teacher';

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  classId?: string;
  enrolledCourses?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo kullanıcıları
const demoUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    fullName: 'Sistem Yöneticisi',
    email: 'admin@kidocode.com',
    role: 'admin'
  },
  {
    id: '2',
    username: 'takimlideri',
    fullName: 'Mehmet Öztürk',
    email: 'mehmet@kidocode.com',
    role: 'team_leader'
  },
  {
    id: '3',
    username: 'ogrenci1',
    fullName: 'Ayşe Yılmaz',
    email: 'ayse@kidocode.com',
    role: 'student',
    classId: 'class-1',
    enrolledCourses: ['python', 'scratch']
  },
  {
    id: '4',
    username: 'ogretmen1',
    fullName: 'Fatma Kaya',
    email: 'fatma@kidocode.com',
    role: 'teacher'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
    const savedUser = localStorage.getItem('kidocode_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo için basit giriş kontrolü
    const foundUser = demoUsers.find(u => u.username === username);
    
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('kidocode_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kidocode_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};