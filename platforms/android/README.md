# LoveDeal - Android Build Configuration

## Predpoklady
- Android Studio (2023+)
- JDK 17
- Android SDK 34
- Gradle 8.4

## Build prikazy

### Development (APK)
```bash
npx eas build --platform android --profile development
```

### Preview (APK pro testovani)
```bash
npx eas build --platform android --profile preview
```

### Production (AAB pro Google Play)
```bash
npx eas build --platform android --profile production
```

## Lokalni build (bez EAS)
```bash
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```

## Nastaveni v app.json
```json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#000000",
        "foregroundImage": "./assets/icon.png"
      },
      "package": "com.lovedeal.app",
      "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE", "VIBRATE"]
    }
  }
}
```

## Podpis
- Debug: automaticky
- Release: vyzaduje keystore (vygenerujte pres `keytool` nebo Android Studio)
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore lovedeal.keystore -alias lovedeal -keyalg RSA -keysize 2048 -validity 10000
```

## Google Play Store
1. Vytvorte ucet na play.google.com/console
2. Vytvorte aplikaci s package: com.lovedeal.app
3. Nahrajte AAB soubor
4. Vyplnte store listing, screenshots, popis
5. Nastavte Ceny a distribuci
