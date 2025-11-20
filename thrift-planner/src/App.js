import React, { useState } from 'react';
import { MapPin, Clock, Bus, Car, Footprints, ShoppingBag, Sparkles } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #fffbeb, #ffedd5)',
    padding: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  maxWidth: {
    maxWidth: '896px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  headerFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  subtitle: {
    color: '#6b7280',
    margin: 0
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '32px',
    marginBottom: '32px'
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  select: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer'
  },
  transportGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  transportButton: {
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  transportButtonActive: {
    padding: '16px',
    borderRadius: '8px',
    border: '2px solid #f97316',
    background: '#fff7ed',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  transportIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '8px'
  },
  transportLabel: {
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(to right, #f97316, #f59e0b)',
    color: 'white',
    fontWeight: 'bold',
    padding: '16px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s'
  },
  submitButtonDisabled: {
    width: '100%',
    background: '#9ca3af',
    color: 'white',
    fontWeight: 'bold',
    padding: '16px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'not-allowed',
    fontSize: '16px',
    opacity: 0.5
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '2px solid white',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '32px',
    whiteSpace: 'pre-wrap',
    fontSize: '14px'
  },
  resultCard: {
    background: 'linear-gradient(to right, #f97316, #f59e0b)',
    color: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  resultTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  resultOverview: {
    color: '#ffedd5',
    marginBottom: '16px'
  },
  stopCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginBottom: '24px',
    borderLeft: '4px solid #f97316'
  },
  stopHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px'
  },
  stopNumber: {
    width: '40px',
    height: '40px',
    background: '#f97316',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    flexShrink: 0
  },
  stopContent: {
    flex: 1
  },
  stopTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  },
  stopDetails: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '16px'
  },
  stopDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  bestForBox: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px'
  },
  insiderTipBox: {
    background: '#fff7ed',
    border: '1px solid #fed7aa',
    borderRadius: '8px',
    padding: '16px'
  },
  boxTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px'
  },
  boxContent: {
    fontSize: '14px'
  },
  proTipCard: {
    background: 'linear-gradient(to right, #fffbeb, #ffedd5)',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    border: '2px solid #fdba74',
    marginBottom: '24px'
  },
  resetButton: {
    width: '100%',
    background: 'white',
    color: '#f97316',
    border: '2px solid #f97316',
    fontWeight: 'bold',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s'
  }
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

// Mock data generator - simulates Claude API response
const getMockRoute = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Different routes based on what they're looking for
      const routes = {
        'vintage-clothes': {
          route: [
            {
              name: "Ragstock",
              address: "559 State St, Madison, WI 53703",
              travelTime: "10 minute walk from campus",
              stayDuration: "45 minutes",
              bestFor: "Vintage clothing, 80s/90s styles, band tees, leather jackets. Best selection of true vintage pieces in Madison.",
              insiderTip: "Best selection is upstairs. Check the back racks for hidden gems. New inventory comes in Tuesday/Thursday mornings, so hit it early in the week.",
              hours: "Open until 9pm today"
            },
            {
              name: "St. Vinny's - University Ave",
              address: "2020 University Ave, Madison, WI 53726",
              travelTime: "12 minutes by bus #2",
              stayDuration: "40 minutes",
              bestFor: "Huge vintage section with rotating inventory. Great for unique finds at low prices. Also has accessories and shoes.",
              insiderTip: "Color tag sales rotate weekly - this week orange tags are 50% off. The vintage section is in the back left corner. Saturday mornings have the freshest picks.",
              hours: "Open until 8pm today"
            },
            {
              name: "Retrospect Vintage",
              address: "638 State St, Madison, WI 53703",
              travelTime: "8 minute walk back toward campus",
              stayDuration: "30 minutes",
              bestFor: "Curated vintage with higher-end pieces. Great for special finds and one-of-a-kind items.",
              insiderTip: "Prices are higher but quality is excellent. They have a small basement section with discounted items. Great spot for vintage denim.",
              hours: "Open until 7pm today"
            }
          ],
          totalTime: "2 hours 45 minutes",
          overview: "This route hits Madison's best vintage spots efficiently. Starting at Ragstock gives you the most variety and best prices, then St. Vinny's for treasure hunting, finishing with Retrospect for curated high-end pieces. Perfect for a vintage shopping day.",
          finalTip: "Bring cash for Ragstock (they have an ATM but it charges fees). Wear clothes that are easy to try things on over. The #2 bus runs every 15 minutes, so timing is easy."
        },
        'everyday-clothes': {
          route: [
            {
              name: "Goodwill - State Street",
              address: "1455 E Washington Ave, Madison, WI 53703",
              travelTime: "15 minutes by bus #6",
              stayDuration: "35 minutes",
              bestFor: "Budget-friendly basics, jeans, t-shirts, sweaters. Huge selection with new items daily.",
              insiderTip: "Monday mornings have the freshest stock from weekend donations. The back right corner has the best organized racks for quick browsing.",
              hours: "Open until 9pm today"
            },
            {
              name: "St. Vinny's - Gorham Street",
              address: "2220 N Sherman Ave, Madison, WI 53704",
              travelTime: "10 minutes by bus",
              stayDuration: "30 minutes",
              bestFor: "Everyday clothing at great prices. Well-organized by size and type.",
              insiderTip: "Wednesday is senior day (10% off if you're with someone 55+). The fitting rooms are spacious. Check the clearance rack near the front.",
              hours: "Open until 8pm today"
            }
          ],
          totalTime: "1 hour 50 minutes",
          overview: "Perfect route for building a practical wardrobe on a budget. These two stores have the best selection of everyday basics and are efficiently connected by bus routes.",
          finalTip: "Download the Goodwill app to see their weekly promotions. Both stores offer student discounts on certain days - ask at checkout."
        },
        'furniture': {
          route: [
            {
              name: "ReStore Dane County",
              address: "4046 Monona Dr, Madison, WI 53716",
              travelTime: "20 minutes by car from campus",
              stayDuration: "45 minutes",
              bestFor: "Large furniture, home improvement items, building materials. Best selection of desks, bookshelves, and dorm-friendly pieces.",
              insiderTip: "New donations arrive Tuesday and Saturday mornings. Prices are negotiable near closing time. They offer delivery for larger items ($50-75).",
              hours: "Open until 6pm today"
            },
            {
              name: "St. Vinny's - East Washington",
              address: "2017 E Washington Ave, Madison, WI 53704",
              travelTime: "8 minutes by car",
              stayDuration: "30 minutes",
              bestFor: "Smaller furniture, lamps, decorative items, kitchen supplies. Great for dorm and apartment decor.",
              insiderTip: "This location has the biggest furniture section of all St. Vinny's. Check the 'as-is' section for deep discounts. Free furniture dolly available.",
              hours: "Open until 8pm today"
            }
          ],
          totalTime: "2 hours 15 minutes",
          overview: "Best route for furnishing a dorm or apartment. ReStore has the large pieces at unbeatable prices, while St. Vinny's fills in the smaller items and decor. Car strongly recommended.",
          finalTip: "Bring measurements and photos of your space. ReStore staff are super helpful with loading. Check both stores' Facebook pages - they post new arrivals daily."
        },
        'books': {
          route: [
            {
              name: "Half Price Books",
              address: "2003 Atwood Ave, Madison, WI 53704",
              travelTime: "15 minutes by bus #3",
              stayDuration: "40 minutes",
              bestFor: "Huge used book selection, textbooks, vinyl records, DVDs. Best place for academic books and popular fiction.",
              insiderTip: "Check the clearance section in the back - books under $2. They buy books too if you have any to sell. The staff recommendations shelf is always solid.",
              hours: "Open until 9pm today"
            },
            {
              name: "St. Vinny's - University Ave",
              address: "2020 University Ave, Madison, WI 53726",
              travelTime: "12 minutes by bus #2",
              stayDuration: "25 minutes",
              bestFor: "Cheap books ($1-3), sometimes find textbooks, magazines. Hit or miss but worth checking.",
              insiderTip: "Books are $1 on Wednesdays. The textbook section is small but occasionally has current editions. Check the glass case for rare/collectible books.",
              hours: "Open until 8pm today"
            }
          ],
          totalTime: "2 hours",
          overview: "Perfect route for book lovers on a budget. Half Price Books has the selection and quality, while St. Vinny's offers treasure hunt pricing.",
          finalTip: "Half Price Books has a rewards program - sign up for discounts. Bring a backpack for carrying your haul on the bus."
        },
        'anything': {
          route: [
            {
              name: "Ragstock",
              address: "559 State St, Madison, WI 53703",
              travelTime: "10 minute walk from campus",
              stayDuration: "35 minutes",
              bestFor: "Vintage clothes, accessories, shoes. Great for unique finds and people-watching on State Street.",
              insiderTip: "Upstairs has the best vintage. Check the shoe wall for deals. College students get 10% off with ID on Thursdays.",
              hours: "Open until 9pm today"
            },
            {
              name: "St. Vinny's - University Ave",
              address: "2020 University Ave, Madison, WI 53726",
              travelTime: "12 minutes by bus #2",
              stayDuration: "40 minutes",
              bestFor: "Literally everything - clothes, furniture, books, kitchenware, decor. Biggest selection in Madison.",
              insiderTip: "This is the flagship location and largest store. Color tag sales rotate weekly. The furniture section in back is huge. Try everything on - sizing is inconsistent.",
              hours: "Open until 8pm today"
            },
            {
              name: "Goodwill - State Street",
              address: "1455 E Washington Ave, Madison, WI 53703",
              travelTime: "8 minutes by bus #6",
              stayDuration: "30 minutes",
              bestFor: "Budget basics, random treasures, and last-minute finds. Good final stop to fill in gaps.",
              insiderTip: "Mondays have fresh inventory. The book section often has textbooks. Quick in-and-out possible if you're short on time.",
              hours: "Open until 9pm today"
            }
          ],
          totalTime: "2 hours 45 minutes",
          overview: "The ultimate Madison thrift crawl hitting three iconic spots. This route covers vintage, mainstream thrift, and budget basics - you'll see everything Madison thrifting has to offer.",
          finalTip: "Pace yourself and stay hydrated. Bring a reusable shopping bag. The bus day pass is $5 and worth it. Don't buy the first thing you see - compare across stores!"
        }
      };

      const selectedRoute = routes[formData.lookingFor] || routes['anything'];
      resolve(selectedRoute);
    }, 2500); // 2.5 second delay to simulate API call
  });
};

export default function App() {
  const [formData, setFormData] = useState({
    lookingFor: 'vintage-clothes',
    timeAvailable: '2-3-hours',
    transportation: 'bus',
    startLocation: 'campus'
  });
  
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRoute(null);

    try {
      // Using mock data instead of real API for local development
      const routeData = await getMockRoute(formData);
      setRoute(routeData);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate route. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const transportIcons = {
    walking: Footprints,
    bus: Bus,
    car: Car
  };

  const TransportIcon = transportIcons[formData.transportation];

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <div style={styles.headerFlex}>
            <ShoppingBag size={40} color="#ea580c" />
            <h1 style={styles.title}>Madison Thrift Route Planner</h1>
          </div>
          <p style={styles.subtitle}>Your personalized guide to the best thrift stores in Madison</p>
        </div>

        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>What are you looking for?</label>
              <select
                style={styles.select}
                value={formData.lookingFor}
                onChange={(e) => setFormData({...formData, lookingFor: e.target.value})}
              >
                <option value="vintage-clothes">Vintage Clothing</option>
                <option value="everyday-clothes">Everyday Clothes</option>
                <option value="furniture">Furniture & Home Decor</option>
                <option value="books">Books & Media</option>
                <option value="anything">Just Browsing / Everything</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>How much time do you have?</label>
              <select
                style={styles.select}
                value={formData.timeAvailable}
                onChange={(e) => setFormData({...formData, timeAvailable: e.target.value})}
              >
                <option value="1-2-hours">1-2 hours (quick trip)</option>
                <option value="2-3-hours">2-3 hours (moderate)</option>
                <option value="half-day">Half day (4-5 hours)</option>
                <option value="full-day">Full day adventure</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>How are you getting around?</label>
              <div style={styles.transportGrid}>
                {['walking', 'bus', 'car'].map((transport) => {
                  const Icon = transportIcons[transport];
                  const isActive = formData.transportation === transport;
                  return (
                    <button
                      key={transport}
                      type="button"
                      onClick={() => setFormData({...formData, transportation: transport})}
                      style={isActive ? styles.transportButtonActive : styles.transportButton}
                    >
                      <div style={styles.transportIcon}>
                        <Icon size={24} color="#374151" />
                      </div>
                      <span style={styles.transportLabel}>{transport}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Starting location</label>
              <select
                style={styles.select}
                value={formData.startLocation}
                onChange={(e) => setFormData({...formData, startLocation: e.target.value})}
              >
                <option value="campus">Campus / Downtown</option>
                <option value="near-west">Near West Side</option>
                <option value="east-side">East Side</option>
                <option value="south-side">South Side</option>
                <option value="west-side">West Side</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.submitButtonDisabled : styles.submitButton}
            >
              {loading ? (
                <>
                  <span style={styles.loadingSpinner}></span>
                  Planning your route...
                </>
              ) : (
                'Generate My Thrift Route'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        {route && (
          <div>
            <div style={styles.resultCard}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px'}}>
                <Sparkles size={24} />
                <div>
                  <h2 style={styles.resultTitle}>Your Perfect Thrift Route</h2>
                  <p style={styles.resultOverview}>{route.overview}</p>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Clock size={20} />
                <span style={{fontWeight: '600'}}>Total Time: {route.totalTime}</span>
              </div>
            </div>

            {route.route.map((stop, index) => (
              <div key={index} style={styles.stopCard}>
                <div style={styles.stopHeader}>
                  <div style={styles.stopNumber}>{index + 1}</div>
                  
                  <div style={styles.stopContent}>
                    <h3 style={styles.stopTitle}>{stop.name}</h3>
                    
                    <div style={styles.stopDetails}>
                      <div style={styles.stopDetail}>
                        <MapPin size={16} color="#9ca3af" />
                        <span>{stop.address}</span>
                      </div>
                      {index > 0 && (
                        <div style={styles.stopDetail}>
                          <TransportIcon size={16} color="#9ca3af" />
                          <span>{stop.travelTime}</span>
                        </div>
                      )}
                      <div style={styles.stopDetail}>
                        <Clock size={16} color="#9ca3af" />
                        <span>Spend about {stop.stayDuration} here • {stop.hours}</span>
                      </div>
                    </div>

                    <div style={styles.bestForBox}>
                      <p style={{...styles.boxTitle, color: '#78350f'}}>Best for:</p>
                      <p style={{...styles.boxContent, color: '#92400e', margin: 0}}>{stop.bestFor}</p>
                    </div>

                    <div style={styles.insiderTipBox}>
                      <p style={{...styles.boxTitle, color: '#7c2d12'}}>💡 Insider Tip:</p>
                      <p style={{...styles.boxContent, color: '#9a3412', margin: 0}}>{stop.insiderTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={styles.proTipCard}>
              <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px'}}>
                🌟 Pro Tip
              </h3>
              <p style={{color: '#374151', margin: 0}}>{route.finalTip}</p>
            </div>

            <button
              onClick={() => {
                setRoute(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={styles.resetButton}
            >
              Plan Another Route
            </button>
          </div>
        )}
      </div>
    </div>
  );
}