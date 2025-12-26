import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, MapPin, TreeDeciduous, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react";

const aqiData = {
  value: 156,
  category: "Moderate",
  color: "eco-orange",
  description: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
};

const pollutants = [
  { name: "PM2.5", value: 65, unit: "µg/m³", status: "Moderate" },
  { name: "PM10", value: 120, unit: "µg/m³", status: "Moderate" },
  { name: "O3", value: 45, unit: "ppb", status: "Good" },
  { name: "NO2", value: 28, unit: "ppb", status: "Good" },
  { name: "SO2", value: 12, unit: "ppb", status: "Good" },
  { name: "CO", value: 0.8, unit: "ppm", status: "Good" },
];

const nearbyLocations = [
  { name: "City Center", aqi: 180, color: "eco-red" },
  { name: "Industrial Area", aqi: 220, color: "eco-red" },
  { name: "Residential Zone", aqi: 145, color: "eco-orange" },
  { name: "Green Park Area", aqi: 85, color: "eco-yellow" },
  { name: "Riverside", aqi: 62, color: "eco-green" },
];

const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return "eco-green";
  if (aqi <= 100) return "eco-yellow";
  if (aqi <= 150) return "eco-orange";
  if (aqi <= 200) return "eco-red";
  return "eco-red";
};

const getAqiBgClass = (color: string) => {
  const bgMap: Record<string, string> = {
    "eco-green": "bg-eco-green",
    "eco-yellow": "bg-eco-yellow",
    "eco-orange": "bg-eco-orange",
    "eco-red": "bg-eco-red",
  };
  return bgMap[color] || "bg-eco-green";
};

const AirQuality = () => {
  const plantsNeeded = Math.ceil((aqiData.value - 50) / 10);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-nature">
            <Wind className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Air Quality Index</h1>
            <p className="text-muted-foreground">Monitor local air quality and get plant recommendations</p>
          </div>
        </div>

        {/* Current AQI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Current Location AQI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center ${getAqiBgClass(aqiData.color)}/20 border-4 border-${aqiData.color}`}>
                    <span className={`text-5xl font-bold text-${aqiData.color}`}>{aqiData.value}</span>
                  </div>
                  <p className={`mt-2 font-semibold text-${aqiData.color}`}>{aqiData.category}</p>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground mb-4">{aqiData.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-eco-orange/20 text-eco-orange text-sm">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      Sensitive groups should limit outdoor exposure
                    </span>
                  </div>
                </div>
              </div>

              {/* AQI Scale */}
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">AQI Scale</p>
                <div className="flex h-4 rounded-full overflow-hidden">
                  <div className="flex-1 bg-eco-green" title="Good (0-50)" />
                  <div className="flex-1 bg-eco-yellow" title="Satisfactory (51-100)" />
                  <div className="flex-1 bg-eco-orange" title="Moderate (101-200)" />
                  <div className="flex-1 bg-eco-red" title="Poor (201-300)" />
                  <div className="flex-1 bg-[hsl(0,80%,40%)]" title="Very Poor (301-400)" />
                  <div className="flex-1 bg-[hsl(0,90%,30%)]" title="Severe (401+)" />
                </div>
                <div className="flex text-xs text-muted-foreground mt-1">
                  <span className="flex-1">Good</span>
                  <span className="flex-1 text-center">Satisfactory</span>
                  <span className="flex-1 text-center">Moderate</span>
                  <span className="flex-1 text-center">Poor</span>
                  <span className="flex-1 text-center">Very Poor</span>
                  <span className="flex-1 text-right">Severe</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="border-l-4 border-eco-green">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreeDeciduous className="w-5 h-5 text-eco-green" />
                Plant Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-5xl font-bold text-eco-green">{plantsNeeded}</span>
                <p className="text-muted-foreground">plants needed to neutralize AQI</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-foreground font-medium">Recommended Air-Purifying Plants:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-eco-green" />
                    Snake Plant (Sansevieria)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-eco-green" />
                    Peace Lily (Spathiphyllum)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-eco-green" />
                    Spider Plant (Chlorophytum)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-eco-green" />
                    Aloe Vera
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Visualization */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Area Air Quality Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[16/9] bg-secondary/30 rounded-xl overflow-hidden">
              {/* Placeholder map with AQI dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=60"
                  alt="City Map"
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* AQI Dots positioned on map */}
                  <div className="absolute top-[20%] left-[30%] w-6 h-6 rounded-full bg-eco-red animate-pulse" title="Industrial Area: 220" />
                  <div className="absolute top-[30%] left-[50%] w-6 h-6 rounded-full bg-eco-red animate-pulse" title="City Center: 180" />
                  <div className="absolute top-[45%] left-[40%] w-6 h-6 rounded-full bg-eco-orange animate-pulse" title="Your Location: 156" />
                  <div className="absolute top-[55%] left-[65%] w-6 h-6 rounded-full bg-eco-yellow animate-pulse" title="Green Park: 85" />
                  <div className="absolute top-[70%] left-[55%] w-6 h-6 rounded-full bg-eco-green animate-pulse" title="Riverside: 62" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4 p-3 glass-card rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-eco-green" />
                  <span className="text-xs text-foreground">Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-eco-yellow" />
                  <span className="text-xs text-foreground">Satisfactory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-eco-orange" />
                  <span className="text-xs text-foreground">Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-eco-red" />
                  <span className="text-xs text-foreground">Poor</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pollutants & Nearby Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Pollutant Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {pollutants.map((pollutant) => (
                  <div key={pollutant.name} className="p-4 rounded-xl bg-secondary/50">
                    <p className="text-sm text-muted-foreground">{pollutant.name}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {pollutant.value}
                      <span className="text-sm font-normal text-muted-foreground ml-1">{pollutant.unit}</span>
                    </p>
                    <span className={`text-xs ${pollutant.status === "Good" ? "text-eco-green" : "text-eco-orange"}`}>
                      {pollutant.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Nearby Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyLocations.map((location) => (
                  <div
                    key={location.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getAqiBgClass(location.color)}`} />
                      <span className="text-foreground">{location.name}</span>
                    </div>
                    <span className={`font-bold text-${location.color}`}>AQI {location.aqi}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Air Quality Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">Indoor Air Quality</h4>
                <p className="text-sm text-muted-foreground">
                  Keep windows closed during high pollution hours and use air purifiers.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">Outdoor Activities</h4>
                <p className="text-sm text-muted-foreground">
                  Exercise early morning when pollution levels are typically lower.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-2">Personal Protection</h4>
                <p className="text-sm text-muted-foreground">
                  Wear N95 masks when AQI exceeds 150 for extended outdoor activities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AirQuality;
