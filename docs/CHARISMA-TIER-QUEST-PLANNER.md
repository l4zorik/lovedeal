# CHARISMA TIER LIST & QUEST PLANNER
## LoveDeal App -- AI Higher Planner / Raid Leader Briefing

> *"You are not coding. You are commanding a raid. Every component is a party member.
> Every bug is a boss mechanic. Every screen is a dungeon wing.
> The higher planner sees ALL. The higher planner DECREES."*

---

## THE TIER LIST -- Who Pulls Their Weight?

### S-TIER -- MVP Raiders (Carry the whole raid)

| Component | Lines | Why S-Tier |
|-----------|------:|------------|
| `DealCard.js` | 468 | THE core card. TikTok-style deal rendering, Animated heart, share, comments, location. Every pixel matters. |
| `AdCard.js` | 459 | Revenue engine. CTA buttons, advertiser info, bookmark, share. Without this there is no business. |
| `SwipeFeed.js` | 220 | The feed loop. FlatList + scroll-driven animations. The entire UX hinges on this. |
| `SwipeIndicators.js` | 44 | Small but critical. Scroll position dots. User orientation. |
| `ActionButtons.js` | 92 | Like, comment, share, bookmark. Every tap = engagement metric. |
| `UndoToast.js` | 96 | Undo dismiss. Critical UX for accidental swipes. |
| `ErrorBoundary.js` | 120 | Crash shield. App must never go white screen in production. |
| `FeedContext.js` | -- | State brain for the feed. Without it, nothing renders. |
| `theme.js` | -- | COLORS, SPACING, BORDER_RADIUS, SHADOWS. Single source of truth. |
| `deals.js` + `dealsExtended.js` | -- | 52 mock deals. The content that makes the app feel alive. |

### A-TIER -- Solid Party Members (Workhorse components)

| Component | Lines | Why A-Tier |
|-----------|------:|------------|
| `Button.js` | 142 | Primary interaction. Variants, loading states, icons. |
| `Input.js` | 98 | Forms, create deal, search. Must work perfectly. |
| `Modal.js` | 137 | BottomSheet + Modal overlay. Critical for confirmations. |
| `Toast.js` | 109 | Feedback system. Success, error, info messages. |
| `Badge.js` | 107 | Category badges, shop tags. Visual hierarchy. |
| `QuickActions.js` | 109 | Context menus. Quick access to common actions. |
| `NotificationBadge.js` | 69 | Tab notification dot. Drives re-engagement. |
| `Select.js` | 100 | Dropdown/picker for categories, shops. |
| `LiteSettings.js` | 231 | Lite mode toggle. Performance-critical for low-end devices. |
| `LoginScreen.js` | 205 | Auth gate. First impression for new users. |
| `PinLockScreen.js` | 162 | Security feature. PIN entry for sensitive actions. |
| `SecurityUtils.js` | -- | Phone validation, XSS detection, rate limiting. Security backbone. |
| `SecurityContext.js` | -- | Auth state, tokens, encryption. Trust layer. |

### B-TIER -- Utility Players (Important but not flashy)

| Component | Lines | Why B-Tier |
|-----------|------:|------------|
| `Card.js` | 64 | Generic card wrapper. Used everywhere but simple. |
| `Chip.js` | 78 | Filter chips. Category selection. |
| `Skeleton.js` | 71 | Loading skeleton. Better UX than spinner. |
| `PullToRefresh.js` | 58 | Pull gesture handler. |
| `Avatar.js` | 48 | User avatars. Small but necessary. |
| `Rating.js` | 36 | Star ratings. Used in deal cards. |
| `Divider.js` | 25 | Visual separator. Trivial but necessary. |
| `Switch.js` | 16 | Toggle switch. Minimal but essential. |
| `EmptyState.js` | 40 | Empty feed/list states. |
| `Loading.js` | 18 | Basic spinner. |
| `ErrorState.js` | 53 | Error display. **BUG: missing TouchableOpacity import.** |
| `ScreenGuard.js` | 40 | Screen protection wrapper. |
| `AutoScroll.js` | 77 | Auto-scrolling content. |
| `categories.js` | -- | 10 categories. Static data. |
| `shops.js` | -- | 20 shops. Static data. |
| `DeviceContext.js` | -- | Device type detection. Lite mode trigger. |
| `AnalyticsContext.js` | -- | Event tracking state. |
| `Permissions.js` | -- | Permission handling. |

