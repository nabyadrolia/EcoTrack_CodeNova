import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CarbonFootprint from "./pages/CarbonFootprint";
import Electricity from "./pages/Electricity";
import Waste from "./pages/Waste";
import AirQuality from "./pages/AirQuality";
import WaterUsage from "./pages/WaterUsage";
import GreenRoutes from "./pages/GreenRoutes";
import GreenEvents from "./pages/GreenEvents";
import HabitTracker from "./pages/HabitTracker";
import Leaderboard from "./pages/Leaderboard";
import RenewableEnergy from "./pages/RenewableEnergy";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";
import Marketplace from "./pages/Marketplace";
import CityRanking from "./pages/CityRanking";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/carbon" element={<CarbonFootprint />} />
          <Route path="/electricity" element={<Electricity />} />
          <Route path="/waste" element={<Waste />} />
          <Route path="/air-quality" element={<AirQuality />} />
          <Route path="/water" element={<WaterUsage />} />
          <Route path="/routes" element={<GreenRoutes />} />
          <Route path="/events" element={<GreenEvents />} />
          <Route path="/habits" element={<HabitTracker />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/renewable" element={<RenewableEnergy />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<MyPosts />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/city-ranking" element={<CityRanking />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
