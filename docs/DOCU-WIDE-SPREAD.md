# DOCU WIDE SPREAD — LoveDeal Architektonická mapa

> Kompletní přehled všech větví, potenciálů, škálování a checkpointů.
> Tento dokument je **živý** — aktualizuje se s každou významnou změnou.

---

## 1. ARCHIVNÍ VĚTVE (postranní rozvinuté updaty)

Každá větev je samostatná feature, která se vyvinula z původního nápadu.

### 1.1 Větev SWIPE (nekonečný feed)

```
master ──┬── swipe-infinite-pool ──┬── pool-recycling
         │                         ├── device-tier-detection
         │                         ├── memory-auto-cleanup
         │                         └── debug-badge
         │
         ├── swipe-gesture ────────┬── double-swipe-left (livestreams)
         │                         ├── double-swipe-right (settings)
         │                         └── hint-animations
         │
         └── swipe-performance ────┬── removeClippedSubviews
                                   ├── windowSize-tuning
                                   └── maxToRenderPerBatch
```

### 1.2 Větev LIVESTREAM (živé přenosy)

```
master ──┬── livestream-data ──────┬── 5 streamů (MaxiGreens, Klára, TechDeals, StyleHunter, OutdoorMaster)
         │                         ├── live/upcoming status
         │                         └── deals-in-stream
         │
         ├── livestream-card ──────┬── horizontal (v feedu)
         │                         ├── vertical (plná obrazovka)
         │                         └── live badge + viewers
         │
         └── livestream-feed ──────┬── full-screen FlatList
                                   ├── side actions (heart, chat, share, cart)
                                   └── back navigation
```

### 1.3 Větev SECURITY (zabezpečení)

```
master ──┬── security-context ─────┬── PIN (SHA-256 + salt)
         │                         ├── auto-lock
         │                         ├── token refresh
         │                         └── biometrie placeholder
         │
         ├── doomsday-docs ────────┬── Sféra 0: Sklo (žádná ochrana)
         │                         ├── Sféra 1: Hlína (PIN + auto-lock) ✅
         │                         ├── Sféra 2: Kůže (biometrie + 2FA)
         │                         ├── Sféra 3: Kov (FIDO2 + cert pinning)
         │                         ├── Sféra 4: Oheň (RASP + AI + honeypot)
         │                         ├── Sféra 5: Zlato (post-quantum + decentralizace)
         │                         └── Sféra 6: Éter (teoretický kompass)
         │
         └── security-hardening ───┬── anti-tampering (root/jailbreak)
                                   ├── debugger detection
                                   └── secure wipe
```

### 1.4 Větev UI/UX (komponenty)

```
master ──┬── components-base ──────┬── Button, Badge, Card, Input, Switch, Avatar
         │                         ├── Rating, Divider, EmptyState, Loading
         │                         ├── Chip, Modal, BottomSheet
         │                         └── Toast, UndoToast
         │
         ├── components-business ──┬── DealCard (TikTok-style)
         │                         ├── AdCard (reklamy)
         │                         ├── LivestreamCard
         │                         ├── NotificationBadge
         │                         └── QuickActions
         │
         └── screens ──────────────┬── Feed (SwipeFeed + LiveBar)
                                   ├── Discover (search + categories + shops)
                                   ├── Create (form + category grid)
                                   ├── Profile (stats + tabs + grid)
                                   ├── Notifications (8 types + filters)
                                   ├── Settings (security toggles)
                                   ├── Map (placeholder)
                                   └── LivestreamFeed (full-screen)
```

### 1.5 Větev DATA (mock + konstanty)

```
master ──┬── mock-data ────────────┬── 52 deals (20 + 32 extended)
         │                         ├── 20 shops
         │                         ├── 10 categories
         │                         ├── 5 user profiles
         │                         └── 10+ ads
         │
         ├── livestream-data ──────┬── 5 livestreamů
         │                         └── deals-in-stream
         │
         └── formatting ───────────┬── formatPrice (cs-CZ)
                                   ├── formatExpiry
                                   ├── formatDistance
                                   ├── getCategoryColor
                                   └── formatNumber
```

### 1.6 Větev CONTEXT (stavový management)

