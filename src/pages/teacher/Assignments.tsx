import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Plus, Eye, Edit, Calendar, Users } from 'lucide-react';

const TeacherAssignments = () => {
  const assignments = [
    {
      id: 1,
      title: 'Python Değişkenler Ödevi',
      course: 'Python Programlama',
      description: 'Değişken tanımlama ve kullanımı üzerine pratik ödevler',
      dueDate: '2024-02-15',
      submittedCount: 12,
      totalStudents: 18,
      status: 'active',
      difficulty: 'Kolay',
      estimatedTime: '2 saat'
    },
    {
      id: 2,
      title: 'Web Sayfası Tasarımı',
      course: 'Web Tasarım',
      description: 'HTML ve CSS kullanarak kişisel portföy sayfası oluşturma',
      dueDate: '2024-02-20',
      submittedCount: 8,
      totalStudents: 12,
      status: 'active',
      difficulty: 'Orta',
      estimatedTime: '4 saat'
    },
    {
      id: 3,
      title: 'Matematik Oyunu',
      course: 'Scratch Programlama',
      description: 'Scratch ile interaktif matematik oyunu geliştirme',
      dueDate: '2024-02-10',
      submittedCount: 15,
      totalStudents: 15,
      status: 'completed',
      difficulty: 'Kolay',
      estimatedTime: '3 saat'
    },
    {
      id: 4,
      title: 'Python Fonksiyonlar Projesi',
      course: 'Python Programlama',
      description: 'Fonksiyon kavramını kullanarak hesap makinesi uygulaması',
      dueDate: '2024-02-25',
      submittedCount: 0,
      totalStudents: 18,
      status: 'draft',
      difficulty: 'Zor',
      estimatedTime: '5 saat'
    },
  ];

  const recentSubmissions = [
    { student: 'Ayşe Yılmaz', assignment: 'Python Değişkenler', submittedAt: '2 saat önce', status: 'pending' },
    { student: 'Mehmet Öz', assignment: 'Web Sayfası Tasarımı', submittedAt: '5 saat önce', status: 'reviewed' },
    { student: 'Zeynep Kaya', assignment: 'Python Değişkenler', submittedAt: '1 gün önce', status: 'graded' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'draft': return 'outline';
      default: return 'outline';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay': return 'bg-green-100 text-green-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Zor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Ödevler</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni Ödev Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5" />
                    {assignment.title}
                  </div>
                  <Badge variant={getStatusColor(assignment.status)}>
                    {assignment.status}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Kurs</p>
                    <p className="font-medium">{assignment.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Son Tarih</p>
                    <p className="font-medium">{assignment.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Zorluk</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assignment.difficulty)}`}>
                      {assignment.difficulty}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tahmini Süre</p>
                    <p className="font-medium">{assignment.estimatedTime}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Teslim Edilen</span>
                    <span>{assignment.submittedCount}/{assignment.totalStudents}</span>
                  </div>
                  <Progress 
                    value={(assignment.submittedCount / assignment.totalStudents) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Görüntüle
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Değerlendir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Son Teslimler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map((submission, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{submission.student}</h3>
                      <Badge variant="outline" className="text-xs">
                        {submission.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                    <p className="text-xs text-muted-foreground">{submission.submittedAt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ödev İstatistikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Toplam Ödev</span>
                  <span className="font-bold">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Aktif Ödev</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bekleyen Değerlendirme</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ortalama Teslim Oranı</span>
                  <span className="font-bold">%78</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;