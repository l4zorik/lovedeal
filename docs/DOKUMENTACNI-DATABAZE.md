# DOKUMENTAČNÍ DATABÁZE — 2 Úrovně (1+)

> Každý dokument je svázán se svým nadřazeným dokumentem.
> Úroveň 0 = základní docs. Úroveň 1 = detailní rozepsání (1+).

---

## Struktura

```
ÚROVEŇ 0 (základ)
├── Stručný přehled
├── Klíčové pojmy
├── Odkazy na 1+ docs
└── Status

ÚROVEŇ 1 (1+ detail)
├── Kompletní rozepsání
├── Příklady použití
├── Technické specifikace
├── Závislosti
└── Mezní hodnoty
```

---

## KATALOG DOKUMENTŮ

### 1. SWIPE FEED

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `components/SwipeFeed.js` | Nekonečný swipe feed |
| 1+ | Tento oddíl | Detail pool recyclingu, device tiers |

**1+ Detail:**
- **Pool recycling**: `seenIdsRef` trackuje zobrazené ID. Při překročení `maxPoolSize` se 1/3 starých ID odstraní.
- **Device tiers**: `getDeviceTier()` vrací `normal`/`lite`/`legacy` podle `Platform.Version` a `SCREEN_HEIGHT`.
- **Pool config**: `POOL_CONFIG.normal = { loadAhead: 5, recycleBeyond: 10, maxPoolSize: 80, batchLoad: 6 }`.
- **Memory limit**: Legacy zařízení = maxPoolSize 20, batchLoad 2, removeClippedSubviews=true.

---

### 2. LIVESTREAM

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `components/LivestreamCard.js` | Karta livestreamu |
| 1+ | Tento oddíl | Data model, horizontální vs vertikální |

**1+ Detail:**
- **Data model**: `{ id, title, streamer: { id, name, avatar, verified, followers }, status: 'live'|'upcoming', viewers, category, tags, deals[] }`
- **Horizontální**: Šířka 160px, výška 220px, thumb + overlay + badge
- **Vertikální**: Full-screen, side actions (heart, chat, share, follow)
- **Status**: `live` = červený badge, `upcoming` = zlatý badge s časem

---

### 3. ZABEZPEČENÍ

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `context/SecurityContext.js` | Auth + PIN + tokeny |
| 1+ | Tento oddíl | PBKDF2, SecureStore, auth gate |

**1+ Detail:**
- **PBKDF2**: 100K iterací, 32-byte salt, formát `salt:hash`
- **SecureStore**: `expo-secure-store` pro tokeny (Keychain/Keystore)
- **Auth gate**: `_layout.js` → `AuthGate` → login → pin → tabs
- **Token rotation**: `refreshSession()` generuje nový access token
- **Rate limiting**: 5 pokusů, 5min lockout (in-memory, bypassable restartem)

---

### 4. UI KOMPONENTY

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `components/*.js` | 37+ komponentů |
| 1+ | Tento oddíl | API, variants, props |

**1+ Detail:**
- **Button**: 5 variants (primary/secondary/outline/ghost/danger), haptic feedback
- **Badge**: 6 variants (primary/success/warning/danger/info/neutral), dot prop
- **Card**: Compound pattern (Header/Content/Footer)
- **Input**: Label, icon, error, multiline, character count
- **Modal**: Overlay + BottomSheet variant
- **Chip**: 3 variants (filled/outlined/compact), icon, selected state
- **DealCard**: Video/Image support, parallax, spinning disc, auto-advance
- **AdCard**: CTA button, impression tracking, song row

---

### 5. DATA

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `constants/*.js` | Mock data + formatters |
| 1+ | Tento oddíl | Struktura, formatování, validace |

**1+ Detail:**
- **DEALS**: 20 základních + 32 extended = 52 dealů
- **SHOPS**: 20 obchodů (Alza, Mall, Zoot, Bata, atd.)
- **CATEGORIES**: 10 kategorií (Jídlo, Elektronika, Móda, atd.)
- **USERS**: 5 profilů (CZ/SK)
- **LIVESTREAMS**: 5 streamů (live + upcoming)
- **formatPrice**: `cs-CZ` locale + " Kč" suffix
- **formatExpiry**: "Dnes", "Zítra", "X dní", "Vypršelo"
- **formatDistance**: "< 1km = X m", ">= 1km = X.X km"

---

### 6. NAVIGACE

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `(tabs)/_layout.js` | 7-tab layout |
| 1+ | Tento oddíl | Tab config, badge, gestures |

