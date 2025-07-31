import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/Layout/MainLayout";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminUsers from "@/pages/admin/Users";
import AdminCourses from "@/pages/admin/Courses";
import AdminSettings from "@/pages/admin/Settings";
import AdminReports from "@/pages/admin/Reports";

// Team Leader pages
import TeamLeaderGroups from "@/pages/team-leader/Groups";
import TeamLeaderGroupDetail from "@/pages/team-leader/GroupDetail";
import TeamLeaderCourses from "@/pages/team-leader/Courses";
import TeamLeaderStudents from "@/pages/team-leader/Students";
import TeamLeaderTeachers from "@/pages/team-leader/Teachers";
import TeamLeaderPerformance from "@/pages/team-leader/Performance";

// Student pages
import StudentCourses from "@/pages/student/Courses";
import StudentAchievements from "@/pages/student/Achievements";
import StudentLeaderboard from "@/pages/student/Leaderboard";
import StudentProfile from "@/pages/student/Profile";
import StudentWhatsApp from "@/pages/student/WhatsApp";

// Teacher pages
import TeacherGroups from "@/pages/teacher/Groups";
import TeacherGroupDetail from "@/pages/teacher/GroupDetail";
import TeacherCourses from "@/pages/teacher/Courses";
import TeacherAssignments from "@/pages/teacher/Assignments";
import TeacherPerformance from "@/pages/teacher/Performance";
import TeacherProfile from "@/pages/teacher/Profile";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Yükleniyor...</div>;
  if (!user) return <Navigate to="/login" replace />;
  
  return <MainLayout>{children}</MainLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/courses" element={
              <ProtectedRoute>
                <AdminCourses />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute>
                <AdminReports />
              </ProtectedRoute>
            } />

            {/* Team Leader Routes */}
            <Route path="/team-leader/groups" element={
              <ProtectedRoute>
                <TeamLeaderGroups />
              </ProtectedRoute>
            } />
            <Route path="/team-leader/groups/:groupId" element={
              <ProtectedRoute>
                <TeamLeaderGroupDetail />
              </ProtectedRoute>
            } />
            <Route path="/team-leader/courses" element={
              <ProtectedRoute>
                <TeamLeaderCourses />
              </ProtectedRoute>
            } />
            <Route path="/team-leader/students" element={
              <ProtectedRoute>
                <TeamLeaderStudents />
              </ProtectedRoute>
            } />

            <Route path="/team-leader/teachers" element={
              <ProtectedRoute>
                <TeamLeaderTeachers />
              </ProtectedRoute>
            } />
            <Route path="/team-leader/performance" element={
              <ProtectedRoute>
                <TeamLeaderPerformance />
              </ProtectedRoute>
            } />

            {/* Student Routes */}
            <Route path="/student/courses" element={
              <ProtectedRoute>
                <StudentCourses />
              </ProtectedRoute>
            } />
            <Route path="/student/achievements" element={
              <ProtectedRoute>
                <StudentAchievements />
              </ProtectedRoute>
            } />
            <Route path="/student/leaderboard" element={
              <ProtectedRoute>
                <StudentLeaderboard />
              </ProtectedRoute>
            } />
            <Route path="/student/profile" element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            } />
            <Route path="/student/whatsapp" element={
              <ProtectedRoute>
                <StudentWhatsApp />
              </ProtectedRoute>
            } />

            {/* Teacher Routes */}
            <Route path="/teacher/groups" element={
              <ProtectedRoute>
                <TeacherGroups />
              </ProtectedRoute>
            } />
            <Route path="/teacher/groups/:groupId" element={
              <ProtectedRoute>
                <TeacherGroupDetail />
              </ProtectedRoute>
            } />
            <Route path="/teacher/courses" element={
              <ProtectedRoute>
                <TeacherCourses />
              </ProtectedRoute>
            } />
            <Route path="/teacher/assignments" element={
              <ProtectedRoute>
                <TeacherAssignments />
              </ProtectedRoute>
            } />
            <Route path="/teacher/performance" element={
              <ProtectedRoute>
                <TeacherPerformance />
              </ProtectedRoute>
            } />
            <Route path="/teacher/profile" element={
              <ProtectedRoute>
                <TeacherProfile />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