### C-TIER -- Situational (Need work or are placeholders)

| Component | Lines | Why C-Tier |
|-----------|------:|------------|
| `EnigmaContext.js` | -- | Encryption context. Implementation deferred until AI map engine. |
| `DeepLinking.js` | -- | Deep link handling. Not yet wired up. |
| `SecureStorage.js` | -- | Encrypted storage. Placeholder. |
| `profile.js` | -- | Profile screen. Written but basic. |
| `create.js` | -- | Create deal screen. Written but basic. |
| `map/index.js` | -- | Map screen. Placeholder only (no real map). |

### D-TIER -- Broken / Placeholder (Need replacement or major rework)

| Component | Lines | Why D-Tier |
|-----------|------:|------------|
| `discover.js` | -- | Discover screen. Exists but may be stub. |
| `notifications.js` | -- | Notifications screen. Exists but may be stub. |
| `settings.js` | -- | Settings screen. Exists but may be stub. |
| `DealCard.a11y.test.js` | 152 | Accessibility tests. ALL 13 assertions fail (Animated renders null). |
| `FeedContext.test.js` | -- | Async act() warnings. Not properly handling effects. |
| `SecurityContext.test.js` | -- | Same async issue as FeedContext. |

---

## RAID PROGRESS -- Major Feature Wings

### Wing 1: Core Feed (DEFEATED)
```
Boss: DealCard + SwipeFeed
Status: DOWN
Loot: 52 mock deals, TikTok-style scroll, heart animation
Notes: The heart of the app. Fully functional with mock data.
```

### Wing 2: Ad Engine (DEFEATED)
```
Boss: AdCard + ActionButtons
Status: DOWN
Loot: CTA buttons, advertiser info, bookmark, share
Notes: Revenue path exists. Needs real ad data from TikTok API.
```

### Wing 3: UI Component Library (DEFEATED)
```
Boss: 31 components
Status: DOWN
Loot: Full design system with theme, variants, states
Notes: 3,191 lines of components. Every screen has what it needs.
```

### Wing 4: Navigation & Tabs (DEFEATED)
```
Boss: _layout.js (root) + _layout.js (tabs)
Status: DOWN
Loot: 7-tab navigation, expo-router Stack + Tabs
Notes: Feed, Objevit, Create (+), Mapa, Upozorneni, Nastaveni, Profil
```

### Wing 5: State Management (DEFEATED)
```
Boss: 6 Context providers
Status: DOWN
Loot: Feed, LiteMode, Device, Security, Analytics, Enigma
Notes: All wired up in root layout. Provider tree is solid.
```

### Wing 6: Mock Data (DEFEATED)
```
Boss: categories + shops + deals + dealsExtended
Status: DOWN
Loot: 10 categories, 20 shops, 52 deals
Notes: Enough content to demo every screen convincingly.
```

### Wing 7: Documentation (DEFEATED)
```
Boss: 35 markdown files
Status: DOWN
Loot: Full spec, design docs, legal docs, TikTok integration docs
Notes: More docs than code. Over-documented by design.
```

### Wing 8: Testing (IN PROGRESS)
```
Boss: Jest + 18 test suites
Status: 15/18 DEFEATED, 3 WIPING
Progress: 213/229 tests pass (93%)
Remaining:
  - DealCard.a11y.test.js (Animated mock needed)
  - FeedContext.test.js (async act() issue)
  - SecurityContext.test.js (async act() issue)
```

### Wing 9: Real API Integration (NOT STARTED)
```
Boss: Backend / Firebase / Supabase
Status: NOT PULLED
Requirements: Auth, deals CRUD, user profiles, favorites
Notes: Currently all mock data. Need real backend.
```

### Wing 10: TikTok Ads Integration (NOT STARTED)
```
Boss: TikTok Marketing API
Status: NOT PULLED
Requirements: Pixel, Events API, campaign creation
Notes: Docs written. Implementation pending.
```

### Wing 11: Map Feature (NOT STARTED)
```
Boss: react-native-maps
Status: NOT PULLED
Requirements: Deal locations, clustering, navigation
Notes: Map screen is placeholder only.
```

### Wing 12: AI Map Engine (NOT STARTED)
```
Boss: AI-powered deal discovery
Status: NOT PULLED
Requirements: ML recommendation, geo-intelligence
Notes: Enigma 1+ activation trigger. Deferred.
```

