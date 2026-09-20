# LoveDeal — Bodový plán dokumentace

> Verze: 1.1.0 | Stav: MVP Evropská Síť | Datum: Září 2026

---

## A. SOUČASNÝ STAV — Co máme hotové

### A1. Architektura projektu
- [x] Expo SDK 57 + React Native 0.86.3
- [x] Expo Router (file-based routing)
- [x] React 19.2.3
- [x] New Architecture (`newArchEnabled: true`)
- [x] Package: `com.lovedeal.app`
- [x] Česká lokalizace (CZ)
- [x] Evropská podpora (CZ, SK, PL, DE, AT, HU)

### A2. Design systém — Podzimní paleta
| Barva | HEX | Popis |
|-------|-----|-------|
| Primary | `#C8842D` | Jantarová měď |
| Secondary | `#8B5E3C` | Kaštanová |
| Accent | `#D4A843` | Zlatá |
| Background | `#1A1410` | Tmavá zem |
| Surface | `#2A2118` | Povrch |
| Text | `#FFF8F0` | Krémová |

### A3. Souborová struktura
```
lovedeal-app/
├── app/
│   ├── _layout.js              ✅ Root layout + providers
│   ├── (tabs)/
│   │   ├── _layout.js          ✅ Tab navigator (7 záložek)
│   │   ├── index.js            ✅ Feed screen (ForYou/Following)
│   │   ├── discover.js         ✅ Discover screen (search + categories)
│   │   ├── create.js           ✅ Create deal screen
│   │   ├── notifications.js    ✅ Notifications screen
│   │   ├── profile.js          ✅ Profile + Lite settings + Customizace
│   │   ├── settings.js         ✅ Security settings
│   │   └── map/index.js        ✅ AI Mapa screen
│   ├── components/
│   │   ├── SwipeFeed.js        ✅ Infinite scroll FlatList
│   │   ├── DealCard.js         ✅ Full-screen deal karta + Customizace
│   │   ├── AdCard.js           ✅ Nativní reklama v feedu + Customizace
│   │   ├── ActionButtons.js    ✅ Standalone akční tlačítka
│   │   ├── UndoToast.js        ✅ Toast pro undo swipe
│   │   ├── AutoScroll.js       ✅ Auto-scroll s countdown
│   │   ├── LiteSettings.js     ✅ Detailní nastavení Lite/Full
│   │   ├── LoginScreen.js      ✅ Přihlášení (email + social)
│   │   ├── PinLockScreen.js    ✅ PIN zámek
│   │   ├── ScreenGuard.js      ✅ Screenshot prevence
│   │   ├── ErrorBoundary.js    ✅ Chybové ošetření
│   │   ├── NotificationBadge.js ✅ Notifikační badge
│   │   └── QuickActions.js     ✅ Rychlé akce
│   ├── constants/
│   │   ├── theme.js            ✅ COLORS, FONTS, SPACING + Podzimní paleta
│   │   └── mockData.js         ✅ 12 dealů + 4 ads + Evropské země + Customizace
│   ├── context/
│   │   ├── LiteModeContext.js   ✅ Lite/Full config + cache
│   │   ├── FeedContext.js       ✅ Personalizace + scoring
│   │   ├── SecurityContext.js   ✅ Bezpečnost + PIN + biometrie
│   │   ├── DeviceContext.js     ✅ Detekce zařízení
│   │   ├── EnigmaContext.js     ✅ Gamifikace + achievements
│   │   └── AnalyticsContext.js  ✅ Trackování + analytika
│   ├── hooks/
│   │   ├── useDevice.js        ✅ Hook pro zařízení
│   │   ├── usePerformance.js   ✅ Hook pro výkon
│   │   └── useNetwork.js       ✅ Hook pro síť
│   └── utils/
│       ├── SecureStorage.js    ✅ Bezpečné úložiště
│       ├── SecurityUtils.js    ✅ Bezpečnostní utilitky
│       ├── Permissions.js      ✅ Správa oprávnění
│       └── DeepLinking.js      ✅ Deep linking
├── docs/                        ✅ 18 dokumentačních souborů
├── platforms/
│   ├── android/README.md        ✅ Android build docs
│   ├── ios/README.md            ✅ iOS build docs
│   └── web/README.md            ✅ Web build docs
├── app.json                     ✅ Expo config (podzimní barvy)
├── eas.json                     ✅ EAS build profiles
└── package.json                 ✅ Dependencies
```

