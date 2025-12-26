import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Trophy, TrendingUp, Leaf, DollarSign, Lightbulb, Medal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const sustainabilityCities = [
  { rank: 1, city: "Bangalore", state: "Karnataka", score: 92, trees: 45000, recyclingRate: 78, airQuality: 45, change: "+2" },
  { rank: 2, city: "Chennai", state: "Tamil Nadu", score: 88, trees: 38000, recyclingRate: 72, airQuality: 52, change: "+1" },
  { rank: 3, city: "Pune", state: "Maharashtra", score: 85, trees: 35000, recyclingRate: 68, airQuality: 58, change: "-1" },
  { rank: 4, city: "Hyderabad", state: "Telangana", score: 82, trees: 32000, recyclingRate: 65, airQuality: 62, change: "0" },
  { rank: 5, city: "Mumbai", state: "Maharashtra", score: 78, trees: 28000, recyclingRate: 62, airQuality: 85, change: "+3" },
  { rank: 6, city: "New Delhi", state: "Delhi", score: 72, trees: 25000, recyclingRate: 55, airQuality: 180, change: "-2" },
  { rank: 7, city: "Kolkata", state: "West Bengal", score: 70, trees: 22000, recyclingRate: 52, airQuality: 95, change: "0" },
  { rank: 8, city: "Ahmedabad", state: "Gujarat", score: 68, trees: 20000, recyclingRate: 48, airQuality: 88, change: "+1" },
];

const fundraisingCities = [
  { rank: 1, city: "Mumbai", state: "Maharashtra", raised: 12500000, donors: 45000, projects: 28, change: "+1" },
  { rank: 2, city: "New Delhi", state: "Delhi", raised: 11200000, donors: 42000, projects: 25, change: "-1" },
  { rank: 3, city: "Bangalore", state: "Karnataka", raised: 9800000, donors: 38000, projects: 22, change: "0" },
  { rank: 4, city: "Chennai", state: "Tamil Nadu", raised: 7500000, donors: 32000, projects: 18, change: "+2" },
  { rank: 5, city: "Hyderabad", state: "Telangana", raised: 6200000, donors: 28000, projects: 15, change: "0" },
  { rank: 6, city: "Pune", state: "Maharashtra", raised: 5800000, donors: 25000, projects: 14, change: "-1" },
  { rank: 7, city: "Kolkata", state: "West Bengal", raised: 4500000, donors: 20000, projects: 12, change: "+1" },
  { rank: 8, city: "Jaipur", state: "Rajasthan", raised: 3200000, donors: 15000, projects: 8, change: "+2" },
];

const chartData = sustainabilityCities.slice(0, 6).map(city => ({
  name: city.city,
  score: city.score,
  color: city.rank <= 3 ? "hsl(145, 65%, 42%)" : "hsl(185, 75%, 55%)",
}));

const getRankBadge = (rank: number) => {
  if (rank === 1) return { icon: "🥇", color: "text-eco-yellow" };
  if (rank === 2) return { icon: "🥈", color: "text-gray-400" };
  if (rank === 3) return { icon: "🥉", color: "text-eco-orange" };
  return { icon: `#${rank}`, color: "text-muted-foreground" };
};

