import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import StudentDashboard from './student/Dashboard';
import TeamLeaderDashboard from './team-leader/Dashboard';

const Index = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-16 w-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-primary-foreground font-bold text-2xl">K</span>
          </div>
          <p className="text-xl text-muted-foreground">KidoCode Dünyası Yükleniyor...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Rol bazlı yönlendirme
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'team_leader':
      return <TeamLeaderDashboard />;
    case 'admin':
    case 'teacher':
    default:
      return <StudentDashboard />; // Şimdilik hepsi öğrenci dashboard'u kullanıyor
  }
};

export default Index;
