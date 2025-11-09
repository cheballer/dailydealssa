# 📱 React Native Setup Guide for Daily Deals SA

## 🎯 Overview

This guide will help you convert your Next.js web app into a **React Native mobile app** for iOS and Android app stores.

---

## 📦 What You Need

### **1. Separate GitHub Repository**
**YES** - You need a separate repository for the React Native app.

**Why?**
- Different dependencies (React Native vs Next.js)
- Different build process (iOS/Android vs Web)
- Different deployment (App Store/Play Store vs Vercel)
- Easier to manage and maintain

### **2. Setup Requirements**

#### **For iOS (Mac only):**
- ✅ Mac computer (required for iOS development)
- ✅ Xcode (from Mac App Store)
- ✅ CocoaPods: `sudo gem install cocoapods`
- ✅ Apple Developer Account ($99/year)
- ✅ Node.js and npm

#### **For Android (Mac/Windows/Linux):**
- ✅ Android Studio
- ✅ Java Development Kit (JDK)
- ✅ Google Play Developer Account ($25 one-time)
- ✅ Node.js and npm

---

## 🚀 Quick Start

### **Step 1: Create New Repository**

1. **On GitHub:**
   - Go to https://github.com/new
   - Repository name: `daily-deals-sa-mobile`
   - Description: "Daily Deals SA - React Native Mobile App"
   - Make it private or public
   - Click "Create repository"

2. **Clone locally:**
   ```bash
   cd ~/Documents
   git clone https://github.com/YOUR_USERNAME/daily-deals-sa-mobile.git
   cd daily-deals-sa-mobile
   ```

### **Step 2: Initialize React Native Project**

```bash
# Install Expo CLI (recommended for beginners)
npm install -g expo-cli

# Create new Expo project
npx create-expo-app@latest . --template

# Choose: "blank (TypeScript)"
```

### **Step 3: Install Dependencies**

```bash
# Install required packages
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-webview
npm install axios
npm install @shopify/restyle
npm install react-native-gesture-handler
npm install react-native-reanimated
npm install @react-native-community/netinfo
npm install expo-image-picker
npm install expo-location
npm install expo-notifications
npm install expo-secure-store
npm install react-native-maps
npm install react-native-paper
npm install react-native-vector-icons
```

---

## 📁 Project Structure

```
daily-deals-sa-mobile/
├── App.tsx                    # Main app entry
├── app.json                   # Expo config
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── assets/                    # Images, fonts
│   ├── logo.png
│   └── ...
├── src/
│   ├── components/            # Reusable components
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartIcon.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   ├── screens/               # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── ProductListScreen.tsx
│   │   ├── ProductDetailScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── CheckoutScreen.tsx
│   │   ├── OrdersScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── AuthScreen.tsx
│   ├── navigation/            # Navigation setup
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── services/              # API calls
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   └── cart.ts
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useProducts.ts
│   ├── context/               # Context providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── utils/                 # Helper functions
│   │   ├── storage.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   └── types/                 # TypeScript types
│       ├── Product.ts
│       ├── Order.ts
│       ├── User.ts
│       └── index.ts
├── ios/                       # iOS native code
│   ├── DailyDealsSA/
│   │   ├── AppDelegate.m
│   │   └── Info.plist
│   └── Podfile
└── android/                   # Android native code
    ├── app/
    │   ├── src/main/
    │   │   └── AndroidManifest.xml
    │   └── build.gradle
    └── build.gradle
```

---

## 🔧 Configuration Files

### **app.json** (Expo Config)
```json
{
  "expo": {
    "name": "Daily Deals SA",
    "slug": "daily-deals-sa",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/logo.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.dailydealssa.app",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSCameraUsageDescription": "We need access to your camera to take photos for product reviews.",
        "NSPhotoLibraryUsageDescription": "We need access to your photo library to upload product images.",
        "NSLocationWhenInUseUsageDescription": "We need your location to find nearby stores and delivery options."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/logo.png",
        "backgroundColor": "#000000"
      },
      "package": "com.dailydealssa.app",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "expo-location",
      "expo-notifications"
    ],
    "extra": {
      "apiUrl": "https://your-api-url.com",
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

### **package.json**
```json
{
  "name": "daily-deals-sa-mobile",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "submit:android": "eas submit --platform android",
    "submit:ios": "eas submit --platform ios"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "expo-router": "~2.0.0",
    "react": "18.2.0",
    "react-native": "0.72.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/native-stack": "^6.9.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "react-native-screens": "~3.25.0",
    "react-native-safe-area-context": "4.6.0",
    "@react-native-async-storage/async-storage": "1.18.0",
    "axios": "^1.6.0",
    "react-native-paper": "^5.10.0",
    "react-native-vector-icons": "^10.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.0",
    "typescript": "^5.1.0"
  },
  "private": true
}
```

---

## 📱 Key Screens to Build

### **1. Home Screen**
- Featured products
- Categories
- Today's deals
- Free drops banner

### **2. Product List Screen**
- Grid/list view toggle
- Filter by category
- Search functionality
- Sort options

### **3. Product Detail Screen**
- Product images (carousel)
- Product info
- Add to cart button
- Related products

### **4. Cart Screen**
- Cart items list
- Quantity controls
- Total calculation
- Checkout button

### **5. Checkout Screen**
- Delivery address
- Payment method
- Order summary
- Place order button

### **6. Orders Screen**
- Order history
- Order status
- Tracking information
- Reorder option

### **7. Profile Screen**
- User info
- Saved addresses
- Order history
- Settings
- Logout

### **8. Auth Screen**
- Sign in
- Sign up
- Forgot password

---

## 🔌 API Integration

### **Create API Service** (`src/services/api.ts`)
```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://your-api-url.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### **Products Service** (`src/services/products.ts`)
```typescript
import api from './api';

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await api.get(`/products?category=${category}`);
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};
```