**1+ Detail:**
- **Tabs**: Feed, Objevit, +, Mapa, Upozornění, Nastavení, Profil
- **Badge**: Hardcoded=3 (čeká na notification state)
- **Create button**: 48x48, rounded, primary color, elevation 6
- **Double-swipe**: Left → Livestreams, Right → Settings
- **Gesture hints**: Animated opacity overlay

---

### 7. KONTEXTY

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `context/*.js` | 6 providerů |
| 1+ | Tento oddíl | State machine, callbacks |

**1+ Detail:**
- **SecurityContext**: isAuthenticated, currentUser, pinEnabled, biometricEnabled
- **FeedContext**: deals[], loading, pagination, refresh
- **LiteModeContext**: 8 toggles, presets (lite/full), cache management
- **DeviceContext**: dimensions, deviceType, orientation, safeAreaInsets
- **AnalyticsContext**: events[], trackEvent, trackScreen, trackSearch
- **EnigmaContext**: placeholder pro AI engine

---

### 8. TESTY

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `__tests__/*.test.js` | 30 suites, 290 tests |
| 1+ | Tento oddíl | Test coverage, patterns |

**1+ Detail:**
- **Components**: 14 test suites (ActionButtons, AdCard, Avatar, Badge, Button, Card, Chip, DealCard, Divider, EmptyState, ErrorBoundary, Input, Loading, Modal, NotificationBadge, QuickActions, Rating, Switch, UndoToast)
- **Context**: 6 test suites (Analytics, Device, Enigma, Feed, LiteMode, Security)
- **Data**: 1 test suite (mockData)
- **Utils**: 2 test suites (SecurityUtils, theme)
- **Visual**: 1 test suite (themeConsistency)
- **A11y**: 1 test suite (DealCard)
- **Snapshots**: 106 snapshots
- **Pattern**: `renderHook` + `act` pro kontexty, `create().toJSON()` pro komponenty

---

### 9. DOKUMENTACE

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `docs/*.md` | 40+ markdown souborů |
| 1+ | Tento oddíl | Kategorie, obsah, vazby |

**1+ Detail:**
- **Projektové**: APP-DESIGN, DOKUMENTACE, UPDATE-LOG, CHANGELOG
- **TikTok**: TIKTOK-PREDLOHA, 8 tiktok-*.md souborů
- **Bezpečnost**: DOOMSDAY-SECURITY, FAZE-5-6-MOBILNI-BEZPECNOST
- **Plánování**: PODROBNY-CHECKLIST, CHECKLIST-TECHNOLOGII, CHECKLIST-VYVOJ-PLAN
- **Meta**: POKUSOVA-DATABAZ, CHYTAK-PAMET, COMPONENT-BRIEF-SHOWCASE
- **Speciální**: SUPPORT-OLD-DEVICES, SOUDNI-DOKUMENTACE, SBIRKA-ZAKONU
- **Plánovací**: DOCU-WIDE-SPREAD, MONETIZACE, CHARISMA-TIER-QUEST-PLANNER

---

### 10. BUILD & DEPLOY

| Úroveň | Soubor | Popis |
|--------|--------|-------|
| 0 | `app.json`, `eas.json` | Konfigurace |
| 1+ | Tento oddíl | Build process, signing |

**1+ Detail:**
- **app.json**: Expo SDK 57, dark theme, deep linking, permissions
- **eas.json**: preview + production profiles
- **Signing**: Čeká na certifikáty
- **Dependencies**: expo-secure-store, expo-av, expo-crypto, expo-haptics
- **Dev server**: `npx expo start --android` + `adb reverse tcp:8081 tcp:8081`

---

## VZTAHY MEZI DOKUMENTY

```
SWIPE FEED ──→ DATA (DEALS, SHOPS, CATEGORIES)
    │
    ├──→ UI KOMPONENTY (DealCard, AdCard, LivestreamCard)
    │
    ├──→ KONTEXTY (FeedContext, LiteModeContext)
    │
    └──→ ZABEZPEČENÍ (SecurityContext pro auth gate)

LIVESTREAM ──→ DATA (LIVESTREAMS)
    │
    └──→ UI KOMPONENTY (LivestreamCard, LivestreamFeed)

NAVIGACE ──→ KONTEXTY (všechny)
    │
    ├──→ ZABEZPEČENÍ (auth gate)
    │
    └──→ UI KOMPONENTY (TabIcon, badge)

TESTY ──→ VŠECHNY MODULY
    │
    └──→ DOKUMENTACE (výsledky testů)
```

---

*„Dokumentace není nutné zlo. Je to mapa, která ti říká, kde jsi byl a kam jdeš."*
— LoveDeal Documentation System, 2026
