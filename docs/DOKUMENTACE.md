# LoveDeal - Kompletni Dokumentace

## Obsah
1. Prehled projektu
2. TikTok analyza kvalit
3. Architektura
4. Opravene bugy
5. Platformy
6. Marketingovy system
7. Budouci funkce
8. Kreativni nastenka
9. Checklist technologii
10. Denni logovani
11. Sbirka zakonu
12. Prompt kniha
13. App design (Social + Swipe + AI)
14. TikTok jako nezavazna predloha
15. TikTok reklamni engine (technicky)
16. Enigma 1+ (technicky)
17. Checklist vyvoj plan
18. Zakladni checklist vyvoje (BEZ ENIGMY)
19. Podrobny checklist
20. Duse vyvojare
21. Auto-update checklist
22. ISO kontrola

---

## 1. Prehled projektu

**LoveDeal** je ceska mobilni aplikace inspirovana TikToker.
Kombinuje socialni feed s dealy a slevami.

- **Nazev:** LoveDeal
- **Verze:** 1.0.0
- **Package:** com.lovedeal.app
- **Framework:** React Native (Expo SDK 57)
- **Platformy:** Android, iOS, Web
- **Mateřská společnost:** MaxiGreens a.s.

### Klicove funkce
- TikTok-style swipe feed
- Kategorizovany discovery
- Ad card system
- Lite mod
- Haptic feedback
- Spinning disc animace

---

## 2. TikTok analyza kvalit

### Design
1. Plnoobrazkovy obsah (cely displej)
2. Minimalni UI (mene = vice)
3. Vertikalni swipe navigace
4. Prava strana - akcni panel
5. Spinning disc (hudba)

### Marketing
1. Algoritmus "For You"
2. In-Feed reklamy (nativni)
3. Viralita (sdileni, hashtags)
4. Gamifikace (likes, followers)

### Technika
1. Lazy loading (1-2 polozky)
2. Recyklovani komponent (FlatList)
3. Native animace (60 FPS)

---

## 3. Architektura

```
lovedeal-app/
├── app/
│   ├── _layout.js
│   ├── (tabs)/
│   │   ├── _layout.js
│   │   ├── index.js (Feed)
│   │   ├── discover.js
│   │   ├── create.js
│   │   ├── notifications.js
│   │   └── profile.js
│   ├── components/
│   │   ├── SwipeFeed.js
│   │   ├── DealCard.js
│   │   └── AdCard.js
│   ├── constants/
│   │   ├── theme.js
│   │   └── mockData.js
│   └── context/
│       └── LiteModeContext.js
├── platforms/
│   ├── android/README.md
│   ├── ios/README.md
│   └── web/README.md
├── docs/
│   ├── DOKUMENTACE.md
│   ├── KREATIVNI-NASTENKA.md
│   ├── CHECKLIST-TECHNOLOGII.md
│   ├── SBIRKA-ZAKONU.md
│   ├── UPDATE-LOG.md
│   ├── SCHEDULER.md
│   ├── auta/
│   │   └── ceny-pohonnych-hmot-zari2026.csv
│   ├── tiktok-ads-system.md
│   ├── tiktok-ad-formats.md
│   ├── tiktok-targeting.md
│   ├── tiktok-creative-best-practices.md
│   ├── tiktok-pixel-events-api.md
│   ├── tiktok-marketing-api.md
│   ├── tiktok-campaign-structure.md
│   ├── tiktok-metrics-reporting.md
│   └── lovedeal-tiktok-integration.md
├── app.json
├── eas.json
├── package.json
└── denni-logovani.ps1
```

---

## 4. Opravene bugy

### CRITICAL
- gradientBottom pruhledny -> rgba(0,0,0,0.6)
- Zadny fallback obrazku -> pridan onError + fallback
- newArchEnabled: false -> true

### HIGH
- isLite prop nepouzity -> pridana podminka pro haptics
- removeClippedSubviews=true pada na Android -> false

