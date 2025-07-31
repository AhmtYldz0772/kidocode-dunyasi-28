import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart3, Trophy, Medal, Award, Crown, Star } from 'lucide-react';

const StudentLeaderboard = () => {
  const leaderboard = [
    {
      rank: 1,
      name: 'Ayşe Yılmaz',
      points: 1250,
      courses: 3,
      projects: 8,
      avatar: '/avatars/ayse.jpg',
      badge: 'Python Ustası'
    },
    {
      rank: 2,
      name: 'Mehmet Öz',
      points: 1180,
      courses: 2,
      projects: 6,
      avatar: '/avatars/mehmet.jpg',
      badge: 'Scratch Uzmanı'
    },
    {
      rank: 3,
      name: 'Zeynep Kaya',
      points: 1120,
      courses: 4,
      projects: 5,
      avatar: '/avatars/zeynep.jpg',
      badge: 'Web Tasarımcı'
    },
    {
      rank: 4,
      name: 'Ali Demir',
      points: 980,
      courses: 2,
      projects: 7,
      avatar: '/avatars/ali.jpg',
      badge: 'Kod Savaşçısı'
    },
    {
      rank: 5,
      name: 'Fatma Yıldız',
      points: 920,
      courses: 3,
      projects: 4,
      avatar: '/avatars/fatma.jpg',
      badge: 'Hızlı Öğrenen'
    },
    {
      rank: 6,
      name: 'Can Özkan',
      points: 850,
      courses: 1,
      projects: 6,
      avatar: '/avatars/can.jpg',
      badge: 'Proje Ustası'
    },
  ];

  const myRank = 4; // Kullanıcının sıralaması

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Star className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'border-primary/30 bg-primary/5';
    if (rank === myRank) return 'border-blue-200 bg-blue-50';
    return '';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Liderlik Tablosu</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{myRank}.</p>
            <p className="text-sm text-muted-foreground">Sıralaman</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">980</p>
            <p className="text-sm text-muted-foreground">Toplam Puanın</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">270</p>
            <p className="text-sm text-muted-foreground">Birinciye Kalan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>En İyi Öğrenciler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboard.map((student) => (
              <div 
                key={student.rank} 
                className={`flex items-center justify-between p-4 border rounded-lg transition-all hover:shadow-md ${getRankColor(student.rank)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(student.rank)}
                    <span className="font-bold text-lg">#{student.rank}</span>
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.badge}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Puan</p>
                    <p className="font-bold text-lg">{student.points}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kurslar</p>
                    <p className="font-medium">{student.courses}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projeler</p>
                    <p className="font-medium">{student.projects}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLeaderboard;