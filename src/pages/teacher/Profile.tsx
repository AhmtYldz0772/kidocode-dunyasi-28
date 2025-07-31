import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, Calendar, BookOpen, Users, Award, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const TeacherProfile = () => {
  const { user } = useAuth();

  const teacherStats = [
    { label: 'Verdiği Kurslar', value: '3', icon: BookOpen },
    { label: 'Toplam Öğrenci', value: '45', icon: Users },
    { label: 'Deneyim Yılı', value: '5', icon: Calendar },
    { label: 'Başarı Oranı', value: '%92', icon: Award },
  ];

  const courses = [
    { name: 'Python Programlama', students: 18, level: 'Başlangıç', duration: '8 hafta' },
    { name: 'Web Tasarım', students: 12, level: 'Başlangıç', duration: '10 hafta' },
    { name: 'Scratch Programlama', students: 15, level: 'Orta', duration: '6 hafta' },
  ];

  const achievements = [
    { title: 'En İyi Öğretmen 2023', date: 'Aralık 2023', type: 'award' },
    { title: 'Python Sertifikası', date: 'Haziran 2023', type: 'certification' },
    { title: '100+ Öğrenci Mezun Etti', date: 'Kasım 2023', type: 'milestone' },
    { title: 'Web Geliştirme Uzmanı', date: 'Mart 2023', type: 'certification' },
  ];

  const recentActivities = [
    { action: 'Python Fonksiyonlar dersi tamamlandı', time: '2 saat önce', type: 'lesson' },
    { action: 'Web Tasarım ödevleri değerlendirildi', time: '4 saat önce', type: 'grading' },
    { action: 'Yeni öğrenci grubuna ders ataması yapıldı', time: '1 gün önce', type: 'assignment' },
    { action: 'Öğrenci performans raporları güncellendi', time: '2 gün önce', type: 'report' },
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
              <Badge className="mt-2">Öğretmen</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+90 555 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Katılım: Ocak 2019</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Uzman Seviye Öğretmen</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">Uzmanlık Alanları</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Web Tasarım</Badge>
                <Badge variant="secondary">Scratch</Badge>
                <Badge variant="secondary">JavaScript</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İstatistikler ve Detaylar */}
        <div className="lg:col-span-2 space-y-6">
          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teacherStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Verdiği Kurslar */}
          <Card>
            <CardHeader>
              <CardTitle>Verdiği Kurslar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.level} • {course.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{course.students} öğrenci</p>
                      <p className="text-sm text-muted-foreground">Aktif</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Başarılar */}
          <Card>
            <CardHeader>
              <CardTitle>Başarılar ve Sertifikalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      achievement.type === 'award' ? 'bg-yellow-500' :
                      achievement.type === 'certification' ? 'bg-blue-500' : 'bg-green-500'
                    }`} />
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                      activity.type === 'lesson' ? 'bg-blue-500' :
                      activity.type === 'grading' ? 'bg-orange-500' :
                      activity.type === 'assignment' ? 'bg-purple-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
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

export default TeacherProfile;