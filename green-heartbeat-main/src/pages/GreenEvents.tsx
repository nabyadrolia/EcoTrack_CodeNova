import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Plus, Clock, Lightbulb, Check, QrCode, Building2, Upload, Image, Receipt } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const eventsData = [
  { id: 1, title: "City Park Cleanup Drive", date: "Dec 28, 2025", time: "9:00 AM", location: "Central Park", volunteers: 45, maxVolunteers: 100, joined: false, isNGO: false },
  { id: 2, title: "Tree Plantation Campaign", date: "Jan 2, 2026", time: "7:00 AM", location: "Riverside Area", volunteers: 120, maxVolunteers: 150, joined: false, isNGO: false },
  { id: 3, title: "Sustainable Living Workshop", date: "Jan 5, 2026", time: "3:00 PM", location: "Community Center", volunteers: 28, maxVolunteers: 50, joined: false, isNGO: false },
  { id: 4, title: "Beach Cleanup Initiative", date: "Jan 10, 2026", time: "6:00 AM", location: "Marina Beach", volunteers: 85, maxVolunteers: 200, joined: false, isNGO: false },
];

const initialNgoFundraisers = [
  { id: 1, ngoName: "Green Earth Foundation", title: "Plant 10,000 Trees Campaign", goal: 500000, raised: 325000, qrCode: "UPI: greenearth@upi", qrImage: "", verified: true },
  { id: 2, ngoName: "Clean Water Initiative", title: "Rural Water Wells Project", goal: 800000, raised: 560000, qrCode: "UPI: cleanwater@upi", qrImage: "", verified: true },
  { id: 3, ngoName: "Wildlife Protection Trust", title: "Save the Tigers Fund", goal: 1000000, raised: 720000, qrCode: "UPI: wildlife@upi", qrImage: "", verified: true },
];

