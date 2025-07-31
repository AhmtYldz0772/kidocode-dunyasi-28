import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Star,
  Play,
  Users,
  Target,
  Award
} from 'lucide-react';
import pythonIcon from '@/assets/python-icon.jpg';
import webDevIcon from '@/assets/web-dev-icon.jpg';
import designIcon from '@/assets/design-icon.jpg';
import scratchIcon from '@/assets/scratch-icon.jpg';
import koduIcon from '@/assets/kodu-icon.jpg';

// Demo veri
const enrolledCourses = [
  {
    id: 'python',
    name: 'Python Programlama',
    icon: pythonIcon,
    progress: 75,
    nextLesson: 'Döngüler ve Koşullar',
    totalLessons: 20,
    completedLessons: 15
  },
  {
    id: 'scratch',
    name: 'Scratch ile Oyun Yapımı',
    icon: scratchIcon,
    progress: 40,
    nextLesson: 'Karakterler ve Kostümler',
    totalLessons: 15,
    completedLessons: 6
  }
];

const availableCourses = [
  {
    id: 'web-dev',
    name: 'Web Geliştirme',
    description: 'HTML, CSS ve JavaScript ile web siteleri yapma',
    icon: webDevIcon,
    duration: '12 hafta',
    level: 'Başlangıç'
  },
  {
    id: 'design',
    name: 'Dijital Tasarım',
    description: 'GIMP ile grafik tasarım öğrenme',
    icon: designIcon,
    duration: '8 hafta',
    level: 'Orta'
  },
  {
    id: 'kodu',
    name: 'Kodu Oyun Yapımı',
    description: '3D oyunlar tasarlama ve kodlama',
    icon: koduIcon,
    duration: '10 hafta',
    level: 'İleri'
  }
];

const recentAssignments = [
  {
    id: 1,
    title: 'Python Değişkenler Ödevi',
    course: 'Python Programlama',
    dueDate: '2024-02-15',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Scratch Karakter Animasyonu',
    course: 'Scratch ile Oyun Yapımı',
    dueDate: '2024-02-20',
    status: 'completed'
  }
];

const classRanking = {
  position: 3,
  totalStudents: 25,
  points: 1250
};

const StudentDashboard = () => {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'pending':
        return 'Bekliyor';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hoş Geldin Alanı */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Hoş geldin, {user?.fullName}! 🎉
            </h1>
            <p className="text-lg opacity-90">
              Bugün hangi kodlama macerasına başlıyorsun?
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{classRanking.points} Puan</div>
            <div className="text-sm opacity-75">
              Sınıf Sıralaması: {classRanking.position}/{classRanking.totalStudents}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Aktif Kurslar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Aktif Kurslarım
            </CardTitle>
            <CardDescription>
              Devam ettiğin kurslar ve ilerleme durumun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <img 
                    src={course.icon} 
                    alt={course.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{course.name}</h3>
                      <Badge variant="secondary">
                        {course.completedLessons}/{course.totalLessons} Ders
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Sonraki Ders: {course.nextLesson}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>İlerleme</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <Button size="sm" className="mt-3">
                      <Play className="mr-2 h-4 w-4" />
                      Devam Et
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hızlı İstatistikler */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-accent" />
                Başarımlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">12</div>
              <p className="text-sm text-muted-foreground">Toplam Rozet</p>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Tümünü Gör
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Sınıf Durumu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">#{classRanking.position}</div>
              <p className="text-sm text-muted-foreground">
                {classRanking.totalStudents} kişi arasında
              </p>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Liderlik Tablosu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bekleyen Ödevler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              Bekleyen Ödevler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  <p className="text-xs text-muted-foreground">
                    Son Tarih: {new Date(assignment.dueDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <Badge className={getStatusColor(assignment.status)}>
                  {getStatusText(assignment.status)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mevcut Kurslar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-success" />
              Yeni Kurslar
            </CardTitle>
            <CardDescription>
              Kayıt olabileceğin diğer kurslar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-sm transition-shadow">
                <img 
                  src={course.icon} 
                  alt={course.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{course.name}</h4>
                  <p className="text-xs text-muted-foreground">{course.duration} • {course.level}</p>
                </div>
                <Button size="sm" variant="outline">
                  İncele
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;