```
master ──┬── feed-context ─────────┬── deals, loading, refresh
         │                         └── pagination
         │
         ├── security-context ─────┬── auth, PIN, token
         │                         └──生物识别 placeholder
         │
         ├── lite-mode-context ────┬── 8 toggle options
         │                         └── presets (lite/full)
         │
         ├── device-context ───────┬── dimensions, type, orientation
         │                         ├── safeAreaInsets
         │                         └── responsive + scale
         │
         ├── analytics-context ────┬── events, screen tracking
         │
         └── enigma-context ───────┬── placeholder pro AI map engine
```

### 1.7 Větev TESTS

```
master ──┬── unit-tests ───────────┬── 30 test suites
         │                         ├── 292 tests
         │                         └── 106 snapshots
         │
         └── test-categories ──────┬── components (14)
                                   ├── context (6)
                                   ├── data (1)
                                   ├── utils (2)
                                   ├── visual (1)
                                   └── a11y (1)
```

### 1.8 Větev DOCS (dokumentace)

```
master ──┬── project-docs ─────────┬── APP-DESIGN.md
         │                         ├── DOKUMENTACE.md
         │                         ├── UPDATE-LOG.md
         │                         └── CHANGELOG.md
         │
         ├── tiktok-docs ──────────┬── TIKTOK-PREDLOHA.md
         │                         ├── tiktok-ad-formats.md
         │                         ├── tiktok-ads-system.md
         │                         ├── tiktok-campaign-structure.md
         │                         ├── tiktok-creative-best-practices.md
         │                         ├── tiktok-marketing-api.md
         │                         ├── tiktok-metrics-reporting.md
         │                         ├── tiktok-pixel-events-api.md
         │                         └── tiktok-targeting.md
         │
         ├── security-docs ────────┬── DOOMSDAY-SECURITY.md
         │                         └── FAZE-5-6-MOBILNI-BEZPECNOST.md
         │
         ├── planning-docs ────────┬── PODROBNY-CHECKLIST.md
         │                         ├── CHECKLIST-TECHNOLOGII.md
         │                         ├── CHECKLIST-VYVOJ-PLAN.md
         │                         └── CHARISMA-TIER-QUEST-PLANNER.md
         │
         ├── meta-docs ────────────┬── POKUSOVA-DATABAZ.md
         │                         ├── CHYTAK-PAMET.md
         │                         ├── COMPONENT-BRIEF-SHOWCASE.md
         │                         └── TECHNICAL-MARKETING-LIST.md
         │
         └── special-docs ─────────┬── SUPPORT-OLD-DEVICES.md
                                   ├── SOUDNI-DOKUMENTACE.md
                                   ├── SBIRKA-ZAKONU.md
                                   ├── POLITIKA-RAZENI.md
                                   └── DENICEK-2026-09-20.md
```

---

## 2. ŠKÁLOVACÍ POTENCIÁLY

### 2.1 Horizontální škálování (funkce)

| Modul | Současný | Potenciál | Priorita |
|-------|----------|-----------|----------|
| Feed | SwipeFeed | AI personalizace, geo-filtrování | V1.0 |
| Livestream | 5 streamů | Neomezený, moderovaný | V1.5 |
| Mapa | Placeholder | Mapy.cz / Google Maps | V1.0 |
| Notifikace | Mock | Firebase FCM + scheduled | V1.5 |
| Profil | Stats | Badge systém, XP, úrovně | V2.0 |
| Chat | Neexistuje | Real-time messaging | V2.0 |
| Payments | Neexistuje | In-app nákup dealů | V3.0 |
| AI Engine | Neexistuje | Enigma 1+ (AI mapování) | V3.0+ |

### 2.2 Vertikální škálování (uživatelé)

| Úroveň | Uživatelé | Infrastruktura |
|--------|-----------|----------------|
| Alpha | 10-50 | Lokální mock data |
| Beta | 100-1K | Firebase (free tier) |
| V1.0 | 1K-10K | Supabase + CDN |
| V2.0 | 10K-100K | AWS/GCP + edge functions |
| V3.0 | 100K-1M | Microservices + k8s |
| V4.0 | 1M+ | Multi-region + sharding |

### 2.3 Škálování trhu (země)