### MEDIUM
- ActionButton definovany ale nepouzity -> smazan
- gradientOverlay nepouzity -> smazan
- FONTS importovany ale nepouzity -> smazan z importu
- console.log v produkcni -> smazan

### LOW
- useEffect bez zavislosti spin -> pridan [spin]
- handleDoubleTap bez useCallback -> pridan

---

## 5. Platformy

### Android
- Min SDK: 24 (Android 7.0)
- Target SDK: 34 (Android 14)
- Build: APK (dev/preview), AAB (production)
- Podpis: keystore

### iOS
- Min: iOS 15
- Build: TestFlight (preview), App Store (production)
- Vy Apple Developer ucet

### Web
- Vercel / Netlify / GitHub Pages
- SPA mod (output: single)
- Favicon + meta tagy

---

## 6. Marketingovy system

### TikTok Ads integrace
1. **Tracking:** Pixel + Events API + App SDK
2. **Kampane:** In-Feed + Spark + Retargeting
3. **Targeting:** Broad -> Interest -> Custom -> Lookalike
4. **Creative:** UGC styl, hook-body-close, 3-5 variant
5. **Optimalizace:** A/B test, tydeni refresh

### Klicove metriky
- CPM < 50 CZK
- CPI < 25 CZK
- Like rate > 10%
- ROAS > 2.0

---

## 7. TikTok Lite režim

### Přepínání
- Flash ikona v headeru
- Lite badge vedle loga
- Automatické uložení preferencí

### Lite Config
- `animations: false` — vypne animace
- `haptics: false` — vypne vibration
- `parallax: false` — vypne parallax
- `spinningDisc: false` — vypne rotující disk
- `maxToRenderPerBatch: 1` — minimal render
- `windowSize: 1` — minimal memory
- `dataSaver: true` — úspora dat
- `offlineCache: true` — offline cache

### Full Config
- Plné animace + haptics
- Parallax + spinning disc
- Auto-advance po 8s
- Progress bar

---

## 8. Jesus Focus Plan — 9 kroků

### Krok 1: Infinite Scroll ✅
- `onEndReached` + `loadMore()`
- Shuffle + náhodné staty
- Ads injection každých 5 karet

### Krok 2: Parallax Animace ✅
- `scrollY` → `imageTranslateY`
- `rightBarTranslateX`
- `bottomInfoOpacity`

### Krok 3: Progress Bar ✅
- 8s auto-advance timer
- Progress bar nahoře
- Reset při interakci

### Krok 4: Haptic Chain ✅
- `selectionAsync` při scroll
- `impactAsync(Light)` po scroll
- `notificationAsync(Success)` při save
- `impactAsync(Medium)` při share
- `impactAsync(Heavy)` při double tap

### Krok 5: Ad Injection ✅
- `AD_FREQUENCY = 5`
- `injectAds()` funkce
- Unique impression IDs

### Krok 6: Share Sheet ✅
- Native `Share.share()`
- Deep link: `lovedeal://deal/{id}`
- CZ text sdílení

### Krok 7: Swipe Undo ✅
- `UndoToast` komponent
- 4s timeout
- Zpět tlačítko

### Krok 8: Personalization ✅
- `FeedContext` + `FeedProvider`
- `likedCategories` tracking
- `viewTime` tracking
- `sortDeals()` — scoring

### Krok 9: Performance ✅
- `React.memo()` na DealCard + AdCard
- `useCallback` na všechny handlery
- `maxToRenderPerBatch: 1` (lite)
- `windowSize: 1` (lite)

---

## 9. Budouci funkce

### Faze 2
- TikTok login
- Ukladani dealu (local storage)
- Push notifikace
- Komentare

### Faze 3
- Backend API
- Uzivatelske ucty
- placene deals
- Analytics

### Faze 4
- TikTok Ads plna integrace
- Spark Ads partnership
- AI-powered deal doporuceni
- Gamifikace (odmeny, Achievements)
