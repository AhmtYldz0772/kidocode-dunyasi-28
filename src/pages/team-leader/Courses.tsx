import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, Plus, ChevronDown, ChevronRight, FileText, Edit, Trash2 } from 'lucide-react';

interface Activity {
  id: number;
  name: string;
  activityId: string;
  link: string;
}

interface Homework {
  id: number;
  name: string;
  homeworkId: string;
  link: string;
}

interface Lesson {
  id: number;
  name: string;
  activities: Activity[];
  homework: Homework[];
}

interface Module {
  id: number;
  name: string;
  lessonCount: number;
  focus: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  courseId: string;
  name: string;
  ageRange: string;
  description: string;
  weekCount: number;
  year: number;
  modules: Module[];
  status: 'active' | 'draft';
}

const TeamLeaderCourses = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      courseId: 'PYT_BEG_2024_8-10_001',
      name: 'Python Başlangıç',
      ageRange: '8-10 yaş',
      description: 'Çocuklar için Python programlama temellerini öğreten kapsamlı kurs',
      weekCount: 16,
      year: 2024,
      modules: [
        {
          id: 1,
          name: 'Python Temelleri',
          lessonCount: 4,
          focus: 'Python programlama temel kavramları',
          lessons: [
            {
              id: 1,
              name: 'Python Nedir?',
              activities: [
                { id: 1, name: 'Giriş Videosu', activityId: 'ACT_001', link: 'https://example.com/video1' },
                { id: 2, name: 'İlk Kod Yazma', activityId: 'ACT_002', link: 'https://example.com/exercise1' }
              ],
              homework: [
                { id: 1, name: 'Python Kurulumu', homeworkId: 'HW_001', link: 'https://example.com/homework1' }
              ]
            }
          ]
        }
      ],
      status: 'active'
    }
  ]);

  const [expandedCourses, setExpandedCourses] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);
  
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    courseId: '',
    name: '',
    ageRange: '',
    description: '',
    weekCount: 0,
    year: new Date().getFullYear()
  });

  const toggleCourseExpansion = (courseId: string) => {
    setExpandedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleLessonExpansion = (lessonId: string) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      courseId: courseFormData.courseId,
      name: courseFormData.name,
      ageRange: courseFormData.ageRange,
      description: courseFormData.description,
      weekCount: courseFormData.weekCount,
      year: courseFormData.year,
      modules: [],
      status: 'draft'
    };
    setCourses([...courses, newCourse]);
    setCourseFormData({ courseId: '', name: '', ageRange: '', description: '', weekCount: 0, year: new Date().getFullYear() });
    setIsAddCourseOpen(false);
  };

  const [moduleDialog, setModuleDialog] = useState({ open: false, courseId: '' });
  const [moduleForm, setModuleForm] = useState({ name: '', lessonCount: 0, focus: '' });

  const addModule = (courseId: string) => {
    setModuleDialog({ open: true, courseId });
  };

  const handleAddModule = () => {
    if (moduleForm.name && moduleForm.lessonCount && moduleForm.focus) {
      setCourses(courses.map(course => 
        course.id === moduleDialog.courseId 
          ? {
              ...course,
              modules: [...course.modules, {
                id: Date.now(),
                name: moduleForm.name,
                lessonCount: moduleForm.lessonCount,
                focus: moduleForm.focus,
                lessons: []
              }]
            }
          : course
      ));
      setModuleForm({ name: '', lessonCount: 0, focus: '' });
      setModuleDialog({ open: false, courseId: '' });
    }
  };

  const [lessonDialog, setLessonDialog] = useState({ open: false, courseId: '', moduleId: 0 });
  const [lessonForm, setLessonForm] = useState({ name: '' });

  const addLesson = (courseId: string, moduleId: number) => {
    setLessonDialog({ open: true, courseId, moduleId });
  };

  const handleAddLesson = () => {
    if (lessonForm.name) {
      setCourses(courses.map(course => 
        course.id === lessonDialog.courseId 
          ? {
              ...course,
              modules: course.modules.map(module =>
                module.id === lessonDialog.moduleId
                  ? {
                      ...module,
                      lessons: [...module.lessons, {
                        id: Date.now(),
                        name: lessonForm.name,
                        activities: [],
                        homework: []
                      }]
                    }
                  : module
              )
            }
          : course
      ));
      setLessonForm({ name: '' });
      setLessonDialog({ open: false, courseId: '', moduleId: 0 });
    }
  };

  const [activityDialog, setActivityDialog] = useState({ open: false, courseId: '', moduleId: 0, lessonId: 0 });
  const [activityForm, setActivityForm] = useState({ name: '', link: '' });

  const addActivity = (courseId: string, moduleId: number, lessonId: number) => {
    setActivityDialog({ open: true, courseId, moduleId, lessonId });
  };

  const handleAddActivity = () => {
    if (activityForm.name && activityForm.link) {
      setCourses(courses.map(course => 
        course.id === activityDialog.courseId 
          ? {
              ...course,
              modules: course.modules.map(module =>
                module.id === activityDialog.moduleId
                  ? {
                      ...module,
                      lessons: module.lessons.map(lesson =>
                        lesson.id === activityDialog.lessonId
                          ? {
                              ...lesson,
                              activities: [...lesson.activities, {
                                id: Date.now(),
                                name: activityForm.name,
                                activityId: `ACT_${Date.now()}`,
                                link: activityForm.link
                              }]
                            }
                          : lesson
                      )
                    }
                  : module
              )
            }
          : course
      ));
      setActivityForm({ name: '', link: '' });
      setActivityDialog({ open: false, courseId: '', moduleId: 0, lessonId: 0 });
    }
  };

  const [homeworkDialog, setHomeworkDialog] = useState({ open: false, courseId: '', moduleId: 0, lessonId: 0 });
  const [homeworkForm, setHomeworkForm] = useState({ name: '', link: '' });

  // Düzenleme state'leri
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingModule, setEditingModule] = useState<{ module: Module; courseId: string } | null>(null);
  const [editingLesson, setEditingLesson] = useState<{ lesson: Lesson; courseId: string; moduleId: number } | null>(null);
  const [editingActivity, setEditingActivity] = useState<{ activity: Activity; courseId: string; moduleId: number; lessonId: number } | null>(null);
  const [editingHomework, setEditingHomework] = useState<{ homework: Homework; courseId: string; moduleId: number; lessonId: number } | null>(null);

  const addHomework = (courseId: string, moduleId: number, lessonId: number) => {
    setHomeworkDialog({ open: true, courseId, moduleId, lessonId });
  };

  const handleAddHomework = () => {
    if (homeworkForm.name && homeworkForm.link) {
      setCourses(courses.map(course => 
        course.id === homeworkDialog.courseId 
          ? {
              ...course,
              modules: course.modules.map(module =>
                module.id === homeworkDialog.moduleId
                  ? {
                      ...module,
                      lessons: module.lessons.map(lesson =>
                        lesson.id === homeworkDialog.lessonId
                          ? {
                              ...lesson,
                              homework: [...lesson.homework, {
                                id: Date.now(),
                                name: homeworkForm.name,
                                homeworkId: `HW_${Date.now()}`,
                                link: homeworkForm.link
                              }]
                            }
                          : lesson
                      )
                    }
                  : module
              )
            }
          : course
      ));
      setHomeworkForm({ name: '', link: '' });
      setHomeworkDialog({ open: false, courseId: '', moduleId: 0, lessonId: 0 });
    }
  };

  // Düzenleme fonksiyonları
  const handleUpdateCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(c => 
        c.id === editingCourse.id 
          ? { ...c, ...courseFormData }
          : c
      ));
      setCourseFormData({ courseId: '', name: '', ageRange: '', description: '', weekCount: 0, year: new Date().getFullYear() });
      setEditingCourse(null);
      setIsAddCourseOpen(false);
    }
  };

  const handleUpdateModule = () => {
    if (editingModule) {
      setCourses(courses.map(course => 
        course.id === editingModule.courseId 
          ? {
              ...course,
              modules: course.modules.map(m => 
                m.id === editingModule.module.id 
                  ? { ...m, ...moduleForm }
                  : m
              )
            }
          : course
      ));
      setModuleForm({ name: '', lessonCount: 0, focus: '' });
      setEditingModule(null);
      setModuleDialog({ open: false, courseId: '' });
    }
  };

  const handleUpdateLesson = () => {
    if (editingLesson) {
      setCourses(courses.map(course => 
        course.id === editingLesson.courseId 
          ? {
              ...course,
              modules: course.modules.map(module =>
                module.id === editingLesson.moduleId
                  ? {
                      ...module,
                      lessons: module.lessons.map(l => 
                        l.id === editingLesson.lesson.id 
                          ? { ...l, ...lessonForm }
                          : l
                      )
                    }
                  : module
              )
            }
          : course
      ));
      setLessonForm({ name: '' });
      setEditingLesson(null);
      setLessonDialog({ open: false, courseId: '', moduleId: 0 });
    }
  };

  const handleUpdateActivity = () => {
    if (editingActivity) {
      setCourses(courses.map(course => 
        course.id === editingActivity.courseId 
          ? {
              ...course,
              modules: course.modules.map(module =>
                module.id === editingActivity.moduleId
                  ? {
                      ...module,
                      lessons: module.lessons.map(lesson =>
                        lesson.id === editingActivity.lessonId
                          ? {
                              ...lesson,
                              activities: lesson.activities.map(a => 
                                a.id === editingActivity.activity.id 
                                  ? { ...a, name: activityForm.name, link: activityForm.link }
                                  : a
                              )
                            }
                          : lesson
                      )
                    }
                  : module
              )
            }
          : course
      ));
      setActivityForm({ name: '', link: '' });
      setEditingActivity(null);
      setActivityDialog({ open: false, courseId: '', moduleId: 0, lessonId: 0 });
    }
  };

  const handleUpdateHomework = () => {
    if (editingHomework) {
      setCourses(courses.map(course => 
        course.id === editingHomework.courseId 
          ? {
              ...course,
              modules: course.modules.map(module =>
                module.id === editingHomework.moduleId
                  ? {
                      ...module,
                      lessons: module.lessons.map(lesson =>
                        lesson.id === editingHomework.lessonId
                          ? {
                              ...lesson,
                              homework: lesson.homework.map(h => 
                                h.id === editingHomework.homework.id 
                                  ? { ...h, name: homeworkForm.name, link: homeworkForm.link }
                                  : h
                              )
                            }
                          : lesson
                      )
                    }
                  : module
              )
            }
          : course
      ));
      setHomeworkForm({ name: '', link: '' });
      setEditingHomework(null);
      setHomeworkDialog({ open: false, courseId: '', moduleId: 0, lessonId: 0 });
    }
  };



  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Kurs Yönetimi</h1>
        </div>
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Yeni Kurs Oluştur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCourse ? 'Kurs Düzenle' : 'Yeni Kurs Oluştur'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="courseId">Kurs ID</Label>
                <Input
                  id="courseId"
                  value={courseFormData.courseId}
                  onChange={(e) => setCourseFormData({ ...courseFormData, courseId: e.target.value })}
                  placeholder="PYT_BEG_2024_8-10_001"
                />
              </div>
              <div>
                <Label htmlFor="courseName">Kurs Adı</Label>
                <Input
                  id="courseName"
                  value={courseFormData.name}
                  onChange={(e) => setCourseFormData({ ...courseFormData, name: e.target.value })}
                  placeholder="Python Başlangıç"
                />
              </div>
              <div>
                <Label htmlFor="ageRange">Yaş Aralığı</Label>
                <Input
                  id="ageRange"
                  value={courseFormData.ageRange}
                  onChange={(e) => setCourseFormData({ ...courseFormData, ageRange: e.target.value })}
                  placeholder="8-10 yaş"
                />
              </div>
              <div>
                <Label htmlFor="weekCount">Kurs Süresi (Hafta)</Label>
                <Input
                  id="weekCount"
                  type="number"
                  value={courseFormData.weekCount}
                  onChange={(e) => setCourseFormData({ ...courseFormData, weekCount: parseInt(e.target.value) || 0 })}
                  placeholder="16"
                />
              </div>
              <div>
                <Label htmlFor="year">Yıl</Label>
                <Input
                  id="year"
                  type="number"
                  value={courseFormData.year}
                  onChange={(e) => setCourseFormData({ ...courseFormData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                  placeholder="2024"
                />
              </div>
              <div>
                <Label htmlFor="courseDescription">Açıklama</Label>
                <Textarea
                  id="courseDescription"
                  value={courseFormData.description}
                  onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                  placeholder="Kurs açıklaması..."
                />
              </div>
              <Button onClick={editingCourse ? handleUpdateCourse : handleAddCourse} className="w-full">
                {editingCourse ? 'Kursu Güncelle' : 'Kursu Oluştur'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCourseExpansion(course.id)}
                  >
                    {expandedCourses.includes(course.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID: {course.courseId}</p>
                    <p className="text-sm text-muted-foreground">{course.ageRange} | {course.weekCount} hafta | {course.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingCourse(course);
                      setCourseFormData({
                        courseId: course.courseId,
                        name: course.name,
                        ageRange: course.ageRange,
                        description: course.description,
                        weekCount: course.weekCount,
                        year: course.year
                      });
                      setIsAddCourseOpen(true);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                    {course.status === 'active' ? 'Aktif' : 'Taslak'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <Collapsible open={expandedCourses.includes(course.id)}>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Modüller ({course.modules.length})</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addModule(course.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Modül Ekle
                      </Button>
                    </div>
                    
                    {course.modules.map((module) => (
                      <Card key={module.id} className="ml-4">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleModuleExpansion(`${course.id}-${module.id}`)}
                              >
                                {expandedModules.includes(`${course.id}-${module.id}`) ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </Button>
                              <div>
                                <h5 className="font-medium">{module.name}</h5>
                                <p className="text-xs text-muted-foreground">{module.lessonCount} ders | {module.focus}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingModule({ module, courseId: course.id });
                                  setModuleForm({ name: module.name, lessonCount: module.lessonCount, focus: module.focus });
                                  setModuleDialog({ open: true, courseId: course.id });
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addLesson(course.id, module.id)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Ders Ekle
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <Collapsible open={expandedModules.includes(`${course.id}-${module.id}`)}>
                          <CollapsibleContent>
                            <CardContent className="pt-0">
                              {module.lessons.map((lesson) => (
                                <Card key={lesson.id} className="ml-4 mb-2">
                                  <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => toggleLessonExpansion(`${course.id}-${module.id}-${lesson.id}`)}
                                        >
                                          {expandedLessons.includes(`${course.id}-${module.id}-${lesson.id}`) ? (
                                            <ChevronDown className="h-3 w-3" />
                                          ) : (
                                            <ChevronRight className="h-3 w-3" />
                                          )}
                                        </Button>
                                        <h6 className="font-medium text-sm">{lesson.name}</h6>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setEditingLesson({ lesson, courseId: course.id, moduleId: module.id });
                                          setLessonForm({ name: lesson.name });
                                          setLessonDialog({ open: true, courseId: course.id, moduleId: module.id });
                                        }}
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </CardHeader>
                                  <Collapsible open={expandedLessons.includes(`${course.id}-${module.id}-${lesson.id}`)}>
                                    <CollapsibleContent>
                                      <CardContent className="pt-0">
                                        <div className="space-y-3">
                                          <div>
                                            <div className="flex items-center justify-between mb-2">
                                              <h6 className="text-xs font-semibold text-muted-foreground">AKTİVİTELER</h6>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => addActivity(course.id, module.id, lesson.id)}
                                                className="h-6 text-xs"
                                              >
                                                <Plus className="h-3 w-3 mr-1" />
                                                Etkinlik Ekle
                                              </Button>
                                            </div>
                                            {lesson.activities.map((activity) => (
                                              <div key={activity.id} className="flex items-center justify-between text-sm mb-1">
                                                <div className="flex items-center gap-2">
                                                  <FileText className="h-3 w-3" />
                                                  <a href={activity.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {activity.name}
                                                  </a>
                                                  <Badge variant="outline" className="text-xs">
                                                    {activity.activityId}
                                                  </Badge>
                                                </div>
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() => {
                                                    setEditingActivity({ activity, courseId: course.id, moduleId: module.id, lessonId: lesson.id });
                                                    setActivityForm({ name: activity.name, link: activity.link });
                                                    setActivityDialog({ open: true, courseId: course.id, moduleId: module.id, lessonId: lesson.id });
                                                  }}
                                                  className="h-6 text-xs"
                                                >
                                                  <Edit className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            ))}
                                          </div>
                                          <div>
                                            <div className="flex items-center justify-between mb-2">
                                              <h6 className="text-xs font-semibold text-muted-foreground">ÖDEVLER</h6>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => addHomework(course.id, module.id, lesson.id)}
                                                className="h-6 text-xs"
                                              >
                                                <Plus className="h-3 w-3 mr-1" />
                                                Ödev Ekle
                                              </Button>
                                            </div>
                                            {lesson.homework.map((hw) => (
                                              <div key={hw.id} className="flex items-center justify-between text-sm mb-1">
                                                <div className="flex items-center gap-2">
                                                  <FileText className="h-3 w-3" />
                                                  <a href={hw.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {hw.name}
                                                  </a>
                                                  <Badge variant="outline" className="text-xs">
                                                    {hw.homeworkId}
                                                  </Badge>
                                                </div>
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() => {
                                                    setEditingHomework({ homework: hw, courseId: course.id, moduleId: module.id, lessonId: lesson.id });
                                                    setHomeworkForm({ name: hw.name, link: hw.link });
                                                    setHomeworkDialog({ open: true, courseId: course.id, moduleId: module.id, lessonId: lesson.id });
                                                  }}
                                                  className="h-6 text-xs"
                                                >
                                                  <Edit className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </Card>
                              ))}
                            </CardContent>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Modül Ekleme Dialog */}
      <Dialog open={moduleDialog.open} onOpenChange={(open) => setModuleDialog({ ...moduleDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingModule ? 'Modül Düzenle' : 'Yeni Modül Ekle'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Modül Adı</Label>
              <Input
                value={moduleForm.name}
                onChange={(e) => setModuleForm({ ...moduleForm, name: e.target.value })}
                placeholder="Python Temelleri"
              />
            </div>
            <div>
              <Label>Ders Sayısı</Label>
              <Input
                type="number"
                value={moduleForm.lessonCount}
                onChange={(e) => setModuleForm({ ...moduleForm, lessonCount: parseInt(e.target.value) || 0 })}
                placeholder="4"
              />
            </div>
            <div>
              <Label>Konu Odağı</Label>
              <Input
                value={moduleForm.focus}
                onChange={(e) => setModuleForm({ ...moduleForm, focus: e.target.value })}
                placeholder="Python programlama temel kavramları"
              />
            </div>
            <Button onClick={editingModule ? handleUpdateModule : handleAddModule} className="w-full">
              {editingModule ? 'Modülü Güncelle' : 'Modülü Ekle'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ders Ekleme Dialog */}
      <Dialog open={lessonDialog.open} onOpenChange={(open) => setLessonDialog({ ...lessonDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLesson ? 'Ders Düzenle' : 'Yeni Ders Ekle'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Ders Adı</Label>
              <Input
                value={lessonForm.name}
                onChange={(e) => setLessonForm({ ...lessonForm, name: e.target.value })}
                placeholder="Python Nedir?"
              />
            </div>
            <Button onClick={editingLesson ? handleUpdateLesson : handleAddLesson} className="w-full">
              {editingLesson ? 'Dersi Güncelle' : 'Dersi Ekle'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Etkinlik Ekleme Dialog */}
      <Dialog open={activityDialog.open} onOpenChange={(open) => setActivityDialog({ ...activityDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingActivity ? 'Etkinlik Düzenle' : 'Yeni Etkinlik Ekle'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Etkinlik Adı</Label>
              <Input
                value={activityForm.name}
                onChange={(e) => setActivityForm({ ...activityForm, name: e.target.value })}
                placeholder="Giriş Videosu"
              />
            </div>
            <div>
              <Label>Etkinlik Bağlantısı</Label>
              <Input
                value={activityForm.link}
                onChange={(e) => setActivityForm({ ...activityForm, link: e.target.value })}
                placeholder="https://example.com/video1"
              />
            </div>
            <Button onClick={editingActivity ? handleUpdateActivity : handleAddActivity} className="w-full">
              {editingActivity ? 'Etkinliği Güncelle' : 'Etkinliği Ekle'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ödev Ekleme Dialog */}
      <Dialog open={homeworkDialog.open} onOpenChange={(open) => setHomeworkDialog({ ...homeworkDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingHomework ? 'Ödev Düzenle' : 'Yeni Ödev Ekle'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Ödev Adı</Label>
              <Input
                value={homeworkForm.name}
                onChange={(e) => setHomeworkForm({ ...homeworkForm, name: e.target.value })}
                placeholder="Python Kurulumu"
              />
            </div>
            <div>
              <Label>Ödev Bağlantısı</Label>
              <Input
                value={homeworkForm.link}
                onChange={(e) => setHomeworkForm({ ...homeworkForm, link: e.target.value })}
                placeholder="https://example.com/homework1"
              />
            </div>
            <Button onClick={editingHomework ? handleUpdateHomework : handleAddHomework} className="w-full">
              {editingHomework ? 'Ödevi Güncelle' : 'Ödevi Ekle'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamLeaderCourses;