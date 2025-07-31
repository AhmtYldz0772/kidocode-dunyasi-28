import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, Clock, ArrowLeft, Play, FileText, Target } from 'lucide-react';

const TeacherCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const courses = [
    {
      id: 1,
      courseId: 'PY_BASIC_2024_8_10',
      title: 'Python Programlama Temelleri',
      description: 'Çocuklar için Python programlama temelleri',
      ageGroup: '8-10 yaş',
      duration: '8 hafta',
      level: 'Başlangıç',
      modules: [
        {
          id: 1,
          name: 'Python Giriş',
          lessons: [
            { id: 1, name: 'Python Nedir?', activities: ['Giriş Videosu', 'İlk Kod Yazma'], homework: 'Python Kurulumu' },
            { id: 2, name: 'Değişkenler', activities: ['Değişken Tanımlama', 'Sayı Oyunları'], homework: 'Değişken Örnekleri' }
          ]
        },
        {
          id: 2,
          name: 'Temel Kavramlar',
          lessons: [
            { id: 3, name: 'Veri Tipleri', activities: ['String Manipülasyonu', 'Sayı İşlemleri'], homework: 'Veri Tipi Örnekleri' },
            { id: 4, name: 'Koşullar', activities: ['If-Else Yapıları', 'Karar Oyunları'], homework: 'Koşul Problemleri' }
          ]
        },
        {
          id: 3,
          name: 'Döngüler',
          lessons: [
            { id: 5, name: 'For Döngüleri', activities: ['Tekrar Oyunları', 'Sayma Problemleri'], homework: 'Döngü Örnekleri' },
            { id: 6, name: 'While Döngüleri', activities: ['Koşullu Tekrarlar', 'Sonsuz Döngüler'], homework: 'While Problemleri' }
          ]
        },
        {
          id: 4,
          name: 'Fonksiyonlar',
          lessons: [
            { id: 7, name: 'Fonksiyon Tanımlama', activities: ['Basit Fonksiyonlar', 'Parametre Kullanımı'], homework: 'Fonksiyon Yazma' },
            { id: 8, name: 'Return Değerleri', activities: ['Geri Dönüş Değerleri', 'Hesaplama Fonksiyonları'], homework: 'Hesap Makinesi' }
          ]
        }
      ]
    },
    {
      id: 2,
      courseId: 'SCRATCH_GAME_2024_10_12',
      title: 'Scratch ile Oyun Geliştirme',
      description: 'Görsel programlama ile oyun yapımı',
      ageGroup: '10-12 yaş',
      duration: '6 hafta',
      level: 'Orta',
      modules: [
        {
          id: 1,
          name: 'Scratch Temelleri',
          lessons: [
            { id: 1, name: 'Scratch Arayüzü', activities: ['Arayüz Tanıma', 'İlk Sprite'], homework: 'Sprite Oluşturma' },
            { id: 2, name: 'Hareket Blokları', activities: ['Sprite Hareketi', 'Yön Kontrolü'], homework: 'Hareket Animasyonu' }
          ]
        },
        {
          id: 2,
          name: 'Oyun Mekaniği',
          lessons: [
            { id: 3, name: 'Çarpışma Algılama', activities: ['Collision Detection', 'Oyun Kuralları'], homework: 'Basit Top Oyunu' },
            { id: 4, name: 'Skor Sistemi', activities: ['Değişkenler', 'Skor Gösterimi'], homework: 'Skor Tablosu' }
          ]
        }
      ]
    }
  ];

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedModule(null);
    setSelectedLesson(null);
  };

  const handleModuleClick = (module) => {
    setSelectedModule(module);
    setSelectedLesson(null);
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else if (selectedModule) {
      setSelectedModule(null);
    } else if (selectedCourse) {
      setSelectedCourse(null);
    }
  };

  // Ana kurs listesi görünümü
  if (!selectedCourse) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kurslarım</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleCourseClick(course)}>
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">{course.duration}</p>
                    <p className="text-xs text-muted-foreground">Süre</p>
                  </div>
                  <div>
                    <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">{course.ageGroup}</p>
                    <p className="text-xs text-muted-foreground">Yaş Grubu</p>
                  </div>
                </div>

                <div className="text-center">
                  <Badge variant="secondary">{course.level}</Badge>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Kurs Kodu</p>
                  <p className="font-mono text-sm">{course.courseId}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Modül listesi görünümü
  if (selectedCourse && !selectedModule) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{selectedCourse.title}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kurs Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Kurs Kodu</p>
                <p className="font-mono">{selectedCourse.courseId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Süre</p>
                <p className="font-medium">{selectedCourse.duration}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Yaş Grubu</p>
                <p className="font-medium">{selectedCourse.ageGroup}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seviye</p>
                <Badge variant="secondary">{selectedCourse.level}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCourse.modules.map((module, index) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleModuleClick(module)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    M{index + 1}
                  </span>
                  {module.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Ders Sayısı</span>
                    <span className="font-medium">{module.lessons.length} ders</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">%75 tamamlandı</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Ders listesi görünümü
  if (selectedCourse && selectedModule && !selectedLesson) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{selectedModule.name}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Modül: {selectedModule.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Bu modül {selectedModule.lessons.length} ders içermektedir.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedModule.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleLessonClick(lesson)}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {lesson.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Etkinlikler</p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.activities.map((activity, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Ödev</p>
                    <Badge variant="secondary">{lesson.homework}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Ders detay görünümü
  if (selectedCourse && selectedModule && selectedLesson) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Play className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">{selectedLesson.name}</h1>
        </div>

        <Tabs defaultValue="activities" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activities">Etkinlikler</TabsTrigger>
            <TabsTrigger value="homework">Ödev</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Ders Etkinlikleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedLesson.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity}</p>
                        <p className="text-sm text-muted-foreground">Etkinlik süresi: 15-20 dakika</p>
                      </div>
                      <Badge variant="outline">Etkinlik</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Ev Ödevi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">{selectedLesson.homework}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Bu ödev, derste öğrenilen konuları pekiştirmek için tasarlanmıştır.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Bireysel Çalışma</Badge>
                    <Badge variant="outline">Teslim: 1 Hafta</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return null;
};

export default TeacherCourses;