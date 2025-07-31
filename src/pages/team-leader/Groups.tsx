import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Plus, Eye, Edit, Calendar as CalendarIcon, Trash2, Search } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Teacher {
  id: number;
  name: string;
}

interface Student {
  id: number;
  name: string;
  age: number;
}

interface Course {
  id: string;
  name: string;
}

interface Group {
  id: number;
  name: string;
  students: number[];
  teacher: string;
  teacherId: number;
  level: string;
  course: string;
  courseId: string;
  startDate: Date;
  endDate: Date;
  weeklyLessons: number;
  studentCount: number;
  whatsappLink?: string;
}

const TeamLeaderGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([
    { 
      id: 1, 
      name: 'TUR_PRE_2024_8-10_001', 
      students: [1, 2, 3, 4, 5, 6, 7, 8], 
      teacher: 'Fatma Kaya', 
      teacherId: 1,
      level: 'Başlangıç',
      course: 'Python Başlangıç',
      courseId: 'PYT_BEG_2024',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-06-01'),
      weeklyLessons: 2,
      studentCount: 8,
      whatsappLink: 'https://chat.whatsapp.com/example1'
    },
    { 
      id: 2, 
      name: 'SCR_INT_2024_8-10_001', 
      students: [9, 10, 11, 12, 13, 14], 
      teacher: 'Ali Veli', 
      teacherId: 2,
      level: 'Orta',
      course: 'Scratch Programlama',
      courseId: 'SCR_INT_2024',
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-06-15'),
      weeklyLessons: 1,
      studentCount: 6,
      whatsappLink: 'https://chat.whatsapp.com/example2'
    },
  ]);

  const [teachers] = useState<Teacher[]>([
    { id: 1, name: 'Fatma Kaya' },
    { id: 2, name: 'Ali Veli' },
    { id: 3, name: 'Ayşe Demir' },
    { id: 4, name: 'Mehmet Yılmaz' },
  ]);

  const [students] = useState<Student[]>([
    { id: 1, name: 'Ayşe Yılmaz', age: 8 },
    { id: 2, name: 'Mehmet Kaya', age: 9 },
    { id: 3, name: 'Zeynep Demir', age: 8 },
    { id: 4, name: 'Ali Çelik', age: 10 },
    { id: 5, name: 'Selin Öz', age: 9 },
    { id: 6, name: 'Cem Aydın', age: 8 },
    { id: 7, name: 'Elif Kara', age: 9 },
    { id: 8, name: 'Murat Yıldız', age: 10 },
    { id: 9, name: 'Defne Ak', age: 8 },
    { id: 10, name: 'Berk Güzel', age: 9 },
    { id: 11, name: 'İpek Tan', age: 8 },
    { id: 12, name: 'Kaan Erdoğan', age: 10 },
    { id: 13, name: 'Lara Şahin', age: 9 },
    { id: 14, name: 'Ege Aslan', age: 8 },
  ]);

  const [courses] = useState<Course[]>([
    { id: 'PYT_BEG_2024', name: 'Python Başlangıç 2024' },
    { id: 'SCR_INT_2024', name: 'Scratch Programlama 2024' },
    { id: 'WEB_ADV_2024', name: 'Web Tasarım İleri 2024' },
    { id: 'KDU_BEG_2024', name: 'Kodu Programlama 2024' },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    teacherId: '',
    courseId: '',
    startDate: new Date(),
    endDate: new Date(),
    weeklyLessons: 1,
    selectedStudents: [] as number[],
    whatsappLink: ''
  });
  const [studentSearch, setStudentSearch] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const handleAddGroup = () => {
    const selectedTeacher = teachers.find(t => t.id === parseInt(formData.teacherId));
    const selectedCourse = courses.find(c => c.id === formData.courseId);
    
    if (selectedTeacher && selectedCourse) {
      const newGroup: Group = {
        id: groups.length + 1,
        name: formData.name,
        students: formData.selectedStudents,
        teacher: selectedTeacher.name,
        teacherId: selectedTeacher.id,
        level: 'Başlangıç',
        course: selectedCourse.name,
        courseId: selectedCourse.id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        weeklyLessons: formData.weeklyLessons,
        studentCount: formData.selectedStudents.length,
        whatsappLink: formData.whatsappLink
      };
      setGroups([...groups, newGroup]);
      resetForm();
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateGroup = () => {
    if (editingGroup) {
      const selectedTeacher = teachers.find(t => t.id === parseInt(formData.teacherId));
      const selectedCourse = courses.find(c => c.id === formData.courseId);
      
      if (selectedTeacher && selectedCourse) {
        setGroups(groups.map(g => 
          g.id === editingGroup.id 
            ? {
                ...g,
                name: formData.name,
                students: formData.selectedStudents,
                teacher: selectedTeacher.name,
                teacherId: selectedTeacher.id,
                course: selectedCourse.name,
                courseId: selectedCourse.id,
                startDate: formData.startDate,
                endDate: formData.endDate,
                weeklyLessons: formData.weeklyLessons,
                studentCount: formData.selectedStudents.length,
                whatsappLink: formData.whatsappLink
              }
            : g
        ));
        resetForm();
        setEditingGroup(null);
        setIsEditDialogOpen(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      teacherId: '',
      courseId: '',
      startDate: new Date(),
      endDate: new Date(),
      weeklyLessons: 1,
      selectedStudents: [],
      whatsappLink: ''
    });
  };

  const handleStudentSelection = (studentId: number, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        selectedStudents: [...formData.selectedStudents, studentId]
      });
    } else {
      setFormData({
        ...formData,
        selectedStudents: formData.selectedStudents.filter(id => id !== studentId)
      });
    }
  };

  const handleDeleteGroup = (groupId: number) => {
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const getGroupStudents = (studentIds: number[]) => {
    return students.filter(s => studentIds.includes(s.id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Öğrenci Grupları</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni Grup Oluştur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Grup Oluştur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">Grup Adı</Label>
                <Input
                  id="groupName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="TUR_PRE_2024_8-10_001"
                />
              </div>

              <div>
                <Label htmlFor="whatsappLink">WhatsApp Davet Bağlantısı</Label>
                <Input
                  id="whatsappLink"
                  value={formData.whatsappLink || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>
              
              <div>
                <Label htmlFor="teacher">Öğretmen Seçin</Label>
                <Select value={formData.teacherId} onValueChange={(value) => setFormData({ ...formData, teacherId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Öğretmen seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="course">Kurs Seçin</Label>
                <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kurs seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Başlama Tarihi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP", { locale: tr }) : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Bitiş Tarihi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP", { locale: tr }) : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="weeklyLessons">Haftada Kaç Ders</Label>
                <Select value={formData.weeklyLessons.toString()} onValueChange={(value) => setFormData({ ...formData, weeklyLessons: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Haftalık ders sayısını seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Ders</SelectItem>
                    <SelectItem value="2">2 Ders</SelectItem>
                    <SelectItem value="3">3 Ders</SelectItem>
                    <SelectItem value="4">4 Ders</SelectItem>
                    <SelectItem value="5">5 Ders</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Öğrenci Seçin ({formData.selectedStudents.length} seçili)</Label>
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Öğrenci ara..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                    {filteredStudents.map((student) => (
                      <div key={student.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`student-${student.id}`}
                          checked={formData.selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                        />
                        <Label htmlFor={`student-${student.id}`} className="text-sm">
                          {student.name} ({student.age} yaş)
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleAddGroup} className="w-full" disabled={!formData.name || !formData.teacherId || !formData.courseId || formData.selectedStudents.length === 0}>
                Grubu Oluştur
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Düzenleme Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Grubu Düzenle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editGroupName">Grup Adı</Label>
                <Input
                  id="editGroupName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="TUR_PRE_2024_8-10_001"
                />
              </div>

              <div>
                <Label htmlFor="editWhatsappLink">WhatsApp Davet Bağlantısı</Label>
                <Input
                  id="editWhatsappLink"
                  value={formData.whatsappLink || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>
              
              <div>
                <Label htmlFor="editTeacher">Öğretmen Seçin</Label>
                <Select value={formData.teacherId} onValueChange={(value) => setFormData({ ...formData, teacherId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Öğretmen seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="editCourse">Kurs Seçin</Label>
                <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kurs seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Başlama Tarihi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP", { locale: tr }) : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Bitiş Tarihi</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP", { locale: tr }) : "Tarih seçin"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="editWeeklyLessons">Haftada Kaç Ders</Label>
                <Select value={formData.weeklyLessons.toString()} onValueChange={(value) => setFormData({ ...formData, weeklyLessons: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Haftalık ders sayısını seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Ders</SelectItem>
                    <SelectItem value="2">2 Ders</SelectItem>
                    <SelectItem value="3">3 Ders</SelectItem>
                    <SelectItem value="4">4 Ders</SelectItem>
                    <SelectItem value="5">5 Ders</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Öğrenci Seçin ({formData.selectedStudents.length} seçili)</Label>
                <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-student-${student.id}`}
                        checked={formData.selectedStudents.includes(student.id)}
                        onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                      />
                      <Label htmlFor={`edit-student-${student.id}`} className="text-sm">
                        {student.name} ({student.age} yaş)
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleUpdateGroup} className="w-full" disabled={!formData.name || !formData.teacherId || !formData.courseId || formData.selectedStudents.length === 0}>
                Grubu Güncelle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="space-y-1">
                  <div>{group.name}</div>
                  <div className="text-sm font-normal text-muted-foreground">{group.course}</div>
                </div>
                <Badge>{group.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Öğretmen:</strong> {group.teacher}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Öğrenci Sayısı:</strong> {group.studentCount}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Başlama:</strong> {format(group.startDate, "dd MMM yyyy", { locale: tr })}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Bitiş:</strong> {format(group.endDate, "dd MMM yyyy", { locale: tr })}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Haftalık Ders:</strong> {group.weeklyLessons} ders
                </p>
                {group.whatsappLink && (
                  <p className="text-sm text-muted-foreground">
                    <strong>WhatsApp:</strong> <a href={group.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Gruba Katıl</a>
                  </p>
                )}
                <div className="text-sm text-muted-foreground">
                  <strong>Öğrenciler:</strong>
                  <div className="mt-1 space-y-1">
                    {getGroupStudents(group.students).slice(0, 3).map((student) => (
                      <div key={student.id} className="text-xs">• {student.name}</div>
                    ))}
                    {group.students.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{group.students.length - 3} diğer öğrenci
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/team-leader/groups/${group.id}`)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Detaylar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setEditingGroup(group);
                    setFormData({
                      name: group.name,
                      teacherId: group.teacherId.toString(),
                      courseId: group.courseId,
                      startDate: group.startDate,
                      endDate: group.endDate,
                      weeklyLessons: group.weeklyLessons,
                      selectedStudents: group.students,
                      whatsappLink: group.whatsappLink || ''
                    });
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamLeaderGroups;