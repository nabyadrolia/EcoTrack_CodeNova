import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Footprints, Car, Home, Utensils, ShoppingBag, Lightbulb, TrendingDown, Plus, Bike, Train, Plane } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const vehicleEmissions: Record<string, number> = {
  car: 0.21,
  motorcycle: 0.1,
  bus: 0.089,
  train: 0.041,
  bicycle: 0,
  walking: 0,
  plane: 0.255,
};

const meatEmissions: Record<string, number> = {
  beef: 27,
  lamb: 39.2,
  pork: 12.1,
  chicken: 6.9,
  fish: 6.1,
  vegetarian: 2,
  vegan: 1.5,
};

const weeklyData = [
  { day: "Mon", value: 2.1, color: "hsl(145, 65%, 42%)" },
  { day: "Tue", value: 2.8, color: "hsl(45, 95%, 65%)" },
  { day: "Wed", value: 1.9, color: "hsl(145, 65%, 42%)" },
  { day: "Thu", value: 2.4, color: "hsl(45, 95%, 65%)" },
  { day: "Fri", value: 3.8, color: "hsl(0, 75%, 55%)" },
  { day: "Sat", value: 1.5, color: "hsl(145, 65%, 42%)" },
  { day: "Sun", value: 1.8, color: "hsl(145, 65%, 42%)" },
];

const getColorClass = (value: number) => {
  if (value >= 3) return "text-eco-red";
  if (value >= 2) return "text-eco-yellow";
  return "text-eco-green";
};

const getProgressColor = (value: number) => {
  if (value >= 75) return "bg-eco-red";
  if (value >= 50) return "bg-eco-yellow";
  return "bg-eco-green";
};

const CarbonFootprint = () => {
  const [transportEntries, setTransportEntries] = useState<{vehicle: string; km: number; emission: number}[]>([]);
  const [mealEntries, setMealEntries] = useState<{meal: string; portions: number; emission: number}[]>([]);
  
  const [selectedVehicle, setSelectedVehicle] = useState("car");
  const [kmTravelled, setKmTravelled] = useState("");
  
  const [selectedMeal, setSelectedMeal] = useState("chicken");
  const [portions, setPortions] = useState("1");

  const transportEmission = transportEntries.reduce((sum, e) => sum + e.emission, 0);
  const mealEmission = mealEntries.reduce((sum, e) => sum + e.emission, 0);
  const homeEmission = 0.8;
  const shoppingEmission = 0.4;
  
  const totalCarbon = transportEmission + mealEmission + homeEmission + shoppingEmission;
  const dailyLimit = 4;
  const percentUsed = (totalCarbon / dailyLimit) * 100;

  const handleAddTransport = () => {
    if (kmTravelled) {
      const km = parseFloat(kmTravelled);
      const emission = km * vehicleEmissions[selectedVehicle];
      setTransportEntries([...transportEntries, { vehicle: selectedVehicle, km, emission }]);
      setKmTravelled("");
    }
  };

  const handleAddMeal = () => {
    if (portions) {
      const portionCount = parseInt(portions);
      const emission = (meatEmissions[selectedMeal] / 1000) * portionCount * 200; // 200g per portion
      setMealEntries([...mealEntries, { meal: selectedMeal, portions: portionCount, emission }]);
      setPortions("1");
    }
  };

  const carbonData = [
    { category: "Transport", value: transportEmission || 0.5, icon: Car },
    { category: "Home Energy", value: homeEmission, icon: Home },
    { category: "Food", value: mealEmission || 0.3, icon: Utensils },
    { category: "Shopping", value: shoppingEmission, icon: ShoppingBag },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-eco">
            <Footprints className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Carbon Footprint</h1>
            <p className="text-muted-foreground">Track and reduce your daily CO₂ emissions</p>
          </div>
        </div>

        {/* Daily Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Carbon Emissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8 mb-6">
                <div className="text-center">
                  <span className={`text-6xl font-bold ${getColorClass(totalCarbon)}`}>
                    {totalCarbon.toFixed(1)}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">kg CO₂ today</p>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Daily limit: {dailyLimit} kg</span>
                    <span className={getColorClass(totalCarbon)}>{percentUsed.toFixed(0)}% used</span>
                  </div>
                  <div className="h-4 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getProgressColor(percentUsed)}`}
                      style={{ width: `${Math.min(percentUsed, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {carbonData.map((item) => (
                  <div key={item.category} className="p-4 rounded-xl bg-secondary/50">
                    <item.icon className="w-5 h-5 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-2xl font-bold text-foreground">{item.value.toFixed(1)} kg</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-eco-yellow" />
                Tips to Reduce
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Use public transport to reduce emissions by 2.6 kg/day</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Switch to plant-based meals twice a week</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Reduce AC usage by 1 hour to save 0.5 kg CO₂</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Buy local produce to minimize transport emissions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Calculator Tabs */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Calculate Your Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transport" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="transport" className="flex items-center gap-2">
                  <Car className="w-4 h-4" /> Transport
                </TabsTrigger>
                <TabsTrigger value="food" className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Meals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="transport">
                <div className="space-y-4">
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-sm text-muted-foreground mb-2 block">Vehicle Type</label>
                      <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car"><div className="flex items-center gap-2"><Car className="w-4 h-4" /> Car</div></SelectItem>
                          <SelectItem value="motorcycle"><div className="flex items-center gap-2"><Bike className="w-4 h-4" /> Motorcycle</div></SelectItem>
                          <SelectItem value="bus"><div className="flex items-center gap-2"><Car className="w-4 h-4" /> Bus</div></SelectItem>
                          <SelectItem value="train"><div className="flex items-center gap-2"><Train className="w-4 h-4" /> Train</div></SelectItem>
                          <SelectItem value="plane"><div className="flex items-center gap-2"><Plane className="w-4 h-4" /> Plane</div></SelectItem>
                          <SelectItem value="bicycle"><div className="flex items-center gap-2"><Bike className="w-4 h-4" /> Bicycle</div></SelectItem>
                          <SelectItem value="walking"><div className="flex items-center gap-2">🚶 Walking</div></SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                      <label className="text-sm text-muted-foreground mb-2 block">Distance (km)</label>
                      <Input
                        type="number"
                        placeholder="Enter km"
                        value={kmTravelled}
                        onChange={(e) => setKmTravelled(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button variant="eco" onClick={handleAddTransport}>
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>

                  {transportEntries.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="font-medium text-foreground">Today's Transport</h4>
                      {transportEntries.map((entry, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                          <div className="flex items-center gap-3">
                            <Car className="w-5 h-5 text-eco-lavender" />
                            <span className="capitalize text-foreground">{entry.vehicle}</span>
                            <span className="text-muted-foreground">• {entry.km} km</span>
                          </div>
                          <span className="font-bold text-eco-orange">{entry.emission.toFixed(2)} kg CO₂</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="food">
                <div className="space-y-4">
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-sm text-muted-foreground mb-2 block">Meal Type</label>
                      <Select value={selectedMeal} onValueChange={setSelectedMeal}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beef">🥩 Beef</SelectItem>
                          <SelectItem value="lamb">🍖 Lamb</SelectItem>
                          <SelectItem value="pork">🥓 Pork</SelectItem>
                          <SelectItem value="chicken">🍗 Chicken</SelectItem>
                          <SelectItem value="fish">🐟 Fish</SelectItem>
                          <SelectItem value="vegetarian">🥗 Vegetarian</SelectItem>
                          <SelectItem value="vegan">🥬 Vegan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                      <label className="text-sm text-muted-foreground mb-2 block">Portions</label>
                      <Input
                        type="number"
                        placeholder="Number of portions"
                        value={portions}
                        onChange={(e) => setPortions(e.target.value)}
                        min="1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button variant="eco" onClick={handleAddMeal}>
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>

                  {mealEntries.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className="font-medium text-foreground">Today's Meals</h4>
                      {mealEntries.map((entry, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                          <div className="flex items-center gap-3">
                            <Utensils className="w-5 h-5 text-eco-pink" />
                            <span className="capitalize text-foreground">{entry.meal}</span>
                            <span className="text-muted-foreground">• {entry.portions} portion(s)</span>
                          </div>
                          <span className="font-bold text-eco-orange">{entry.emission.toFixed(2)} kg CO₂</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Weekly Chart */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Weekly Carbon Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
                  <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" />
                  <YAxis stroke="hsl(215, 20%, 65%)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220, 45%, 12%)",
                      border: "1px solid hsl(220, 30%, 20%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} kg CO₂`, "Emissions"]}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-eco-green" />
                <span className="text-sm text-muted-foreground">Low (&lt;2 kg)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-eco-yellow" />
                <span className="text-sm text-muted-foreground">Medium (2-3 kg)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-eco-red" />
                <span className="text-sm text-muted-foreground">High (&gt;3 kg)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CarbonFootprint;
