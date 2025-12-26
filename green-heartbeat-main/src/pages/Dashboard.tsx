import { MainLayout } from "@/components/layout/MainLayout";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { TipsCard } from "@/components/dashboard/TipsCard";
import { ProvidersCard } from "@/components/dashboard/ProvidersCard";
import { FeatureCard } from "@/components/dashboard/FeatureCard";
import { 
  Footprints, 
  Zap, 
  Trash2, 
  Wind, 
  Droplets, 
  MapPin, 
  Calendar, 
  Target, 
  Trophy,
  Sun
} from "lucide-react";

const features = [
  {
    title: "Carbon Footprint",
    description: "Track and reduce your daily carbon emissions",
    icon: <Footprints className="w-6 h-6 text-primary-foreground" />,
    path: "/carbon",
    gradient: "eco" as const,
  },
  {
    title: "Electricity Monitor",
    description: "Monitor household energy consumption",
    icon: <Zap className="w-6 h-6 text-primary-foreground" />,
    path: "/electricity",
    gradient: "lavender" as const,
  },
  {
    title: "Waste & Recycling",
    description: "Scan and classify waste for proper disposal",
    icon: <Trash2 className="w-6 h-6 text-primary-foreground" />,
    path: "/waste",
    gradient: "coral" as const,
  },
  {
    title: "Air Quality Index",
    description: "Check local AQI and plant recommendations",
    icon: <Wind className="w-6 h-6 text-primary-foreground" />,
    path: "/air-quality",
    gradient: "nature" as const,
  },
  {
    title: "Water Usage",
    description: "Track daily water consumption and set limits",
    icon: <Droplets className="w-6 h-6 text-primary-foreground" />,
    path: "/water",
    gradient: "eco" as const,
  },
  {
    title: "Green Routes",
    description: "Compare eco-friendly transport options",
    icon: <MapPin className="w-6 h-6 text-primary-foreground" />,
    path: "/routes",
    gradient: "sunset" as const,
  },
  {
    title: "Green Events",
    description: "Join or create community eco events",
    icon: <Calendar className="w-6 h-6 text-primary-foreground" />,
    path: "/events",
    gradient: "coral" as const,
  },
  {
    title: "Habit Tracker",
    description: "Build sustainable habits with streaks",
    icon: <Target className="w-6 h-6 text-primary-foreground" />,
    path: "/habits",
    gradient: "lavender" as const,
  },
  {
    title: "Leaderboard",
    description: "Compete for the top eco warrior spot",
    icon: <Trophy className="w-6 h-6 text-primary-foreground" />,
    path: "/leaderboard",
    gradient: "sunset" as const,
  },
  {
    title: "Renewable Energy",
    description: "Explore solar and wind energy options",
    icon: <Sun className="w-6 h-6 text-primary-foreground" />,
    path: "/renewable",
    gradient: "nature" as const,
  },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your <span className="text-gradient-eco">Sustainability</span> Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your environmental impact and make a difference every day
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Feature Cards Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.path}
                {...feature}
                delay={index * 50}
              />
            ))}
          </div>
        </div>

        {/* Charts and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyChart />
          <UpcomingEvents />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TipsCard />
          <ProvidersCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
