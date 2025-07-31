import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const teacherCourses = [
    {
      id: 1,
      name: 'Python Programlama',
      students: 18,
      progress: 75,
      status: 'active',
      nextLesson: 'Fonksiyonlar ve Parametreler'
    },
    {
      id: 2,
      name: 'Web Tasarım',
      students: 12,
      progress: 60,
      status: 'active',
      nextLesson: 'CSS Grid Layout'
    },
    {
      id: 3,
      name: 'Scratch Programlama',
      students: 15,
      progress: 45,
      status: 'active',
      nextLesson: 'Değişkenler ve Listeler'
    }
  ];

  const activeGroups = [
    {
      id: 1,
      name: 'TUR_PYT_2024_8-10_001',
      course: 'Python Programlama',
      students: 8,
      nextClass: '2024-02-15 14:00'
    },
    {
      id: 2,
      name: 'TUR_WEB_2024_11-13_001',
      course: 'Web Tasarım',
      students: 6,
      nextClass: '2024-02-16 15:00'
    }
  ];

  const pendingHomework = [
    {
      id: 1,
      student: 'Ayşe Yılmaz',
      assignment: 'Python Değişkenler',
      course: 'Python Programlama',
      submittedAt: '2 saat önce',
      status: 'pending'
    },
    {
      id: 2,
      student: 'Mehmet Öz',
      assignment: 'Web Sayfası Tasarımı',
      course: 'Web Tasarım',
      submittedAt: '5 saat önce',
      status: 'pending'
    },
    {
      id: 3,
      student: 'Zeynep Kaya',
      assignment: 'Scratch Oyun Projesi',
      course: 'Scratch Programlama',
      submittedAt: '1 gün önce',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hoş Geldin Alanı */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Hoş geldin, {user?.fullName}! 👨‍🏫
            </h1>
            <p className="text-lg opacity-90">
              Bugünkü dersleriniz ve öğrenci durumlarınızı buradan takip edebilirsiniz
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{pendingHomework.length}</div>
            <div className="text-sm opacity-75">Bekleyen Değerlendirme</div>
          </div>
        </div>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Verdiği Kurslar */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/courses')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Verdiğim Kurslar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">{teacherCourses.length}</div>
            <p className="text-sm text-muted-foreground mb-4">Aktif kurs sayısı</p>
            
            <div className="space-y-3">
              {teacherCourses.slice(0, 2).map((course) => (
                <div key={course.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{course.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {course.students} öğrenci
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>İlerleme</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              Tümünü Görüntüle
            </Button>
          </CardContent>
        </Card>

        {/* Aktif Grupları */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/groups')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Aktif Gruplarım
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent mb-2">{activeGroups.length}</div>
            <p className="text-sm text-muted-foreground mb-4">Ders verdiğim gruplar</p>
            
            <div className="space-y-3">
              {activeGroups.map((group) => (
                <div key={group.id} className="border rounded-lg p-3">
                  <h4 className="font-medium text-sm mb-1">{group.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{group.course}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {group.students} öğrenci
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(group.nextClass).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              Tümünü Görüntüle
            </Button>
          </CardContent>
        </Card>

        {/* Değerlendirmeyi Bekleyen Ödevler */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/teacher/assignments')}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-warning" />
              Bekleyen Değerlendirmeler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning mb-2">{pendingHomework.length}</div>
            <p className="text-sm text-muted-foreground mb-4">Değerlendirilecek ödev</p>
            
            <div className="space-y-3">
              {pendingHomework.slice(0, 2).map((homework) => (
                <div key={homework.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{homework.student}</h4>
                    <Badge variant="outline" className="text-xs">
                      {homework.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{homework.assignment}</p>
                  <p className="text-xs text-muted-foreground">{homework.submittedAt}</p>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              Değerlendir
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Günlük Aktiviteler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bugünkü Dersler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Bugünkü Derslerim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '14:00', course: 'Python Programlama', group: 'TUR_PYT_2024_8-10_001', status: 'upcoming' },
                { time: '15:30', course: 'Web Tasarım', group: 'TUR_WEB_2024_11-13_001', status: 'upcoming' },
                { time: '17:00', course: 'Scratch Programlama', group: 'TUR_SCR_2024_8-10_002', status: 'completed' }
              ].map((lesson, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    lesson.status === 'completed' ? 'bg-green-500' : 
                    lesson.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{lesson.course}</h4>
                      <span className="text-sm text-muted-foreground">{lesson.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{lesson.group}</p>
                  </div>
                  {lesson.status === 'upcoming' && (
                    <Button size="sm" variant="outline">
                      Derse Başla
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Haftalık İstatistikler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Bu Hafta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Verilen Ders</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-accent">28</div>
                  <div className="text-xs text-muted-foreground">Değerlendirilen Ödev</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ders Katılım Oranı</span>
                  <span className="font-medium">%94</span>
                </div>
                <Progress value={94} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ödev Teslim Oranı</span>
                  <span className="font-medium">%87</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;