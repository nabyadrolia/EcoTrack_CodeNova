import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, HelpCircle, Moon, Sun, MapPin, Globe, ChevronRight } from "lucide-react";
import { useState } from "react";

const helpItems = [
  { title: "Dashboard", desc: "Overview of all your sustainability metrics" },
  { title: "Carbon Footprint", desc: "Track daily CO₂ emissions from activities" },
  { title: "Electricity", desc: "Monitor household energy consumption" },
  { title: "Waste Scanner", desc: "Scan items to classify waste type" },
  { title: "Air Quality", desc: "Check local AQI and get plant recommendations" },
  { title: "Water Usage", desc: "Log and track daily water consumption" },
  { title: "Green Routes", desc: "Compare eco-friendly transport options" },
];

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("light");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-secondary"><SettingsIcon className="w-8 h-8 text-foreground" /></div>
          <div><h1 className="text-3xl font-bold text-foreground">Settings</h1><p className="text-muted-foreground">Customize your app preferences</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">{darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}<span>Dark Theme</span></div>
                <Switch checked={darkMode} onCheckedChange={toggleTheme} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3"><MapPin className="w-5 h-5" /><span>Location</span></div>
                <span className="text-muted-foreground">New Delhi, India</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3"><Globe className="w-5 h-5" /><span>Language</span></div>
                <span className="text-muted-foreground">English</span>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle className="w-5 h-5" /> Help & Guide</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {helpItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors">
                    <div><p className="font-medium text-foreground">{item.title}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