const CityRanking = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-lavender">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">City Rankings</h1>
            <p className="text-muted-foreground">See how cities are leading the sustainability movement</p>
          </div>
        </div>

        <Tabs defaultValue="sustainability" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sustainability" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" /> Sustainability Score
            </TabsTrigger>
            <TabsTrigger value="fundraising" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Fundraising Leaders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sustainability">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* 2nd Place */}
              <Card variant="glass" className="mt-8">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">🥈</div>
                  <h3 className="font-bold text-foreground text-lg">{sustainabilityCities[1].city}</h3>
                  <p className="text-sm text-muted-foreground">{sustainabilityCities[1].state}</p>
                  <p className="text-3xl font-bold text-eco-cyan mt-2">{sustainabilityCities[1].score}</p>
                  <p className="text-xs text-muted-foreground">Sustainability Score</p>
                </CardContent>
              </Card>

              {/* 1st Place */}
              <Card variant="glass" className="border-2 border-eco-yellow/50">
                <CardContent className="pt-6 text-center">
                  <Trophy className="w-8 h-8 text-eco-yellow mx-auto mb-2" />
                  <div className="text-4xl mb-2">🥇</div>
                  <h3 className="font-bold text-foreground text-xl">{sustainabilityCities[0].city}</h3>
                  <p className="text-sm text-muted-foreground">{sustainabilityCities[0].state}</p>
                  <p className="text-4xl font-bold text-eco-green mt-2">{sustainabilityCities[0].score}</p>
                  <p className="text-xs text-muted-foreground">Sustainability Score</p>
                </CardContent>
              </Card>

              {/* 3rd Place */}
              <Card variant="glass" className="mt-12">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2">🥉</div>
                  <h3 className="font-bold text-foreground text-lg">{sustainabilityCities[2].city}</h3>
                  <p className="text-sm text-muted-foreground">{sustainabilityCities[2].state}</p>
                  <p className="text-3xl font-bold text-eco-orange mt-2">{sustainabilityCities[2].score}</p>
                  <p className="text-xs text-muted-foreground">Sustainability Score</p>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card variant="glass" className="mb-6">
              <CardHeader><CardTitle>Top Cities Comparison</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
                      <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" />
                      <YAxis stroke="hsl(215, 20%, 65%)" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(220, 45%, 12%)",
                          border: "1px solid hsl(220, 30%, 20%)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card variant="glass">
              <CardHeader><CardTitle>Complete Rankings</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sustainabilityCities.map((city) => {
                    const badge = getRankBadge(city.rank);
                    return (
                      <div key={city.rank} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                        <div className="flex items-center gap-4">
                          <span className={`text-2xl font-bold ${badge.color}`}>{badge.icon}</span>
                          <div>
                            <h4 className="font-semibold text-foreground">{city.city}</h4>
                            <p className="text-xs text-muted-foreground">{city.state}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center hidden md:block">
                            <p className="text-muted-foreground">Trees</p>
                            <p className="font-medium text-foreground">{city.trees.toLocaleString()}</p>
                          </div>
                          <div className="text-center hidden md:block">
                            <p className="text-muted-foreground">Recycling</p>
                            <p className="font-medium text-foreground">{city.recyclingRate}%</p>
                          </div>
                          <div className="text-center hidden md:block">
                            <p className="text-muted-foreground">AQI</p>
                            <p className="font-medium text-foreground">{city.airQuality}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-3xl font-bold text-eco-green">{city.score}</p>
                            <p className={`text-xs ${city.change.startsWith('+') ? 'text-eco-green' : city.change.startsWith('-') ? 'text-eco-red' : 'text-muted-foreground'}`}>
                              {city.change} this week
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fundraising">
            {/* Fundraising Leaderboard */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-eco-yellow" />
                  Cities Leading in Green Fundraising
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fundraisingCities.map((city) => {
                    const badge = getRankBadge(city.rank);
                    return (
                      <div key={city.rank} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                        <div className="flex items-center gap-4">
                          <span className={`text-2xl font-bold ${badge.color}`}>{badge.icon}</span>
                          <div>
                            <h4 className="font-semibold text-foreground">{city.city}</h4>
                            <p className="text-xs text-muted-foreground">{city.state}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center hidden md:block">
                            <p className="text-muted-foreground">Donors</p>
                            <p className="font-medium text-foreground">{city.donors.toLocaleString()}</p>
                          </div>
                          <div className="text-center hidden md:block">
                            <p className="text-muted-foreground">Projects</p>
                            <p className="font-medium text-foreground">{city.projects}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-eco-green">₹{(city.raised / 100000).toFixed(1)}L</p>
                            <p className={`text-xs ${city.change.startsWith('+') ? 'text-eco-green' : city.change.startsWith('-') ? 'text-eco-red' : 'text-muted-foreground'}`}>
                              {city.change} this week
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              How Cities Can Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <TrendingUp className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Increase Green Cover</h4>
                <p className="text-sm text-muted-foreground">
                  Plant more trees and create urban forests to improve air quality.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <Leaf className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Better Waste Management</h4>
                <p className="text-sm text-muted-foreground">
                  Improve recycling infrastructure and reduce landfill waste.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <DollarSign className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Community Engagement</h4>
                <p className="text-sm text-muted-foreground">
                  Encourage residents to participate in green initiatives.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CityRanking;
