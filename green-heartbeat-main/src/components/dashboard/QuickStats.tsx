import { 
  Footprints, 
  Zap, 
  Droplets, 
  Trash2,
  Wind,
  Flame
} from "lucide-react";
import { StatCard } from "./StatCard";

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Carbon Footprint"
        value="2.4"
        unit="kg CO₂"
        change={-12}
        icon={<Footprints className="w-6 h-6" />}
        gradient="eco"
        delay={0}
      />
      <StatCard
        title="Electricity"
        value="18.5"
        unit="kWh"
        change={8}
        icon={<Zap className="w-6 h-6" />}
        gradient="lavender"
        delay={50}
      />
      <StatCard
        title="Water Usage"
        value="145"
        unit="L"
        change={-5}
        icon={<Droplets className="w-6 h-6" />}
        gradient="eco"
        delay={100}
      />
      <StatCard
        title="Waste Recycled"
        value="78"
        unit="%"
        change={-3}
        icon={<Trash2 className="w-6 h-6" />}
        gradient="coral"
        delay={150}
      />
      <StatCard
        title="Air Quality"
        value="Good"
        icon={<Wind className="w-6 h-6" />}
        gradient="nature"
        delay={200}
      />
      <StatCard
        title="Eco Score"
        value="85"
        unit="pts"
        change={-2}
        icon={<Flame className="w-6 h-6" />}
        gradient="sunset"
        delay={250}
      />
    </div>
  );
}
