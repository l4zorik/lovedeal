# TikTok Lite vs LoveDeal — Srovnání parametrů

## Přehled

| Parametr | TikTok | TikTok Lite | LoveDeal Full | LoveDeal Lite |
|----------|--------|-------------|---------------|---------------|
| **Velikost app** | 182 MB | 30 MB | ~40 MB | ~25 MB |
| **Min RAM** | 4 GB | 2 GB | 3 GB | 1.5 GB |
| **Data saver** | ne | -20% | ne | -20% |
| **Offline cache** | ne | ano | ne | ano |
| **Auto-scroll** | ne | ano | ne | ano |

---

## Features porovnání

### 1. Feed Mechanism

| Feature | TikTok | TikTok Lite | LoveDeal |
|---------|--------|-------------|----------|
| Swipe feed | ✅ | ✅ | ✅ |
| For You algorithm | ✅ | ✅ | ✅ |
| Following feed | ✅ | ✅ | ✅ |
| Infinite scroll | ✅ | ✅ | ✅ |
| Auto-advance | ✅ | ✅ | ✅ |
| Progress bar | ✅ | ✅ | ✅ |

### 2. Animace

| Feature | TikTok | TikTok Lite | LoveDeal Full | LoveDeal Lite |
|---------|--------|-------------|---------------|---------------|
| Parallax | ✅ | ❌ | ✅ | ❌ |
| Heart animace | ✅ | zjednodušená | ✅ | ❌ |
| Spinning disc | ✅ | ❌ | ✅ | ❌ |
| Spring animace | ✅ | ❌ | ✅ | ❌ |
| Gradient přechody | ✅ | zjednodušené | ✅ | zjednodušené |

### 3. Haptics

| Feature | TikTok | TikTok Lite | LoveDeal Full | LoveDeal Lite |
|---------|--------|-------------|---------------|---------------|
| Vibration feedback | ✅ | ❌ | ✅ | ❌ |
| Impact styles | 3 | 0 | 3 | 0 |
| Notification feedback | ✅ | ❌ | ✅ | ❌ |

### 4. Performance

| Feature | TikTok | TikTok Lite | LoveDeal Full | LoveDeal Lite |
|---------|--------|-------------|---------------|---------------|
| maxToRenderPerBatch | 3 | 1 | 2 | 1 |
| windowSize | 5 | 2 | 3 | 1 |
| removeClippedSubviews | true | false | false | false |
| Image preload | 3 | 0 | 2 | 0 |
| Lazy loading | ✅ | ✅ | ✅ | ✅ |

### 5. Sharing

| Feature | TikTok | TikTok Lite | LoveDeal |
|---------|--------|-------------|----------|
| Native share | ✅ | ✅ | ✅ |
| Deep links | ✅ | ✅ | ✅ |
| Copy link | ✅ | ✅ | ✅ |
| Social share | ✅ | ✅ | ✅ |

### 6. Offline

| Feature | TikTok | TikTok Lite | LoveDeal Lite |
|---------|--------|-------------|---------------|
| Cache videí | ✅ | ✅ | ✅ |
| Offline viewing | ✅ | ✅ | ✅ |
| Auto-cache | ❌ | ✅ | ✅ |

---

## LoveDeal Lite Config

```javascript
const LITE_CONFIG = {
  animations: false,        // Vypne všechny animace
  haptics: false,           // Vypne vibration
  parallax: false,          // Vypne parallax efekt
  spinningDisc: false,      // Vypne rotující disk
  autoAdvance: false,       // Vypne auto-advance
  progressBar: false,       // Vypne progress bar
  imagePreload: 0,          // Žádný preload obrázků
  maxToRenderPerBatch: 1,   // Minimální render
  windowSize: 1,            // Minimální okno
  dataSaver: true,          // Úspora dat
  offlineCache: true,       // Offline cache
  autoScroll: false,        // Auto-scroll
  reducedImages: true,      // Snížená kvalita obrázků
  simpleGradients: true,    // Zjednodušené gradienty
  skipHeavyRender: true,    // Přeskočit heavy render
};
```

---

## LoveDeal Full Config

```javascript
const FULL_CONFIG = {
  animations: true,         // Plné animace
  haptics: true,            // Plné haptics
  parallax: true,           // Parallax efekt
  spinningDisc: true,       // Rotující disk
  autoAdvance: true,        // Auto-advance po 8s
  progressBar: true,        // Progress bar
  imagePreload: 2,          // Preload 2 obrázků
  maxToRenderPerBatch: 2,   // Standardní render
  windowSize: 3,            // Standardní okno
  dataSaver: false,         // Žádný data saver
  offlineCache: false,      // Žádný offline cache
  autoScroll: false,        // Auto-scroll
  reducedImages: false,     // Plná kvalita
  simpleGradients: false,   // Plné gradienty
  skipHeavyRender: false,   // Plný render
};
```

---

## Přepínání mezi režimy

### UI Indikátory
- **Lite badge** vedle loga "LoveDeal"
- **Flash ikona** v headeru (žlutá = lite, šedá = full)
- **Automatická detekce** při prvním spuštění

### Uložení preferencí
- `AsyncStorage` pro persistenci
- Okamžité přepnutí bez reloadu
- automatická detekce zařízení

---

## TikTok Lite parametry (z Google Play)

1. **Data Saver**: -20% spotřeba dat
2. **Smaller App**: 30 MB vs 182 MB
3. **Faster Performance**: Low-RAM devices
4. **Offline Mode**: Cache videos
5. **Reduced Load Times**: Streamlined design
6. **No e-commerce**: Čistý feed
7. **Auto Scroll**: Hands-free viewing
8. **Hashtag Discovery**: Tap hashtags
9. **Favorites & Downloads**: Save for later
10. **Share Everywhere**: Instagram, Facebook, WhatsApp
11. **Easy Video Creation**: 3-min videos
12. **Direct Messaging**: Chat
13. **Privacy Control**: Who can view/comment

---

## LoveDeal implementace

| TikTok Lite Feature | LoveDeal Implementace |
|---------------------|----------------------|
| Data Saver | `config.dataSaver` + snížená kvalita |
| Smaller App | Optimalizace + tree-shaking |
| Faster Performance | `maxToRenderPerBatch: 1` |
| Offline Mode | `cacheImage()` + `isImageCached()` |
| Auto Scroll | `AutoScroll` komponent |
| Hashtags | Tags v DealCard |
| Favorites | Bookmark tlačítko |
| Share | Native Share API |
| Privacy | Budoucí feature |

---

## Metriky

| Metrika | TikTok Lite | LoveDeal Lite cíl |
|---------|-------------|-------------------|
| Cold start | < 2s | < 2s |
| Memory usage | < 80 MB | < 60 MB |
| Battery/hod | < 5% | < 4% |
| Data/hod | < 50 MB | < 40 MB |
| FPS | 60 | 60 |
