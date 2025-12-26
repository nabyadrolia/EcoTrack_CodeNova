import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Plus, AlertTriangle, Lightbulb, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";

const waterActivities = [
  { name: "Shower", volume: 45, time: "07:30 AM" },
  { name: "Dishes", volume: 25, time: "09:15 AM" },
  { name: "Laundry", volume: 40, time: "10:00 AM" },
  { name: "Cooking", volume: 10, time: "01:00 PM" },
  { name: "Drinking", volume: 5, time: "Throughout day" },
];

const WaterUsage = () => {
  const [activities, setActivities] = useState(waterActivities);
  const [newActivity, setNewActivity] = useState("");
  const [newVolume, setNewVolume] = useState("");
  
  const dailyLimit = 200;
  const currentUsage = activities.reduce((sum, a) => sum + a.volume, 0);
  const percentUsed = (currentUsage / dailyLimit) * 100;

  const handleAddActivity = () => {
    if (newActivity && newVolume) {
      setActivities([
        ...activities,
        {
          name: newActivity,
          volume: parseInt(newVolume),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewActivity("");
      setNewVolume("");
    }
  };

  const getWaterLevelHeight = () => {
    return Math.min(percentUsed, 100);
  };

  // Sort activities by volume for better visualization
  const sortedActivities = [...activities].sort((a, b) => b.volume - a.volume);

  // Transform activities into horizontal bar chart data with gradient colors
  const chartData = sortedActivities.map((activity, index) => {
    const colors = [
      { start: "hsl(270, 70%, 65%)", end: "hsl(270, 60%, 75%)" }, // lavender
      { start: "hsl(330, 70%, 65%)", end: "hsl(330, 60%, 75%)" }, // pink
      { start: "hsl(280, 65%, 60%)", end: "hsl(280, 55%, 70%)" }, // purple
      { start: "hsl(320, 65%, 60%)", end: "hsl(320, 55%, 70%)" }, // magenta
      { start: "hsl(260, 60%, 65%)", end: "hsl(260, 50%, 75%)" }, // violet
    ];
    const colorSet = colors[index % colors.length];
    return {
      name: activity.name,
      volume: activity.volume,
      fill: colorSet.start,
      percentage: ((activity.volume / currentUsage) * 100).toFixed(1),
    };
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-eco">
            <Droplets className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Water Usage</h1>
            <p className="text-muted-foreground">Track your daily water consumption and set limits</p>
          </div>
        </div>

        {/* Main Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Water Tank Visualization */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Daily Water Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 w-full max-w-[200px] mx-auto">
                {/* Tank outline */}
                <div className="absolute inset-0 border-4 border-eco-cyan/30 rounded-b-3xl rounded-t-lg overflow-hidden bg-secondary/30">
                  {/* Water fill */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-eco-cyan to-eco-cyan/50 transition-all duration-1000 ease-out"
                    style={{ height: `${getWaterLevelHeight()}%` }}
                  >
                    {/* Wave effect */}
                    <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden">
                      <div className="w-[200%] h-8 bg-eco-cyan/30 rounded-[100%] animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Activity labels on tank */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    {activities.slice(-4).reverse().map((activity, index) => (
                      <div
                        key={index}
                        className="text-xs text-foreground bg-background/80 px-2 py-1 rounded mb-1 truncate"
                        style={{ opacity: 1 - index * 0.2 }}
                      >
                        {activity.name}: {activity.volume}L
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Level markers */}
                <div className="absolute -right-10 inset-y-0 flex flex-col justify-between text-xs text-muted-foreground py-2">
                  <span>200L</span>
                  <span>150L</span>
                  <span>100L</span>
                  <span>50L</span>
                  <span>0L</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-4xl font-bold text-foreground">{currentUsage}L</p>
                <p className="text-sm text-muted-foreground">of {dailyLimit}L daily limit</p>
                {percentUsed > 80 && (
                  <div className="flex items-center justify-center gap-2 mt-2 text-eco-orange">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Approaching limit!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add Activity */}
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Log Water Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-6">
                <Input
                  placeholder="Activity name (e.g., Shower)"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Volume (L)"
                  value={newVolume}
                  onChange={(e) => setNewVolume(e.target.value)}
                  className="w-32"
                />
                <Button variant="eco" onClick={handleAddActivity}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Today's Activities</h4>
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <Droplets className="w-5 h-5 text-eco-cyan" />
                      <div>
                        <p className="font-medium text-foreground">{activity.name}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-eco-cyan">{activity.volume}L</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Horizontal Bar Chart */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Water Usage by Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData} 
                  layout="vertical"
                  margin={{ top: 20, right: 80, left: 100, bottom: 20 }}
                  barGap={8}
                >
                  <defs>
                    <linearGradient id="lavenderGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(270, 70%, 55%)" />
                      <stop offset="100%" stopColor="hsl(270, 60%, 75%)" />
                    </linearGradient>
                    <linearGradient id="pinkGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(330, 70%, 55%)" />
                      <stop offset="100%" stopColor="hsl(330, 60%, 75%)" />
                    </linearGradient>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(280, 65%, 50%)" />
                      <stop offset="100%" stopColor="hsl(280, 55%, 70%)" />
                    </linearGradient>
                    <linearGradient id="magentaGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(320, 65%, 50%)" />
                      <stop offset="100%" stopColor="hsl(320, 55%, 70%)" />
                    </linearGradient>
                    <linearGradient id="violetGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="hsl(260, 60%, 55%)" />
                      <stop offset="100%" stopColor="hsl(260, 50%, 75%)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    stroke="hsl(215, 20%, 65%)" 
                    unit="L"
                    axisLine={{ stroke: 'hsl(220, 30%, 25%)' }}
                    tickLine={{ stroke: 'hsl(220, 30%, 25%)' }}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="hsl(215, 20%, 65%)"
                    width={90}
                    axisLine={{ stroke: 'hsl(220, 30%, 25%)' }}
                    tickLine={false}
                    tick={{ fontSize: 13, fontWeight: 500 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220, 45%, 12%)",
                      border: "1px solid hsl(220, 30%, 20%)",
                      borderRadius: "12px",
                      padding: "12px 16px",
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      <span key="value" className="font-bold">{value}L ({props.payload.percentage}%)</span>, 
                      "Usage"
                    ]}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Bar 
                    dataKey="volume" 
                    radius={[0, 12, 12, 0]}
                    barSize={35}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => {
                      const gradients = ['url(#lavenderGradient)', 'url(#pinkGradient)', 'url(#purpleGradient)', 'url(#magentaGradient)', 'url(#violetGradient)'];
                      return <Cell key={`cell-${index}`} fill={gradients[index % gradients.length]} />;
                    })}
                    <LabelList 
                      dataKey="volume" 
                      position="right" 
                      formatter={(value: number) => `${value}L`}
                      style={{ fill: 'hsl(215, 20%, 65%)', fontSize: '12px', fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Water Saving Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <TrendingDown className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Shorter Showers</h4>
                <p className="text-sm text-muted-foreground">
                  5-minute showers save 40L compared to 10-minute ones.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <TrendingDown className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Fix Leaks</h4>
                <p className="text-sm text-muted-foreground">
                  A dripping faucet wastes up to 75L per day.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <TrendingDown className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Full Loads Only</h4>
                <p className="text-sm text-muted-foreground">
                  Run dishwashers and washing machines with full loads.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <TrendingDown className="w-5 h-5 text-eco-green mb-2" />
                <h4 className="font-medium text-foreground mb-1">Rainwater Harvesting</h4>
                <p className="text-sm text-muted-foreground">
                  Collect rainwater for gardening and cleaning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default WaterUsage;
