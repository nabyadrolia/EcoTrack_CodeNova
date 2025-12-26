import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Plus, CheckCircle, Leaf, Lightbulb } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestedHabits = ["Use reusable bags", "Take shorter showers", "Turn off lights", "Compost food waste", "Use public transport"];
const initialHabits = [
  { name: "Bring reusable water bottle", streak: 15, completed: true },
  { name: "Walk to work", streak: 8, completed: false },
  { name: "No plastic bags", streak: 22, completed: true },
];

const HabitTracker = () => {
  const [habits, setHabits] = useState(initialHabits);
  const [newHabit, setNewHabit] = useState("");

  const toggleHabit = (index: number) => {
    setHabits(habits.map((h, i) => i === index ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : h.streak } : h));
  };

  const addHabit = (name: string) => {
    if (name) {
      setHabits([...habits, { name, streak: 0, completed: false }]);
      setNewHabit("");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-lavender"><Target className="w-8 h-8 text-primary-foreground" /></div>
          <div><h1 className="text-3xl font-bold text-foreground">Habit Tracker</h1><p className="text-muted-foreground">Build sustainable habits with streaks</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader><CardTitle>Your Habits</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input placeholder="Add new habit" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
                <Button variant="eco" onClick={() => addHabit(newHabit)}><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="space-y-3">
                {habits.map((habit, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 cursor-pointer" onClick={() => toggleHabit(i)}>
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${habit.completed ? "bg-eco-green border-eco-green" : "border-muted-foreground"}`}>
                        {habit.completed && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <span className="text-foreground">{habit.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-eco-green"><Leaf className="w-4 h-4" /><span className="font-bold">{habit.streak} pts</span></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader><CardTitle>Suggested Habits</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedHabits.map((habit, i) => (
                  <Button key={i} variant="ghost" className="w-full justify-start" onClick={() => addHabit(habit)}>
                    <Plus className="w-4 h-4 mr-2" /> {habit}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-eco-yellow" /> Tips</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Consistency is key! Complete habits daily to build streaks. Breaking a sustainable habit will reset your streak.</p></CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HabitTracker;
