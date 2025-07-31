import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamLeaderDashboard = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Toplam Öğrenci', value: '8', icon: Users, color: 'text-blue-600' },
    { label: 'Aktif Kurs', value: '3', icon: BookOpen, color: 'text-orange-600' },
    { label: 'Aktif Grup', value: '8', icon: UserCheck, color: 'text-green-600' },
    { label: 'Aktif Öğretmen', value: '12', icon: GraduationCap, color: 'text-purple-600' }
  ];

  const managementCards = [
    {
      title: 'Öğrenci Yönetimi',
      description: 'Öğrenci ekle, düzenle ve yönet',
      icon: Users,
      value: '145',
      label: 'Toplam Öğrenci',
      route: '/team-leader/students',
      color: 'bg-blue-500'
    },
    {
      title: 'Öğretmen Yönetimi',
      description: 'Öğretmen ekle, düzenle ve yönet',
      icon: GraduationCap,
      value: '12',
      label: 'Aktif Öğretmen',
      route: '/team-leader/teachers',
      color: 'bg-purple-500'
    },
    {
      title: 'Grup Yönetimi',
      description: 'Grupları oluştur ve yönet',
      icon: UserCheck,
      value: '18',
      label: 'Aktif Grup',
      route: '/team-leader/groups',
      color: 'bg-green-500'
    },
    {
      title: 'Kurs Yönetimi',
      description: 'Kursları ve içeriklerini düzenle',
      icon: BookOpen,
      value: '8',
      label: 'Toplam Kurs',
      route: '/team-leader/courses',
      color: 'bg-orange-500'
    },
    {
      title: 'Performans Analizi',
      description: 'Raporları görüntüle ve analiz et',
      icon: TrendingUp,
      value: '%92',
      label: 'Başarı Oranı',
      route: '/team-leader/performance',
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hoş Geldin Alanı */}
      <div className="bg-gradient-to-r from-cyan-500 to-yellow-400 rounded-xl p-6 text-white">
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
            <div className="text-sm opacity-75">Dünyası</div>
          </div>
        </div>
      </div>

      {/* Hızlı İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-4">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ana Yönetim Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managementCards.map((card, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${card.color} text-white`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold">{card.value}</div>
                  <div className="text-sm text-muted-foreground">{card.label}</div>
                </div>
              </div>
              <Button 
                onClick={() => navigate(card.route)}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
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
          <div className="space-y-3">
            {[
              { action: 'Python Başlangıç grubu oluşturuldu', time: '2 saat önce' },
              { action: 'Yeni öğretmen Ahmet Yılmaz eklendi', time: '4 saat önce' },
              { action: 'Web Tasarım kursu güncellendi', time: '1 gün önce' },
              { action: '5 öğrenci Python kursuna kaydedildi', time: '2 gün önce' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
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