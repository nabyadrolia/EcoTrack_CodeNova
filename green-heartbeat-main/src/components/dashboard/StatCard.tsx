import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: number;
  icon: ReactNode;
  gradient?: "eco" | "coral" | "lavender" | "sunset" | "nature";
  delay?: number;
}

export function StatCard({ title, value, unit, change, icon, gradient = "eco", delay = 0 }: StatCardProps) {
  const gradientClasses = {
    eco: "from-eco-green/20 to-eco-cyan/20 border-eco-green/30",
    coral: "from-eco-coral/20 to-eco-pink/20 border-eco-coral/30",
    lavender: "from-eco-lavender/20 to-eco-blue/20 border-eco-lavender/30",
    sunset: "from-eco-orange/20 to-eco-coral/20 border-eco-orange/30",
    nature: "from-eco-green-light/20 to-eco-yellow/20 border-eco-green-light/30",
  };

  const iconBgClasses = {
    eco: "bg-eco-green/20 text-eco-green",
    coral: "bg-eco-coral/20 text-eco-coral",
    lavender: "bg-eco-lavender/20 text-eco-lavender",
    sunset: "bg-eco-orange/20 text-eco-orange",
    nature: "bg-eco-green-light/20 text-eco-green-light",
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden bg-gradient-to-br border animate-fade-in",
        gradientClasses[gradient]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {change !== undefined && (
              <div className={cn(
                "mt-2 flex items-center gap-1 text-sm font-medium",
                change > 0 ? "text-eco-red" : "text-eco-green"
              )}>
                {change > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(change)}% from last week</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", iconBgClasses[gradient])}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}
