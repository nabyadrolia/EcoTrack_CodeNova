import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, TrendingUp, Lightbulb, MapPin, Zap, Wind } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const solarForecast = [
  { time: "6AM", output: 0.2 }, { time: "9AM", output: 2.5 }, { time: "12PM", output: 4.8 },
  { time: "3PM", output: 4.2 }, { time: "6PM", output: 1.5 }, { time: "9PM", output: 0 },
];

const providers = [
  { name: "SolarCity India", type: "Solar Panels", rating: 4.8, distance: "2.5 km", price: "₹45,000" },
  { name: "GreenPower Solutions", type: "Solar + Battery", rating: 4.6, distance: "4.2 km", price: "₹85,000" },
  { name: "WindTech Energy", type: "Small Wind Turbine", rating: 4.5, distance: "8.1 km", price: "₹1,20,000" },
];

const RenewableEnergy = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-nature"><Sun className="w-8 h-8 text-primary-foreground" /></div>
          <div><h1 className="text-3xl font-bold text-foreground">Renewable Energy</h1><p className="text-muted-foreground">Explore solar and wind energy options</p></div>
        </div>

        <Card variant="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Solar Panel Forecasting</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={solarForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 20%)" />
                  <XAxis dataKey="time" stroke="hsl(215, 20%, 65%)" />
                  <YAxis stroke="hsl(215, 20%, 65%)" unit=" kW" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220, 45%, 12%)", border: "1px solid hsl(220, 30%, 20%)", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="output" stroke="hsl(45, 95%, 65%)" strokeWidth={3} dot={{ fill: "hsl(45, 95%, 65%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Nearby Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {providers.map((provider, i) => (
              <Card key={i} variant="glass">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-eco-yellow/20"><Sun className="w-6 h-6 text-eco-yellow" /></div>
                    <div><h3 className="font-semibold text-foreground">{provider.name}</h3><p className="text-sm text-muted-foreground">{provider.type}</p></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="text-eco-yellow">★ {provider.rating}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Distance</span><span className="text-foreground">{provider.distance}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Starting at</span><span className="text-eco-green font-bold">{provider.price}</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card variant="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-eco-yellow" /> Tips</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Solar panels can reduce electricity bills by 70-90%. Government subsidies of up to 40% are available for residential installations in India.</p></CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RenewableEnergy;
