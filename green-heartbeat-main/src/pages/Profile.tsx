import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Camera, Trophy, Flame, Leaf, UserPlus, Users, Search, X, UsersRound } from "lucide-react";
import { toast } from "sonner";

const initialFriends = [
  { id: 1, username: "nature_lover22", avatar: "🌿", level: 4, points: 1420 },
  { id: 2, username: "green_warrior", avatar: "🌍", level: 6, points: 2150 },
  { id: 3, username: "eco_ninja", avatar: "🍃", level: 5, points: 1890 },
  { id: 4, username: "planet_saver", avatar: "🌱", level: 3, points: 980 },
];

const communities = [
  { id: 1, name: "Delhi Green Warriors", members: 1250 },
  { id: 2, name: "Urban Gardeners", members: 890 },
  { id: 3, name: "Zero Waste India", members: 2340 },
];

const Profile = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [searchUsername, setSearchUsername] = useState("");
  
  // Profile form state
  const [username, setUsername] = useState("eco_warrior");
  const [email, setEmail] = useState("warrior@eco.com");
  const [city, setCity] = useState("New Delhi");
  const [waterLimit, setWaterLimit] = useState("200");
  const [isSaving, setIsSaving] = useState(false);

  const handleAddFriend = () => {
    if (searchUsername.trim()) {
      const newFriend = {
        id: friends.length + 1,
        username: searchUsername,
        avatar: "🌱",
        level: 1,
        points: 100,
      };
      setFriends([...friends, newFriend]);
      setSearchUsername("");
      setShowAddFriend(false);
      toast.success(`Added @${searchUsername} as friend!`);
    }
  };

  const handleRemoveFriend = (id: number) => {
    const friend = friends.find(f => f.id === id);
    setFriends(friends.filter(f => f.id !== id));
    toast.success(`Removed @${friend?.username} from friends`);
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile saved successfully!");
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl gradient-lavender"><User className="w-8 h-8 text-primary-foreground" /></div>
          <div><h1 className="text-3xl font-bold text-foreground">Profile</h1><p className="text-muted-foreground">Manage your eco warrior profile</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass">
            <CardContent className="pt-6 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center text-6xl mx-auto">🌱</div>
                <Button size="icon" variant="eco" className="absolute bottom-0 right-0"><Camera className="w-4 h-4" /></Button>
              </div>
              <h2 className="text-2xl font-bold text-foreground mt-4">@{username}</h2>
              <p className="text-muted-foreground">Level 5 Environmentalist</p>
              
              {/* Stats Row */}
              <div className="flex justify-center gap-4 mt-4">
                <div className="text-center"><Trophy className="w-5 h-5 text-eco-yellow mx-auto" /><p className="text-sm text-muted-foreground">Rank #6</p></div>
                <div className="text-center"><Flame className="w-5 h-5 text-eco-orange mx-auto" /><p className="text-sm text-muted-foreground">22 days</p></div>
                <div className="text-center"><Leaf className="w-5 h-5 text-eco-green mx-auto" /><p className="text-sm text-muted-foreground">1720 pts</p></div>
              </div>

              {/* Friends & Communities Count */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
                <div className="p-3 rounded-xl bg-eco-lavender/20">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-eco-lavender" />
                    <span className="text-2xl font-bold text-foreground">{friends.length}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Friends</p>
                </div>
                <div className="p-3 rounded-xl bg-eco-pink/20">
                  <div className="flex items-center justify-center gap-2">
                    <UsersRound className="w-5 h-5 text-eco-pink" />
                    <span className="text-2xl font-bold text-foreground">{communities.length}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Communities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass" className="lg:col-span-2">
            <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Username</label>
                  <Input 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">City</label>
                  <Input 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Daily Water Limit (L)</label>
                  <Input 
                    type="number" 
                    value={waterLimit}
                    onChange={(e) => setWaterLimit(e.target.value)}
                    className="mt-1" 
                  />
                </div>
              </div>
              <Button 
                variant="eco" 
                className="mt-6" 
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Communities */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersRound className="w-5 h-5 text-eco-pink" />
              My Communities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {communities.map((community) => (
                <div key={community.id} className="p-4 rounded-xl bg-secondary/50">
                  <h4 className="font-medium text-foreground">{community.name}</h4>
                  <p className="text-sm text-muted-foreground">{community.members.toLocaleString()} members</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader><CardTitle>Badges Earned</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {["🌱 First Steps", "💧 Water Saver", "♻️ Recycler", "🚶 Green Commuter", "🌳 Tree Planter"].map((badge, i) => (
                <div key={i} className="px-4 py-2 rounded-xl bg-eco-green/20 text-eco-green text-sm font-medium">{badge}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Friends List */}
        <Card variant="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-eco-lavender" />
                Friends ({friends.length})
              </CardTitle>
              <Button variant="eco" size="sm" onClick={() => setShowAddFriend(!showAddFriend)}>
                <UserPlus className="w-4 h-4 mr-2" /> Add Friend
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddFriend && (
              <div className="mb-6 p-4 rounded-xl bg-secondary/50">
                <h4 className="font-medium text-foreground mb-3">Add Friend by Username</h4>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter username..."
                      value={searchUsername}
                      onChange={(e) => setSearchUsername(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddFriend()}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="eco" onClick={handleAddFriend}>Add</Button>
                  <Button variant="outline" onClick={() => setShowAddFriend(false)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eco-lavender to-eco-pink flex items-center justify-center text-2xl">
                      {friend.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">@{friend.username}</p>
                      <p className="text-xs text-muted-foreground">Level {friend.level} • {friend.points} pts</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveFriend(friend.id)}>
                    <X className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
