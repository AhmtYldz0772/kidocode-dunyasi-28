import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Edit, Eye } from 'lucide-react';

const AdminCourses = () => {
  const courses = [
    { id: 1, title: 'Python Programlama', level: 'Başlangıç', students: 25, status: 'active' },
    { id: 2, title: 'Scratch ile Oyun Geliştirme', level: 'Orta', students: 18, status: 'active' },
    { id: 3, title: 'Web Tasarım', level: 'İleri', students: 12, status: 'draft' },
    { id: 4, title: 'Kodu ile Kodlama', level: 'Başlangıç', students: 30, status: 'active' },
  ];



  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kurs Yönetimi</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Yeni Kurs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {course.title}
                <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Seviye: {course.level}</p>
                <p className="text-sm text-muted-foreground">Öğrenci Sayısı: {course.students}</p>
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;