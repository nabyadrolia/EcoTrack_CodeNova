import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Crown, Flame } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Priya Sharma", score: 2450, streak: 45, avatar: "🌱" },
  { rank: 2, name: "Rahul Verma", score: 2280, streak: 38, avatar: "🌿" },
  { rank: 3, name: "Ananya Patel", score: 2150, streak: 32, avatar: "🍀" },
  { rank: 4, name: "Arjun Singh", score: 1980, streak: 28, avatar: "🌳" },
  { rank: 5, name: "Sneha Gupta", score: 1850, streak: 25, avatar: "🌴" },
  { rank: 6, name: "You", score: 1720, streak: 22, avatar: "⭐", isUser: true },
  { rank: 7, name: "Vikram Joshi", score: 1650, streak: 20, avatar: "🌵" },
  { rank: 8, name: "Meera Reddy", score: 1580, streak: 18, avatar: "🌻" },
];

const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-eco-yellow" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-eco-coral" />;
    return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-sunset"><Trophy className="w-8 h-8 text-primary-foreground" /></div>
          <div><h1 className="text-3xl font-bold text-foreground">Leaderboard</h1><p className="text-muted-foreground">This week's top eco warriors</p></div>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 mb-8">
          {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((user, i) => (
            <div key={user.rank} className={`text-center ${i === 1 ? "order-2" : i === 0 ? "order-1" : "order-3"}`}>
              <div className={`w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center text-4xl ${i === 1 ? "bg-eco-yellow/20 ring-4 ring-eco-yellow" : "bg-secondary"}`}>
                {user.avatar}
              </div>
              <p className="font-semibold text-foreground">{user.name}</p>
              <p className="text-eco-green font-bold">{user.score} pts</p>
              <div className={`mt-2 rounded-t-lg ${i === 1 ? "h-24 bg-eco-yellow/30" : i === 0 ? "h-16 bg-gray-400/30" : "h-12 bg-eco-coral/30"}`} />
            </div>
          ))}
        </div>

        <Card variant="glass">
          <CardHeader><CardTitle>Weekly Rankings</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((user) => (
                <div key={user.rank} className={`flex items-center gap-4 p-4 rounded-xl ${user.isUser ? "bg-eco-green/20 ring-2 ring-eco-green" : "bg-secondary/50"}`}>
                  {getRankIcon(user.rank)}
                  <span className="text-2xl">{user.avatar}</span>
                  <div className="flex-1">
                    <p className={`font-semibold ${user.isUser ? "text-eco-green" : "text-foreground"}`}>{user.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Flame className="w-4 h-4 text-eco-orange" /> {user.streak} day streak
                    </div>
                  </div>
                  <span className="text-xl font-bold text-eco-green">{user.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
