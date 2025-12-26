import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "City Park Cleanup Drive",
    date: "Dec 28, 2025",
    time: "9:00 AM",
    location: "Central Park",
    volunteers: 45,
  },
  {
    id: 2,
    title: "Tree Plantation Campaign",
    date: "Jan 2, 2026",
    time: "7:00 AM",
    location: "Riverside Area",
    volunteers: 120,
  },
  {
    id: 3,
    title: "Sustainable Living Workshop",
    date: "Jan 5, 2026",
    time: "3:00 PM",
    location: "Community Center",
    volunteers: 28,
  },
];

export function UpcomingEvents() {
  return (
    <Card variant="glass" className="animate-fade-in" style={{ animationDelay: "350ms" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-eco-coral" />
          <span>Upcoming Green Events</span>
        </CardTitle>
        <Link to="/events">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {event.date} at {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {event.volunteers} volunteers
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
