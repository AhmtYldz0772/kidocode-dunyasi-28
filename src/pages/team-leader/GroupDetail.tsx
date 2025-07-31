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
    whatsappLink: 'https://chat.whatsapp.com/example1'
  };

  const [students] = useState<Student[]>([
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      age: 8,
      email: 'ayse@email.com',
      phone: '0532 123 4567',
      parentName: 'Mehmet Yılmaz',
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
      email: 'mehmet@email.com',
      phone: '0533 234 5678',
      parentName: 'Fatma Kaya',
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

  const lessonDates = [
    '2024-02-01', '2024-02-03', '2024-02-08', '2024-02-10',
    '2024-02-15', '2024-02-17', '2024-02-22', '2024-02-24'
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grup Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle>Grup Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Kurs</Label>
              <p className="text-sm">{group.course}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Öğretmen</Label>
              <p className="text-sm">{group.teacher}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Başlama Tarihi</Label>
              <p className="text-sm">{format(group.startDate, 'dd MMMM yyyy', { locale: tr })}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Bitiş Tarihi</Label>
              <p className="text-sm">{format(group.endDate, 'dd MMMM yyyy', { locale: tr })}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Haftalık Ders</Label>
              <p className="text-sm">{group.weeklyLessons} ders</p>
            </div>
            <div>
              <Label className="text-sm font-medium">WhatsApp Grubu</Label>
              <a href={group.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                Gruba Katıl
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Ana İçerik */}
        <div className="lg:col-span-2">
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
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{student.name} - Öğrenci Detayları</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
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
                              <div>
                                <Label>Veli Adı</Label>
                                <p className="text-sm">{student.parentName}</p>
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
                            </div>
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
                  <CardTitle>Grup Takvimi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lessonDates.map((date, index) => (
                      <div key={date} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Ders {index + 1}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(date), 'dd MMMM yyyy, EEEE', { locale: tr })}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {new Date(date) < new Date() ? 'Tamamlandı' : 'Gelecek'}
                        </Badge>
                      </div>
                    ))}
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
                          {lessonDates.slice(0, 4).map((date) => (
                            <th key={date} className="text-center p-2 border-b text-xs">
                              {format(new Date(date), 'dd/MM', { locale: tr })}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id}>
                            <td className="p-2 border-b font-medium">{student.name}</td>
                            {lessonDates.slice(0, 4).map((date) => (
                              <td key={date} className="p-2 border-b text-center">
                                <Select
                                  value={getAttendanceStatus(student.id, date)}
                                  onValueChange={(value: 'present' | 'absent' | 'excused') => 
                                    handleAttendanceChange(student.id, date, value)
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
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderGroupDetail;