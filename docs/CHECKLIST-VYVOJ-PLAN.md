# LoveDeal - Checklist Technický Plán Vývoje

> 📋 Kompletní technický plán vývoje s Enigma 1+ a Ježice principy
> 🦔 Ježice: Kompaktní, ostražitý, adaptabilní
> 🔐 Enigma 1+: Šifrovaný, auditovaný, izolovaný

---

## 📊 PŘEHLED

| Fáze | Popis | Čas | Priorita |
|------|-------|-----|----------|
| 0 | Hotovo | 2026-09-20 | ✅ |
| 1 | Základní app | 1-2 týdny | ✅ |
| 2 | Funkce (deal, profil, mapa) | 2-3 týdny | 🟡 |
| 3 | AI + Social (základ) | 1-2 měsíce | 🟠 |
| 4 | **Enigma 1+** | 2-3 týdny | ⏳ NA KONEC |
| 5 | **AI Map Engine** | 2-3 týdny | ⏳ NA KONEC |

---

## ✅ FÁZE 0: HOTOVO (2026-09-20)

### Core
- [x] Expo SDK 57 setup
- [x] React Native 0.86.3
- [x] Expo Router
- [x] Tab navigace

### Komponenty
- [x] SwipeFeed (TikTok-style)
- [x] DealCard s parallax
- [x] AdCard (základní)
- [x] ActionButtons
- [x] UndoToast
- [x] AutoScroll
- [x] ErrorBoundary

### Funkce
- [x] Infinite scroll
- [x] Double tap like
- [x] Haptic feedback
- [x] Progress bar (8s)
- [x] Spinning disc
- [x] Lite mod

### Testy
- [x] 17 testů komponent
- [x] Visual consistency
- [x] A11y testy

### Dokumentace
- [x] DOKUMENTACE.md
- [x] PROMPT-KNIHA.md
- [x] APP-DESIGN.md
- [x] CHECKLIST-TECHNOLOGII.md

---

## ✅ FÁZE 1: ZÁKLAD + UI KOMPONENTY (1-2 týdny) ✅

### UI Komponenty (31 celkem)
- [x] Button
- [x] Badge
- [x] Card
- [x] Input
- [x] Switch
- [x] Avatar
- [x] Rating
- [x] Divider
- [x] EmptyState
- [x] Loading
- [x] Chip
- [x] Modal
- [x] DealCard (formátování cen, sleva badge, časová lhůta, kategorie badge, shop logo, distance)
- [x] AdCard
- [x] SwipeFeed
- [x] ActionButtons
- [x] UndoToast
- [x] AutoScroll
- [x] ErrorBoundary
- [x] Skeleton
- [x] PullToRefresh
- [x] CategoryBadge
- [x] ShopLogo
- [x] ExpiryCountdown
- [x] DistanceDisplay
- [x] PriceFormatter
- [x] DiscountBadge
- [x] RatingStars
- [x] UserAvatar
- [x] EmptyState
- [x] LoadingSkeleton

### Obrazovky (7 celkem)
- [x] Feed (TikTok-style)
- [x] Discover (vyhledávání, kategorie, sekce deals/obchody)
- [x] Create (formulář, kategorie grid, live sleva)
- [x] Map (placeholder pro react-native-maps)
- [x] Notifications (8 notifikací, filtry, unread tracking)
- [x] Settings
- [x] Profile (statistiky, hodnocení, online, tabs)

### Kontexty (6 celkem)
- [x] FeedContext
- [x] SecurityContext
- [x] LiteModeContext
- [x] DeviceContext
- [x] AnalyticsContext
- [x] EnigmaContext

### Utility
- [x] formatting.js (ceny, datumy, vzdálenosti)
- [x] Mock data: 52 deals, 20 obchodů, 10 kategorií, 5 uživatelů

### Testy
- [x] 30 test suites
- [x] 295 testů
- [x] 109 snapshotů
- [x] 100% pass rate

### Dokumentace
- [x] COMPONENT-BRIEF-SHOWCASE.md
- [x] TECHNICAL-MARKETING-LIST.md
- [x] PODROBNY-CHECKLIST (Fáze 1 + 2)

---

## 🔴 FÁZE 2: AD ENGINE (2-3 týdny)

### AdEngine Servis
- [ ] **AdEngine.js** - Core engine
  - [ ] getAdForUser()
  - [ ] filterByTargeting()
  - [ ] filterByFrequency()
  - [ ] rankAds()
  - [ ] logImpression()
  - [ ] logClick()

- [ ] **AdStore** - Databáze reklam
  - [ ] SQLite schema
  - [ ] CRUD operace
  - [ ] Sample data

### Targeting
- [ ] Základní targeting (věk, město)
- [ ] Frequency capping (3x denně)
- [ ] Time-based targeting
- [ ] Category matching

### Tracking
- [ ] Impression tracking
- [ ] Click tracking
- [ ] View time tracking
- [ ] localStorage logging

### UI
- [ ] AdCard vylepšení
- [ ] Ad badge "Ad"
- [ ] Clickthrough handling

### Testy
- [ ] AdEngine unit testy
- [ ] Frequency cap testy
- [ ] Targeting testy

---

## 🟡 FÁZE 3: SOCIAL + AI (1-2 měsíce)

### Social Media
- [ ] **SocialFeed.js**
  - [ ] Příspěvky uživatelů
  - [ ] Feed ranking
  - [ ] Infinite scroll

- [ ] **ProfileCard.js**
  - [ ] Avatar + bio
  - [ ] Followers/Following
  - [ ] Grid příspěvků

- [ ] **FollowButton.js**
  - [ ] Follow/Unfollow
  - [ ] Animace
  - [ ] State management

- [ ] **CommentSection.js**
  - [ ] Seznam komentářů
  - [ ] Odpovědi
  - [ ] Like na komentář

- [ ] **ShareSheet.js**
  - [ ] Native share
  - [ ] Social sítě
  - [ ] Kopírovat odkaz

- [ ] **SocialContext.js**
  - [ ] User state
  - [ ] Followers data
  - [ ] Posts data

### AI Toolbox
- [ ] **AgentPanel.js**
  - [ ] Seznam agentů
  - [ ] Agent status

- [ ] **Deal Hunter Agent**
  - [ ] Hledání deals
  - [ ] Doporučení

- [ ] **Price Tracker Agent**
  - [ ] Sledování cen
  - [ ] Historie cen

- [ ] **MapExplorer.js**
  - [ ] Zobrazení na mapě
  - [ ] Markery
  - [ ] Filtry

- [ ] **NastenkaBoard.js** (Google Keep)
  - [ ] Vytvoření karet
  - [ ] Drag & drop
  - [ ] Barvy/kategorie
  - [ ] Připnutí

### Swipe vylepšení
- [ ] Left swipe → Skip
- [ ] Right swipe → AI Toolbox panel
- [ ] Undo pro skip

---

## 🟠 FÁZE 4: MONETIZACE (3-4 měsíce)

### Platební brána
- [ ] Stripe integration
- [ ] Fakturační systém
- [ ] Subscription management

### Inzerenti
- [ ] Self-service portal
- [ ] Ad creation wizard
- [ ] Budget management
- [ ] Campaign analytics

### API
- [ ] Ads API pro inzerenty
- [ ] Webhook pro konverze
- [ ] Reporting API

### Správa
- [ ] Admin dashboard
- [ ] Ad moderation
- [ ] User management

---

## 🔵 FÁZE 5: ML + SKALING (6+ měsíců)

### ML Pipeline
- [ ] Feature engineering
- [ ] CTR model training
- [ ] CVR model training
- [ ] Real-time inference

### Pokročilý targeting
- [ ] Interest graph
- [ ] Lookalike audiences
- [ ] Behavioral targeting

### Attribution
- [ ] Click-through attribution
- [ ] View-through attribution
- [ ] Multi-touch attribution

### Skalování
- [ ] CDN pro kreativy
- [ ] Database sharding
- [ ] Cache optimalizace

---

## 📅 ČASOVÁ OSA

```
2026
├── Září (hotovo)
│   └── ✅ MVP, základní feed, 31 komponent, 295 testů
│
├── Říjen (Fáze 2)
│   └── 🔴 Ad Engine, targeting, tracking
│
└── Prosinec (Fáze 3 start)
    └── 🟡 Social media, AI toolbox

2027
├── Leden (Fáze 3 dokončení)
│   └── 🟡 Social, AI, swipe vylepšení
│
├── Únor (Fáze 4 start)
│   └── 🟠 Monetizace, platební brána
│
├── Březen (Fáze 4)
│   └── 🟠 Inzerenti, API, admin
│
└── Q2+ (Fáze 5)
    └── 🔵 ML, pokročilý targeting
```

---

## 📊 METRIKY ÚSPĚŠNOSTI

### Fáze 0-1 (Q3 2026) ✅
| Metrika | Cíl | Stav |
|---------|-----|------|
| UI komponenty | 31 | ✅ 31 |
| Obrazovky | 7 | ✅ 7 |
| Kontexty | 6 | ✅ 6 |
| Testy | 200+ | ✅ 295 |
| Pass rate | 100% | ✅ 100% |

### Fáze 2 (Q4 2026)
| Metrika | Cíl |
|---------|-----|
| Ad Engine funguje | ✅ |
| Tracking funguje | ✅ |
| Test coverage | 70% |

### Fáze 3 (Q1 2027)
| Metrika | Cíl |
|---------|-----|
| DAU | 1,000 |
| Social interactions | 10k/měsíc |
| AI agent využití | 5% uživatelů |

### Fáze 4 (Q2 2027)
| Metrika | Cíl |
|---------|-----|
| MRR | 50,000 CZK |
| Inzerenti | 10 |
| CPM | 80-120 CZK |

---

## 🦔 JEŽICE CHECKLIST

### Před každým commitem
- [x] Kód je kompaktní (málo řádků)
- [x] Žádné hardcoded hodnoty
- [x] Error handling přidán
- [x] Testy prochází
- [x] Lite mode otestován

### Před každým release
- [ ] Enigma 1+ kontroly
- [ ] Performance test
- [ ] Security audit
- [ ] Documentation update

---

## 🔐 ENIGMA 1+ CHECKLIST

### Před implementací
- [ ] Identifikuj citlivá data
- [ ] Vyber šifrovací algoritmus
- [ ] Navrhni key management
- [ ] Definuj access control

### Při implementaci
- [ ] Používej AES-256
- [ ] Validuj vstupy
- [ ] Loguj akce
- [ ] Chraň tokeny

### Po implementaci
- [ ] Otestuj šifrování
- [ ] Otestuj dešifrování
- [ ] Otestuj key rotation
- [ ] Audituj logy

---

> 📅 Poslední aktualizace: 2026-09-20
> 👤 Autor: MaxiGreens a.s.
> 🦔 Ježice: Kompaktní, ostražitý, adaptabilní
> 🔐 Enigma 1+: Šifrovaný, auditovaný, izolovaný
