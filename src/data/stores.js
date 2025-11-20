// Madison Thrift Store Database

export const STORE_CATEGORIES = {
  VINTAGE: 'vintage',
  CLOTHING: 'clothing',
  FURNITURE: 'furniture',
  BOOKS: 'books',
  GENERAL: 'general'
};

export const LOCATIONS = {
  CAMPUS: 'campus',
  DOWNTOWN: 'downtown',
  NEAR_WEST: 'near_west',
  EAST_SIDE: 'east_side',
  WEST_SIDE: 'west_side'
};

export const madisonThriftStores = [
  {
    id: 1,
    name: "Ragstock",
    address: "314 State St, Madison, WI 53703",
    location: LOCATIONS.DOWNTOWN,
    coordinates: { lat: 43.0747, lng: -89.3870 },
    hours: {
      monday: "10:00 AM - 8:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 9:00 PM",
      saturday: "10:00 AM - 9:00 PM",
      sunday: "11:00 AM - 7:00 PM"
    },
    specialties: [STORE_CATEGORIES.VINTAGE, STORE_CATEGORIES.CLOTHING],
    priceRange: "$$",
    tips: [
      "Best vintage selection downtown",
      "Check the back corner for unique pieces under $20",
      "New arrivals typically Monday and Thursday"
    ],
    busRoutes: ["Walk from campus", "Route 2", "Route 6"],
    bestFor: "Vintage fashion enthusiasts looking for unique pieces",
    rating: 4.5,
    crowdTimes: {
      avoid: ["Saturday afternoon", "Sunday afternoon"],
      best: ["Weekday mornings", "Friday evenings"]
    }
  },
  {
    id: 2,
    name: "St. Vinny's - University Ave",
    address: "2950 University Ave, Madison, WI 53705",
    location: LOCATIONS.NEAR_WEST,
    coordinates: { lat: 43.0723, lng: -89.4342 },
    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    specialties: [STORE_CATEGORIES.CLOTHING, STORE_CATEGORIES.VINTAGE, STORE_CATEGORIES.GENERAL],
    priceRange: "$",
    tips: [
      "Saturday = 50% off purple tags",
      "Less picked over than downtown locations",
      "Great vintage section in the back",
      "Good mix of modern and vintage pieces"
    ],
    busRoutes: ["Route 2", "Route 10"],
    bestFor: "Mix of vintage and everyday clothing on a budget",
    rating: 4.3,
    crowdTimes: {
      avoid: ["Saturday morning after 11am"],
      best: ["Tuesday-Thursday mornings", "Sunday afternoons"]
    }
  },
  {
    id: 3,
    name: "Goodwill - State Street",
    address: "1910 Monroe St, Madison, WI 53711",
    location: LOCATIONS.NEAR_WEST,
    coordinates: { lat: 43.0642, lng: -89.4189 },
    hours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    specialties: [STORE_CATEGORIES.CLOTHING, STORE_CATEGORIES.BOOKS, STORE_CATEGORIES.GENERAL],
    priceRange: "$",
    tips: [
      "Recently restocked Mondays and Thursdays",
      "Hit or miss but worth a quick scan",
      "Good book section",
      "Color of the week 50% off specials"
    ],
    busRoutes: ["Route 2", "Route 11"],
    bestFor: "Budget-conscious shoppers looking for basics",
    rating: 3.8,
    crowdTimes: {
      avoid: ["Saturday afternoons"],
      best: ["Weekday mornings right after opening"]
    }
  },
  {
    id: 4,
    name: "Goodwill - East Washington",
    address: "1202 E Washington Ave, Madison, WI 53703",
    location: LOCATIONS.EAST_SIDE,
    coordinates: { lat: 43.0804, lng: -89.3678 },
    hours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 7:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    specialties: [STORE_CATEGORIES.CLOTHING, STORE_CATEGORIES.FURNITURE, STORE_CATEGORIES.GENERAL],
    priceRange: "$",
    tips: [
      "Skip Sunday afternoons - it's a madhouse and picked over",
      "Largest furniture selection of Madison Goodwills",
      "Parking can be challenging on weekends"
    ],
    busRoutes: ["Route 3", "Route 7"],
    bestFor: "Furniture and household goods",
    rating: 3.5,
    crowdTimes: {
      avoid: ["Sunday afternoon", "Saturday afternoon"],
      best: ["Monday mornings", "Wednesday afternoons"]
    }
  },
  {
    id: 5,
    name: "St. Vinny's - Verona Road",
    address: "2801 S Park St, Madison, WI 53713",
    location: LOCATIONS.WEST_SIDE,
    coordinates: { lat: 43.0355, lng: -89.4012 },
    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 8:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "10:00 AM - 6:00 PM"
    },
    specialties: [STORE_CATEGORIES.FURNITURE, STORE_CATEGORIES.CLOTHING, STORE_CATEGORIES.GENERAL],
    priceRange: "$",
    tips: [
      "Huge furniture section",
      "Better for furniture than clothing",
      "Easy parking",
      "Saturday = 50% off purple tags"
    ],
    busRoutes: ["Route 13", "Route 46"],
    bestFor: "Furniture and large household items",
    rating: 4.2,
    crowdTimes: {
      avoid: ["Saturday morning"],
      best: ["Weekday afternoons"]
    }
  },
  {
    id: 6,
    name: "Agrace Thrift Store",
    address: "2102 Winnebago St, Madison, WI 53704",
    location: LOCATIONS.EAST_SIDE,
    coordinates: { lat: 43.1134, lng: -89.3421 },
    hours: {
      monday: "10:00 AM - 5:00 PM",
      tuesday: "10:00 AM - 5:00 PM",
      wednesday: "10:00 AM - 5:00 PM",
      thursday: "10:00 AM - 5:00 PM",
      friday: "10:00 AM - 5:00 PM",
      saturday: "10:00 AM - 5:00 PM",
      sunday: "Closed"
    },
    specialties: [STORE_CATEGORIES.CLOTHING, STORE_CATEGORIES.GENERAL],
    priceRange: "$",
    tips: [
      "Hidden gem with great finds",
      "Well-organized and clean",
      "Proceeds support hospice care",
      "Closed Sundays"
    ],
    busRoutes: ["Route 3", "Route 27"],
    bestFor: "Quality clothing at low prices for a good cause",
    rating: 4.4,
    crowdTimes: {
      avoid: ["Saturday mid-day"],
      best: ["Weekday afternoons"]
    }
  },
  {
    id: 7,
    name: "Habitat for Humanity ReStore",
    address: "4198 Commerce Ct, Madison, WI 53719",
    location: LOCATIONS.WEST_SIDE,
    coordinates: { lat: 43.0456, lng: -89.4789 },
    hours: {
      monday: "Closed",
      tuesday: "10:00 AM - 6:00 PM",
      wednesday: "10:00 AM - 6:00 PM",
      thursday: "10:00 AM - 6:00 PM",
      friday: "10:00 AM - 6:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "Closed"
    },
    specialties: [STORE_CATEGORIES.FURNITURE],
    priceRange: "$$",
    tips: [
      "Best for furniture and building materials",
      "Bring a car or plan for delivery",
      "Inventory changes constantly",
      "Great for dorm room furniture"
    ],
    busRoutes: ["Route 14 (limited)"],
    bestFor: "Furniture, appliances, and home improvement materials",
    rating: 4.6,
    crowdTimes: {
      avoid: ["Saturday morning"],
      best: ["Tuesday/Wednesday afternoons"]
    }
  },
  {
    id: 8,
    name: "Plato's Closet",
    address: "7513 Mineral Point Rd, Madison, WI 53717",
    location: LOCATIONS.WEST_SIDE,
    coordinates: { lat: 43.0698, lng: -89.5123 },
    hours: {
      monday: "10:00 AM - 8:00 PM",
      tuesday: "10:00 AM - 8:00 PM",
      wednesday: "10:00 AM - 8:00 PM",
      thursday: "10:00 AM - 8:00 PM",
      friday: "10:00 AM - 8:00 PM",
      saturday: "10:00 AM - 8:00 PM",
      sunday: "11:00 AM - 6:00 PM"
    },
    specialties: [STORE_CATEGORIES.CLOTHING],
    priceRange: "$$",
    tips: [
      "Name brand clothing for teens/young adults",
      "Curated selection - higher quality but higher prices",
      "Good for trendy pieces",
      "Will buy your clothes for cash"
    ],
    busRoutes: ["Route 14"],
    bestFor: "Trendy, name-brand clothing for college students",
    rating: 4.0,
    crowdTimes: {
      avoid: ["After school hours on weekdays"],
      best: ["Weekday mornings"]
    }
  }
];

// Helper functions
export const getStoresByCategory = (category) => {
  return madisonThriftStores.filter(store =>
    store.specialties.includes(category)
  );
};

export const getStoresByLocation = (location) => {
  return madisonThriftStores.filter(store =>
    store.location === location
  );
};

export const getStoresInBudget = (budget) => {
  const priceMap = { '$': 'low', '$$': 'medium', '$$$': 'high' };
  return madisonThriftStores.filter(store => {
    if (budget === 'low') return store.priceRange === '$';
    if (budget === 'medium') return store.priceRange === '$' || store.priceRange === '$$';
    return true; // high budget includes all
  });
};
