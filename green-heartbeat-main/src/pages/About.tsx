import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Info, 
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
  ImagePlus, 
  Store, 
  Building2,
  ChevronRight,
  Lightbulb
} from "lucide-react";

const features = [
  {
    icon: Footprints,
    title: "Carbon Footprint",
    description: "Track your daily CO₂ emissions from transport, food, and lifestyle choices.",
    steps: [
      "Go to Carbon Footprint from the sidebar",
      "Select Transport tab and enter your vehicle type and km travelled",
      "Switch to Meals tab to log your food choices",
      "View your total daily carbon emissions and weekly trends",
      "Follow tips to reduce your footprint"
    ],
    gradient: "gradient-eco"
  },
  {
    icon: Zap,
    title: "Electricity Monitor",
    description: "Monitor your household electricity consumption and manage monthly bills.",
    steps: [
      "Navigate to Electricity page",
      "Enter your monthly electricity units from your bill",
      "Click 'Calculate Bill' to see estimated cost",
      "View hourly consumption patterns in the chart",
      "Check appliance breakdown to identify high consumers"
    ],
    gradient: "gradient-lavender"
  },
  {
    icon: Trash2,
    title: "Waste & Recycling",
    description: "Classify waste, track recycling habits, and reduce landfill contributions.",
    steps: [
      "Open Waste & Recycling page",
      "View waste classification guidelines",
      "Log your daily waste by category",
      "Track your recycling rate over time",
      "Learn which items can be recycled"
    ],
    gradient: "gradient-pink"
  },
  {
    icon: Wind,
    title: "Air Quality Index",
    description: "Monitor your area's AQI and get recommendations for plant-based neutralization.",
    steps: [
      "Go to Air Quality page",
      "View current AQI for your location",
      "Check color-coded air quality levels",
      "See recommended number of plants to neutralize pollution",
      "Get health recommendations based on AQI"
    ],
    gradient: "gradient-coral"
  },
  {
    icon: Droplets,
    title: "Water Usage",
    description: "Track daily water consumption, set limits, and get alerts when exceeding.",
    steps: [
      "Navigate to Water Usage",
      "Enter activity name (e.g., Shower, Dishes)",
      "Input the volume of water used in liters",
      "Click 'Add' to log the activity",
      "Monitor the water tank visualization for daily progress"
    ],
    gradient: "gradient-eco"
  },
  {
    icon: MapPin,
    title: "Green Routes",
    description: "Compare transport modes and choose eco-friendly travel options.",
    steps: [
      "Open Green Routes page",
      "Enter your start and end destination",
      "View route comparison for different transport modes",
      "Compare CO₂ emissions, cost, and time",
      "Select the greenest option for your journey"
    ],
    gradient: "gradient-lavender"
  },
  {
    icon: Calendar,
    title: "Green Events",
    description: "Join community eco events or create your own volunteer opportunities.",
    steps: [
      "Go to Green Events",
      "Browse upcoming events in your city",
      "Click 'Join Event' to volunteer",
      "Or click 'Create Event' to organize your own",
      "For NGOs: Register fundraisers with verification"
    ],
    gradient: "gradient-coral"
  },
  {
    icon: Target,
    title: "Habit Tracker",
    description: "Build sustainable habits with daily tracking and streak rewards.",
    steps: [
      "Navigate to Habit Tracker",
      "Choose from suggested eco habits or add custom ones",
      "Check off completed habits daily",
      "Maintain streaks to earn badges",
      "Track your sustainability score over time"
    ],
    gradient: "gradient-pink"
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description: "Compete with others and see weekly top eco warriors.",
    steps: [
      "Open Leaderboard page",
      "View this week's top performers",
      "Check your ranking among friends",
      "See points breakdown by category",
      "Earn more points by completing eco actions"
    ],
    gradient: "gradient-eco"
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    description: "Explore solar panel options and renewable energy forecasting.",
    steps: [
      "Go to Renewable Energy",
      "View solar panel installation options",
      "Check energy generation forecasts",
      "Calculate potential savings",
      "Find nearby renewable energy providers"
    ],
    gradient: "gradient-lavender"
  },
  {
    icon: ImagePlus,
    title: "My Posts",
    description: "Share your eco achievements, photos, and badges with the community.",
    steps: [
      "Navigate to My Posts",
      "Click 'New Post' to create content",
      "Upload images of your sustainable actions",
      "Tag friends using @username",
      "Share badges you've earned",
      "Post and share to social media"
    ],
    gradient: "gradient-pink"
  },
  {
    icon: Store,
    title: "Eco Marketplace",
    description: "Buy and sell sustainable, plastic-free products from local vendors.",
    steps: [
      "Open Marketplace page",
      "Browse products by category",
      "Search for specific items or sellers",
      "Add items to cart",
      "To sell: Click 'Sell Product' and fill the form"
    ],
    gradient: "gradient-eco"
  },
  {
    icon: Building2,
    title: "City Ranking",
    description: "See how cities rank in sustainability and fundraising efforts.",
    steps: [
      "Go to City Ranking",
      "View Sustainability Score tab for eco rankings",
      "Switch to Fundraising Leaders for donation rankings",
      "Check detailed metrics for each city",
      "See weekly ranking changes"
    ],
    gradient: "gradient-coral"
  },
];

const About = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-eco">
            <Info className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">About EcoTrack</h1>
            <p className="text-muted-foreground">Learn how to use all features of your sustainability companion</p>
          </div>
        </div>

        {/* App Overview */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Welcome to EcoTrack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              EcoTrack is your comprehensive sustainability companion that helps you track, reduce, and offset your environmental impact. 
              From monitoring your carbon footprint to joining community events, we provide all the tools you need to live a greener life.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-eco-green/20 text-center">
                <p className="text-3xl font-bold text-eco-green">13</p>
                <p className="text-sm text-muted-foreground">Features</p>
              </div>
              <div className="p-4 rounded-xl bg-eco-cyan/20 text-center">
                <p className="text-3xl font-bold text-eco-cyan">24/7</p>
                <p className="text-sm text-muted-foreground">Tracking</p>
              </div>
              <div className="p-4 rounded-xl bg-eco-lavender/20 text-center">
                <p className="text-3xl font-bold text-eco-lavender">Real-time</p>
                <p className="text-sm text-muted-foreground">Updates</p>
              </div>
              <div className="p-4 rounded-xl bg-eco-pink/20 text-center">
                <p className="text-3xl font-bold text-eco-pink">Free</p>
                <p className="text-sm text-muted-foreground">To Use</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Guides */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Feature Guides</h2>
          
          {features.map((feature, index) => (
            <Card key={index} variant="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${feature.gradient}`}>
                    <feature.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground text-sm">How to use:</h4>
                  <ol className="space-y-2">
                    {feature.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-eco-yellow" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <ChevronRight className="w-4 h-4 text-eco-green mt-0.5" />
                <span>Log your activities daily for accurate tracking and better insights.</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <ChevronRight className="w-4 h-4 text-eco-green mt-0.5" />
                <span>Join green events to boost your eco score and meet like-minded people.</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <ChevronRight className="w-4 h-4 text-eco-green mt-0.5" />
                <span>Share your achievements on social media to inspire others.</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <ChevronRight className="w-4 h-4 text-eco-green mt-0.5" />
                <span>Check the leaderboard weekly to stay motivated and competitive.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default About;
