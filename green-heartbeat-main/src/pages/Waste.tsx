import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Camera, Recycle, Leaf, AlertCircle, Lightbulb, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const wasteCategories = [
  { name: "Recyclable", value: 45, color: "hsl(145, 65%, 42%)", icon: Recycle },
  { name: "Wet/Organic", value: 35, color: "hsl(16, 85%, 68%)", icon: Leaf },
  { name: "Non-Recyclable", value: 20, color: "hsl(0, 75%, 55%)", icon: AlertCircle },
];

const recentScans = [
  { item: "Plastic Bottle", category: "Recyclable", time: "2 mins ago", icon: "♻️" },
  { item: "Banana Peel", category: "Wet/Organic", time: "15 mins ago", icon: "🍌" },
  { item: "Paper Box", category: "Recyclable", time: "1 hour ago", icon: "📦" },
  { item: "Food Wrapper", category: "Non-Recyclable", time: "2 hours ago", icon: "🗑️" },
  { item: "Vegetable Scraps", category: "Wet/Organic", time: "3 hours ago", icon: "🥕" },
];

const Waste = () => {
  const [scanning, setScanning] = useState(false);
  const totalWaste = 2.5; // kg

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-coral">
            <Trash2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Waste & Recycling</h1>
            <p className="text-muted-foreground">Scan waste items and learn proper disposal methods</p>
          </div>
        </div>

        {/* Scanner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Waste Scanner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-secondary/50 rounded-xl flex flex-col items-center justify-center mb-4 relative overflow-hidden">
                {scanning ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-eco-green animate-pulse absolute" style={{ top: '50%' }} />
                    <p className="text-foreground z-10">Scanning...</p>
                  </div>
                ) : (
                  <>
                    <Camera className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center px-4">
                      Point your camera at waste items to classify them
                    </p>
                  </>
                )}
              </div>
              <Button variant="eco" className="w-full" size="lg" onClick={handleScan}>
                <Camera className="w-5 h-5 mr-2" />
                {scanning ? "Scanning..." : "Start Scanning"}
              </Button>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Today's Waste Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wasteCategories}
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {wasteCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {wasteCategories.map((category) => (
                    <div key={category.name} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-foreground flex-1">{category.name}</span>
                      <span className="text-sm font-medium text-foreground">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-secondary/50">
                <p className="text-sm text-muted-foreground">Total waste today</p>
                <p className="text-2xl font-bold text-foreground">{totalWaste} kg</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classification Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="glass" className="border-l-4 border-eco-green">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Recycle className="w-6 h-6 text-eco-green" />
                <h3 className="font-semibold text-foreground">Recyclable</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Items that can be processed and reused
              </p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-green" />
                  Paper, cardboard, newspapers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-green" />
                  Plastic bottles, containers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-green" />
                  Glass bottles, metal cans
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="glass" className="border-l-4 border-eco-coral">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="w-6 h-6 text-eco-coral" />
                <h3 className="font-semibold text-foreground">Wet/Organic</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Biodegradable waste for composting
              </p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-coral" />
                  Food scraps, vegetable peels
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-coral" />
                  Tea bags, coffee grounds
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-coral" />
                  Garden waste, flowers
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="glass" className="border-l-4 border-eco-red">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-eco-red" />
                <h3 className="font-semibold text-foreground">Non-Recyclable</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Items requiring special disposal
              </p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-red" />
                  Plastic wrappers, polythene
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-red" />
                  Sanitary products, diapers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-eco-red" />
                  Broken ceramics, mirrors
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Scans */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50"
                >
                  <span className="text-2xl">{scan.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{scan.item}</p>
                    <p className="text-sm text-muted-foreground">{scan.time}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      scan.category === "Recyclable"
                        ? "bg-eco-green/20 text-eco-green"
                        : scan.category === "Wet/Organic"
                        ? "bg-eco-coral/20 text-eco-coral"
                        : "bg-eco-red/20 text-eco-red"
                    }`}
                  >
                    {scan.category}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Waste Reduction Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">Reduce Single-Use Plastics</h4>
                <p className="text-sm text-muted-foreground">
                  Carry reusable bags, bottles, and containers to minimize plastic waste.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">Compost at Home</h4>
                <p className="text-sm text-muted-foreground">
                  Turn kitchen scraps into nutrient-rich soil for your garden.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Waste;