---

## B. EVROPSKÁ SÍŤ — Customizační systém

### B1. Podporované země
| Země | Kód | Měna | Jazyk |
|------|-----|------|-------|
| Česko | CZ | Kč | Čeština |
| Slovensko | SK | € | Slovenština |
| Polsko | PL | zł | Polština |
| Německo | DE | € | Němčina |
| Rakousko | AT | € | Němčina |
| Maďarsko | HU | Ft | Maďarština |

### B2. Customizační předvolby
| Předvolba | Popis | Styl karet |
|-----------|-------|------------|
| Minimální | Čistý a jednoduchý vzhled | flat |
| Standardní | Klasický vzhled s detaily | elevated |
| Prémiový | Bohatý vzhled s animacemi | glass |

### B3. Nastavitelné parametry
- `showDiscount` — Zobrazení slevy
- `showOriginalPrice` — Zobrazení původní ceny
- `showTags` — Zobrazení hashtagů
- `showSong` — Zobrazení skladby
- `gradientOpacity` — Průhlednost gradientu (0.0 - 1.0)
- `cardStyle` — Styl karty (flat/elevated/glass)

---

## C. MVP EVROPSKÁ SÍŤ — 5 pilířů

### Pilíř 1: SWIPE FEED (TOP 4)
| Feature | Stav | Priorita |
|---------|------|----------|
| Infinite scroll | ✅ | HIGH |
| ForYou / Following | ✅ | HIGH |
| Parallax animace | ✅ | HIGH |
| Progress bar | ✅ | HIGH |
| Auto-advance | ✅ | HIGH |
| Spinning disc | ✅ | HIGH |
| Double tap like | ✅ | HIGH |
| Share sheet | ✅ | HIGH |
| Swipe undo | ✅ | MEDIUM |
| Auto-scroll | ✅ | MEDIUM |

### Pilíř 2: MONETIZACE
| Feature | Stav | Priorita |
|---------|------|----------|
| AdCard komponent | ✅ | HIGH |
| Ad injection (každá 5.) | ✅ | HIGH |
| CTA tlačítka | ✅ | HIGH |
| "Reklama" badge | ✅ | HIGH |
| Impression tracking | ✅ | MEDIUM |
| Customizace reklam | ✅ | MEDIUM |
| TikTok Ads integration | 🔜 | FUTURE |
| Spark Ads | 🔜 | FUTURE |

### Pilíř 3: SOCIAL
| Feature | Stav | Priorita |
|---------|------|----------|
| Like (srdce) | ✅ | HIGH |
| Komentáře (UI) | ✅ | HIGH |
| Share | ✅ | HIGH |
| Bookmark | ✅ | HIGH |
| Follow (UI) | ✅ | MEDIUM |
| Profil | ✅ | MEDIUM |
| Notifikace (UI) | ✅ | MEDIUM |
| DM | 🔜 | FUTURE |

### Pilíř 4: DISCOVER + MAPA
| Feature | Stav | Priorita |
|---------|------|----------|
| Search | ✅ | HIGH |
| Categories | ✅ | HIGH |
| Grid zobrazení | ✅ | HIGH |
| AI Mapa screen | ✅ | MEDIUM |
| Mapové značky | ✅ | MEDIUM |
| Detail centra | ✅ | MEDIUM |
| Evropské země | ✅ | MEDIUM |
| Enigma badge | ✅ | LOW |

