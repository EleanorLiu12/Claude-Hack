# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Expo CLI** (optional but recommended)

## Step 1: Clone or Download the Project

```bash
cd /path/to/your/projects
git clone <your-repo-url>
cd madison-thrift-optimizer
```

Or if you downloaded as a ZIP, extract it and navigate to the folder.

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native
- Expo
- Claude API SDK
- Navigation libraries

## Step 3: Configure API Keys

The API key is already configured in the `.env` file. If you need to update it:

1. Open `.env` in the root directory
2. Update the Claude API key:
```
CLAUDE_API_KEY=your_api_key_here
REACT_APP_CLAUDE_API_KEY=your_api_key_here
```

**Note:** The `.env` file is already gitignored to protect your API keys.

## Step 4: Run the Application

### For Web (Easiest for demo):

```bash
npm run web
```

This will start the development server and open the app in your browser at `http://localhost:19006`

### For iOS Simulator (Mac only):

```bash
npm run ios
```

### For Android Emulator:

```bash
npm run android
```

### Using Expo Go App:

```bash
npm start
```

Then scan the QR code with:
- **iOS:** Camera app
- **Android:** Expo Go app

## Step 5: Test the Application

1. Select your preferences in the form:
   - What you're looking for (e.g., Vintage Fashion)
   - Time available (e.g., Half Day)
   - Transportation (e.g., Bus)
   - Starting location (e.g., Campus)

2. Click "Find My Route!"

3. Wait for Claude Opus 4 to generate your personalized thrift store route

4. View your optimized route with insider tips!

## Troubleshooting

### Issue: "Cannot find module '@anthropic-ai/sdk'"
**Solution:** Run `npm install` again

### Issue: "API key not found"
**Solution:**
1. Check that `.env` file exists in the root directory
2. Verify the API key is correctly set
3. Restart the development server

### Issue: Metro bundler errors
**Solution:**
```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Issue: "Failed to generate route"
**Solution:**
1. Check your internet connection
2. Verify the Claude API key is valid
3. Check the console for detailed error messages

## Building for Production

### Web:
```bash
npx expo export:web
```

### iOS (requires Mac + Xcode):
```bash
npx expo build:ios
```

### Android:
```bash
npx expo build:android
```

## Project Structure

```
madison-thrift-optimizer/
├── App.js                    # Main app component
├── src/
│   ├── components/          # UI components
│   │   ├── InputForm.js
│   │   ├── RouteDisplay.js
│   │   └── StoreCard.js
│   ├── utils/              # Utilities
│   │   ├── claudeAPI.js
│   │   └── routeOptimizer.js
│   └── data/               # Data
│       └── stores.js
├── package.json
├── .env                    # API keys (not in git)
└── README.md
```

## Next Steps

- Customize the store database in `src/data/stores.js`
- Adjust the UI styling in component files
- Add more features (maps integration, user reviews, etc.)

## Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Contact: kliu337@wisc.edu
