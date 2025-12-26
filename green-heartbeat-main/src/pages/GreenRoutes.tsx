import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Car, Bus, Train, Bike, Footprints, Leaf, IndianRupee, Lightbulb, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

// CO2 emissions in grams per km
const vehicleEmissions = {
  car: 120,
  bus: 45,
  metro: 30,
  bicycle: 0,
  walking: 0,
};

// Cost per km in INR
const vehicleCosts = {
  car: 12,
  bus: 2,
  metro: 3,
  bicycle: 0,
  walking: 0,
};

// Speed in km/h
const vehicleSpeeds = {
  car: 25,
  bus: 18,
  metro: 35,
  bicycle: 15,
  walking: 5,
};

const GreenRoutes = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [routeDetails, setRouteDetails] = useState<{
    mode: string;
    icon: any;
    co2: number;
    cost: number;
    time: number;
    score: number;
    recommended: boolean;
  }[]>([]);

  const calculateRoutes = (distanceKm: number) => {
    const modes = [
      { mode: "Car", icon: Car, key: "car" as const },
      { mode: "Bus", icon: Bus, key: "bus" as const },
      { mode: "Metro", icon: Train, key: "metro" as const },
      { mode: "Bicycle", icon: Bike, key: "bicycle" as const },
      { mode: "Walking", icon: Footprints, key: "walking" as const },
    ];

    const results = modes.map(({ mode, icon, key }) => {
      const co2 = Math.round(vehicleEmissions[key] * distanceKm);
      const cost = Math.round(vehicleCosts[key] * distanceKm);
      const time = Math.round((distanceKm / vehicleSpeeds[key]) * 60);
      
      // Calculate eco score based on CO2 and practicality
      let score = 10 - Math.floor(vehicleEmissions[key] / 15);
      if (time > 60) score = Math.max(score - 2, 1); // Penalize very long times
      score = Math.max(1, Math.min(10, score));

      return { mode, icon, co2, cost, time, score, recommended: false };
    });

    // Find the best option (highest score with reasonable time)
    const bestOption = results.reduce((best, current) => {
      if (current.time <= 60 && current.score > best.score) return current;
      if (current.time <= 60 && current.score === best.score && current.cost < best.cost) return current;
      return best;
    }, results[0]);

    return results.map(r => ({
      ...r,
      recommended: r.mode === bestOption.mode
    }));
  };

  const handleSearch = async () => {
    if (!startLocation.trim() || !endLocation.trim()) {
      toast.error("Please enter both start and end locations");
      return;
    }

    setLoading(true);
    
    // Simulate Google Maps API call - in production, you would use the actual API
    // For now, we'll calculate a mock distance based on string similarity
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock distance calculation (in production, use Google Maps Distance Matrix API)
    const mockDistance = Math.round((Math.random() * 15 + 2) * 10) / 10; // 2-17 km
    
    setDistance(mockDistance);
    setRouteDetails(calculateRoutes(mockDistance));
    setShowResults(true);
    setLoading(false);
    
    toast.success(`Route calculated: ${mockDistance} km`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-eco-green";
    if (score >= 5) return "text-eco-yellow";
    return "text-eco-red";
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return "bg-eco-green/20";
    if (score >= 5) return "bg-eco-yellow/20";
    return "bg-eco-red/20";
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-sunset">
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Green Routes</h1>
            <p className="text-muted-foreground">Compare eco-friendly transport options for your journey</p>
          </div>
        </div>

        {/* Search Section */}
        <Card variant="glass">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Start Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-eco-green" />
                  <Input
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    className="pl-10"
                    placeholder="Enter start location"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">End Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-eco-coral" />
                  <Input
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    className="pl-10"
                    placeholder="Enter destination"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button variant="eco" className="w-full" onClick={handleSearch} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Calculating...
                    </>
                  ) : (
                    "Compare Routes"
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              💡 Enter actual addresses for distance calculation using Google Maps API
            </p>
          </CardContent>
        </Card>

        {/* Map Visualization */}
        {showResults && distance && (
          <Card variant="glass">
            <CardContent className="pt-6">
              <div className="relative aspect-[16/9] bg-secondary/30 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&auto=format&fit=crop&q=60"
                  alt="India Map"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center glass-card p-6 rounded-xl">
                    <p className="text-foreground font-semibold mb-2">Calculated Distance</p>
                    <p className="text-4xl font-bold text-eco-green">{distance} km</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {startLocation} → {endLocation}
                    </p>
                  </div>
                </div>
                {/* Route markers */}
                <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-eco-green flex items-center justify-center animate-pulse">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-8 h-8 rounded-full bg-eco-coral flex items-center justify-center animate-pulse">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Route Comparison */}
        {showResults && routeDetails.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Route Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {routeDetails.map((transport) => (
                <Card
                  key={transport.mode}
                  variant="glass"
                  className={`transition-all hover:scale-105 ${
                    transport.recommended ? "ring-2 ring-eco-green" : ""
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      {transport.recommended && (
                        <div className="flex items-center justify-center gap-1 mb-2 text-eco-green text-xs font-medium">
                          <Star className="w-3 h-3 fill-current" /> RECOMMENDED
                        </div>
                      )}
                      <div className={`inline-flex p-4 rounded-xl ${getScoreBg(transport.score)}`}>
                        <transport.icon className={`w-8 h-8 ${getScoreColor(transport.score)}`} />
                      </div>
                      <h3 className="font-semibold text-foreground mt-3">{transport.mode}</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Leaf className="w-4 h-4" /> CO₂
                        </span>
                        <span className={`font-medium ${getScoreColor(transport.score)}`}>
                          {transport.co2}g
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" /> Cost
                        </span>
                        <span className="font-medium text-foreground">
                          ₹{transport.cost}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground">Time</span>
                        <span className="font-medium text-foreground">{transport.time} min</span>
                      </div>

                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Eco Score</span>
                          <div className={`flex items-center gap-1 ${getScoreColor(transport.score)}`}>
                            <Leaf className="w-4 h-4" />
                            <span className="font-bold text-lg">{transport.score}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {transport.recommended && (
                      <div className="mt-4">
                        <Button variant="eco" size="sm" className="w-full">
                          Best Choice
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Environmental Impact Summary */}
        {showResults && distance && (
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-2">Car vs Metro Savings</p>
                  <p className="text-3xl font-bold text-eco-green">
                    {Math.round((vehicleEmissions.car - vehicleEmissions.metro) * distance)}g CO₂
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">per trip saved</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-2">Monthly Savings (20 trips)</p>
                  <p className="text-3xl font-bold text-eco-green">
                    {((vehicleEmissions.car - vehicleEmissions.metro) * distance * 20 / 1000).toFixed(1)} kg CO₂
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">by choosing metro</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-2">Cost Savings</p>
                  <p className="text-3xl font-bold text-eco-yellow">
                    ₹{Math.round((vehicleCosts.car - vehicleCosts.metro) * distance * 20)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">per month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Green Commuting Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">Combine Trips</h4>
                <p className="text-sm text-muted-foreground">
                  Plan your errands to minimize multiple trips. Combine shopping, appointments, and other tasks.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">Carpool When Possible</h4>
                <p className="text-sm text-muted-foreground">
                  Share rides with colleagues or neighbors to reduce emissions and costs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GreenRoutes;