```
Spuštění (2026-2027)
├── Česko (CZ) ─────────── primární trh
├── Slovensko (SK) ──────── druhý trh
└── Polsko (PL) ─────────── třetí trh

Expanze (2027-2028)
├── Německo (DE) ─────────── velký trh
├── Rakousko (AT) ────────── německy mluvící
└── Maďarsko (HU) ────────── V4

Expanze (2028+)
├── EU generický ─────────── všechny země EU
├── Balkán ────────────────── HR, SI, BG
└── Pobaltí ──────────────── LT, LV, EE
```

### 2.4 Škálování platformy

```
Mobil (2026)
├── iOS (Expo Go / EAS)
├── Android (Expo Go / EAS)
└── Web (expo-web)

Desktop (2027)
├── Electron wrapper
└── PWA

Wearable (2028)
├── Apple Watch (deal notifikace)
└── Wear OS (deal notifikace)

TV (2029?)
└── Android TV (livestream na TV)
```

---

## 3. ENIGMA 1+ (první skutečný 1+ vývoj)

### 3.1 Co je Enigma 1+

Enigma 1+ je **AI mapovací engine** pro LoveDeal. Ne jen klasické vyhledávání —
ale engine, který **rozumí kontextu** uživatele.

### 3.2 Fáze Enigma 1+

```
Fáze 0: Stub (současný stav)
├── EnigmaContext existuje
├── Žádná AI logika
└── Placeholder data

Fáze 1: Basic AI (Q1 2027)
├── NLP pro query parsing ("levné jídlo poblíž")
├── Semantic search (nejen keyword)
├── User preference learning
└── Basic recommendations

Fáze 2: Smart AI (Q3 2027)
├── Behavioral analysis (co uživatel kliká)
├── Time-based patterns (kdy nakupuje)
├── Social graph (co sledují přátelé)
└── Predictive deals ("bude sleva na X")

Fáze 3: Context AI (2028)
├── Location context (kde jsi, co děláš)
├── Weather integration (prší → kavárny)
├── Calendar integration (máš čas → výlet)
└── Mood detection (stres → wellness deals)

Fáze 4: Autonomous AI (2028+)
├── Auto-negotiation (AI vyjedná slevu)
├── Deal creation (AI navrhne nový deal)
├── Market analysis (co chybí v nabídce)
└── Cross-platform intelligence
```

### 3.3 Technologie Enigma 1+

| Komponenta | Technologie | Stav |
|-----------|-------------|------|
| NLP | GPT-4o / Claude | Plánováno |
| Vector DB | Pinecone / Weaviate | Plánováno |
| Embeddings | OpenAI / Cohere | Plánováno |
| Real-time | WebSocket | Plánováno |
| Edge | Cloudflare Workers | Plánováno |
| ML Pipeline | Python + FastAPI | Plánováno |

---

## 4. CHECKPOINTY VÝVOJE

### Checkpoint 0 — Založení (2026-09-20) ✅

```
Status: ✅ HOTovo
├── Projekt inicializován
├── 30 test suites, 292 tests, 106 snapshots
├── 37+ komponentů
├── 7 tabů s navigací
├── SwipeFeed s nekonečným scrollem
├── Livestreams (data + UI)
├── Double-swipe gesture
├── 5-tier legacy support
├── Doomsday Security filozofie
├── Pokusová databáze + Chyťák paměti
└── Commit: 1d27263
```

### Checkpoint 1 — MVP Beta (Q4 2026)

```
Status: ⚪ Nezačato
├── [ ] Firebase / Supabase backend
├── [ ] Opravdová registrace + login
├── [ ] Biometrie (Face ID / otisk)
├── [ ] Map screen (react-native-maps)
├── [ ] Push notifikace (FCM)
├── [ ] Backend pro deals (CRUD)
├── [ ] Upload fotek (camera / gallery)
├── [ ] User profile (opravdový)
├── [ ] Basic search (text)
└── [ ] EAS Build (iOS + Android)
```

### Checkpoint 2 — V1.0 Public (Q1 2027)

```
Status: ⚪ Nezačato
├── [ ] App Store + Google Play publish
├── [ ] 100 beta testerů
├── [ ] Monetizace (zobrazení)
├── [ ] TikTok pixel integration
├── [ ] Enigma 1+ Fáze 1 (NLP)
├── [ ] Semantic search
├── [ ] Geo-filtrování
├── [ ] Push notifikace (personalizované)
├── [ ] Offline cache
└── [ ] Performance monitoring (Sentry)
```

