import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Clock, Trophy, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

const StudentCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  
  const courses = [
    {
      id: 1,
      title: 'Python Programlama',
      description: 'Sıfırdan Python öğren ve projeler geliştir',
      progress: 65,
      totalLessons: 32,
      completedLessons: 21,
      modules: [
        {
          id: 1,
          name: 'Modül 1 - Python Temelleri',
          progress: 100,
          totalLessons: 8,
          completedLessons: 8,
          lessons: [
            { id: 1, name: 'Python Kurulumu', completed: true, activities: ['Kurulum Videosu', 'İlk Program'] },
            { id: 2, name: 'Değişkenler', completed: true, activities: ['Değişken Tanımlama', 'Veri Tipleri'] },
            { id: 3, name: 'Operatörler', completed: true, activities: ['Matematik İşlemleri', 'Karşılaştırma'] }
          ],
          homework: [
            { id: 1, name: 'Python Kurulumu Kontrolü', status: 'completed' },
            { id: 2, name: 'Değişken Egzersizleri', status: 'completed' }
          ]
        },
        {
          id: 2,
          name: 'Modül 2 - Kontrol Yapıları',
          progress: 60,
          totalLessons: 6,
          completedLessons: 4,
          lessons: [
            { id: 4, name: 'If-Else Yapısı', completed: true, activities: ['Karar Verme', 'Koşul Örnekleri'] },
            { id: 5, name: 'Döngüler', completed: true, activities: ['For Döngüsü', 'While Döngüsü'] },
            { id: 6, name: 'Fonksiyonlar', completed: false, activities: ['Fonksiyon Tanımlama', 'Parametreler'] }
          ],
          homework: [
            { id: 3, name: 'Koşul Egzersizleri', status: 'not_passed' },
            { id: 4, name: 'Döngü Örnekleri', status: 'pending' }
          ]
        },
        {
          id: 3,
          name: 'Modül 3 - Veri Yapıları',
          progress: 0,
          totalLessons: 8,
          completedLessons: 0,
          lessons: [
            { id: 7, name: 'Listeler', completed: false, activities: ['Liste İşlemleri', 'Liste Metodları'] },
            { id: 8, name: 'Sözlükler', completed: false, activities: ['Sözlük Kullanımı', 'Anahtar-Değer'] }
          ],
          homework: [
            { id: 5, name: 'Liste Egzersizleri', status: 'pending' },
            { id: 6, name: 'Sözlük Örnekleri', status: 'pending' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Scratch ile Oyun Geliştirme',
      description: 'Eğlenceli oyunlar yaparak programlamayı öğren',
      progress: 80,
      totalLessons: 24,
      completedLessons: 19,
      modules: [
        {
          id: 4,
          name: 'Modül 1 - Scratch Temelleri',
          progress: 100,
          totalLessons: 6,
          completedLessons: 6,
          lessons: [
            { id: 9, name: 'Scratch Arayüzü', completed: true, activities: ['Arayüz Tanıtımı', 'İlk Proje'] }
          ],
          homework: [
            { id: 7, name: 'Scratch Tanıma', status: 'completed' }
          ]
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'not_passed': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'not_passed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (selectedCourse) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSelectedCourse(null);
              setSelectedModule(null);
              setSelectedLesson(null);
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kurslarım
          </Button>
        </div>

        {/* Course Header Card */}
        <Card className="bg-gradient-to-r from-primary to-accent text-white">
          <CardHeader>
            <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
            <p className="text-white/80">{selectedCourse.description}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Tamamlanan {selectedCourse.completedLessons} / {selectedCourse.totalLessons} ders</span>
                <span>{selectedCourse.progress}%</span>
              </div>
              <Progress value={selectedCourse.progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="in-class" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="in-class">Sınıf İçi</TabsTrigger>
            <TabsTrigger value="homework">Ev Ödevi</TabsTrigger>
          </TabsList>

          {/* In Class Content */}
          <TabsContent value="in-class" className="space-y-6">
            {/* Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedCourse.modules.map((module: any) => (
                <Card 
                  key={module.id} 
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    selectedModule?.id === module.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedModule(module);
                    setSelectedLesson(null);
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {module.completedLessons}/{module.totalLessons}
                      </Badge>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tamamlanan {module.completedLessons} / {module.totalLessons} ders
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Progress value={module.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Module Lessons */}
            {selectedModule && (
              <Card>
                <CardHeader>
                  <CardTitle>Dersler - {selectedModule.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedModule.lessons.map((lesson: any) => (
                      <div 
                        key={lesson.id}
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedLesson?.id === lesson.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-muted-foreground" />
                            )}
                            <span className="font-medium">{lesson.name}</span>
                          </div>
                          <Badge variant={lesson.completed ? "default" : "secondary"}>
                            {lesson.completed ? "Tamamlandı" : "Bekliyor"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Selected Lesson Activities */}
            {selectedLesson && (
              <Card>
                <CardHeader>
                  <CardTitle>Etkinlikler - {selectedLesson.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedLesson.activities.map((activity: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Play className="h-4 w-4 text-primary" />
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Homework Content */}
          <TabsContent value="homework" className="space-y-6">
            {/* Module Cards for Homework */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedCourse.modules.map((module: any) => (
                <Card 
                  key={module.id} 
                  className={`cursor-pointer hover:shadow-lg transition-all ${
                    selectedModule?.id === module.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedModule(module)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {module.homework.filter((h: any) => h.status === 'completed').length}/{module.homework.length}
                      </Badge>
                      <Trophy className="h-4 w-4 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {module.homework.length} ev ödevi
                    </p>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Selected Module Homework */}
            {selectedModule && (
              <Card>
                <CardHeader>
                  <CardTitle>Ev Ödevleri - {selectedModule.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedModule.homework.map((homework: any) => (
                      <div key={homework.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(homework.status)}
                          <span className="font-medium">{homework.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${getStatusColor(homework.status)}`}>
                            {homework.status === 'completed' ? 'Tamamlandı' : 
                             homework.status === 'not_passed' ? 'Geçilmedi' : 'Bekliyor'}
                          </span>
                          <Badge variant={homework.status === 'completed' ? 'default' : 'secondary'}>
                            0/0
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Kurslarım</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCourse(course)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {course.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>İlerleme</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {course.completedLessons} / {course.totalLessons} ders tamamlandı
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {course.modules.length} modül
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {course.completedLessons} ders
                </div>
              </div>

              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Kursa Git
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;