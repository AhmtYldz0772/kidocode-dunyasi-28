import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users, Calendar, FileText, CheckSquare, MessageSquare, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  phone: string;
  parentName: string;
  address: string;
  registrationDate: Date;
  username: string;
  password: string;
  activeGroups: string[];
  status: 'active' | 'inactive';
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  authorRole: 'team_leader' | 'teacher';
  content: string;
  date: Date;
}

interface Attendance {
  studentId: number;
  lessonDate: string;
  status: 'present' | 'absent' | 'excused';
}

const TeamLeaderGroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  // Mock data - gerçek uygulamada API'den gelecek
  const group = {
    id: parseInt(groupId || '1'),
    name: 'TUR_PRE_2024_8-10_001',
    course: 'Python Başlangıç',
    teacher: 'Fatma Kaya',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-06-01'),
    weeklyLessons: 2,
    whatsappLink: 'https://chat.whatsapp.com/example1',
    zoomLink: 'https://zoom.us/j/123456789'
  };

  const [students] = useState<Student[]>([
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      age: 8,
      email: 'ayse.yilmaz@email.com',
      phone: '0532 123 4567',
      parentName: 'Mehmet Yılmaz',
      address: 'İstanbul, Kadıköy',
      registrationDate: new Date('2024-01-15'),
      username: 'ayse.yilmaz',
      password: 'Ay123!@#',
      activeGroups: ['TUR_PRE_2024_8-10_001'],
      status: 'active',
      comments: [
        {
          id: 1,
          author: 'Fatma Kaya',
          authorRole: 'teacher',
          content: 'Çok başarılı bir öğrenci, derse aktif katılıyor.',
          date: new Date('2024-02-15')
        }
      ]
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      age: 9,
      email: 'mehmet.kaya@email.com',
      phone: '0533 234 5678',
      parentName: 'Fatma Kaya',
      address: 'Ankara, Çankaya',
      registrationDate: new Date('2024-01-20'),
      username: 'mehmet.kaya',
      password: 'Meh456$%^',
      activeGroups: ['TUR_PRE_2024_8-10_001'],
      status: 'active',
      comments: []
    }
  ]);

  const [attendanceData, setAttendanceData] = useState<Attendance[]>([
    { studentId: 1, lessonDate: '2024-02-01', status: 'present' },
    { studentId: 2, lessonDate: '2024-02-01', status: 'present' },
    { studentId: 1, lessonDate: '2024-02-03', status: 'absent' },
    { studentId: 2, lessonDate: '2024-02-03', status: 'excused' }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newComment, setNewComment] = useState('');
  const [editingLesson, setEditingLesson] = useState<number | null>(null);
  
  const generateCalendarLessons = () => {
    const lessonTitles = [
      'Python Nedir? Giriş', 'Değişkenler ve Veri Tipleri', 'Koşullu İfadeler', 'Döngüler - For ve While',
      'Listeler ve Tuple’lar', 'Fonksiyonlar', 'Dosya İşlemleri', 'Proje: Basit Oyun Yapımı',
      'Sınıflar ve Nesneler', 'Hata Yönetimi', 'Modüller', 'Kütüphaneler',
      'Veri Analizi Giriş', 'Grafik Çizimi', 'Web Scraping', 'API Kullanımı',
      'Veritabanı İşlemleri', 'GUI Programlama', 'Oyun Geliştirme 1', 'Oyun Geliştirme 2',
      'Web Geliştirme Giriş', 'Flask Framework', 'Proje Yönetimi', 'Test Yazma',
      'Performans Optimizasyonu', 'Güvenlik', 'Deployment', 'DevOps Giriş',
      'Final Projesi Başlangıç', 'Final Projesi Geliştirme', 'Final Projesi Tamamlama', 'Sertifika ve Değerlendirme'
    ];
    
    const lessons = [];
    const startDate = new Date('2024-02-01');
    
    for (let i = 0; i < 32; i++) {
      const lessonDate = new Date(startDate);
      lessonDate.setDate(startDate.getDate() + i * 7);
      lessonDate.setHours(18, 0, 0, 0);
      
      lessons.push({
        no: i + 1,
        title: lessonTitles[i],
        date: lessonDate.toISOString().slice(0, 16).replace('T', ' ') + ':00',
        status: i < 3 ? 'completed' : 'upcoming',
        recordLink: i < 3 ? `https://example.com/record${i + 1}` : null
      });
    }
    return lessons;
  };
  
  const [lessons, setLessons] = useState(generateCalendarLessons());

  const moduleBasedLessons = [
    { code: 'M1D1', module: 1, lesson: 1, date: '2024-02-01' },
    { code: 'M1D2', module: 1, lesson: 2, date: '2024-02-03' },
    { code: 'M1D3', module: 1, lesson: 3, date: '2024-02-08' },
    { code: 'M1D4', module: 1, lesson: 4, date: '2024-02-10' },
    { code: 'M2D1', module: 2, lesson: 1, date: '2024-02-15' },
    { code: 'M2D2', module: 2, lesson: 2, date: '2024-02-17' },
    { code: 'M2D3', module: 2, lesson: 3, date: '2024-02-22' },
    { code: 'M2D4', module: 2, lesson: 4, date: '2024-02-24' }
  ];

  const handleAttendanceChange = (studentId: number, lessonDate: string, status: 'present' | 'absent' | 'excused') => {
    setAttendanceData(prev => {
      const existing = prev.find(a => a.studentId === studentId && a.lessonDate === lessonDate);
      if (existing) {
        return prev.map(a => 
          a.studentId === studentId && a.lessonDate === lessonDate 
            ? { ...a, status }
            : a
        );
      } else {
        return [...prev, { studentId, lessonDate, status }];
      }
    });
  };

  const getAttendanceStatus = (studentId: number, lessonDate: string) => {
    const attendance = attendanceData.find(a => a.studentId === studentId && a.lessonDate === lessonDate);
    return attendance?.status || 'present';
  };

  const addComment = () => {
    if (selectedStudent && newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'Takım Lideri', // Gerçek uygulamada auth'dan gelecek
        authorRole: 'team_leader',
        content: newComment,
        date: new Date()
      };
      
      // Gerçek uygulamada API'ye gönderilecek
      setNewComment('');
    }
  };

  const updateLessonDate = (lessonNo: number, newDate: string) => {
    const updatedLessons = [...lessons];
    const lessonIndex = updatedLessons.findIndex(l => l.no === lessonNo);
    
    if (lessonIndex !== -1) {
      const oldDate = new Date(updatedLessons[lessonIndex].date);
      const newDateTime = new Date(newDate);
      
      newDateTime.setHours(oldDate.getHours(), oldDate.getMinutes());
      const newDateString = newDateTime.toISOString().slice(0, 16).replace('T', ' ') + ':00';
      
      const nextLessonIndex = lessonIndex + 1;
      let shouldUpdateAllLessons = false;
      
      if (nextLessonIndex < updatedLessons.length) {
        const nextLessonDate = new Date(updatedLessons[nextLessonIndex].date);
        shouldUpdateAllLessons = newDateTime >= nextLessonDate;
      }
      
      updatedLessons[lessonIndex].date = newDateString;
      
      if (shouldUpdateAllLessons) {
        for (let i = nextLessonIndex; i < updatedLessons.length; i++) {
          const prevDate = new Date(updatedLessons[i - 1].date);
          const nextWeek = new Date(prevDate);
          nextWeek.setDate(prevDate.getDate() + 7);
          updatedLessons[i].date = nextWeek.toISOString().slice(0, 16).replace('T', ' ') + ':00';
        }
      }
      
      setLessons(updatedLessons);
    }
    setEditingLesson(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/team-leader/groups')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{group.name}</h1>
          <p className="text-muted-foreground">{group.course} - {group.teacher}</p>
        </div>
      </div>

      {/* Grup Bilgileri */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Grup Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kurs</Label>
              <p className="text-lg font-medium text-gray-900 mt-1">{group.course}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Öğretmen</Label>
              <p className="text-lg font-medium text-gray-900 mt-1">{group.teacher}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Başlama Tarihi</Label>
              <p className="text-lg font-medium text-gray-900 mt-1">{format(group.startDate, 'dd MMM yyyy', { locale: tr })}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bitiş Tarihi</Label>
              <p className="text-lg font-medium text-gray-900 mt-1">{format(group.endDate, 'dd MMM yyyy', { locale: tr })}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Haftalık Ders</Label>
              <p className="text-lg font-medium text-gray-900 mt-1">{group.weeklyLessons} ders</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WhatsApp Grubu</Label>
              <a href={group.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-green-600 hover:text-green-700 mt-1 block">
                Gruba Katıl →
              </a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Zoom Bağlantısı</Label>
              <a href={group.zoomLink} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-600 hover:text-blue-700 mt-1 block">
                Derse Katıl →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ana İçerik */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="students" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="students">
                <Users className="h-4 w-4 mr-2" />
                Öğrenciler
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Takvim
              </TabsTrigger>
              <TabsTrigger value="assignments">
                <FileText className="h-4 w-4 mr-2" />
                Ödev Kontrol
              </TabsTrigger>
              <TabsTrigger value="attendance">
                <CheckSquare className="h-4 w-4 mr-2" />
                Yoklama
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Öğrenci Listesi ({students.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.age} yaş • {student.parentName}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Detay
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{student.name} - Öğrenci Detayları</DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="info" className="space-y-4">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="info">
                                  <Users className="h-4 w-4 mr-2" />
                                  Bilgiler
                                </TabsTrigger>
                                <TabsTrigger value="comments">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Yorumlar ({student.comments.length})
                                </TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="info" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Ad Soyad</Label>
                                  <p className="text-sm">{student.name}</p>
                                </div>
                                <div>
                                  <Label>Yaş</Label>
                                  <p className="text-sm">{student.age}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>E-posta</Label>
                                  <p className="text-sm">{student.email}</p>
                                </div>
                                <div>
                                  <Label>Telefon</Label>
                                  <p className="text-sm">{student.phone}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Veli Adı Soyadı</Label>
                                  <p className="text-sm">{student.parentName}</p>
                                </div>
                                <div>
                                  <Label>Durum</Label>
                                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                    {student.status === 'active' ? 'Aktif' : 'Pasif'}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label>Adres</Label>
                                <p className="text-sm">{student.address}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Kullanıcı Adı</Label>
                                  <p className="text-sm font-mono bg-muted p-2 rounded">{student.username}</p>
                                </div>
                                <div>
                                  <Label>Şifre</Label>
                                  <p className="text-sm font-mono bg-muted p-2 rounded">{student.password}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Kayıt Tarihi</Label>
                                  <p className="text-sm">{student.registrationDate.toLocaleDateString('tr-TR')}</p>
                                </div>
                                <div>
                                  <Label>Aktif Gruplar</Label>
                                  <p className="text-sm">{student.activeGroups.length > 0 ? student.activeGroups.join(', ') : 'Henüz gruba eklenmemiş'}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <Label>Yorumlar</Label>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                  {student.comments.map((comment) => (
                                    <div key={comment.id} className="p-3 bg-muted rounded-lg">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">{comment.author}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {format(comment.date, 'dd MMM yyyy', { locale: tr })}
                                        </span>
                                      </div>
                                      <p className="text-sm">{comment.content}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="space-y-2">
                                  <Textarea
                                    placeholder="Öğrenci hakkında yorum ekleyin..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                  />
                                  <Button onClick={addComment} size="sm">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Yorum Ekle
                                  </Button>
                                </div>
                              </div>
                              </TabsContent>
                              
                              <TabsContent value="comments" className="space-y-4">
                                <div className="space-y-4">
                                  <div className="space-y-3">
                                    <Label className="text-sm font-medium">Mevcut Yorumlar ({student.comments.length})</Label>
                                    
                                    {student.comments.length > 0 ? (
                                      <div className="space-y-3 max-h-60 overflow-y-auto">
                                        {student.comments.map((comment) => (
                                          <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{comment.author}</span>
                                                <Badge variant="outline" className="text-xs">
                                                  {comment.authorRole === 'teacher' ? 'Öğretmen' : 'Takım Lideri'}
                                                </Badge>
                                              </div>
                                              <span className="text-xs text-muted-foreground">
                                                {format(comment.date, 'dd MMM yyyy HH:mm', { locale: tr })}
                                              </span>
                                            </div>
                                            <p className="text-sm text-gray-700">{comment.content}</p>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground italic">Henüz yorum yapılmamış.</p>
                                    )}
                                  </div>
                                  
                                  <div className="space-y-3 pt-4 border-t">
                                    <Label className="text-sm font-medium">Yeni Yorum Ekle</Label>
                                    <Textarea
                                      placeholder={`${student.name} hakkında yorum ekleyin...`}
                                      value={selectedStudent?.id === student.id ? newComment : ''}
                                      onChange={(e) => {
                                        setSelectedStudent(student);
                                        setNewComment(e.target.value);
                                      }}
                                      className="min-h-[100px]"
                                    />
                                    <Button 
                                      onClick={() => {
                                        setSelectedStudent(student);
                                        addComment();
                                      }} 
                                      size="sm" 
                                      disabled={!newComment.trim() || selectedStudent?.id !== student.id}
                                      className="w-full"
                                    >
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Yorum Ekle
                                    </Button>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ders Takvimi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">No</th>
                          <th className="text-left p-3 font-medium">Ders Başlığı</th>
                          <th className="text-left p-3 font-medium">Öğretmen</th>
                          <th className="text-left p-3 font-medium">Tarih</th>
                          <th className="text-left p-3 font-medium">Zoom</th>
                          <th className="text-left p-3 font-medium">Ders Kaydı</th>
                          <th className="text-left p-3 font-medium">Durum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { no: 1, title: 'Python Nedir? Giriş', date: '2024-02-01 18:00', status: 'completed', recordLink: 'https://example.com/record1' },
                          { no: 2, title: 'Değişkenler ve Veri Tipleri', date: '2024-02-03 18:00', status: 'completed', recordLink: 'https://example.com/record2' },
                          { no: 3, title: 'Koşullu İfadeler', date: '2024-02-08 18:00', status: 'completed', recordLink: 'https://example.com/record3' },
                          { no: 4, title: 'Döngüler - For ve While', date: '2024-02-10 18:00', status: 'upcoming', recordLink: null },
                          { no: 5, title: 'Listeler ve Tuple’lar', date: '2024-02-15 18:00', status: 'upcoming', recordLink: null },
                          { no: 6, title: 'Fonksiyonlar', date: '2024-02-17 18:00', status: 'upcoming', recordLink: null },
                          { no: 7, title: 'Dosya İşlemleri', date: '2024-02-22 18:00', status: 'upcoming', recordLink: null },
                          { no: 8, title: 'Proje: Basit Oyun Yapımı', date: '2024-02-24 18:00', status: 'upcoming', recordLink: null }
                        ].map((lesson) => (
                          <tr key={lesson.no} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{lesson.no}</td>
                            <td className="p-3">{lesson.title}</td>
                            <td className="p-3 text-muted-foreground">{group.teacher}</td>
                            <td className="p-3">
                              <div className="text-sm">
                                {format(new Date(lesson.date), 'dd MMMM yyyy', { locale: tr })}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {format(new Date(lesson.date), 'HH:mm', { locale: tr })}
                              </div>
                            </td>
                            <td className="p-3">
                              <a 
                                href={group.zoomLink} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:text-blue-700 text-sm"
                              >
                                Derse Katıl
                              </a>
                            </td>
                            <td className="p-3">
                              {lesson.recordLink ? (
                                <a 
                                  href={lesson.recordLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-green-600 hover:text-green-700 text-sm"
                                >
                                  Kaydı İzle
                                </a>
                              ) : (
                                <span className="text-gray-400 text-sm">Henüz yok</span>
                              )}
                            </td>
                            <td className="p-3">
                              <Badge 
                                variant={lesson.status === 'completed' ? 'default' : 'outline'}
                                className="text-xs"
                              >
                                {lesson.status === 'completed' ? 'Tamamlandı' : 'Gelecek'}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p><strong>Not:</strong> Tarihe tıklayarak ders tarihini değiştirebilirsiniz.</p>
                    <p>Eğer yeni tarih sonraki dersin tarihini geçerse, tüm sonraki dersler otomatik olarak kaydırılır.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ödev Takibi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 1, title: 'Python Kurulumu', dueDate: '2024-02-05', submitted: 6, total: 8 },
                      { id: 2, title: 'İlk Program Yazma', dueDate: '2024-02-12', submitted: 4, total: 8 },
                      { id: 3, title: 'Değişkenler ve Veri Tipleri', dueDate: '2024-02-19', submitted: 2, total: 8 }
                    ].map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Teslim Tarihi: {new Date(assignment.dueDate).toLocaleDateString('tr-TR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {assignment.submitted}/{assignment.total} teslim edildi
                          </p>
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Yoklama Takibi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left p-2 border-b">Öğrenci</th>
                          {moduleBasedLessons.slice(0, 6).map((lesson) => (
                            <th key={lesson.code} className="text-center p-2 border-b text-xs">
                              <div>{lesson.code}</div>
                              <div className="text-xs text-muted-foreground">
                                {format(new Date(lesson.date), 'dd/MM', { locale: tr })}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id}>
                            <td className="p-2 border-b font-medium">{student.name}</td>
                            {moduleBasedLessons.slice(0, 6).map((lesson) => (
                              <td key={lesson.code} className="p-2 border-b text-center">
                                <Select
                                  value={getAttendanceStatus(student.id, lesson.date)}
                                  onValueChange={(value: 'present' | 'absent' | 'excused') => 
                                    handleAttendanceChange(student.id, lesson.date, value)
                                  }
                                >
                                  <SelectTrigger className="w-20 h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="present">✓</SelectItem>
                                    <SelectItem value="absent">✗</SelectItem>
                                    <SelectItem value="excused">M</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                    <span>✓ Geldi</span>
                    <span>✗ Gelmedi</span>
                    <span>M Mazereti Var</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeaderGroupDetail;