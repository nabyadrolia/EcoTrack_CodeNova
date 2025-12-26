import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Droplets, Zap, Footprints, Calendar } from "lucide-react";

const notifications = [
  { type: "water", icon: Droplets, title: "Water Limit Exceeded", message: "You've used 210L today, exceeding your 200L daily limit.", time: "10 mins ago", color: "eco-cyan" },
  { type: "carbon", icon: Footprints, title: "Carbon Alert", message: "Your carbon footprint today is 25% higher than average.", time: "1 hour ago", color: "eco-green" },
  { type: "event", icon: Calendar, title: "New Event Added", message: "Beach Cleanup Initiative has been scheduled for Jan 10.", time: "2 hours ago", color: "eco-coral" },
  { type: "electricity", icon: Zap, title: "High Energy Usage", message: "Your AC has been running for 8 hours continuously.", time: "3 hours ago", color: "eco-lavender" },
  { type: "event", icon: Calendar, title: "Event Reminder", message: "City Park Cleanup Drive is tomorrow at 9:00 AM.", time: "5 hours ago", color: "eco-coral" },
];

const Notifications = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-coral"><Bell className="w-8 h-8 text-primary-foreground" /></div>
          <div><h1 className="text-3xl font-bold text-foreground">Notifications</h1><p className="text-muted-foreground">Stay updated on your eco activities</p></div>
        </div>

        <div className="space-y-4">
          {notifications.map((notif, i) => (
            <Card key={i} variant="glass">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-${notif.color}/20`}>
                    <notif.icon className={`w-6 h-6 text-${notif.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{notif.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
