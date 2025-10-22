# 🛍️ LoginSignUp29052025 - React Native Shopping Application

A comprehensive React Native e-commerce application built with modern technologies, featuring user authentication, product browsing, shopping cart management, wishlist functionality, and profile management. This project demonstrates advanced React Native development patterns including Redux state management, navigation, image handling, and API integration.

## 📍 Repository Location

This project is part of the [ReactNativeTraining repository](https://github.com/ashutoshdas1212/ReactNativeTraining/tree/master/LoginSignUp29052025) and is located in the `LoginSignUp29052025` folder. The repository contains multiple React Native training projects, and this specific folder contains the shopping application implementation.

## 📱 Features

### 🔐 Authentication & User Management
- **Login/Signup System** with OTP validation
- **Secure Authentication** using JWT tokens
- **User Profile Management** with image upload
- **Form Validation** with real-time error handling

### 🛒 Shopping Features
- **Product Catalog** with detailed product information
- **Shopping Cart** with quantity management
- **Wishlist** functionality to save favorite items
- **Product Search** and filtering capabilities
- **Checkout Process** with order management

### 🎨 User Interface
- **Modern UI/UX** with custom components
- **Responsive Design** for different screen sizes
- **Dark/Light Theme** support
- **Smooth Animations** and transitions
- **Custom Fonts** (Poppins family)

### 📱 Navigation
- **Bottom Tab Navigation** for main sections
- **Drawer Navigation** for additional features
- **Stack Navigation** for detailed screens
- **Deep Linking** support

## 🚀 Getting Started

### Quick Start
1. Clone the repository from the specific folder:
   ```bash
   git clone https://github.com/ashutoshdas1212/ReactNativeTraining.git
   cd ReactNativeTraining/LoginSignUp29052025
   ```
2. Install dependencies: `npm install` or `yarn install`
3. For iOS: `cd ios && pod install && cd ..`
4. Start Metro: `npm start` or `yarn start`
5. Run on device: `npm run android` or `npm run ios`

> **Note**: This project is located in the `LoginSignUp29052025` folder within the [ReactNativeTraining repository](https://github.com/ashutoshdas1212/ReactNativeTraining/tree/master/LoginSignUp29052025). Make sure to navigate to the correct folder after cloning.

## 📁 Project Structure

```
src/
├── assets/                 # Images, fonts, and static assets
│   ├── fonts/             # Custom fonts (Poppins family)
│   └── abstract.jpg       # Background images
├── cart/                  # Shopping cart functionality
│   ├── CartScreen.js     # Cart display and management
│   ├── cartSlice.js       # Redux cart state management
│   └── cartReducer.js     # Cart reducer logic
├── components/            # Reusable UI components
│   ├── Button.js          # Custom button component
│   ├── CustomInput.js     # Custom input field
│   └── ProfileHeader.js   # Profile header component
├── redux/                 # State management
│   ├── store.js           # Redux store configuration
│   └── authSlice.js       # Authentication state management
├── screens/               # Screen components
│   └── OTPValidationScreen.js  # OTP verification screen
├── wishlist/              # Wishlist functionality
│   ├── WishlistScreen.js  # Wishlist display
│   └── wishlistSlice.js   # Wishlist state management
├── Background.js          # Background component
├── Btn.js                 # Button utility component
├── CheckoutScreen.js      # Checkout process screen
├── Constants.js           # App constants and colors
├── Details.js             # Product details screen
├── Home.js                # Home screen with products
├── Login.js               # Login screen
├── Profile.js             # User profile screen
└── SignUp.js              # Registration screen
```

## 🛠️ Technologies Used

### Core Technologies
- **React Native** 0.79.2 - Cross-platform mobile development
- **React** 19.0.0 - UI library
- **JavaScript** - Programming language

### State Management
- **Redux Toolkit** 2.8.2 - Predictable state container
- **React Redux** 9.2.0 - React bindings for Redux

### Navigation
- **React Navigation** 7.x - Navigation library
  - Bottom Tab Navigator
  - Drawer Navigator
  - Stack Navigator

### UI & Styling
- **React Native Vector Icons** 10.2.0 - Icon library
- **Custom Fonts** - Poppins font family
- **StyleSheet** - React Native styling

### Additional Libraries
- **React Native Image Picker** 8.2.1 - Image selection
- **React Native Image Crop Picker** 0.50.1 - Image cropping
- **React Native Gesture Handler** 2.26.0 - Touch gestures
- **React Native Reanimated** 3.18.0 - Animations
- **React Native Safe Area Context** 5.4.1 - Safe area handling

## 🔧 Configuration

### Environment Setup

1. **Android Configuration**
   - Ensure Android SDK is properly configured
   - Set up environment variables for Android
   - Configure signing keys for release builds

2. **iOS Configuration**
   - Set up Apple Developer account
   - Configure signing certificates
   - Update bundle identifier

### API Configuration

The app connects to a backend API. Update the API endpoints in:
- `src/redux/authSlice.js` - Authentication endpoints
- `src/wishlist/wishlistSlice.js` - Wishlist API endpoints

## 📱 Screenshots

The application includes the following key screens:

- **Login Screen**: Clean authentication interface with email/password validation
- **Sign Up Screen**: Comprehensive registration form with field validation
- **Home Screen**: Product catalog with search and filtering capabilities
- **Product Details**: Detailed product information with add to cart functionality
- **Shopping Cart**: Cart management with quantity controls and checkout
- **Wishlist**: Save and manage favorite products
- **User Profile**: Profile management with image upload capabilities
- **OTP Validation**: Two-factor authentication for secure login

## 🎯 Project Explanation

### Overview
This React Native application is a complete e-commerce solution that demonstrates modern mobile app development practices. The project showcases:

- **State Management**: Redux Toolkit for predictable state management across the application
- **Navigation**: Complex navigation patterns using React Navigation with drawer, tab, and stack navigators
- **API Integration**: RESTful API communication for authentication and data fetching
- **Image Handling**: Advanced image picker implementation with camera and gallery access
- **Form Validation**: Real-time form validation with user-friendly error messages
- **Responsive Design**: Adaptive UI that works across different device sizes

### Architecture
The application follows a modular architecture pattern:

- **Components**: Reusable UI components for consistency
- **Screens**: Individual screen components for different app sections
- **Redux Store**: Centralized state management for authentication, cart, and wishlist
- **Services**: API service layer for backend communication
- **Utils**: Helper functions and constants

### Key Technical Implementations

#### Authentication System
- JWT-based authentication with secure token storage
- OTP validation for enhanced security
- Form validation with real-time feedback
- Secure password handling

#### Shopping Features
- Product catalog with dynamic loading
- Shopping cart with persistent storage
- Wishlist functionality with API synchronization
- Checkout process with order management

#### Image Management
- Camera integration for profile pictures
- Gallery access with proper permissions
- Image cropping and optimization
- Cross-platform compatibility

#### State Management
- Redux Toolkit for efficient state updates
- Async thunks for API calls
- Normalized state structure
- Error handling and loading states

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native run-android
   ```

3. **iOS build issues**
   ```bash
   cd ios
   pod install
   cd ..
   npx react-native run-ios
   ```

4. **Permission issues (Android)**
   - Ensure all required permissions are granted
   - Check AndroidManifest.xml for permission declarations

## 🚀 Development Features

### Authentication Flow
1. **Login Screen** - Email/password authentication with validation
2. **OTP Validation** - Two-factor authentication for security
3. **Sign Up** - User registration with comprehensive form validation
4. **Profile Management** - Update user information and profile picture

### Shopping Experience
1. **Product Browsing** - Browse through product catalog with search
2. **Product Details** - View detailed product information
3. **Add to Cart** - Add products to shopping cart with quantity management
4. **Wishlist** - Save favorite products for later purchase
5. **Checkout** - Complete purchase process with order management

### User Interface
- **Responsive Design** - Works on different screen sizes
- **Custom Components** - Reusable UI components for consistency
- **Smooth Animations** - Enhanced user experience with React Native Reanimated
- **Modern Styling** - Clean and intuitive design with custom fonts

## 🛠️ Development Setup

### Prerequisites
- Node.js (>= 18.0.0)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- Java Development Kit (JDK) 11 or higher

### Installation Steps
1. Clone the ReactNativeTraining repository and navigate to the project folder:
   ```bash
   git clone https://github.com/ashutoshdas1212/ReactNativeTraining.git
   cd ReactNativeTraining/LoginSignUp29052025
   ```
2. Install dependencies with `npm install` or `yarn install`
3. For iOS: Run `cd ios && pod install && cd ..`
4. Start Metro bundler with `npm start` or `yarn start`
5. Run on Android: `npm run android` or `yarn android`
6. Run on iOS: `npm run ios` or `yarn ios`

## 📱 App Structure

The application is organized into logical modules:

- **Authentication Module**: Login, SignUp, OTP validation
- **Shopping Module**: Product browsing, cart, wishlist, checkout
- **Profile Module**: User profile management, image upload
- **Navigation Module**: Drawer, tab, and stack navigation
- **State Management**: Redux store with slices for different features

## 🔧 Configuration

### API Endpoints
The app connects to backend services for:
- User authentication (`https://adminbackend.azurewebsites.net/mobile/1.1.1/`)
- Wishlist management
- Product data fetching

### Permissions
- Camera access for profile pictures
- Gallery access for image selection
- Network access for API calls

## 🐛 Troubleshooting

### Common Issues
1. **Metro bundler issues**: `npx react-native start --reset-cache`
2. **Android build issues**: `cd android && ./gradlew clean && cd .. && npx react-native run-android`
3. **iOS build issues**: `cd ios && pod install && cd .. && npx react-native run-ios`
4. **Permission issues**: Check AndroidManifest.xml for proper permission declarations

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Contributors to the open-source libraries used
- Modern e-commerce app design patterns

---

⭐ **This project demonstrates advanced React Native development practices and modern mobile app architecture.**
