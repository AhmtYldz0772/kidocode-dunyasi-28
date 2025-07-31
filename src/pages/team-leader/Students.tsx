import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Edit, Eye, Trash2, Search } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  activeGroups: string[];
  parentName: string;
  address: string;
  registrationDate: Date;
  username: string;
  password: string;
  status: 'active' | 'inactive';
}

const TeamLeaderStudents = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      email: 'ayse.yilmaz@email.com',
      phone: '0532 123 4567',
      age: 8,
      activeGroups: ['TUR_PRE_2024_8-10_001'],
      parentName: 'Mehmet Yılmaz',
      address: 'İstanbul, Kadıköy',
      registrationDate: new Date('2024-01-15'),
      username: 'ayse.yilmaz',
      password: 'Ay123!@#',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mehmet Kaya',
      email: 'mehmet.kaya@email.com',
      phone: '0533 234 5678',
      age: 9,
      activeGroups: ['SCR_INT_2024_8-10_001'],
      parentName: 'Fatma Kaya',
      address: 'Ankara, Çankaya',
      registrationDate: new Date('2024-01-20'),
      username: 'mehmet.kaya',
      password: 'Meh456$%^',
      status: 'active'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: 0,
    parentName: '',
    address: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateCredentials = (name: string) => {
    const username = name.toLowerCase().replace(' ', '.');
    const password = Math.random().toString(36).slice(-8) + '!@#';
    return { username, password };
  };

  const handleAddStudent = () => {
    const credentials = generateCredentials(formData.name);
    const newStudent: Student = {
      id: students.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      activeGroups: [],
      parentName: formData.parentName,
      address: formData.address,
      registrationDate: new Date(),
      username: credentials.username,
      password: credentials.password,
      status: 'active'
    };
    setStudents([...students, newStudent]);
    setFormData({ name: '', email: '', phone: '', age: 0, parentName: '', address: '' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteStudent = (studentId: number) => {
    setStudents(students.filter(s => s.id !== studentId));
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? {
              ...s,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              age: formData.age,
              parentName: formData.parentName,
              address: formData.address
            }
          : s
      ));
      setFormData({ name: '', email: '', phone: '', age: 0, parentName: '', address: '' });
      setEditingStudent(null);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Öğrenci Yönetimi</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni Öğrenci
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Öğrenci Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentName">Öğrenci Adı Soyadı</Label>
                  <Input
                    id="studentName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ayşe Yılmaz"
                  />
                </div>
                <div>
                  <Label htmlFor="studentAge">Yaş</Label>
                  <Input
                    id="studentAge"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    placeholder="8"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentEmail">E-posta</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ayse@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="studentPhone">Telefon</Label>
                  <Input
                    id="studentPhone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0532 123 4567"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="parentName">Veli Adı Soyadı</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Mehmet Yılmaz"
                />
              </div>
              <div>
                <Label htmlFor="studentAddress">Adres</Label>
                <Input
                  id="studentAddress"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="İstanbul, Kadıköy"
                />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Not:</strong> Kullanıcı adı ve şifre otomatik olarak oluşturulacaktır.
                </p>
                <p className="text-xs text-muted-foreground">
                  Kullanıcı adı: öğrenci adından otomatik oluşturulur (ayşe.yılmaz)
                </p>
              </div>
              <Button onClick={handleAddStudent} className="w-full" disabled={!formData.name || !formData.email || !formData.parentName}>
                Öğrenciyi Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Öğrenci ara (ad, e-posta, veli adı)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <div>{student.name}</div>
                  <div className="text-sm font-normal text-muted-foreground">{student.age} yaş</div>
                </div>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                  {student.status === 'active' ? 'Aktif' : 'Pasif'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>E-posta:</strong> {student.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Telefon:</strong> {student.phone}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Veli:</strong> {student.parentName}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Aktif Gruplar:</strong> {student.activeGroups.length > 0 ? student.activeGroups.join(', ') : 'Yok'}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Kayıt:</strong> {student.registrationDate.toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedStudent(student)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detay
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setEditingStudent(student);
                    setFormData({
                      name: student.name,
                      email: student.email,
                      phone: student.phone,
                      age: student.age,
                      parentName: student.parentName,
                      address: student.address
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
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Öğrenci Detay Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Öğrenci Detayları</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ad Soyad</Label>
                  <p className="text-sm">{selectedStudent.name}</p>
                </div>
                <div>
                  <Label>Yaş</Label>
                  <p className="text-sm">{selectedStudent.age}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>E-posta</Label>
                  <p className="text-sm">{selectedStudent.email}</p>
                </div>
                <div>
                  <Label>Telefon</Label>
                  <p className="text-sm">{selectedStudent.phone}</p>
                </div>
              </div>
              <div>
                <Label>Veli Adı Soyadı</Label>
                <p className="text-sm">{selectedStudent.parentName}</p>
              </div>
              <div>
                <Label>Adres</Label>
                <p className="text-sm">{selectedStudent.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kullanıcı Adı</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{selectedStudent.username}</p>
                </div>
                <div>
                  <Label>Şifre</Label>
                  <p className="text-sm font-mono bg-muted p-2 rounded">{selectedStudent.password}</p>
                </div>
              </div>
              <div>
                <Label>Kayıt Tarihi</Label>
                <p className="text-sm">{selectedStudent.registrationDate.toLocaleDateString('tr-TR')}</p>
              </div>
              <div>
                <Label>Aktif Gruplar</Label>
                <p className="text-sm">{selectedStudent.activeGroups.length > 0 ? selectedStudent.activeGroups.join(', ') : 'Henüz gruba eklenmemiş'}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Öğrenci Düzenleme Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Öğrenci Düzenle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editStudentName">Öğrenci Adı Soyadı</Label>
                <Input
                  id="editStudentName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ayşe Yılmaz"
                />
              </div>
              <div>
                <Label htmlFor="editStudentAge">Yaş</Label>
                <Input
                  id="editStudentAge"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  placeholder="8"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editStudentEmail">E-posta</Label>
                <Input
                  id="editStudentEmail"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ayse@email.com"
                />
              </div>
              <div>
                <Label htmlFor="editStudentPhone">Telefon</Label>
                <Input
                  id="editStudentPhone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0532 123 4567"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editParentName">Veli Adı Soyadı</Label>
              <Input
                id="editParentName"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                placeholder="Mehmet Yılmaz"
              />
            </div>
            <div>
              <Label htmlFor="editStudentAddress">Adres</Label>
              <Input
                id="editStudentAddress"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="İstanbul, Kadıköy"
              />
            </div>
            <Button onClick={handleUpdateStudent} className="w-full" disabled={!formData.name || !formData.email || !formData.parentName}>
              Öğrenciyi Güncelle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamLeaderStudents;