import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ChevronRight } from "lucide-react";

const tips = [
  "Switch to LED bulbs to reduce electricity consumption by 75%",
  "Fix leaky faucets - a single drip wastes 20 gallons per day",
  "Use public transport once a week to cut your carbon footprint by 15%",
  "Compost food scraps to reduce methane emissions from landfills",
];

export function TipsCard() {
  return (
    <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "400ms" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-eco-yellow" />
          <span>Eco Tips & Guides</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
            >
              <ChevronRight className="w-4 h-4 text-eco-green mt-0.5 group-hover:translate-x-1 transition-transform" />
              <span className="text-sm text-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
