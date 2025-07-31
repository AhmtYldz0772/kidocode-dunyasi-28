import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  UserCheck,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamLeaderDashboard = () => {
  const navigate = useNavigate();

  const summaryCards = [
    {
      title: 'Öğrenci Yönetimi',
      description: 'Öğrenci ekle, düzenle ve yönet',
      icon: Users,
      value: '145',
      label: 'Toplam Öğrenci',
      route: '/team-leader/students',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      title: 'Öğretmen Yönetimi', 
      description: 'Öğretmen ekle, düzenle ve yönet',
      icon: GraduationCap,
      value: '12',
      label: 'Aktif Öğretmen',
      route: '/team-leader/teachers',
      gradient: 'from-purple-600 to-blue-500'
    },
    {
      title: 'Grup Yönetimi',
      description: 'Grupları oluştur ve yönet',
      icon: UserCheck,
      value: '18',
      label: 'Aktif Grup',
      route: '/team-leader/groups',
      gradient: 'from-green-600 to-teal-500'
    },
    {
      title: 'Kurs Yönetimi',
      description: 'Kursları ve içeriklerini düzenle',
      icon: BookOpen,
      value: '8',
      label: 'Toplam Kurs',
      route: '/team-leader/courses',
      gradient: 'from-orange-600 to-red-500'
    },
    {
      title: 'Performans Analizi',
      description: 'Raporları görüntüle ve analiz et',
      icon: TrendingUp,
      value: '%92',
      label: 'Başarı Oranı',
      route: '/team-leader/performance',
      gradient: 'from-pink-600 to-purple-500'
    }
  ];

  const quickStats = [
    { label: 'Bu Hafta Yeni Öğrenci', value: '8', icon: Users, color: 'text-blue-600' },
    { label: 'Bekleyen Onay', value: '3', icon: Clock, color: 'text-orange-600' },
    { label: 'Aktif Kurslar', value: '8', icon: BookOpen, color: 'text-green-600' },
    { label: 'Bu Ay Mezun', value: '12', icon: Calendar, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Hoş Geldin Alanı */}
      <div className="bg-gradient-hero rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Takım Lideri Paneli 🎯
            </h1>
            <p className="text-lg opacity-90">
              Öğrenci ve öğretmen yönetimini buradan kontrol edebilirsiniz
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">KidoCode</div>
            <div className="text-sm opacity-75">Yönetim Sistemi</div>
          </div>
        </div>
      </div>

      {/* Hızlı İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ana Yönetim Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${card.gradient} text-white`}>
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{card.title}</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    {card.description}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.label}</div>
                </div>
              </div>
              <Button 
                onClick={() => navigate(card.route)}
                className="w-full group-hover:bg-primary/90 transition-colors"
                variant="default"
              >
                Yönet
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Son Aktiviteler */}
      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Python Başlangıç grubu oluşturuldu', time: '2 saat önce', type: 'group' },
              { action: 'Yeni öğretmen Ahmet Yılmaz eklendi', time: '4 saat önce', type: 'teacher' },
              { action: 'Web Tasarım kursu güncellendi', time: '1 gün önce', type: 'course' },
              { action: '5 öğrenci Python kursuna kaydedildi', time: '2 gün önce', type: 'student' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'group' ? 'bg-blue-500' :
                  activity.type === 'teacher' ? 'bg-purple-500' :
                  activity.type === 'course' ? 'bg-orange-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeaderDashboard;