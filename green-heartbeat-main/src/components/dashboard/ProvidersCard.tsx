import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Zap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const providers = [
  {
    name: "SolarCity India",
    type: "Solar Panels",
    rating: 4.8,
    icon: Sun,
  },
  {
    name: "GreenPower Solutions",
    type: "Wind Energy",
    rating: 4.6,
    icon: Zap,
  },
];

export function ProvidersCard() {
  return (
    <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "450ms" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-eco-yellow" />
          <span>Renewable Providers</span>
        </CardTitle>
        <Link to="/renewable">
          <Button variant="ghost" size="sm">
            View Providers <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {providers.map((provider, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="p-2 rounded-lg gradient-nature">
                <provider.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{provider.name}</h4>
                <p className="text-sm text-muted-foreground">{provider.type}</p>
              </div>
              <div className="flex items-center gap-1 text-eco-yellow">
                <span className="text-sm font-medium">{provider.rating}</span>
                <span className="text-xs">★</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
