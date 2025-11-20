import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude API client
const initializeClaudeClient = () => {
  const apiKey = process.env.CLAUDE_API_KEY || process.env.REACT_APP_CLAUDE_API_KEY;

  if (!apiKey) {
    console.warn('Claude API key not found. Please set CLAUDE_API_KEY or REACT_APP_CLAUDE_API_KEY environment variable.');
    return null;
  }

  return new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Required for web/React Native
  });
};

/**
 * Generate intelligent thrift store route recommendations using Claude
 * @param {Object} preferences - User preferences
 * @param {Array} availableStores - List of thrift stores to consider
 * @returns {Promise<Object>} - Route recommendations with insights
 */
export const generateRouteRecommendations = async (preferences, availableStores) => {
  const client = initializeClaudeClient();

  if (!client) {
    // Fallback to basic recommendations if Claude API is not available
    return generateFallbackRecommendations(preferences, availableStores);
  }

  try {
    const prompt = buildRoutePrompt(preferences, availableStores);

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const content = response.content[0].text;
    return parseClaudeResponse(content, availableStores);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return generateFallbackRecommendations(preferences, availableStores);
  }
};

/**
 * Build a detailed prompt for Claude to generate route recommendations
 */
const buildRoutePrompt = (preferences, stores) => {
  const storeDetails = stores.map(store => ({
    name: store.name,
    location: store.location,
    specialties: store.specialties,
    tips: store.tips,
    busRoutes: store.busRoutes,
    bestFor: store.bestFor,
    crowdTimes: store.crowdTimes,
    priceRange: store.priceRange
  }));

  return `You are a Madison, WI thrift store expert helping plan the optimal shopping route.

USER PREFERENCES:
- Looking for: ${preferences.category}
- Time available: ${preferences.timeAvailable}
- Transportation: ${preferences.transportation}
- Starting location: ${preferences.startLocation}
- Day of week: ${preferences.dayOfWeek || 'Not specified'}

AVAILABLE STORES:
${JSON.stringify(storeDetails, null, 2)}

Please provide:
1. An optimized route of 2-4 stores (ordered by best sequence)
2. For each store, explain WHY it's included and what to look for
3. Specific insider tips based on the day/time
4. Time estimates between stops
5. Any warnings about crowds or timing

Format your response as JSON:
{
  "route": [
    {
      "storeName": "Store Name",
      "reason": "Why this store is recommended",
      "tips": ["Specific tip 1", "Specific tip 2"],
      "estimatedTime": "30-45 minutes",
      "transitTime": "15 minutes by bus"
    }
  ],
  "totalEstimatedTime": "2.5 hours",
  "overallStrategy": "Brief strategy overview",
  "warnings": ["Any important warnings or notes"]
}`;
};

/**
 * Parse Claude's response into structured route data
 */
const parseClaudeResponse = (claudeResponse, availableStores) => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = claudeResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);

      // Enhance with full store data
      const enhancedRoute = parsed.route.map(routeStop => {
        const fullStoreData = availableStores.find(
          store => store.name === routeStop.storeName
        );

        return {
          ...routeStop,
          store: fullStoreData
        };
      });

      return {
        ...parsed,
        route: enhancedRoute
      };
    }
  } catch (error) {
    console.error('Error parsing Claude response:', error);
  }

  // If parsing fails, return the raw response with a basic structure
  return {
    route: availableStores.slice(0, 3).map(store => ({
      storeName: store.name,
      reason: store.bestFor,
      tips: store.tips,
      store: store
    })),
    totalEstimatedTime: "2-3 hours",
    overallStrategy: claudeResponse,
    warnings: []
  };
};

/**
 * Fallback recommendations when Claude API is not available
 */
const generateFallbackRecommendations = (preferences, stores) => {
  // Simple algorithm: rank stores by relevance to preferences
  const rankedStores = rankStoresByPreferences(stores, preferences);
  const topStores = rankedStores.slice(0, 3);

  return {
    route: topStores.map((store, index) => ({
      storeName: store.name,
      reason: store.bestFor,
      tips: store.tips,
      estimatedTime: "30-45 minutes",
      transitTime: index > 0 ? calculateTransitTime(preferences.transportation) : "Starting point",
      store: store
    })),
    totalEstimatedTime: estimateTotal(topStores.length, preferences.transportation),
    overallStrategy: `Visit ${topStores.length} great thrift stores in Madison based on your interest in ${preferences.category}. This route is optimized for ${preferences.transportation} starting from ${preferences.startLocation}.`,
    warnings: []
  };
};

/**
 * Rank stores by how well they match user preferences
 */
const rankStoresByPreferences = (stores, preferences) => {
  return stores
    .map(store => ({
      ...store,
      score: calculateStoreScore(store, preferences)
    }))
    .sort((a, b) => b.score - a.score);
};

/**
 * Calculate a relevance score for a store based on preferences
 */
const calculateStoreScore = (store, preferences) => {
  let score = 0;

  // Category match (highest priority)
  if (store.specialties.includes(preferences.category)) {
    score += 50;
  }

  // Location proximity
  if (store.location === preferences.startLocation) {
    score += 30;
  }

  // Transportation compatibility
  if (preferences.transportation === 'walking' && store.location === 'downtown') {
    score += 20;
  } else if (preferences.transportation === 'bus' && store.busRoutes.length > 0) {
    score += 20;
  }

  // Price range (prefer cheaper for students)
  if (store.priceRange === '$') {
    score += 10;
  }

  // Rating
  score += store.rating * 2;

  return score;
};

/**
 * Calculate estimated transit time based on transportation method
 */
const calculateTransitTime = (transportation) => {
  const times = {
    walking: "15-20 minutes",
    bus: "10-15 minutes",
    car: "5-10 minutes"
  };
  return times[transportation] || "15 minutes";
};

/**
 * Estimate total trip time
 */
const estimateTotal = (numStores, transportation) => {
  const shoppingTime = numStores * 35; // 35 min per store
  const transitMultiplier = transportation === 'walking' ? 15 :
                            transportation === 'bus' ? 12 : 7;
  const transitTime = (numStores - 1) * transitMultiplier;

  const totalMinutes = shoppingTime + transitTime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hours ${minutes} minutes`;
};

export default {
  generateRouteRecommendations
};