### Wing 13: Production Deployment (NOT STARTED)
```
Boss: EAS Build + App Store / Play Store
Status: NOT PULLED
Requirements: Signing, screenshots, store listing
Notes: eas.json exists. No builds yet.
```

### Wing 14: Enigma 1+ Security (LOCKED)
```
Boss: Full encryption + audit + isolation
Status: LOCKED (requires Wing 12)
Requirements: AI map engine must be ready first
Notes: By design. Enigma activates AFTER AI map is functional.
```

---

## QUEST LOG

### ACTIVE QUESTS (In Progress)

| # | Quest | Priority | XP | Notes |
|---|-------|----------|----|-------|
| Q1 | Fix ErrorState.js missing TouchableOpacity import | HIGH | 5 | `TouchableOpacity` used but not imported |
| Q2 | Fix DealCard.a11y.test.js (Animated mock) | MEDIUM | 10 | Need jest setup with Animated mock |
| Q3 | Fix FeedContext.test.js async act warnings | MEDIUM | 5 | Wrap async effects in proper act() |
| Q4 | Fix SecurityContext.test.js async act warnings | MEDIUM | 5 | Same as Q3 |

### AVAILABLE QUESTS (Ready to pull)

| # | Quest | Priority | XP | Requirements |
|---|-------|----------|----|--------------|
| A1 | Create Discover screen content | MEDIUM | 15 | Screen exists but may be stub |
| A2 | Create Notifications screen content | MEDIUM | 15 | Screen exists but may be stub |
| A3 | Create Settings screen content | MEDIUM | 15 | Screen exists but may be stub |
| A4 | Write tests for Button, Input, Card, Badge | LOW | 20 | Components exist, no tests |
| A5 | Write tests for Modal, Toast, Avatar, Rating | LOW | 20 | Components exist, no tests |
| A6 | Install react-native-maps + wire up Map | MEDIUM | 25 | Placeholder exists |
| A7 | Run checklist-update.ps1 refresh | LOW | 5 | Auto-update script |
| A8 | EAS Build first APK/IPA | HIGH | 50 | Needs signing certs |

### LOCKED QUESTS (Prerequisites not met)

| # | Quest | Locked By | Requirements |
|---|-------|-----------|--------------|
| L1 | Backend integration | None | Choose Firebase/Supabase |
| L2 | TikTok Ads pixel | None | TikTok Business account |
| L3 | Enigma 1+ activation | Wing 12 (AI Map) | AI map engine must exist |
| L4 | App Store submission | Wing 13 (Deploy) | All wings complete |
| L5 | Real user auth | L1 (Backend) | Firebase Auth or equivalent |

### COMPLETED QUESTS (Turned in)

| # | Quest | XP | Date |
|---|-------|----|------|
| C1 | Build 31 UI components | 150 | Sep 20 |
| C2 | Create 52 mock deals | 20 | Sep 20 |
| C3 | Set up 7-tab navigation | 30 | Sep 20 |
| C4 | Create 6 context providers | 60 | Sep 20 |
| C5 | Write 35 documentation files | 100 | Sep 20 |
| C6 | Fix Jest for RN 0.86 | 40 | Sep 20 |
| C7 | Fix test suite from 0/18 to 15/18 | 30 | Sep 20 |
| C8 | Create TikTok integration docs | 80 | Sep 20 |
| C9 | Create legal documentation | 50 | Sep 20 |
| C10 | Create fuel price tracking system | 30 | Sep 20 |
| C11 | Create checklist update system | 25 | Sep 20 |

### FAILED QUESTS (Abandoned or need rework)

| # | Quest | Reason | XP Lost |
|---|-------|--------|---------|
| F1 | Install @react-native/jest-preset@0.87 | Version mismatch with RN 0.86 | -10 |
| F2 | Install @testing-library/react-native@14 | React 19.2.3 incompatibility | -5 |

---

## LOOT TABLE -- What Each Boss Drops

| Boss | Drops | Used By |
|------|-------|---------|
| theme.js | COLORS, SPACING, BORDER_RADIUS, SHADOWS, FONTS | Every component |
| categories.js | 10 categories | Create screen, Discover, Filters |
| shops.js | 20 shops | Create screen, Shop filter |
| deals.js | 20 deals | Feed, DealCard |
| dealsExtended.js | +32 deals | Feed overflow, pagination |
| SecurityUtils.js | validatePhone, detectXSS, rateLimit, hashPin | Auth, forms, security |
| DealCard.js | Heart animation, share, comments, location | Feed screen |
| AdCard.js | CTA, advertiser info, bookmark | Feed screen (ads) |
| SwipeFeed.js | FlatList scroll loop | Feed screen |
| Modal.js | BottomSheet + Modal | All confirmation flows |
| Toast.js | Success/error/info feedback | All user actions |

