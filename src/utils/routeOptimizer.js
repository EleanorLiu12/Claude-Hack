import { madisonThriftStores, getStoresByCategory, getStoresByLocation } from '../data/stores';
import { generateRouteRecommendations } from './claudeAPI';

/**
 * Main function to optimize thrift store route based on user preferences
 * @param {Object} preferences - User preferences object
 * @returns {Promise<Object>} - Optimized route with store recommendations
 */
export const optimizeRoute = async (preferences) => {
  // Step 1: Filter stores based on preferences
  const filteredStores = filterStores(preferences);

  // Step 2: Use Claude API to generate intelligent recommendations
  const recommendations = await generateRouteRecommendations(preferences, filteredStores);

  // Step 3: Add additional metadata
  return enhanceRecommendations(recommendations, preferences);
};

/**
 * Filter stores based on user preferences
 */
const filterStores = (preferences) => {
  let stores = [...madisonThriftStores];

  // Filter by category if specified
  if (preferences.category && preferences.category !== 'anything') {
    stores = stores.filter(store =>
      store.specialties.includes(preferences.category)
    );
  }

  // Filter by transportation accessibility
  if (preferences.transportation === 'walking') {
    stores = stores.filter(store =>
      store.location === 'downtown' || store.location === 'campus'
    );
  } else if (preferences.transportation === 'bus') {
    stores = stores.filter(store =>
      store.busRoutes && store.busRoutes.length > 0
    );
  }

  // Prioritize stores near starting location
  if (preferences.startLocation) {
    stores = prioritizeByLocation(stores, preferences.startLocation);
  }

  return stores;
};

/**
 * Prioritize stores by proximity to starting location
 */
const prioritizeByLocation = (stores, startLocation) => {
  const locationPriority = {
    campus: ['campus', 'downtown', 'near_west', 'east_side', 'west_side'],
    downtown: ['downtown', 'campus', 'near_west', 'east_side', 'west_side'],
    near_west: ['near_west', 'downtown', 'campus', 'west_side', 'east_side'],
    east_side: ['east_side', 'downtown', 'campus', 'near_west', 'west_side'],
    west_side: ['west_side', 'near_west', 'downtown', 'campus', 'east_side']
  };

  const priority = locationPriority[startLocation] || [];

  return stores.sort((a, b) => {
    const aIndex = priority.indexOf(a.location);
    const bIndex = priority.indexOf(b.location);
    return aIndex - bIndex;
  });
};

/**
 * Enhance recommendations with additional metadata
 */
const enhanceRecommendations = (recommendations, preferences) => {
  const enhanced = { ...recommendations };

  // Add map data for visualization
  enhanced.mapData = {
    stores: recommendations.route.map(r => r.store),
    center: calculateMapCenter(recommendations.route),
    zoom: calculateZoomLevel(preferences.transportation)
  };

  // Add summary statistics
  enhanced.summary = {
    totalStores: recommendations.route.length,
    estimatedCost: estimateTotalCost(recommendations.route),
    transportation: preferences.transportation,
    bestTimeToGo: determineBestTime(recommendations.route, preferences)
  };

  return enhanced;
};

/**
 * Calculate the center point for map display
 */
const calculateMapCenter = (route) => {
  if (!route || route.length === 0) {
    // Default to Madison downtown
    return { lat: 43.0731, lng: -89.4012 };
  }

  const validStores = route.filter(r => r.store && r.store.coordinates);

  if (validStores.length === 0) {
    return { lat: 43.0731, lng: -89.4012 };
  }

  const totalLat = validStores.reduce((sum, r) => sum + r.store.coordinates.lat, 0);
  const totalLng = validStores.reduce((sum, r) => sum + r.store.coordinates.lng, 0);

  return {
    lat: totalLat / validStores.length,
    lng: totalLng / validStores.length
  };
};

/**
 * Calculate appropriate zoom level based on transportation method
 */
const calculateZoomLevel = (transportation) => {
  const zoomLevels = {
    walking: 14,
    bus: 12,
    car: 11
  };
  return zoomLevels[transportation] || 12;
};

/**
 * Estimate total cost of the trip
 */
const estimateTotalCost = (route) => {
  const avgSpendPerStore = {
    '$': 15,
    '$$': 30,
    '$$$': 50
  };

  const total = route.reduce((sum, r) => {
    const priceRange = r.store?.priceRange || '$';
    return sum + (avgSpendPerStore[priceRange] || 20);
  }, 0);

  return `$${total - 20} - $${total + 20}`;
};

/**
 * Determine best time to go based on store crowd times
 */
const determineBestTime = (route, preferences) => {
  const dayOfWeek = preferences.dayOfWeek || 'Saturday';
  const allAvoidTimes = route.flatMap(r =>
    r.store?.crowdTimes?.avoid || []
  );

  // Simple heuristic: if it's Saturday and multiple stores say avoid Saturday afternoon
  if (dayOfWeek === 'Saturday' && allAvoidTimes.includes('Saturday afternoon')) {
    return 'Morning (before 11am) or evening (after 5pm)';
  }

  if (dayOfWeek === 'Sunday' && allAvoidTimes.includes('Sunday afternoon')) {
    return 'Early afternoon (12-2pm)';
  }

  // Default recommendations
  const bestTimes = {
    Monday: 'Morning or afternoon',
    Tuesday: 'Morning or afternoon',
    Wednesday: 'Morning or afternoon',
    Thursday: 'Morning or afternoon',
    Friday: 'Evening',
    Saturday: 'Early morning (9-11am)',
    Sunday: 'Early afternoon'
  };

  return bestTimes[dayOfWeek] || 'Morning or afternoon';
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export const calculateDistance = (coord1, coord2) => {
  const R = 3959; // Earth's radius in miles

  const lat1 = coord1.lat * Math.PI / 180;
  const lat2 = coord2.lat * Math.PI / 180;
  const deltaLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const deltaLng = (coord2.lng - coord1.lng) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in miles
};

/**
 * Get current day of week
 */
export const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

export default {
  optimizeRoute,
  calculateDistance,
  getCurrentDay
};