const GreenEvents = () => {
  const [events, setEvents] = useState(eventsData);
  const [ngoFundraisers, setNgoFundraisers] = useState(initialNgoFundraisers);
  const [showCreate, setShowCreate] = useState(false);
  const [showNGOCreate, setShowNGOCreate] = useState(false);
  const [donatedAmount, setDonatedAmount] = useState<Record<number, number>>({});
  const [donationScreenshots, setDonationScreenshots] = useState<Record<number, string>>({});
  const [customDonationAmounts, setCustomDonationAmounts] = useState<Record<number, string>>({});
  const [showDonationForm, setShowDonationForm] = useState<number | null>(null);
  
  // Form states
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  
  // NGO form states
  const [ngoName, setNgoName] = useState("");
  const [ngoRegNumber, setNgoRegNumber] = useState("");
  const [fundraiserTitle, setFundraiserTitle] = useState("");
  const [fundraiserGoal, setFundraiserGoal] = useState("");
  const [fundraiserQR, setFundraiserQR] = useState("");
  const [qrImageFile, setQrImageFile] = useState<string>("");

  const handleQRImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a JPG or PNG image");
    }
  };

  const handleTransactionScreenshot = (ngoId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDonationScreenshots({ ...donationScreenshots, [ngoId]: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid JPG or PNG screenshot");
    }
  };

  const handleJoin = (id: number) => {
    setEvents(events.map(e => 
      e.id === id 
        ? { ...e, volunteers: e.joined ? e.volunteers - 1 : e.volunteers + 1, joined: !e.joined } 
        : e
    ));
  };

  const handleCreateEvent = () => {
    if (eventName && eventDate && eventTime && eventLocation) {
      const newEvent = {
        id: events.length + 1,
        title: eventName,
        date: new Date(eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: eventTime,
        location: eventLocation,
        volunteers: 0,
        maxVolunteers: 50,
        joined: false,
        isNGO: false,
      };
      setEvents([newEvent, ...events]);
      setEventName("");
      setEventDate("");
      setEventTime("");
      setEventLocation("");
      setShowCreate(false);
      toast.success("Event created successfully!");
    }
  };

  const handleCreateNGOFundraiser = () => {
    if (ngoName && ngoRegNumber && fundraiserTitle && fundraiserGoal && (fundraiserQR || qrImageFile)) {
      const newNGO = {
        id: ngoFundraisers.length + 1,
        ngoName: ngoName,
        title: fundraiserTitle,
        goal: parseInt(fundraiserGoal),
        raised: 0,
        qrCode: fundraiserQR,
        qrImage: qrImageFile,
        verified: false, // Pending verification
      };
      setNgoFundraisers([newNGO, ...ngoFundraisers]);
      setNgoName("");
      setNgoRegNumber("");
      setFundraiserTitle("");
      setFundraiserGoal("");
      setFundraiserQR("");
      setQrImageFile("");
      setShowNGOCreate(false);
      toast.success("NGO fundraiser submitted for verification!");
    } else {
      toast.error("Please fill all required fields including QR code");
    }
  };

  const handleDonate = (ngoId: number) => {
    const screenshot = donationScreenshots[ngoId];
    const amount = parseInt(customDonationAmounts[ngoId] || "0");
    
    if (!screenshot) {
      toast.error("Please upload transaction screenshot first");
      return;
    }
    
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    setDonatedAmount({ ...donatedAmount, [ngoId]: (donatedAmount[ngoId] || 0) + amount });
    setNgoFundraisers(ngoFundraisers.map(ngo => 
      ngo.id === ngoId ? { ...ngo, raised: ngo.raised + amount } : ngo
    ));
    
    // Clear the form
    setDonationScreenshots({ ...donationScreenshots, [ngoId]: "" });
    setCustomDonationAmounts({ ...customDonationAmounts, [ngoId]: "" });
    setShowDonationForm(null);
    
    toast.success(`Thank you! Your donation of ₹${amount.toLocaleString()} has been recorded.`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl gradient-coral">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Green Events</h1>
              <p className="text-muted-foreground">Join or create community eco events</p>
            </div>
          </div>
          <Button variant="eco" onClick={() => setShowCreate(!showCreate)}>
            <Plus className="w-4 h-4 mr-2" /> Create Event
          </Button>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="events">Community Events</TabsTrigger>
            <TabsTrigger value="fundraising">NGO Fundraising</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            {showCreate && (
              <Card variant="glass" className="mb-6">
                <CardHeader><CardTitle>Create New Event</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Event Name" 
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                    <Input 
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                    <Input 
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    />
                    <Input 
                      placeholder="Location"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button variant="eco" onClick={handleCreateEvent}>Create Event</Button>
                    <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} variant="glass">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">{event.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {event.date} at {event.time}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {event.volunteers}/{event.maxVolunteers} volunteers</div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full mb-4">
                      <div className="h-full bg-eco-coral rounded-full transition-all duration-500" style={{ width: `${(event.volunteers / event.maxVolunteers) * 100}%` }} />
                    </div>
                    <Button 
                      variant={event.joined ? "outline" : "coral"} 
                      className="w-full" 
                      onClick={() => handleJoin(event.id)}
                    >
                      {event.joined ? (
                        <>
                          <Check className="w-4 h-4 mr-2" /> Joined
                        </>
                      ) : (
                        "Join Event"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="fundraising">
            <div className="mb-6">
              <Button variant="eco" onClick={() => setShowNGOCreate(!showNGOCreate)}>
                <Building2 className="w-4 h-4 mr-2" /> Register NGO Fundraiser
              </Button>
            </div>

            {showNGOCreate && (
              <Card variant="glass" className="mb-6">
                <CardHeader><CardTitle>Register NGO Fundraising Event</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">NGO Name *</label>
                      <Input 
                        placeholder="Enter NGO name"
                        value={ngoName}
                        onChange={(e) => setNgoName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Registration Number (for verification) *</label>
                      <Input 
                        placeholder="NGO registration number"
                        value={ngoRegNumber}
                        onChange={(e) => setNgoRegNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Fundraiser Title *</label>
                      <Input 
                        placeholder="Campaign name"
                        value={fundraiserTitle}
                        onChange={(e) => setFundraiserTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Goal Amount (₹) *</label>
                      <Input 
                        type="number"
                        placeholder="Target amount"
                        value={fundraiserGoal}
                        onChange={(e) => setFundraiserGoal(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">UPI ID (optional)</label>
                      <Input 
                        placeholder="e.g., ngoname@upi"
                        value={fundraiserQR}
                        onChange={(e) => setFundraiserQR(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Upload UPI QR Code (JPG/PNG) *</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleQRImageUpload}
                          className="hidden"
                          id="qr-upload"
                        />
                        <label
                          htmlFor="qr-upload"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/50 cursor-pointer hover:bg-secondary transition-colors"
                        >
                          <Upload className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {qrImageFile ? "Image uploaded ✓" : "Choose file..."}
                          </span>
                        </label>
                      </div>
                    </div>
                    {qrImageFile && (
                      <div className="md:col-span-2">
                        <label className="text-sm text-muted-foreground mb-1 block">QR Preview</label>
                        <div className="w-32 h-32 rounded-xl overflow-hidden border border-border">
                          <img src={qrImageFile} alt="QR Code Preview" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 mb-4">
                    ⚠️ Your NGO registration will be verified before the fundraiser goes live.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="eco" onClick={handleCreateNGOFundraiser}>Submit for Verification</Button>
                    <Button variant="outline" onClick={() => setShowNGOCreate(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {ngoFundraisers.map((ngo) => (
                <Card key={ngo.id} variant="glass">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-foreground">{ngo.title}</h3>
                          {ngo.verified ? (
                            <span className="px-2 py-0.5 rounded-full bg-eco-green/20 text-eco-green text-xs flex items-center gap-1">
                              <Check className="w-3 h-3" /> Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-eco-yellow/20 text-eco-yellow text-xs">
                              Pending Verification
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">by {ngo.ngoName}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/50 text-center">
                        {ngo.qrImage ? (
                          <img src={ngo.qrImage} alt="UPI QR Code" className="w-20 h-20 object-cover rounded-lg mx-auto mb-1" />
                        ) : (
                          <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-1" />
                        )}
                        {ngo.qrCode && <p className="text-xs text-muted-foreground">{ngo.qrCode}</p>}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">₹{ngo.raised.toLocaleString()} raised</span>
                        <span className="text-foreground font-medium">Goal: ₹{ngo.goal.toLocaleString()}</span>
                      </div>
                      <div className="h-3 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-eco-green to-eco-cyan rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min((ngo.raised / ngo.goal) * 100, 100)}%` }} 
                        />
                      </div>
                    </div>

                    {donatedAmount[ngo.id] && (
                      <div className="mb-4 p-3 rounded-xl bg-eco-green/20 text-eco-green text-sm">
                        🎉 Thank you! You donated ₹{donatedAmount[ngo.id].toLocaleString()} to this campaign.
                      </div>
                    )}

                    {showDonationForm === ngo.id ? (
                      <div className="p-4 rounded-xl bg-secondary/50 space-y-4">
                        <h4 className="font-medium text-foreground">Record Your Donation</h4>
                        
                        {/* Transaction Screenshot Upload */}
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">
                            Upload Transaction Screenshot (JPG/PNG) *
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/jpg"
                              onChange={(e) => handleTransactionScreenshot(ngo.id, e)}
                              className="hidden"
                              id={`screenshot-${ngo.id}`}
                            />
                            <label
                              htmlFor={`screenshot-${ngo.id}`}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background cursor-pointer hover:bg-secondary transition-colors"
                            >
                              <Receipt className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {donationScreenshots[ngo.id] ? "Screenshot uploaded ✓" : "Choose file..."}
                              </span>
                            </label>
                          </div>
                          {donationScreenshots[ngo.id] && (
                            <div className="mt-2">
                              <img 
                                src={donationScreenshots[ngo.id]} 
                                alt="Transaction Screenshot" 
                                className="max-w-[150px] max-h-[100px] rounded-lg border border-border object-cover"
                              />
                            </div>
                          )}
                        </div>

                        {/* Donation Amount Input - Only enabled after screenshot */}
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">
                            Amount Donated (₹) *
                          </label>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={customDonationAmounts[ngo.id] || ""}
                            onChange={(e) => setCustomDonationAmounts({ 
                              ...customDonationAmounts, 
                              [ngo.id]: e.target.value 
                            })}
                            disabled={!donationScreenshots[ngo.id]}
                            className={!donationScreenshots[ngo.id] ? "opacity-50" : ""}
                          />
                          {!donationScreenshots[ngo.id] && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Upload transaction screenshot first to enter amount
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="eco" 
                            onClick={() => handleDonate(ngo.id)}
                            disabled={!donationScreenshots[ngo.id] || !customDonationAmounts[ngo.id]}
                          >
                            Confirm Donation
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setShowDonationForm(null);
                              setDonationScreenshots({ ...donationScreenshots, [ngo.id]: "" });
                              setCustomDonationAmounts({ ...customDonationAmounts, [ngo.id]: "" });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="eco" 
                        className="w-full" 
                        onClick={() => setShowDonationForm(ngo.id)}
                      >
                        Donate to Campaign
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card variant="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-eco-yellow" /> Tips</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">Volunteering at green events not only helps the environment but also boosts your eco score and builds community connections! Donations to verified NGOs are safe and support legitimate causes.</p></CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default GreenEvents;