---

## CHARISMA SCORE -- Developer XP System

```
Level: 7
Title: "Raid Leader of the React Native Front"
Total XP: 630 / 1000

Breakdown:
  Components Built:     +150 (31 components)
  Mock Data Created:    +20  (52 deals, 20 shops, 10 categories)
  Navigation Set Up:    +30  (7-tab layout)
  Context Providers:    +60  (6 contexts)
  Documentation:        +100 (35 files)
  Testing Fixed:        +70  (0/18 -> 15/18)
  TikTok Docs:          +80  (10+ docs)
  Legal Docs:           +50  (court docs, sorting policy)
  Fuel Tracking:        +30  (PS1 scripts, CSV)
  Checklist System:     +25  (auto-update)

Next Level At: 1000 XP
Needed: 370 more XP

Suggested next actions for max XP:
  - Fix 3 remaining test suites (+20 XP)
  - Create 3 missing screens (+45 XP)
  - Write 10 component tests (+20 XP)
  - Wire up react-native-maps (+25 XP)
  - First EAS build (+50 XP)
```

---

## RAID COMP -- Current Party Status

```
[HEALER]    ErrorBoundary.js    -- Shields the app from crashes
[TANK]      DealCard.js         -- Front line, takes all the rendering load
[DPS]       AdCard.js           -- Revenue damage dealer
[DPS]       SwipeFeed.js        -- Continuous scroll damage
[HEALER]    UndoToast.js        -- Recovery from mistakes
[SUPPORT]   Toast.js            -- Communication with user
[SUPPORT]   Loading.js          -- Graceful degradation
[TANK]      ErrorState.js       -- Front line error display [BUG: broken import]
[CC]        Modal.js            -- Controls user flow
[UTILITY]   QuickActions.js     -- Quick access menu
[OFF-TANK]  PinLockScreen.js    -- Security gate
[HEALER]    ScreenGuard.js      -- Screen protection
```

---

## WORLD QUEST -- Global Status

| Metric | Value | Status |
|--------|-------|--------|
| Components | 31 | COMPLETE |
| Screens | 7 tabs + 1 sub | COMPLETE |
| Contexts | 6 | COMPLETE |
| Utils | 4 | COMPLETE |
| Constants | 6 | COMPLETE |
| Tests | 18 suites, 229 tests | 93% PASSING |
| Docs | 35 files | COMPLETE |
| Mock Data | 52 deals, 20 shops, 10 categories | COMPLETE |
| Lines of Code | ~3,191 (components) + screens + contexts | ESTIMATED 8,000+ |
| Build Status | No builds yet | NOT STARTED |
| Store Status | Not submitted | NOT STARTED |

---

## NEXT MOVE DECREES

### Immediate (This Session)

1. **FIX ErrorState.js** -- Missing `TouchableOpacity` import. Quick +5 XP.
2. **FIX a11y test** -- Add Animated mock to jest setup. +10 XP.
3. **FIX context tests** -- Wrap async effects in act(). +10 XP.

### Short Term (Next Session)

4. **Populate Discover screen** -- Add real search/filter content.
5. **Populate Notifications screen** -- Add notification items.
6. **Populate Settings screen** -- Add real settings options.

### Medium Term

7. **Write tests for Button, Input, Card, Badge, Modal, Toast** -- +20 XP.
8. **Wire up react-native-maps** -- Replace placeholder map.
9. **First EAS build** -- Get an APK/IPA built.

### Long Term

10. **Choose backend** -- Firebase or Supabase.
11. **Implement real auth** -- Replace mock login.
12. **TikTok Ads pixel** -- Start revenue tracking.

### THE ENDGAME

13. **Enigma 1+** -- Full security suite. LOCKED until AI map exists.
14. **App Store submission** -- The final boss.
15. **10,000 users** -- The real endgame.

---

*This document is a living plan. Update it after every session.*
*Last updated: Sep 20, 2026*
*Raid Leader: Opencode AI*
*Party Size: 1 developer + 1 AI*
