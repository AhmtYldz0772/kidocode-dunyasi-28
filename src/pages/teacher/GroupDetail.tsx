import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Users, BookOpen, Clock, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';

const TeacherGroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Demo data - gerçek uygulamada API'den gelecek
  const group = {
    id: 1,
    name: 'TUR_PRE_8_PYTHON_2024',
    courseName: 'Python Programlama',
    teacher: 'Fatma Kaya',
    studentCount: 12,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    duration: '8 hafta',
    ageGroup: '8-10 yaş',
    status: 'active',
    progress: 65
  };

  const students = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@test.com', progress: 80, status: 'active' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@test.com', progress: 75, status: 'active' },
    { id: 3, name: 'Mehmet Çelik', email: 'mehmet@test.com', progress: 60, status: 'active' },
    { id: 4, name: 'Zeynep Kaya', email: 'zeynep@test.com', progress: 90, status: 'active' },
    { id: 5, name: 'Can Öztürk', email: 'can@test.com', progress: 45, status: 'active' },
    { id: 6, name: 'Seda Arslan', email: 'seda@test.com', progress: 70, status: 'active' }
  ];

  const homework = [
    { 
      id: 1, 
      title: 'Python Temelleri - Değişkenler', 
      dueDate: '2024-01-20',
      students: [
        { name: 'Ahmet Yılmaz', status: 'completed', score: 85 },
        { name: 'Ayşe Demir', status: 'completed', score: 90 },
        { name: 'Mehmet Çelik', status: 'pending', score: null },
        { name: 'Zeynep Kaya', status: 'completed', score: 95 },
        { name: 'Can Öztürk', status: 'late', score: 60 },
        { name: 'Seda Arslan', status: 'completed', score: 88 }
      ]
    },
    {
      id: 2,
      title: 'Döngüler ve Koşullar',
      dueDate: '2024-01-25',
      students: [
        { name: 'Ahmet Yılmaz', status: 'completed', score: 78 },
        { name: 'Ayşe Demir', status: 'pending', score: null },
        { name: 'Mehmet Çelik', status: 'pending', score: null },
        { name: 'Zeynep Kaya', status: 'completed', score: 92 },
        { name: 'Can Öztürk', status: 'pending', score: null },
        { name: 'Seda Arslan', status: 'completed', score: 85 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'late': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'pending': return 'Bekliyor';
      case 'late': return 'Geç';
      default: return 'Bilinmiyor';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/teacher/groups')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">{group.name}</h1>
      </div>

      {/* Grup Bilgileri Kartı */}
      <Card>
        <CardHeader>
          <CardTitle>Grup Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Kurs Adı</p>
              <p className="font-medium">{group.courseName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Öğretmen</p>
              <p className="font-medium">{group.teacher}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Öğrenci Sayısı</p>
              <p className="font-medium">{group.studentCount}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Başlangıç Tarihi</p>
              <p className="font-medium">{group.startDate}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Bitiş Tarihi</p>
              <p className="font-medium">{group.endDate}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Yaş Grubu</p>
              <p className="font-medium">{group.ageGroup}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Grup İlerlemesi</span>
              <span>%{group.progress}</span>
            </div>
            <Progress value={group.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Sekmeler */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Öğrenci Listesi</TabsTrigger>
          <TabsTrigger value="calendar">Takvim</TabsTrigger>
          <TabsTrigger value="homework">Ödev Kontrolü</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Öğrenci Listesi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">İlerleme</p>
                        <p className="font-medium">%{student.progress}</p>
                      </div>
                      <Progress value={student.progress} className="w-20 h-2" />
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status === 'active' ? 'Aktif' : 'Pasif'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grup Takvimi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-6 space-y-2">
                <h3 className="font-semibold">Yaklaşan Dersler</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Python Fonksiyonları</p>
                      <p className="text-sm text-muted-foreground">Modül 3 - Ders 5</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Yarın 14:00</p>
                      <p className="text-sm text-muted-foreground">90 dakika</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Liste ve Döngüler</p>
                      <p className="text-sm text-muted-foreground">Modül 3 - Ders 6</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Gelecek Hafta Pazartesi 14:00</p>
                      <p className="text-sm text-muted-foreground">90 dakika</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homework" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ödev Kontrolü</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {homework.map((hw) => (
                  <div key={hw.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{hw.title}</h3>
                        <p className="text-sm text-muted-foreground">Teslim Tarihi: {hw.dueDate}</p>
                      </div>
                      <Badge variant="outline">
                        {hw.students.filter(s => s.status === 'completed').length}/{hw.students.length} Tamamlandı
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {hw.students.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            {student.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" />
                            )}
                            <span className="font-medium">{student.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-sm ${getStatusColor(student.status)}`}>
                              {getStatusText(student.status)}
                            </span>
                            {student.score && (
                              <Badge variant="secondary">{student.score} puan</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherGroupDetail;