# Quick Start Guide - 5 Minutes to Running

## Super Fast Setup

```bash
# 1. Install dependencies (2 min)
npm install

# 2. Start the web app (30 sec)
npm run web
```

That's it! The app will open in your browser at http://localhost:19006

## First Test Run

1. **Select preferences:**
   - Looking for: "Vintage Fashion"
   - Time: "Half Day (3-4 hours)"
   - Transportation: "Bus"
   - Starting from: "Campus"

2. **Click "Find My Route!"**

3. **See your AI-generated route** with:
   - 2-4 optimized thrift stores
   - Specific reasons for each recommendation
   - Insider tips (like "50% off purple tags on Saturday")
   - Time estimates between stops
   - Bus route information

## What You'll See

The app generates personalized routes like:

**Example Output:**
```
Stop 1: Ragstock (10min walk from campus)
- Best vintage selection downtown
- Tips: Check back corner for pieces under $20
- Spend: 30-45 minutes

Stop 2: St. Vinny's University Ave (15min by Bus Route 2)
- Less picked over than downtown
- Tips: Saturday = 50% off purple tags
- Spend: 30-45 minutes

Total Trip: 2.5 hours
```

## Key Features to Demo

1. **Multi-factor optimization:** Category + Time + Transportation + Location
2. **AI-powered recommendations:** Claude Opus 4 analyzes Madison's thrift scene
3. **Insider knowledge:** Real tips like crowd times and special deals
4. **Transportation-aware:** Different routes for walking/bus/car

## Customization Ideas

- Edit `src/data/stores.js` to add more thrift stores
- Adjust styling in component files
- Add Google Maps integration
- Include user reviews

## For Hackathon Demo

**Best demo flow:**
1. Show the clean input form
2. Explain the multi-factor optimization
3. Submit and show "Claude is analyzing..."
4. Reveal the smart route with insider tips
5. Highlight the "why" behind each store

**Talking points:**
- Solves real UW-Madison student problem
- Saves time and money
- Hyper-local Madison knowledge
- Powered by Claude Opus 4 AI

## Troubleshooting

**App won't start?**
```bash
npm start -- --reset-cache
```

**API errors?**
- Check `.env` file exists
- Verify Claude API key is set

**Need help?**
- See INSTALL.md for detailed setup
- Contact: kliu337@wisc.edu

---

**Pro tip:** For the best demo experience, use the web version. It's faster to show and doesn't require phone setup.
