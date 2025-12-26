import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Footprints, 
  Zap, 
  Trash2, 
  Wind, 
  Droplets, 
  MapPin, 
  Calendar, 
  Target, 
  Trophy, 
  Sun, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ImagePlus,
  Store,
  Building2,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Footprints, label: "Carbon Footprint", path: "/carbon" },
  { icon: Zap, label: "Electricity", path: "/electricity" },
  { icon: Trash2, label: "Waste & Recycling", path: "/waste" },
  { icon: Wind, label: "Air Quality", path: "/air-quality" },
  { icon: Droplets, label: "Water Usage", path: "/water" },
  { icon: MapPin, label: "Green Routes", path: "/routes" },
  { icon: Calendar, label: "Green Events", path: "/events" },
  { icon: Target, label: "Habit Tracker", path: "/habits" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: Sun, label: "Renewable Energy", path: "/renewable" },
  { icon: ImagePlus, label: "My Posts", path: "/posts" },
  { icon: Store, label: "Marketplace", path: "/marketplace" },
  { icon: Building2, label: "City Ranking", path: "/city-ranking" },
  { icon: Info, label: "About", path: "/about" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-eco flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-gradient-eco">EcoTrack</span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-sidebar-foreground" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "animate-pulse-slow")} />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs text-muted-foreground">
                🌱 Every action counts towards a sustainable future
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