### Checkpoint 3 — V1.5 Growth (Q2-Q3 2027)

```
Status: ⚪ Nezačato
├── [ ] Livestream support (opravdový)
├── [ ] Chat (real-time)
├── [ ] Badge systém + XP
├── [ ] Social graph (follow/friends)
├── [ ] Share deals (deep links)
├── [ ] 10K uživatelů
├── [ ] SK + PL expansion
├── [ ] A/B testing framework
├── [ ] Analytics dashboard
└── [ ] Sponsor deals (brand partnerships)
```

### Checkpoint 4 — V2.0 Scale (Q4 2027)

```
Status: ⚪ Nezačato
├── [ ] Enigma 1+ Fáze 2 (behavioral AI)
├── [ ] Predictive deals
├── [ ] Payments (in-app)
├── [ ] Pro uživatelé (předplatné)
├── [ ] DE + AT expansion
├── [ ] 100K uživatelů
├── [ ] Microservices backend
├── [ ] Edge functions
├── [ ] A/B testing 2.0
└── [ ] Revenue: 50K EUR/měsíc
```

### Checkpoint 5 — V3.0 Empire (2028)

```
Status: ⚪ Nezačato
├── [ ] Enigma 1+ Fáze 3 (context AI)
├── [ ] Auto-negotiation
├── [ ] EU expansion (všechny země)
├── [ ] 1M uživatelů
├── [ ] Wearable apps
├── [ ] B2B portal (obchody)
├── [ ] API pro partnery
├── [ ] Revenue: 500K EUR/měsíc
└── [ ] Series A funding
```

### Checkpoint 6 — V4.0 Singularity (2029+)

```
Status: ⚪ Nezačato
├── [ ] Enigma 1+ Fáze 4 (autonomous AI)
├── [ ] AI deal creation
├── [ ] Cross-platform intelligence
├── [ ] 10M+ uživatelů
├── [ ] Global expansion
├── [ ] IPO readiness
└── [ ] Revenue: 5M+ EUR/měsíc
```

---

## 5. DEPENDENCY MAPA

```
Checkpoint 0 (současnost)
    │
    ├──→ Checkpoint 1 (MVP Beta)
    │    ├── Vyžaduje: Backend, Auth, Maps
    │    └── Blokuje: Všechny další
    │
    ├──→ Checkpoint 2 (V1.0)
    │    ├── Vyžaduje: C1 + Store publish
    │    ├── Vyžaduje: Monetizace
    │    └── Vyžaduje: Enigma Fáze 1
    │
    ├──→ Checkpoint 3 (V1.5)
    │    ├── Vyžaduje: C2 + 10K users
    │    ├── Vyžaduje: Livestream infra
    │    └── Vyžaduje: SK/PL expansion
    │
    ├──→ Checkpoint 4 (V2.0)
    │    ├── Vyžaduje: C3 + 100K users
    │    ├── Vyžaduje: Enigma Fáze 2
    │    └── Vyžaduje: Payments
    │
    ├──→ Checkpoint 5 (V3.0)
    │    ├── Vyžaduje: C4 + 1M users
    │    ├── Vyžaduje: Enigma Fáze 3
    │    └── Vyžaduje: EU expansion
    │
    └──→ Checkpoint 6 (V4.0)
         ├── Vyžaduje: C5 + 10M users
         └── Vyžaduje: Enigma Fáze 4
```

---

## 6. RIZIKA A MITIGACE

| Riziko | Pravděpodobnost | Dopad | Mitigace |
|--------|----------------|-------|----------|
| Google Play reject | 30% | Vysoký | Předbežná kontrola policy |
| Apple App Store reject | 25% | Vysoký | Testovat na reálných zařízeních |
| Firebase costs explodují | 20% | Střední | Budget alerts + caching |
| Enigma AI nefunguje | 40% | Střední | Fallback na basic search |
| Konkurence zkopíruje | 50% | Nízký | First-mover advantage |
| Kvantové počítače (2030+) | 5% | Extrémní | Post-quantum crypto (Sféra 5) |

---

*„Tento dokument je kompas. Ne mapa. Mapy se mění, kompas zůstává."*
— LoveDeal Architecture, 2026
