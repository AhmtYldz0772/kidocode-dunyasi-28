import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Target, Zap, Crown } from 'lucide-react';

const StudentAchievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'İlk Adım',
      description: 'İlk dersini tamamladın!',
      icon: Star,
      earned: true,
      date: '2024-01-15',
      points: 10
    },
    {
      id: 2,
      title: 'Python Ustası',
      description: 'Python kursunu başarıyla tamamladın',
      icon: Crown,
      earned: true,
      date: '2024-02-01',
      points: 100
    },
    {
      id: 3,
      title: 'Hızlı Öğrenen',
      description: '5 dersi art arda tamamla',
      icon: Zap,
      earned: true,
      date: '2024-01-28',
      points: 50
    },
    {
      id: 4,
      title: 'Proje Geliştiricisi',
      description: 'İlk projenizi oluşturun',
      icon: Target,
      earned: false,
      date: null,
      points: 75
    },
    {
      id: 5,
      title: 'Süper Öğrenci',
      description: '10 farklı dersi tamamla',
      icon: Award,
      earned: false,
      date: null,
      points: 200
    },
    {
      id: 6,
      title: 'Kod Savaşçısı',
      description: '50 programlama görevi çöz',
      icon: Trophy,
      earned: false,
      date: null,
      points: 150
    },
  ];

  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Başarımlarım</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{earnedCount}</p>
            <p className="text-sm text-muted-foreground">Kazanılan Rozet</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-sm text-muted-foreground">Toplam Puan</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{achievements.length - earnedCount}</p>
            <p className="text-sm text-muted-foreground">Hedef Rozet</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`${achievement.earned ? 'border-primary/20 bg-primary/5' : 'opacity-60'} transition-all hover:shadow-lg`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <achievement.icon className={`h-6 w-6 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                  {achievement.title}
                </div>
                <Badge variant={achievement.earned ? 'default' : 'secondary'}>
                  {achievement.points} pt
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {achievement.description}
              </p>
              {achievement.earned ? (
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-500">
                    Tamamlandı
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {achievement.date}
                  </span>
                </div>
              ) : (
                <Badge variant="outline">
                  Henüz Kazanılmadı
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentAchievements;