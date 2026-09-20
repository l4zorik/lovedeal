# LoveDeal - iOS Build Configuration

## Predpoklady
- macOS 13+
- Xcode 15+
- CocoaPods
- Apple Developer ucet ($99/rok)

## Build prikazy

### Development (zarizeni)
```bash
npx eas build --platform ios --profile development
```

### Preview (TestFlight)
```bash
npx eas build --platform ios --profile preview
```

### Production (App Store)
```bash
npx eas build --platform ios --profile production
```

## Lokalni build
```bash
npx expo prebuild --platform ios
cd ios
pod install
open LoveDeal.xcworkspace
```

## Apple Developer Setup
1. Vytvorte App ID: com.lovedeal.app
2. Vytvorte Provisioning Profile
3. Nastavte Signing v Xcode

## App Store Submission
1. Nahrajte build pres `eas submit --platform ios`
2. Nebo manualne pres App Store Connect
3. Vyplnte metadata, screenshots, popis
4. Odeslete ke kontrole

## Povoleni
- Camera: NSCameraUsageDescription
- Photo Library: NSPhotoLibraryUsageDescription  
- Microphone: NSMicrophoneUsageDescription