---

## 🎨 Styling

### **Option 1: React Native Paper (Recommended)**
```typescript
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}
```

### **Option 2: Styled Components**
```typescript
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
`;
```

---

## 🚀 Building for App Stores

### **Using Expo Application Services (EAS)**

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure EAS:**
   ```bash
   eas build:configure
   ```

4. **Build for Android:**
   ```bash
   eas build --platform android --profile production
   ```

5. **Build for iOS:**
   ```bash
   eas build --platform ios --profile production
   ```

6. **Submit to App Stores:**
   ```bash
   # Android
   eas submit --platform android
   
   # iOS
   eas submit --platform ios
   ```

---

## 📋 App Store Requirements

### **Google Play Store:**
- ✅ App icon (512x512px)
- ✅ Feature graphic (1024x500px)
- ✅ Screenshots (at least 2)
- ✅ App description
- ✅ Privacy policy URL
- ✅ Content rating
- ✅ App signing key
- ✅ $25 one-time fee

### **Apple App Store:**
- ✅ App icon (1024x1024px)
- ✅ Screenshots (various sizes)
- ✅ App description
- ✅ Privacy policy URL
- ✅ Age rating
- ✅ App Store Connect account
- ✅ $99/year fee

---

## 🔐 Environment Variables

### **Create `.env` file:**
```env
API_URL=https://your-api-url.com
API_KEY=your_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
ONESIGNAL_APP_ID=your_onesignal_id
```

### **Use with react-native-config:**
```bash
npm install react-native-config
```

```typescript
import Config from 'react-native-config';

const API_URL = Config.API_URL;
```

---

## 📱 Testing

### **iOS Simulator (Mac only):**
```bash
npm run ios
```

### **Android Emulator:**
```bash
npm run android
```

### **Physical Device:**
```bash
# Install Expo Go app on your phone
# Scan QR code from terminal
npm start
```

---

## 🎯 Development Workflow

### **1. Development:**
```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### **2. Testing:**
```bash
# Run tests
npm test

# Run linting
npm run lint
```

### **3. Building:**
```bash
# Build for production
eas build --platform all --profile production
```

### **4. Deployment:**
```bash
# Submit to stores
eas submit --platform all
```

---

## 🔄 Syncing with Web App

### **Shared Code:**
- API endpoints
- Business logic
- Types/interfaces
- Constants

### **Mobile-Specific:**
- UI components
- Navigation
- Native features
- Offline storage

### **Best Practice:**
Create a **monorepo** with:
```
daily-deals-sa/
├── packages/
│   ├── web/          # Next.js app
│   ├── mobile/       # React Native app
│   └── shared/       # Shared code
│       ├── types/
│       ├── utils/
│       └── constants/
```

---

## 📚 Recommended Resources

### **Documentation:**
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

### **Tutorials:**
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
- [Navigation Tutorial](https://reactnavigation.org/docs/getting-started)

---

## ✅ Checklist

### **Setup:**
- [ ] Create new GitHub repository
- [ ] Clone repository locally
- [ ] Initialize React Native project
- [ ] Install dependencies
- [ ] Configure app.json
- [ ] Set up navigation
- [ ] Create folder structure

### **Development:**
- [ ] Build all screens
- [ ] Integrate API
- [ ] Add authentication
- [ ] Implement cart functionality
- [ ] Add push notifications
- [ ] Test on iOS
- [ ] Test on Android

### **Deployment:**
- [ ] Create app icons
- [ ] Write app description
- [ ] Take screenshots
- [ ] Build production app
- [ ] Submit to Google Play
- [ ] Submit to Apple App Store
- [ ] Monitor app performance

---

## 🎉 Summary

**YES, you need a separate repository for React Native!**

### **Why?**
- Different tech stack
- Different build process
- Different deployment
- Easier maintenance

### **Next Steps:**
1. Create `daily-deals-sa-mobile` repository on GitHub
2. Initialize React Native project
3. Build screens and integrate API
4. Test on iOS and Android
5. Build and submit to app stores

---

**Ready to start? Let me know and I'll help you set up the React Native project!** 🚀




