import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, ExternalLink, Info, Clock } from 'lucide-react';

const StudentWhatsApp = () => {
  const whatsappGroups = [
    {
      id: 1,
      name: 'Python Başlangıç Grubu A',
      description: 'Python dersleri ve proje paylaşımları',
      members: 8,
      teacher: 'Fatma Kaya',
      lastActivity: '2 saat önce',
      link: 'https://chat.whatsapp.com/python-baslangic-a',
      status: 'active'
    },
    {
      id: 2,
      name: 'Web Tasarım Atölyesi',
      description: 'HTML, CSS ve JavaScript projelerinizi paylaşın',
      members: 6,
      teacher: 'Ali Veli',
      lastActivity: '1 gün önce',
      link: 'https://chat.whatsapp.com/web-tasarim-atolyesi',
      status: 'active'
    },
    {
      id: 3,
      name: 'KidoCode Genel',
      description: 'Tüm öğrencilerin buluşma noktası',
      members: 45,
      teacher: 'Tüm Öğretmenler',
      lastActivity: '30 dakika önce',
      link: 'https://chat.whatsapp.com/kidocode-genel',
      status: 'active'
    },
  ];

  const groupRules = [
    'Saygılı bir dil kullanın',
    'Konu dışı mesajlar göndermekten kaçının',
    'Projelerinizi paylaşmaktan çekinmeyin',
    'Arkadaşlarınıza yardım etmeyi unutmayın',
    'Öğretmeninizin talimatlarını takip edin',
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">WhatsApp Grupları</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Katıldığınız Gruplar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {whatsappGroups.map((group) => (
                <div key={group.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <Badge variant="default">
                      {group.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {group.members} üye
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {group.lastActivity}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-muted-foreground">Öğretmen: </span>
                    <span className="font-medium">{group.teacher}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => window.open(group.link, '_blank')}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp'ta Aç
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Grup Kuralları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {groupRules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm">{rule}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İpuçları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p>💡 <strong>Bildirimler:</strong> Grup bildirimlerini ayarlayabilirsiniz</p>
                <p>📱 <strong>Dosya Paylaşımı:</strong> Projelerinizi grup üzerinden paylaşın</p>
                <p>🤝 <strong>Yardımlaşma:</strong> Takıldığınız konularda arkadaşlarınızdan yardım isteyin</p>
                <p>⏰ <strong>Çevrimiçi Saatler:</strong> Öğretmeniniz genelde 09:00-17:00 arası aktif</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentWhatsApp;