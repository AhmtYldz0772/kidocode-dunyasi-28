import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, BookOpen, Trophy, TrendingUp, Award } from 'lucide-react';

const TeacherPerformance = () => {
  const performanceStats = [
    { title: 'Toplam Öğrenci', value: '45', change: '+8%', icon: Users },
    { title: 'Aktif Kurslar', value: '3', change: '+1%', icon: BookOpen },
    { title: 'Ortalama Başarı', value: '%78', change: '+5%', icon: Trophy },
    { title: 'Tamamlanan Ödev', value: '23', change: '+15%', icon: Award },
  ];

  const classPerformance = [
    { 
      class: 'Python Başlangıç', 
      students: 18, 
      avgProgress: 72, 
      completedProjects: 45, 
      attendance: 85 
    },
    { 
      class: 'Web Tasarım', 
      students: 12, 
      avgProgress: 68, 
      completedProjects: 28, 
      attendance: 92 
    },
    { 
      class: 'Scratch Programlama', 
      students: 15, 
      avgProgress: 95, 
      completedProjects: 52, 
      attendance: 88 
    },
  ];

  const topPerformers = [
    { name: 'Ayşe Yılmaz', course: 'Python', score: 95, projects: 8 },
    { name: 'Zeynep Kaya', course: 'Web Tasarım', score: 92, projects: 7 },
    { name: 'Mehmet Öz', course: 'Python', score: 88, projects: 6 },
    { name: 'Can Özkan', course: 'Scratch', score: 85, projects: 9 },
  ];

  const weeklyProgress = [
    { week: 'Bu Hafta', lessonsCompleted: 8, assignments: 12, attendance: 92 },
    { week: 'Geçen Hafta', lessonsCompleted: 10, assignments: 15, attendance: 88 },
    { week: '2 Hafta Önce', lessonsCompleted: 9, assignments: 11, attendance: 85 },
    { week: '3 Hafta Önce', lessonsCompleted: 12, assignments: 18, attendance: 90 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Performans Analizi</h1>
      </div>

      {/* Genel İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="secondary" className="mt-2">
                    {stat.change}
                  </Badge>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sınıf Performansları */}
        <Card>
          <CardHeader>
            <CardTitle>Sınıf Performansları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {classPerformance.map((classItem, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{classItem.class}</h3>
                    <Badge>{classItem.students} öğrenci</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Ortalama İlerleme</span>
                      <span>%{classItem.avgProgress}</span>
                    </div>
                    <Progress value={classItem.avgProgress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tamamlanan Proje</p>
                      <p className="font-medium">{classItem.completedProjects}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Devam Oranı</p>
                      <p className="font-medium">%{classItem.attendance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* En Başarılı Öğrenciler */}
        <Card>
          <CardHeader>
            <CardTitle>En Başarılı Öğrenciler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.course}</p>
                  </div>
                  <div className="text-right">
                    <Badge>{student.score} puan</Badge>
                    <p className="text-sm text-muted-foreground mt-1">{student.projects} proje</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Haftalık İlerleme */}
        <Card>
          <CardHeader>
            <CardTitle>Haftalık İlerleme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <h3 className="font-medium mb-2">{week.week}</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Dersler</p>
                      <p className="font-medium">{week.lessonsCompleted}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ödevler</p>
                      <p className="font-medium">{week.assignments}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Katılım</p>
                      <p className="font-medium">%{week.attendance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Öğretmen Değerlendirmesi */}
        <Card>
          <CardHeader>
            <CardTitle>Öğretmen Değerlendirmesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Öğrenci Memnuniyeti</span>
                  <span>4.8/5</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ders Kalitesi</span>
                  <span>4.7/5</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>İletişim</span>
                  <span>4.9/5</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Bu ay %12 iyileşme</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Öğrenci geri bildirimleri geçen aya göre daha olumlu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPerformance;