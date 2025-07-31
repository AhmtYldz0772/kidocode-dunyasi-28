import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Users, Eye, MessageCircle, Award } from 'lucide-react';

const TeacherStudents = () => {
  const students = [
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      email: 'ayse@student.com',
      course: 'Python Programlama',
      progress: 85,
      lastActivity: '2 saat önce',
      status: 'active',
      completedProjects: 5,
      currentLesson: 'Fonksiyonlar'
    },
    {
      id: 2,
      name: 'Mehmet Öz',
      email: 'mehmet@student.com',
      course: 'Python Programlama',
      progress: 65,
      lastActivity: '1 gün önce',
      status: 'active',
      completedProjects: 3,
      currentLesson: 'Döngüler'
    },
    {
      id: 3,
      name: 'Zeynep Kaya',
      email: 'zeynep@student.com',
      course: 'Web Tasarım',
      progress: 90,
      lastActivity: '30 dakika önce',
      status: 'active',
      completedProjects: 7,
      currentLesson: 'JavaScript Temelleri'
    },
    {
      id: 4,
      name: 'Ali Demir',
      email: 'ali@student.com',
      course: 'Python Programlama',
      progress: 45,
      lastActivity: '3 gün önce',
      status: 'inactive',
      completedProjects: 2,
      currentLesson: 'Veri Tipleri'
    },
  ];

  const classStats = [
    { label: 'Toplam Öğrenci', value: '24', icon: Users },
    { label: 'Aktif Öğrenci', value: '18', icon: Users },
    { label: 'Ortalama İlerleme', value: '%71', icon: Award },
    { label: 'Tamamlanan Proje', value: '42', icon: Award },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Öğrencilerim</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Öğrenci Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/avatars/${student.name.toLowerCase().replace(' ', '-')}.jpg`} />
                      <AvatarFallback>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Kurs</p>
                    <p className="font-medium">{student.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mevcut Ders</p>
                    <p className="font-medium">{student.currentLesson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tamamlanan Proje</p>
                    <p className="font-medium">{student.completedProjects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Son Aktivite</p>
                    <p className="font-medium">{student.lastActivity}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>İlerleme</span>
                    <span>{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Detaylar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Mesaj Gönder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherStudents;