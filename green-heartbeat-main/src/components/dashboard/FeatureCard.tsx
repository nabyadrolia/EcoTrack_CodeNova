import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  gradient?: "eco" | "coral" | "lavender" | "sunset" | "nature";
  image?: string;
  delay?: number;
}

export function FeatureCard({ title, description, icon, path, gradient = "eco", image, delay = 0 }: FeatureCardProps) {
  const gradientClasses = {
    eco: "hover:border-eco-green/50",
    coral: "hover:border-eco-coral/50",
    lavender: "hover:border-eco-lavender/50",
    sunset: "hover:border-eco-orange/50",
    nature: "hover:border-eco-green-light/50",
  };

  const iconBgClasses = {
    eco: "gradient-eco",
    coral: "gradient-coral",
    lavender: "gradient-lavender",
    sunset: "gradient-sunset",
    nature: "gradient-nature",
  };

  return (
    <Link to={path}>
      <Card 
        variant="glass" 
        className={cn(
          "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in",
          gradientClasses[gradient]
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        {image && (
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={cn("p-3 rounded-xl", iconBgClasses[gradient])}>
              {icon}
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Card>
    </Link>
  );
}
