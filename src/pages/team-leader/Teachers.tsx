import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Plus, Edit, Eye, Trash2, Mail, Phone, Search } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  courses: string[];
  age: number;
  address: string;
  registrationDate: Date;
  username: string;
  password: string;
  status: 'active' | 'inactive';
}

const TeamLeaderTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: 'Fatma Kaya',
      email: 'fatma.kaya@email.com',
      phone: '0532 111 2222',
      courses: ['Python Başlangıç', 'Scratch Programlama'],
      age: 28,
      address: 'İstanbul, Beşiktaş',
      registrationDate: new Date('2024-01-10'),
      username: 'fatma.kaya',
      password: 'Fat789#$%',
      status: 'active'
    },
    {
      id: 2,
      name: 'Ali Veli',
      email: 'ali.veli@email.com',
      phone: '0533 222 3333',
      courses: ['Web Tasarım', 'JavaScript'],
      age: 32,
      address: 'Ankara, Kızılay',
      registrationDate: new Date('2024-01-12'),
      username: 'ali.veli',
      password: 'Ali456&*()',
      status: 'active'
    }
  ]);

  const [availableCourses] = useState([
    'Python Başlangıç',
    'Scratch Programlama',
    'Web Tasarım',
    'JavaScript',
    'Kodu Programlama',
    'Robotik'
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 0,
    address: '',
    selectedCourses: [] as string[]
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const generateCredentials = (name: string) => {
    const username = name.toLowerCase().replace(' ', '.');
    const password = Math.random().toString(36).slice(-8) + '#$%';
    return { username, password };
  };

  const handleAddTeacher = () => {
    const credentials = generateCredentials(formData.name);
    const newTeacher: Teacher = {
      id: teachers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      courses: formData.selectedCourses,
      age: formData.age,
      address: formData.address,
      registrationDate: new Date(),
      username: credentials.username,
      password: credentials.password,
      status: 'active'
    };
    setTeachers([...teachers, newTeacher]);
    setFormData({ name: '', email: '', phone: '', age: 0, address: '', selectedCourses: [] });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTeacher = (teacherId: number) => {
    setTeachers(teachers.filter(t => t.id !== teacherId));
  };

  const handleUpdateTeacher = () => {
    if (editingTeacher) {
      setTeachers(teachers.map(t => 
        t.id === editingTeacher.id 
          ? {
              ...t,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              age: formData.age,
              address: formData.address,
              courses: formData.selectedCourses
            }
          : t
      ));
      setFormData({ name: '', email: '', phone: '', age: 0, address: '', selectedCourses: [] });
      setEditingTeacher(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleCourseSelection = (course: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        selectedCourses: [...formData.selectedCourses, course]
      });
    } else {
      setFormData({
        ...formData,
        selectedCourses: formData.selectedCourses.filter(c => c !== course)
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Öğretmen Yönetimi</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni Öğretmen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Öğretmen Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teacherName">Öğretmen Adı</Label>
                  <Input
                    id="teacherName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Fatma Kaya"
                  />
                </div>
                <div>
                  <Label htmlFor="teacherAge">Yaş</Label>
                  <Input
                    id="teacherAge"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    placeholder="28"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teacherEmail">E-posta</Label>
                  <Input
                    id="teacherEmail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="fatma@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="teacherPhone">Telefon</Label>
                  <Input
                    id="teacherPhone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0532 111 2222"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="teacherAddress">Adres</Label>
                <Input
                  id="teacherAddress"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="İstanbul, Beşiktaş"
                />
              </div>
              <div>
                <Label>Verdiği Kurslar ({formData.selectedCourses.length} seçili)</Label>
                <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                  {availableCourses.map((course) => (
                    <div key={course} className="flex items-center space-x-2">
                      <Checkbox
                        id={`course-${course}`}
                        checked={formData.selectedCourses.includes(course)}
                        onCheckedChange={(checked) => handleCourseSelection(course, checked as boolean)}
                      />
                      <Label htmlFor={`course-${course}`} className="text-sm">
                        {course}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Not:</strong> Kullanıcı adı ve şifre otomatik olarak oluşturulacaktır.
                </p>
                <p className="text-xs text-muted-foreground">
                  Kullanıcı adı: öğretmen adından otomatik oluşturulur (fatma.kaya)
                </p>
              </div>
              <Button onClick={handleAddTeacher} className="w-full" disabled={!formData.name || !formData.email || formData.selectedCourses.length === 0}>
                Öğretmeni Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Öğretmen ara (ad, e-posta, kurs)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <div>{teacher.name}</div>
                  <div className="text-sm font-normal text-muted-foreground">{teacher.age} yaş</div>
                </div>
                <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                  {teacher.status === 'active' ? 'Aktif' : 'Pasif'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{teacher.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{teacher.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Verdiği Kurslar:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.courses.map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Kayıt:</strong> {teacher.registrationDate.toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detay
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setEditingTeacher(teacher);
                    setFormData({
                      name: teacher.name,
                      email: teacher.email,
                      phone: teacher.phone,
                      age: teacher.age,
                      address: teacher.address,
                      selectedCourses: teacher.courses
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
                  onClick={() => handleDeleteTeacher(teacher.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Öğretmen Detay Dialog */}
      <Dialog open={!!selectedTeacher} onOpenChange={() => setSelectedTeacher(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Öğretmen Detayları</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ad Soyad</Label>
                  <p className="text-sm">{selectedTeacher.name}</p>
                </div>
                <div>
                  <Label>Yaş</Label>
                  <p className="text-sm">{selectedTeacher.age}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>E-posta</Label>
                  <p className="text-sm">{selectedTeacher.email}</p>
                </div>
                <div>
                  <Label>Telefon</Label>
                  <p className="text-sm">{selectedTeacher.phone}</p>
                </div>
              </div>
              <div>
                <Label>Adres</Label>
                <p className="text-sm">{selectedTeacher.address}</p>
              </div>
              <div>
                <Label>Verdiği Kurslar</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTeacher.courses.map((course, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kullanıcı Adı</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{selectedTeacher.username}</p>
                </div>
                <div>
                  <Label>Şifre</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{selectedTeacher.password}</p>
                </div>
              </div>
              <div>
                <Label>Kayıt Tarihi</Label>
                <p className="text-sm">{selectedTeacher.registrationDate.toLocaleDateString('tr-TR')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Öğretmen Düzenleme Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Öğretmen Düzenle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editTeacherName">Öğretmen Adı</Label>
                <Input
                  id="editTeacherName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Fatma Kaya"
                />
              </div>
              <div>
                <Label htmlFor="editTeacherAge">Yaş</Label>
                <Input
                  id="editTeacherAge"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  placeholder="28"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editTeacherEmail">E-posta</Label>
                <Input
                  id="editTeacherEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="fatma@email.com"
                />
              </div>
              <div>
                <Label htmlFor="editTeacherPhone">Telefon</Label>
                <Input
                  id="editTeacherPhone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0532 111 2222"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editTeacherAddress">Adres</Label>
              <Input
                id="editTeacherAddress"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="İstanbul, Beşiktaş"
              />
            </div>
            <div>
              <Label>Verdiği Kurslar ({formData.selectedCourses.length} seçili)</Label>
              <div className="max-h-40 overflow-y-auto border rounded-md p-3 space-y-2">
                {availableCourses.map((course) => (
                  <div key={course} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-course-${course}`}
                      checked={formData.selectedCourses.includes(course)}
                      onCheckedChange={(checked) => handleCourseSelection(course, checked as boolean)}
                    />
                    <Label htmlFor={`edit-course-${course}`} className="text-sm">
                      {course}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={handleUpdateTeacher} className="w-full" disabled={!formData.name || !formData.email || formData.selectedCourses.length === 0}>
              Öğretmeni Güncelle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamLeaderTeachers;