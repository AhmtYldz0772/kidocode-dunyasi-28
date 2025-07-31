import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Sistem Ayarları</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Genel Ayarlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Yeni Kullanıcı Kayıtları</h3>
                <p className="text-sm text-muted-foreground">Yeni kullanıcıların sisteme kaydolmasına izin ver</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">E-posta Bildirimleri</h3>
                <p className="text-sm text-muted-foreground">Sistem bildirimi e-postalarını gönder</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Bakım Modu</h3>
                <p className="text-sm text-muted-foreground">Sistemi bakım moduna al</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Güvenlik Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">İki Faktörlü Doğrulama</h3>
                <p className="text-sm text-muted-foreground">Tüm yöneticiler için zorunlu kıl</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Güçlü Şifre Kontrolü</h3>
                <p className="text-sm text-muted-foreground">Minimum şifre gereksinimlerini uygula</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full mt-4">
              Değişiklikleri Kaydet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;