import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Trophy } from 'lucide-react';

const TeamLeaderPerformance = () => {
  const performanceData = [
    { title: 'Toplam Öğrenci', value: '45', change: '+8%', icon: Users },
    { title: 'Tamamlanan Kurslar', value: '23', change: '+15%', icon: Trophy },
    { title: 'Ortalama İlerleme', value: '%78', change: '+5%', icon: TrendingUp },
    { title: 'Aktif Gruplar', value: '6', change: '+2%', icon: BarChart3 },
  ];

  const topStudents = [
    { name: 'Ayşe Yılmaz', course: 'Python', progress: 95, score: 'A+' },
    { name: 'Mehmet Öz', course: 'Scratch', progress: 88, score: 'A' },
    { name: 'Zeynep Kaya', course: 'Web Tasarım', progress: 82, score: 'B+' },
    { name: 'Ali Demir', course: 'Kodu', progress: 79, score: 'B+' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Performans Analizi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <Badge variant="secondary" className="mt-2">
                    {item.change}
                  </Badge>
                </div>
                <item.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>En Başarılı Öğrenciler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.course}</p>
                  </div>
                  <div className="text-right">
                    <Badge>{student.score}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">%{student.progress}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Haftalık İlerleme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { week: 'Bu Hafta', completed: 8, total: 10 },
                { week: 'Geçen Hafta', completed: 12, total: 15 },
                { week: '2 Hafta Önce', completed: 9, total: 12 },
                { week: '3 Hafta Önce', completed: 15, total: 18 },
              ].map((week, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{week.week}</span>
                    <span>{week.completed}/{week.total}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(week.completed / week.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamLeaderPerformance;