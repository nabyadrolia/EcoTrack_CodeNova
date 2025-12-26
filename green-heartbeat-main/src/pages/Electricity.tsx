import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Lightbulb, TrendingUp, TrendingDown, Plus, Leaf } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const hourlyData = [
  { time: "00:00", current: 0.8, average: 1.0, peak: 1.2 },
  { time: "04:00", current: 0.5, average: 0.6, peak: 0.8 },
  { time: "08:00", current: 2.1, average: 1.8, peak: 2.5 },
  { time: "12:00", current: 1.5, average: 1.4, peak: 1.8 },
  { time: "16:00", current: 2.8, average: 2.2, peak: 3.0 },
  { time: "20:00", current: 3.2, average: 2.8, peak: 3.5 },
  { time: "24:00", current: 1.2, average: 1.0, peak: 1.5 },
];

const applianceData = [
  { name: "Air Conditioner", usage: 8.5, percentage: 45 },
  { name: "Water Heater", usage: 3.2, percentage: 17 },
  { name: "Refrigerator", usage: 2.8, percentage: 15 },
  { name: "Washing Machine", usage: 1.5, percentage: 8 },
  { name: "Lighting", usage: 1.2, percentage: 6 },
  { name: "Others", usage: 1.8, percentage: 9 },
];

// CO2 emission factor: ~0.82 kg CO2 per kWh (India grid average)
const CO2_FACTOR = 0.82;

const Electricity = () => {
  const [monthlyUnits, setMonthlyUnits] = useState("");
  const [monthlyBill, setMonthlyBill] = useState<number | null>(null);
  const [carbonEmission, setCarbonEmission] = useState<number | null>(null);
  const [monthlyData, setMonthlyData] = useState<{month: string; units: number; bill: number; carbon: number}[]>([
    { month: "Oct 2025", units: 320, bill: 2880, carbon: 262.4 },
    { month: "Nov 2025", units: 295, bill: 2655, carbon: 241.9 },
  ]);

  const monthlyBudget = 500;
  const ratePerUnit = 9; // ₹9 per kWh

  // Calculate monthly average
  const monthlyAverage = monthlyData.length > 0 
    ? Math.round(monthlyData.reduce((sum, d) => sum + d.units, 0) / monthlyData.length)
    : 0;

  const handleAddMonthlyUsage = () => {
    if (monthlyUnits) {
      const units = parseFloat(monthlyUnits);
      const bill = units * ratePerUnit;
      const carbon = units * CO2_FACTOR;
      const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      setMonthlyData([...monthlyData, { month: currentMonth, units, bill, carbon }]);
      setMonthlyBill(bill);
      setCarbonEmission(carbon);
      setMonthlyUnits("");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-lavender">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Electricity Monitor</h1>
            <p className="text-muted-foreground">Track your household energy consumption in real-time</p>
          </div>
        </div>

        {/* Monthly Input */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Enter Monthly Electricity Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm text-muted-foreground mb-2 block">Units Consumed (kWh)</label>
                <Input
                  type="number"
                  placeholder="Enter units from your bill"
                  value={monthlyUnits}
                  onChange={(e) => setMonthlyUnits(e.target.value)}
                />
              </div>
              <div className="text-center px-4">
                <p className="text-sm text-muted-foreground">Rate</p>
                <p className="text-lg font-bold text-foreground">₹{ratePerUnit}/kWh</p>
              </div>
              <Button variant="eco" onClick={handleAddMonthlyUsage}>
                <Plus className="w-4 h-4 mr-2" /> Calculate Bill
              </Button>
            </div>
            
            {monthlyBill !== null && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-eco-green/20 border border-eco-green/30">
                  <p className="text-sm text-muted-foreground">Estimated Monthly Bill</p>
                  <p className="text-3xl font-bold text-eco-green">₹{monthlyBill.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-eco-orange/20 border border-eco-orange/30">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Leaf className="w-4 h-4" /> Carbon Emission
                  </p>
                  <p className="text-3xl font-bold text-eco-orange">{carbonEmission?.toFixed(1)} kg CO₂</p>
                </div>
              </div>
            )}

            {monthlyData.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-3">Previous Months</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="p-3 rounded-xl bg-secondary/50">
                      <p className="text-sm text-muted-foreground">{data.month}</p>
                      <p className="font-bold text-foreground">{data.units} kWh</p>
                      <p className="text-sm text-eco-lavender">₹{data.bill.toLocaleString()}</p>
                      <p className="text-xs text-eco-orange">{data.carbon.toFixed(1)} kg CO₂</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-foreground">342 kWh</p>
                </div>
                <div className="p-3 rounded-xl bg-eco-pink/20">
                  <TrendingDown className="w-6 h-6 text-eco-pink" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingDown className="w-4 h-4 text-eco-green" />
                <span className="text-eco-green">-5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Budget</p>
                <p className="text-3xl font-bold text-foreground">₹{monthlyBudget}</p>
              </div>
              <div className="mt-2">
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-full w-[68%] bg-eco-lavender rounded-full" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">68% used (₹340)</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Average</p>
                <p className="text-3xl font-bold text-foreground">{monthlyAverage} kWh</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Based on {monthlyData.length} month(s) data
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-eco-orange">
                <Leaf className="w-3 h-3" />
                <span>≈ {(monthlyAverage * CO2_FACTOR).toFixed(1)} kg CO₂/month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Chart */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Today's Consumption Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
                  <XAxis dataKey="time" stroke="hsl(215, 20%, 65%)" />
                  <YAxis stroke="hsl(215, 20%, 65%)" unit=" kWh" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(220, 45%, 12%)",
                      border: "1px solid hsl(220, 30%, 20%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="current"
                    name="Current"
                    stroke="hsl(260, 60%, 75%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(260, 60%, 75%)", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="average"
                    name="Average"
                    stroke="hsl(330, 70%, 75%)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="peak"
                    name="Peak"
                    stroke="hsl(0, 75%, 55%)"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Appliance Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Appliance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applianceData.map((appliance) => (
                  <div key={appliance.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground">{appliance.name}</span>
                      <span className="text-muted-foreground">{appliance.usage} kWh ({appliance.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div
                        className="h-full rounded-full gradient-lavender"
                        style={{ width: `${appliance.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-eco-yellow" />
                Energy Saving Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm p-3 rounded-lg bg-secondary/50">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Set AC to 24°C - saves 6% energy per degree increase</span>
                </li>
                <li className="flex items-start gap-2 text-sm p-3 rounded-lg bg-secondary/50">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Switch to LED bulbs to reduce lighting costs by 80%</span>
                </li>
                <li className="flex items-start gap-2 text-sm p-3 rounded-lg bg-secondary/50">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Unplug devices when not in use - phantom load costs ₹2000/year</span>
                </li>
                <li className="flex items-start gap-2 text-sm p-3 rounded-lg bg-secondary/50">
                  <TrendingDown className="w-4 h-4 text-eco-green mt-0.5" />
                  <span>Run washing machine with full loads only</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Electricity;