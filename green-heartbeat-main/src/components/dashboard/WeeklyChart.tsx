import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const weeklyData = [
  { day: "Mon", carbon: 2.1, electricity: 15, water: 120 },
  { day: "Tue", carbon: 2.8, electricity: 22, water: 180 },
  { day: "Wed", carbon: 1.9, electricity: 12, water: 95 },
  { day: "Thu", carbon: 2.4, electricity: 18, water: 145 },
  { day: "Fri", carbon: 3.2, electricity: 28, water: 200 },
  { day: "Sat", carbon: 1.5, electricity: 10, water: 85 },
  { day: "Sun", carbon: 1.8, electricity: 14, water: 110 },
];

export function WeeklyChart() {
  return (
    <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "300ms" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Weekly Resource Consumption</span>
          <span className="text-sm font-normal text-muted-foreground">Last 7 days</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(260, 60%, 75%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(260, 60%, 75%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(185, 75%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(185, 75%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
              <XAxis dataKey="day" stroke="hsl(215, 20%, 65%)" />
              <YAxis stroke="hsl(215, 20%, 65%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 45%, 12%)",
                  border: "1px solid hsl(220, 30%, 20%)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="carbon"
                name="Carbon (kg CO₂)"
                stroke="hsl(145, 65%, 42%)"
                fillOpacity={1}
                fill="url(#colorCarbon)"
              />
              <Area
                type="monotone"
                dataKey="electricity"
                name="Electricity (kWh)"
                stroke="hsl(260, 60%, 75%)"
                fillOpacity={1}
                fill="url(#colorElectricity)"
              />
              <Area
                type="monotone"
                dataKey="water"
                name="Water (L)"
                stroke="hsl(185, 75%, 55%)"
                fillOpacity={1}
                fill="url(#colorWater)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
