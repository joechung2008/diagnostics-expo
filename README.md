# diagnostics-expo

Azure Portal Extensions Dashboard implemented in React Native and Expo.

## Getting Started

**Note:** Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Prerequisites

- Node.js >= 22
- For iOS development: Xcode and CocoaPods
- For Android development: Android Studio and Android SDK
- For web development: A modern web browser

## Development Workflows

### Step 1: Install Dependencies

```bash
npm install
```

For iOS development, also install CocoaPods dependencies:

```bash
bundle install
bundle exec pod install
```

### Step 2: Start Metro (for Native Development)

```bash
npm start
```

### Step 3: Build and Run Your App

With Metro running (for native platforms), open a new terminal window/pane from the root of your project, and use one of the following commands to build and run your app:

#### Android

```bash
npm run android
```

#### iOS

```bash
npm run ios
```

#### Web

```bash
npm run web
```

This will start the Expo development server for web at `http://localhost:8081` (or the next available port).

### Step 4: Build for Production

#### Web Production Build

```bash
npm run build:web
```

This will create optimized production files in the `dist/` directory.

## Project Structure

```
├── app/                    # Main application code
│   ├── _layout.tsx         # Main app layout
│   └── (tabs)/             # Tab navigation
│       ├── _layout.tsx     # Tab layout
│       ├── build.tsx       # Build info page
│       ├── index.tsx       # Home page
│       ├── server.tsx      # Server info page
│       └── extensions/     # Extensions pages
│           └── [id].tsx    # Dynamic extension page
├── components/             # Shared React components
│   ├── AppContext.tsx
│   ├── BuildInfo.tsx
│   ├── Configuration.tsx
│   ├── Extension.tsx
│   ├── Extensions.tsx
│   ├── Header.tsx
│   ├── ServerInfo.tsx
│   ├── StageDefinition.tsx
│   └── ThemeContext.tsx
├── lib/                    # Utility libraries
│   ├── environment.ts
│   ├── theme.ts
│   ├── types.ts
│   └── utils.ts
├── assets/                 # Images and static assets
│   └── images/
├── package.json            # Project metadata and scripts
├── tsconfig.json           # TypeScript configuration
├── app.json                # Expo app configuration
└── README.md               # Project documentation
```

## Web-Specific Features

### React Native Web Integration

This project uses [React Native Web](https://necolas.github.io/react-native-web/) to run React Native components in the browser. Key features:

- Shared Codebase: Write once, run on iOS, Android, and Web
- Native Components: Use React Native components like `<View>`, `<Text>`, and `<ScrollView>` in the browser
- Platform-Specific Code: Use `Platform.OS` to detect the platform and render appropriate components

### Development Server

- Hot module replacement (HMR) for fast development
- Automatic browser refresh on code changes
- Source maps for debugging
- Optimized build for development

### Build Configuration

- Expo: Unified build system for iOS, Android, and Web
- TypeScript: Full TypeScript support for all platforms
- Metro: JavaScript bundler for React Native
- Babel: JavaScript transpilation for compatibility

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Start web development server
- `npm run build:web` - Build for web production
- `npm run check` - Run TypeScript type checking
- `npm run lint` - Run ESLint checks
- `npm run format` - Format code with Prettier

## Modifying Your App

This project uses [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing and navigation.

### Code Changes

Open files in the `app/` or `components/` directory in your text editor. Changes will automatically reload:

- Native (Android/iOS): Changes are reflected via Metro's Fast Refresh
- Web: Changes are reflected via Expo's Hot Module Replacement (HMR)

### Platform-Specific Code

To add platform-specific behavior:

```js
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific code
} else if (Platform.OS === 'ios') {
  // iOS-specific code
} else if (Platform.OS === 'android') {
  // Android-specific code
}
```

### Force Reload

- Android: Press `R` twice or select "Reload" from the Dev Menu (`Ctrl + M` on Windows/Linux, `Cmd ⌘ + M` on macOS)
- iOS: Press `R` in iOS Simulator
- Web: The browser will automatically reload on code changes

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

### Type Checking

```bash
npm run check
```

## Troubleshooting

### Common Issues

1. Metro Issues: Clear Metro cache with `npx react-native start --reset-cache`
2. iOS Build Issues: Ensure CocoaPods are installed with `bundle exec pod install`
3. Web Build Issues: Check that Node.js version is >= 22
4. TypeScript Issues: Run `npm run check` to check types

### Platform-Specific Troubleshooting

- Android: See [React Native Android Troubleshooting](https://reactnative.dev/docs/troubleshooting#android-specific)
- iOS: See [React Native iOS Troubleshooting](https://reactnative.dev/docs/troubleshooting#ios-specific)
- Web: Check browser console for errors and ensure all dependencies are installed

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Web Documentation](https://necolas.github.io/react-native-web/docs/)
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
