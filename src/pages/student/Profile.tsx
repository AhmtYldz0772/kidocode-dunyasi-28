import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { User, Mail, Calendar, BookOpen, Trophy, Star, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StudentProfile = () => {
  const { user } = useAuth();

  const profileStats = [
    { label: 'Tamamlanan Kurslar', value: '2', icon: BookOpen },
    { label: 'Toplam Puan', value: '980', icon: Star },
    { label: 'Kazanılan Rozetler', value: '8', icon: Trophy },
    { label: 'Aktif Projeler', value: '3', icon: User },
  ];

  const recentActivities = [
    { action: 'Python Fonksiyonlar dersi tamamlandı', date: '2 saat önce', type: 'lesson' },
    { action: 'Hızlı Öğrenen rozeti kazanıldı', date: '1 gün önce', type: 'achievement' },
    { action: 'Scratch Oyun Projesi oluşturuldu', date: '3 gün önce', type: 'project' },
    { action: 'Web Tasarım kursuna başlandı', date: '1 hafta önce', type: 'course' },
  ];

  const currentCourses = [
    { name: 'Python Programlama', progress: 65, nextLesson: 'Fonksiyonlar ve Parametreler' },
    { name: 'Web Tasarım', progress: 45, nextLesson: 'CSS Grid Sistemi' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <User className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Profilim</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil Bilgileri */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Profil Bilgileri
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user?.avatar} alt={user?.fullName} />
                <AvatarFallback className="text-lg">
                  {user?.fullName?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.fullName}</h2>
              <Badge className="mt-2">Öğrenci</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Üyelik: Ocak 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Seviye: Orta</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İstatistikler ve Aktiviteler */}
        <div className="lg:col-span-2 space-y-6">
          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profileStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Devam Eden Kurslar */}
          <Card>
            <CardHeader>
              <CardTitle>Devam Eden Kurslar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCourses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{course.name}</h3>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Sonraki Ders: {course.nextLesson}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Son Aktiviteler */}
          <Card>
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'achievement' ? 'bg-yellow-500' :
                      activity.type === 'lesson' ? 'bg-green-500' :
                      activity.type === 'project' ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;