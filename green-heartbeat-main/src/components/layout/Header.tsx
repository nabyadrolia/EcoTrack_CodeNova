import { Link } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex h-full items-center justify-between px-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Welcome back, <span className="text-gradient-eco">Eco Warrior</span>
          </h2>
          <p className="text-sm text-muted-foreground">Let's make today sustainable!</p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/notifications">
            <Button variant="glass" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-eco-coral rounded-full text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                3
              </span>
            </Button>
          </Link>
          
          <Link to="/profile">
            <Button variant="glass" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