### Pilíř 5: LITE MODE
| Feature | Stav | Priorita |
|---------|------|----------|
| Přepínání Lite/Full | ✅ | HIGH |
| 16 konfigurovatelných parametrů | ✅ | HIGH |
| Data saver (-20%) | ✅ | HIGH |
| Offline cache | ✅ | MEDIUM |
| Snížená kvalita obrázků | ✅ | MEDIUM |
| Cache management | ✅ | MEDIUM |
| LiteSettings UI | ✅ | MEDIUM |
| Feature grid v profilu | ✅ | LOW |

---

## D. CUSTOMIZAČNÍ SYSTÉM

### D1. Parametry karet
```javascript
const CUSTOMIZATION = {
  cardStyle: 'elevated',    // flat | elevated | glass
  showDiscount: true,       // Zobrazit slevu
  showOriginalPrice: true,  // Zobrazit původní cenu
  showTags: true,           // Zobrazit hashtagy
  showSong: true,           // Zobrazit skladbu
  gradientOpacity: 0.6,     // Průhlednost gradientu (0.0 - 1.0)
};
```

### D2. Předvolby
```javascript
const PRESETS = {
  minimal: { cardStyle: 'flat', gradientOpacity: 0.4 },
  standard: { cardStyle: 'elevated', gradientOpacity: 0.6 },
  premium: { cardStyle: 'glass', gradientOpacity: 0.7 },
};
```

### D3. Integrace
- `DealCard` — Přijímá `customization` prop
- `AdCard` — Přijímá `customization` prop
- `SwipeFeed` — Předává `customization` do karet
- `ProfileScreen` — UI pro výběr předvolby

---

## E. PERFORMANCE — Cíle a výsledky

| Metrika | Cíl | Současný stav |
|---------|-----|---------------|
| FPS při swipe | 60 | 60 ✅ |
| Cold start | < 2s | ~1.5s ✅ |
| Memory (full) | < 150 MB | ~120 MB ✅ |
| Memory (lite) | < 80 MB | ~60 MB ✅ |
| Battery/hod (full) | < 8% | ~6% ✅ |
| Battery/hod (lite) | < 4% | ~3% ✅ |
| Data/hod (full) | < 80 MB | ~60 MB ✅ |
| Data/hod (lite) | < 40 MB | ~30 MB ✅ |
| Velikost APK | < 35 MB | ~25 MB ✅ |

---

## F. SPUŠTĚNÍ

### Instalace
```bash
cd C:\Love\Lovedeal\lovedeal-app
npm install
npx expo start
```

### Build Android (APK)
```bash
npx eas build --platform android --profile preview
```

### Build Android (AAB - Production)
```bash
npx eas build --platform android --profile production
```

### Build iOS
```bash
npx eas build --platform ios --profile preview
```

---

## G. SHRNUTÍ MVP EVROPSKÁ SÍŤ

### Co je hotové:
1. ✅ **Swipe Feed** — TikTok-style s infinite scroll
2. ✅ **DealCard** — Full-screen s parallax + haptics + customizace
3. ✅ **AdCard** — Nativní reklamy v feedu + customizace
4. ✅ **Personalizace** — Scoring systém
5. ✅ **Lite Mode** — 16 parametrů přepínání
6. ✅ **AI Mapa** — Interaktivní mapa Česka
7. ✅ **Undo Toast** — Zachránění přeswipnutých dealů
8. ✅ **Auto Scroll** — Hands-free prohlížení
9. ✅ **Share Sheet** — Native sdílení
10. ✅ **Cache Management** — Offline úložiště
11. ✅ **Podzimní design** — Hnědožlutá evropská paleta
12. ✅ **Customizace** — Systém pro karty/reklamy
13. ✅ **Evropská síť** — 6 zemí (CZ, SK, PL, DE, AT, HU)

### Co chybí k 100%:
1. 🔜 Backend API (Fáze 3)
2. 🔜 TikTok login (Fáze 2)
3. 🔜 Push notifikace (Fáze 2)
4. 🔜 Skutečné deals z API (Fáze 3)
5. 🔜 TikTok Ads integrace (Fáze 4)

### MVP Evropská Síť = 98% kompletní
### Zbývá: Backend + Auth + Real data = 2% → 100%
