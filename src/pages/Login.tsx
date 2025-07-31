import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    const success = await login(formData.username, formData.password);
    
    if (success) {
      toast({
        title: "Başarılı!",
        description: "Giriş yapıldı, ana sayfaya yönlendiriliyorsunuz.",
      });
      navigate('/');
    } else {
      toast({
        title: "Giriş Başarısız",
        description: "Kullanıcı adı veya şifre hatalı.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Sol taraf - Giriş Formu */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-2xl">K</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              KidoCode Dünyası
            </h1>
            <p className="text-muted-foreground mt-2">
              Çocuklar için eğlenceli kodlama dünyasına hoş geldiniz
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Giriş Yap</CardTitle>
              <CardDescription className="text-center">
                Hesabınıza giriş yaparak eğlenceli kodlama yolculuğunuza devam edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Kullanıcı adınızı girin"
                    value={formData.username}
                    onChange={handleChange}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Şifre</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Şifrenizi girin"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-11 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11" 
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? (
                    "Giriş yapılıyor..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Giriş Yap
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Demo Hesapları:</h3>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p><strong>Admin:</strong> admin / 123456</p>
                  <p><strong>Takım Lideri:</strong> takimlideri / 123456</p>
                  <p><strong>Öğrenci:</strong> ogrenci1 / 123456</p>
                  <p><strong>Öğretmen:</strong> ogretmen1 / 123456</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sağ taraf - Hero Görseli */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <img 
          src={heroImage} 
          alt="KidoCode Dünyası" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 p-8">
            <h2 className="text-4xl font-bold">Kodlama Macerasına Başla!</h2>
            <p className="text-xl">
              Python, Scratch, HTML ve daha fazlası ile eğlenceli öğrenme deneyimi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;