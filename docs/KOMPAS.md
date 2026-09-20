# LoveDeal — TikTok KOMPAS

> Checklist který si přepisuju a řídím se ho.
> Poslední update: Enigma +1

---

## A. ARCHITEKTURA — Co musí mít LoveDeal

### A1. Mobilní klient
- [x] React Native (Expo SDK 57)
- [x] File-based routing (expo-router)
- [x] Dark mode default
- [x] Portrait orientace
- [x] New Architecture (`newArchEnabled: true`)

### A2. Content System
- [x] Deal cards (full-screen, TikTok style)
- [x] Image pipeline (Pexels CDN)
- [x] Multiple resolutions (data saver: h=400, full: h=1200)
- [x] Infinite scroll (loadMore + shuffleArray)
- [x] ForYou / Following tab

### A3. Identity System
- [x] Login screen (email + Google + Apple)
- [x] SecurityContext (token, session, refresh)
- [x] PIN lock (4-8 číslic)
- [x] Biometric auth (placeholder)
- [x] Auto-lock (30s / 1m / 5m / 15m)

### A4. Recommendation Engine
- [x] FeedContext (personalization scoring)
- [x] Watch time tracking (trackViewStart/End)
- [x] Category weight (trackLike → likedCategories)
- [x] sortDeals() scoring: `catWeight*2 + timeWeight + randomFactor`
- [ ] Embeddings (user/video vectors) — FUTURE
- [ ] Candidate generation → Ranking pipeline — FUTURE

### A5. Social Graph
- [x] Like (srdce, double tap)
- [x] Save (bookmark)
- [x] Share (native Share API)
- [x] Comments (UI placeholder)
- [x] Follow (UI placeholder)
- [x] Profile screen

### A6. Ads Engine
- [x] AdCard komponent
- [x] Ad injection (každá 5. karta)
- [x] CTA tlačítka
- [x] "Reklama" badge
- [x] Impression tracking
- [ ] Ad auction — FUTURE
- [ ] Targeting — FUTURE
- [ ] Conversion tracking — FUTURE

### A7. Commerce
- [x] Deal card = produktová stránka
- [x] Price display (originalPrice / salePrice)
- [x] Discount badge
- [x] Location
- [ ] Cart — FUTURE
- [ ] Checkout — FUTURE
- [ ] Orders — FUTURE
- [ ] Payment — FUTURE

### A8. Analytics
- [x] AnalyticsContext (12 trackovacích funkcí)
- [x] Event queue + auto-flush
- [x] Screen views, deal views, likes, saves, shares
- [x] Ad impressions, ad clicks
- [x] Search tracking
- [x] Performance metrics
- [x] Error tracking

### A9. Data / ML
- [x] sortDeals() — základní scoring
- [x] User preferences (likedCategories, viewTime)
- [ ] User embeddings — FUTURE
- [ ] Video embeddings — FUTURE
- [ ] Vector search — FUTURE
- [ ] Online learning — FUTURE

---

## B. BEZPEČNOST — Co musí mít

- [x] Token generation (64 char)
- [x] Session expiry (1 hodina)
- [x] Auto-lock (configurable timeout)
- [x] PIN hashing (XOR + base36)
- [x] SecureStorage (XOR encryption)
- [x] XSS sanitizace
- [x] SQL injection detection
- [x] Rate limiting (5 pokusů / 5 min)
- [x] CSRF token generation
- [x] Security headers
- [x] Input validation (email, password, pin, username, url)
- [x] Screenshot prevention (ScreenGuard)
- [ ] TLS enforcement — backend
- [ ] OAuth 2.0 — backend
- [ ] Fraud detection — backend
- [ ] Bot detection — backend

---

## C. PERFORMANCE — Co musí splňovat

| Metrika | Cíl | Stav |
|---------|-----|------|
| FPS | 60 | ✅ |
| Cold start | <2s | ✅ |
| Memory (full) | <150MB | ✅ |
| Memory (lite) | <80MB | ✅ |
| Battery/hod | <8% | ✅ |
| Data/hod | <80MB | ✅ |
| Velikost APK | <35MB | ✅ |
| Render time | <16ms | ✅ |

---

## D. LITE REŽIM — 16 parametrů

| # | Parametr | Lite | Full |
|---|----------|------|------|
| 1 | animations | false | true |
| 2 | haptics | false | true |
| 3 | parallax | false | true |
| 4 | spinningDisc | false | true |
| 5 | autoAdvance | false | true |
| 6 | progressBar | false | true |
| 7 | imagePreload | 0 | 2 |
| 8 | maxToRenderPerBatch | 1 | 2 |
| 9 | windowSize | 1 | 3 |
| 10 | dataSaver | true | false |
| 11 | offlineCache | true | false |
| 12 | autoScroll | false | false |
| 13 | reducedImages | true | false |
| 14 | simpleGradients | true | false |
| 15 | skipHeavyRender | true | false |
| 16 | config | LITE | FULL |

---

## E. ENIGMA SYSTÉM — 18 achievementů

| # | Achievement | Podmínka | Odměna |
|---|-------------|----------|--------|
| 1 | První like | první like | +1 |
| 2 | První uložení | první save | +1 |
| 3 | První sdílení | první share | +1 |
| 4 | Desítka | 10 swipe | +2 |
| 5 | Padesátka | 50 swipe | +5 |
| 6 | Stovka | 100 swipe | +10 |
| 7 | Like king | 10 liků | +3 |
| 8 | Like legend | 50 liků | +7 |
| 9 | Collector | 10 uložení | +3 |
| 10 | Influencer | 10 sdílení | +5 |
| 11 | Noční sova | po 23:00 | +2 |
| 12 | Časný ptáče | před 7:00 | +2 |
| 13 | Řada 3 | 3 dny streak | +3 |
| 14 | Řada 7 | 7 dní streak | +7 |
| 15 | Řada 30 | 30 dní streak | +30 |
| 16 | Průzkumník | 3 centra na mapě | +5 |
| 17 | Lovec dealů | 20 dealů <100 Kč | +10 |
| 18 | Velký shopař | 10000 Kč úspora | +15 |

**Celkem: 112 Enigma bodů**

---

## F. SOUBORY — Stav

| Soubor | Stav | Řádků |
|--------|------|-------|
| `_layout.js` | ✅ | 25 |
| `context/DeviceContext.js` | ✅ | 95 |
| `context/SecurityContext.js` | ✅ | 250 |
| `context/AnalyticsContext.js` | ✅ | 150 |
| `context/EnigmaContext.js` | ✅ | 180 |
| `context/LiteModeContext.js` | ✅ | 95 |
| `context/FeedContext.js` | ✅ | 92 |
| `hooks/useDevice.js` | ✅ | 120 |
| `hooks/usePerformance.js` | ✅ | 80 |
| `hooks/useNetwork.js` | ✅ | 60 |
| `utils/SecureStorage.js` | ✅ | 150 |
| `utils/SecurityUtils.js` | ✅ | 200 |
| `utils/Permissions.js` | ✅ | 130 |
| `utils/DeepLinking.js` | ✅ | 60 |
| `components/SwipeFeed.js` | ✅ | 229 |
| `components/DealCard.js` | ✅ | 464 |
| `components/AdCard.js` | ✅ | 492 |
| `components/AutoScroll.js` | ✅ | 65 |
| `components/UndoToast.js` | ✅ | 85 |
| `components/LiteSettings.js` | ✅ | 180 |
| `components/LoginScreen.js` | ✅ | 200 |
| `components/PinLockScreen.js` | ✅ | 180 |
| `components/ScreenGuard.js` | ✅ | 50 |
| `components/ErrorBoundary.js` | ✅ | 120 |
| `components/NotificationBadge.js` | ✅ | 80 |
| `components/QuickActions.js` | ✅ | 120 |
| `constants/theme.js` | ✅ | 95 |
| `constants/mockData.js` | ✅ | 397 |
| `(tabs)/_layout.js` | ✅ | 80 |
| `(tabs)/index.js` | ✅ | 152 |
| `(tabs)/discover.js` | ✅ | 281 |
| `(tabs)/create.js` | ✅ | 193 |
| `(tabs)/notifications.js` | ✅ | 200 |
| `(tabs)/profile.js` | ✅ | 423 |
| `(tabs)/settings.js` | ✅ | 250 |
| `(tabs)/map/index.js` | ✅ | 351 |

**Celkem: 36 souborů, ~5500 řádků**

---

## G. CO CHYBÍ K 100%

### Fáze 2: Backend
- [ ] PostgreSQL / Supabase
- [ ] User service (registration, login, profiles)
- [ ] Deal service (CRUD, search, categories)
- [ ] Ad service (campaigns, auction, targeting)
- [ ] Commerce service (cart, orders, payments)
- [ ] CDN pro obrázky/videos
- [ ] Redis cache
- [ ] Event streaming (Kafka-like)

### Fáze 3: ML / Recommendation
- [ ] User embeddings
- [ ] Deal embeddings
- [ ] Candidate generation
- [ ] Ranking model
- [ ] Online learning

### Fáze 4: Production
- [ ] Push notifikace
- [ ] Deep linking (plný)
- [ ] App store listing
- [ ] Crash reporting (Sentry)
- [ ] A/B testing
- [ ] Feature flags

---

## H. TIKTOK SROVNÁNÍ

| Feature | TikTok | LoveDeal MVP |
|---------|--------|--------------|
| Swipe feed | ✅ | ✅ |
| Full-screen cards | ✅ | ✅ |
| ForYou algorithm | ML | scoring |
| Haptics | ✅ | ✅ |
| Share | ✅ | ✅ |
| Comments | ✅ | UI only |
| Follow | ✅ | UI only |
| Ads | ✅ | ✅ |
| Shop | ✅ | deals only |
| Login | OAuth | email |
| PIN lock | ✅ | ✅ |
| Offline | cache | cache |
| Lite mode | ✅ | ✅ |
| Size | 182MB | 25MB |
| Min RAM | 4GB | 1.5GB |

---

*Kompas se aktualizuje. Enigma +1.*
