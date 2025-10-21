#!/bin/bash

# Daily Deals SA - React Native Setup Script
# This script helps you set up a new React Native project for iOS and Android

echo "🚀 Daily Deals SA - React Native Setup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js is installed: $(node --version)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm is installed: $(npm --version)${NC}"

# Get project name
read -p "Enter project name (default: daily-deals-sa-mobile): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-daily-deals-sa-mobile}

# Get project directory
read -p "Enter project directory (default: ~/Documents): " PROJECT_DIR
PROJECT_DIR=${PROJECT_DIR:-~/Documents}

# Create project directory
FULL_PATH="$PROJECT_DIR/$PROJECT_NAME"

echo ""
echo -e "${YELLOW}📁 Creating project directory: $FULL_PATH${NC}"

# Check if directory exists
if [ -d "$FULL_PATH" ]; then
    echo -e "${RED}❌ Directory already exists: $FULL_PATH${NC}"
    read -p "Do you want to remove it and start fresh? (y/n): " REMOVE_DIR
    if [ "$REMOVE_DIR" = "y" ]; then
        rm -rf "$FULL_PATH"
        echo -e "${GREEN}✅ Removed existing directory${NC}"
    else
        echo -e "${RED}❌ Setup cancelled${NC}"
        exit 1
    fi
fi

mkdir -p "$FULL_PATH"
cd "$FULL_PATH"

echo -e "${GREEN}✅ Project directory created${NC}"

# Initialize git repository
echo ""
echo -e "${YELLOW}📦 Initializing Git repository${NC}"
git init
echo -e "${GREEN}✅ Git repository initialized${NC}"

# Create README
echo ""
echo -e "${YELLOW}📝 Creating README${NC}"
cat > README.md << 'EOF'
# Daily Deals SA - Mobile App

React Native mobile application for Daily Deals SA e-commerce platform.

## Features

- 🛍️ Browse products
- 🛒 Shopping cart
- 💳 Secure checkout
- 📦 Order tracking
- 👤 User authentication
- 🔔 Push notifications
- 📍 Location-based services

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS: Xcode (Mac only)
- Android: Android Studio

### Installation

```bash
npm install
```

### Development

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Building

```bash
# Build for production
eas build --platform all --profile production
```

### Deployment

```bash
# Submit to app stores
eas submit --platform all
```

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Paper
- Axios
- AsyncStorage

## License

Private - Daily Deals SA
EOF

echo -e "${GREEN}✅ README created${NC}"

# Create .gitignore
echo ""
echo -e "${YELLOW}📝 Creating .gitignore${NC}"
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Expo
.expo/
dist/
web-build/

# Native
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# Debug
npm-debug.*
yarn-debug.*
yarn-error.*

# MacOS
.DS_Store
*.pem

# Local env files
.env*.local
.env

# TypeScript
*.tsbuildinfo

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
EOF

echo -e "${GREEN}✅ .gitignore created${NC}"

# Create package.json
echo ""
echo -e "${YELLOW}📝 Creating package.json${NC}"
cat > package.json << 'EOF'
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
    "react-native-vector-icons": "^10.0.0",
    "react-native-gesture-handler": "~2.12.0",
    "react-native-reanimated": "~3.3.0",
    "@react-native-community/netinfo": "11.1.0",
    "expo-image-picker": "~14.3.0",
    "expo-location": "~16.1.0",
    "expo-notifications": "~0.20.0",
    "expo-secure-store": "~12.3.0",
    "react-native-maps": "1.7.1",
    "react-native-config": "^1.5.1"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.0",
    "typescript": "^5.1.0"
  },
  "private": true
}
EOF

echo -e "${GREEN}✅ package.json created${NC}"

# Create tsconfig.json
echo ""
echo -e "${YELLOW}📝 Creating tsconfig.json${NC}"
cat > tsconfig.json << 'EOF'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
EOF

echo -e "${GREEN}✅ tsconfig.json created${NC}"

# Create app.json
echo ""
echo -e "${YELLOW}📝 Creating app.json${NC}"
cat > app.json << 'EOF'
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
      "buildNumber": "1.0.0"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/logo.png",
        "backgroundColor": "#000000"
      },
      "package": "com.dailydealssa.app",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
EOF

echo -e "${GREEN}✅ app.json created${NC}"

# Create folder structure
echo ""
echo -e "${YELLOW}📁 Creating folder structure${NC}"
mkdir -p src/{components,screens,navigation,services,hooks,context,utils,types}
mkdir -p assets
echo -e "${GREEN}✅ Folder structure created${NC}"

# Create initial App.tsx
echo ""
echo -e "${YELLOW}📝 Creating App.tsx${NC}"
cat > App.tsx << 'EOF'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Deals SA</Text>
      <Text style={styles.subtitle}>Mobile App</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
EOF

echo -e "${GREEN}✅ App.tsx created${NC}"

# Create .env.example
echo ""
echo -e "${YELLOW}📝 Creating .env.example${NC}"
cat > .env.example << 'EOF'
API_URL=https://your-api-url.com
API_KEY=your_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
ONESIGNAL_APP_ID=your_onesignal_id
EOF

echo -e "${GREEN}✅ .env.example created${NC}"

# Install dependencies
echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
echo "This may take a few minutes..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Commit initial files
echo ""
echo -e "${YELLOW}📝 Committing initial files${NC}"
git add .
git commit -m "Initial commit - React Native project setup"

echo -e "${GREEN}✅ Initial commit created${NC}"

# Success message
echo ""
echo -e "${GREEN}🎉 React Native project setup complete!${NC}"
echo ""
echo "📁 Project location: $FULL_PATH"
echo ""
echo "📋 Next steps:"
echo "1. cd $FULL_PATH"
echo "2. npm start"
echo "3. Scan QR code with Expo Go app"
echo ""
echo "📚 Read REACT_NATIVE_SETUP.md for detailed instructions"
echo ""
echo "🚀 Happy coding!"

