import { useState } from 'react'
import { MapPin, Clock, Bus, Car, Search, Package, Home, Book, Sparkles, ShoppingBag, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import './App.css'

// Madison thrift stores data
const thriftStores = [
  {
    name: "Ragstock",
    address: "604 State St",
    type: ["vintage", "clothes"],
    priceLevel: 2,
    busRoutes: ["2", "10", "80"],
    hours: { weekday: "10am-8pm", saturday: "10am-8pm", sunday: "11am-7pm" },
    tips: "Best vintage selection on campus. Hit the $5 rack in the back corner.",
    walkFromCampus: 5
  },
  {
    name: "St. Vincent de Paul - University Ave",
    address: "1309 S Midvale Blvd",
    type: ["clothes", "furniture", "books", "anything"],
    priceLevel: 1,
    busRoutes: ["2", "10", "15"],
    hours: { weekday: "9am-8pm", saturday: "9am-8pm", sunday: "11am-6pm" },
    tips: "Saturday tag sales - 50% off certain colored tags. Great furniture section upstairs.",
    walkFromCampus: 25
  },
  {
    name: "Goodwill State Street",
    address: "1212 S Park St",
    type: ["clothes", "books", "anything"],
    priceLevel: 1,
    busRoutes: ["3", "4", "10"],
    hours: { weekday: "9am-9pm", saturday: "9am-9pm", sunday: "10am-7pm" },
    tips: "Hit or miss, but convenient location. Avoid Sunday afternoons - it's packed.",
    walkFromCampus: 20
  },
  {
    name: "Goodwill East Towne",
    address: "4530 E Washington Ave",
    type: ["clothes", "furniture", "anything"],
    priceLevel: 1,
    busRoutes: ["6", "27"],
    hours: { weekday: "9am-9pm", saturday: "9am-9pm", sunday: "10am-7pm" },
    tips: "Larger selection than State St. Better for furniture. Skip on weekends - madhouse.",
    walkFromCampus: 45
  },
  {
    name: "Agrace Thrift Store",
    address: "5906 Odana Rd",
    type: ["clothes", "books", "vintage", "anything"],
    priceLevel: 2,
    busRoutes: ["14", "67", "70"],
    hours: { weekday: "10am-6pm", saturday: "10am-5pm", sunday: "Closed" },
    tips: "Hidden gem! Boutique-quality items, well-curated. Benefits hospice care.",
    walkFromCampus: 40
  },
  {
    name: "Habitat ReStore",
    address: "208 Cottage Grove Rd",
    type: ["furniture"],
    priceLevel: 2,
    busRoutes: ["3", "37", "38"],
    hours: { weekday: "10am-6pm", saturday: "9am-5pm", sunday: "11am-4pm" },
    tips: "THE place for dorm furniture. Delivery available. Check the free section outside.",
    walkFromCampus: 35
  },
  {
    name: "Underground Exchange",
    address: "2110 Atwood Ave",
    type: ["vintage", "clothes"],
    priceLevel: 3,
    busRoutes: ["6", "38"],
    hours: { weekday: "11am-7pm", saturday: "11am-7pm", sunday: "12pm-5pm" },
    tips: "Curated vintage, pricier but quality. Great for special occasion finds.",
    walkFromCampus: 30
  },
  {
    name: "St. Vincent de Paul - Willy Street",
    address: "1901 Williamson St",
    type: ["clothes", "books", "vintage", "anything"],
    priceLevel: 1,
    busRoutes: ["6", "9"],
    hours: { weekday: "9am-8pm", saturday: "9am-8pm", sunday: "11am-6pm" },
    tips: "Best book selection in town. Vintage corner is gold. Less picked over than University location.",
    walkFromCampus: 25
  }
];

interface RouteStop {
  store: typeof thriftStores[0];
  travelTime: number;
  reason: string;
}

function App() {
  const [searchType, setSearchType] = useState<string>("");
  const [timeAvailable, setTimeAvailable] = useState<string>("");
  const [transportation, setTransportation] = useState<string>("");
  const [startLocation, setStartLocation] = useState<string>("");
  const [route, setRoute] = useState<RouteStop[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const generateRoute = () => {
    // Filter stores based on search type
    let filteredStores = thriftStores.filter(store => {
      if (searchType === "anything") return true;
      return store.type.includes(searchType);
    });

    // Sort by relevance and accessibility
    filteredStores.sort((a, b) => {
      // Prioritize stores that specialize in what user wants
      const aSpecialty = a.type[0] === searchType ? 1 : 0;
      const bSpecialty = b.type[0] === searchType ? 1 : 0;
      
      // Consider transportation
      if (transportation === "walking") {
        return a.walkFromCampus - b.walkFromCampus;
      } else if (transportation === "bus") {
        // Prefer stores with more bus routes
        return b.busRoutes.length - a.busRoutes.length;
      }
      
      return (bSpecialty - aSpecialty) || (a.priceLevel - b.priceLevel);
    });

    // Build route based on time available
    const routeStops: RouteStop[] = [];
    let currentTime = 0;
    const timeLimit = timeAvailable === "short" ? 120 : timeAvailable === "half" ? 240 : 480;
    const shopTime = 30; // Average time per store

    for (const store of filteredStores) {
      // Calculate travel time
      let travelTime = 0;
      if (transportation === "walking") {
        travelTime = store.walkFromCampus;
        if (travelTime > 30 && timeAvailable === "short") continue; // Skip far stores for short trips
      } else if (transportation === "bus") {
        travelTime = Math.min(store.walkFromCampus * 0.7, 25); // Bus is faster but has wait time
      } else {
        travelTime = Math.min(store.walkFromCampus * 0.4, 15); // Car is fastest
      }

      // Check if we have time for this store
      if (currentTime + travelTime + shopTime > timeLimit) break;

      // Generate reason for including this store
      let reason = "";
      if (store.type[0] === searchType) {
        reason = `Specializes in ${searchType}. `;
      }
      if (store.priceLevel === 1) {
        reason += "Best prices. ";
      } else if (store.priceLevel === 3) {
        reason += "Curated selection. ";
      }
      if (routeStops.length === 0) {
        reason += "Closest to start. ";
      }
      
      routeStops.push({
        store,
        travelTime,
        reason: reason || "Good general selection."
      });

      currentTime += travelTime + shopTime;

      // Limit stops based on time
      if (timeAvailable === "short" && routeStops.length >= 2) break;
      if (timeAvailable === "half" && routeStops.length >= 4) break;
      if (routeStops.length >= 6) break;
    }

    setRoute(routeStops);
    setTotalTime(currentTime);
    setShowResults(true);
  };

  const getTravelIcon = () => {
    switch(transportation) {
      case 'walking': return <MapPin className="w-4 h-4" />;
      case 'bus': return <Bus className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'clothes': return <ShoppingBag className="w-4 h-4" />;
      case 'furniture': return <Home className="w-4 h-4" />;
      case 'books': return <Book className="w-4 h-4" />;
      case 'vintage': return <Sparkles className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const canGenerateRoute = searchType && timeAvailable && transportation && startLocation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Madison Thrift Route Optimizer
          </h1>
          <p className="text-lg text-gray-600">
            Stop wandering aimlessly. Get the perfect thrifting route for your schedule.
          </p>
        </div>

        {/* Input Form */}
        {!showResults && (
          <Card className="max-w-2xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle>Plan Your Thrifting Adventure</CardTitle>
              <CardDescription>
                Tell us what you're looking for and we'll create the optimal route
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* What are you looking for? */}
              <div className="space-y-2">
                <Label htmlFor="search-type">What are you hunting for?</Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger id="search-type">
                    <SelectValue placeholder="Select what you're looking for" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothes">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Clothing & Accessories</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="furniture">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        <span>Furniture & Dorm Decor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="books">
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        <span>Books & Media</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="vintage">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Vintage & Unique Finds</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="anything">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span>Just Browsing Everything</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* How much time? */}
              <div className="space-y-2">
                <Label>How much time do you have?</Label>
                <RadioGroup value={timeAvailable} onValueChange={setTimeAvailable}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="short" />
                    <Label htmlFor="short">Quick trip (1-2 hours)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="half" id="half" />
                    <Label htmlFor="half">Half day (3-4 hours)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full">Full day adventure (5+ hours)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Transportation */}
              <div className="space-y-2">
                <Label>How are you getting around?</Label>
                <RadioGroup value={transportation} onValueChange={setTransportation}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="walking" id="walking" />
                    <Label htmlFor="walking">Walking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bus" id="bus" />
                    <Label htmlFor="bus">Bus / Public Transit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="car" id="car" />
                    <Label htmlFor="car">Car / Bike</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Starting location */}
              <div className="space-y-2">
                <Label htmlFor="start-location">Where are you starting from?</Label>
                <Select value={startLocation} onValueChange={setStartLocation}>
                  <SelectTrigger id="start-location">
                    <SelectValue placeholder="Select starting point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campus">Campus / State Street</SelectItem>
                    <SelectItem value="near-west">Near West Side</SelectItem>
                    <SelectItem value="near-east">Near East Side</SelectItem>
                    <SelectItem value="downtown">Downtown / Capitol</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateRoute} 
                disabled={!canGenerateRoute}
                className="w-full"
                size="lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Generate My Perfect Route
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Your Optimized Thrift Route</CardTitle>
                    <CardDescription>
                      {route.length} stores • ~{Math.floor(totalTime / 60)} hours {totalTime % 60} minutes total
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    New Route
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">
                    {getTravelIcon()}
                    <span className="ml-1">
                      {transportation === 'walking' ? 'Walking' : transportation === 'bus' ? 'Bus Route' : 'Driving'}
                    </span>
                  </Badge>
                  <Badge variant="secondary">
                    {getTypeIcon(searchType)}
                    <span className="ml-1">Hunting for: {searchType}</span>
                  </Badge>
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {timeAvailable === 'short' ? '1-2 hours' : timeAvailable === 'half' ? '3-4 hours' : '5+ hours'}
                  </Badge>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pro tip:</strong> Start early on weekdays (before 11am) for the best selection. 
                    Saturdays have tag sales but are crowded. Sundays are hit-or-miss.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Route Stops */}
            <div className="space-y-4">
              {route.map((stop, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <CardTitle className="text-xl">{stop.store.name}</CardTitle>
                        </div>
                        <CardDescription className="mt-1">
                          {stop.store.address} • {stop.travelTime} min travel
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-1 justify-end mb-1">
                          {stop.store.type.map(t => (
                            <Badge key={t} variant="outline" className="text-xs">
                              {t}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {'$'.repeat(stop.store.priceLevel)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Why this store:</p>
                          <p className="text-sm text-gray-600">{stop.reason}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Insider tip:</p>
                          <p className="text-sm text-gray-600">{stop.store.tips}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Hours:</p>
                          <p className="text-sm text-gray-600">
                            Weekdays: {stop.store.hours.weekday} • 
                            Saturday: {stop.store.hours.saturday} • 
                            Sunday: {stop.store.hours.sunday}
                          </p>
                        </div>
                      </div>

                      {transportation === 'bus' && (
                        <div className="flex items-start gap-2">
                          <Bus className="w-4 h-4 text-purple-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Bus routes:</p>
                            <p className="text-sm text-gray-600">
                              Routes: {stop.store.busRoutes.join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Tips */}
            <Card className="shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle>Madison Thrifting Wisdom</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>🏷️ Tag Sales:</strong> Most St. Vinny's do 50% off colored tags on Saturdays. Call ahead to check which color!
                </p>
                <p className="text-sm">
                  <strong>📅 Best Days:</strong> Tuesday-Thursday mornings have fresh inventory and fewer crowds.
                </p>
                <p className="text-sm">
                  <strong>🎓 Student Discounts:</strong> Bring your Wiscard - some stores offer student discounts (especially Ragstock).
                </p>
                <p className="text-sm">
                  <strong>📦 Donation Days:</strong> Shop the day after move-out dates (end of May, August) for the best finds.
                </p>
                <p className="text-sm">
                  <strong>💰 Cash is King:</strong> Some smaller thrift stores are cash-only. Hit an ATM before you start!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
