import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, BookOpen, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminReports = () => {
  const stats = [
    { title: 'Toplam Kullanıcı', value: '156', icon: Users, change: '+12%' },
    { title: 'Aktif Kurslar', value: '24', icon: BookOpen, change: '+5%' },
    { title: 'Tamamlanan Projeler', value: '89', icon: TrendingUp, change: '+18%' },
    { title: 'Aylık Gelir', value: '₺12,450', icon: BarChart3, change: '+8%' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Raporlar</h1>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Rapor İndir
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="secondary" className="mt-2">
                    {stat.change}
                  </Badge>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'Ayşe Yılmaz', action: 'Python kursunu tamamladı', time: '2 saat önce' },
              { user: 'Mehmet Öztürk', action: 'Yeni öğrenci grubu oluşturdu', time: '4 saat önce' },
              { user: 'Fatma Kaya', action: 'Scratch projesi değerlendirdi', time: '6 saat önce' },
              { user: 'Ali Demir', action: 'Web tasarım kursuna kaydoldu', time: '1 gün önce' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;