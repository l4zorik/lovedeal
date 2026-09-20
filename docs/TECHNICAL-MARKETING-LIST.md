# LOVEDEAL TECHNICAL MARKETING LIST
## For Power-User Specification Lovers & Technical Decision Makers

---

## APP IDENTITY

| Field | Value |
|-------|-------|
| Name | LoveDeal |
| Package | com.lovedeal.app |
| Version | 1.0.0 |
| Parent Company | MaxiGreens a.s. |
| Framework | React Native 0.86.3 + Expo SDK 57 |
| Navigation | Expo Router (Stack + Tabs) |
| Language | JavaScript (ES2022+) |
| Target Platforms | iOS 15+, Android 10+ |
| Build System | EAS Build |

## COMPONENT LIBRARY (31 components, 4,397 lines)

| Component | Lines | Haptics | Animations | Memo |
|-----------|------:|:-------:|:----------:|:----:|
| DealCard | 509 | Yes | Yes | Yes |
| AdCard | 498 | Yes | Yes | Yes |
| SwipeFeed | 246 | Yes | Yes | No |
| LiteSettings | 243 | No | No | No |
| LoginScreen | 218 | No | No | No |
| PinLockScreen | 176 | Yes | Yes | No |
| Button | 148 | Yes | No | No |
| Modal + BottomSheet | 142 | No | Yes | No |
| ErrorBoundary | 127 | No | No | No |
| Toast + ToastContainer | 120 | No | Yes | No |
| QuickActions | 114 | No | No | No |
| Badge | 112 | No | No | No |
| ActionButtons | 102 | Yes | No | No |
| Select | 105 | No | No | No |
| Input | 101 | No | No | No |
| UndoToast | 103 | No | Yes | No |
| AutoScroll | 87 | Yes | No | No |
| Chip | 82 | No | No | No |
| Skeleton + SkeletonCard | 76 | No | Yes | No |
| NotificationBadge | 77 | No | No | No |
| Card (compound) | 70 | No | No | No |
| PullToRefresh | 64 | No | No | No |
| Avatar | 51 | No | No | No |
| SwipeIndicators | 48 | No | Yes | No |
| ScreenGuard | 47 | No | No | No |
| EmptyState | 42 | No | No | No |
| Rating | 38 | No | No | No |
| Divider | 27 | No | No | No |
| ErrorState | 55 | No | No | No |
| Loading | 20 | No | No | No |
| Switch | 17 | No | No | No |

## DESIGN TOKENS

### Color Palette (Autumn Amber Theme)

| Token | Hex | Usage |
|-------|-----|-------|
| primary | #C8842D | CTAs, active states, tab highlights |
| primaryDark | #A66B1F | Pressed states, gradients |
| secondary | #8B5E3C | Secondary actions, backgrounds |
| accent | #D4A843 | Stars, ratings, premium badges |
| success | #6B8E23 | Success states, verified badges |
| warning | #DAA520 | Warnings, half-stars |
| danger | #C0392B | Errors, destructive actions |
| background | #1A1410 | App background (dark mode) |
| surface | #2A2118 | Card backgrounds |
| text | #FFF8F0 | Primary text (warm white) |

### Spacing Scale: 4 / 8 / 12 / 16 / 20 / 24 / 32px
### Border Radius: 6 / 10 / 16 / 20 / 9999px (pill)
### Shadows: sm (elevation 2) / md (elevation 5) / lg (elevation 10)

## SCREEN ARCHITECTURE (7 tabs + 1 sub)

| Screen | Tab Icon | Purpose |
|--------|----------|---------|
| Feed | flame | TikTok-style vertical swipe deal cards |
| Discover | compass | Search, filters, categories |
| Create (+) | add-circle | Deal creation form |
| Map | map | Location-based deals |
| Notifications | notifications | Push notification list |
| Settings | settings | App configuration |
| Profile | person | User profile, stats |

## STATE MANAGEMENT (6 Contexts)

| Context | Lines | Purpose |
|---------|------:|---------|
| FeedContext | 92 | Feed preferences, scoring, dismiss tracking |
| SecurityContext | 292 | Auth, PIN, biometrics, session, encryption |
| LiteModeContext | -- | Performance mode, 8 toggleable settings |
| DeviceContext | -- | Device type detection, auto-lite trigger |
| AnalyticsContext | -- | Event tracking, user behavior analytics |
| EnigmaContext | -- | Encryption, audit, isolation (LOCKED) |

## MOCK DATA

| Dataset | Records |
|---------|---------|
| Categories | 10 |
| Shops | 20 |
| Deals (base) | 20 |
| Deals (extended) | +32 |
| Total deals | 52 |

## SECURITY FEATURES

| Feature | Status |
|---------|--------|
| Phone validation (E.164) | ACTIVE |
| XSS detection (6 patterns) | ACTIVE |
| Rate limiting (sliding window) | ACTIVE |
| PIN hashing (charCodeAt) | ACTIVE |
| Token generation (UUID) | ACTIVE |
| Session expiry (1h TTL) | ACTIVE |
| Input sanitization | ACTIVE |
| Screenshot protection | ACTIVE |
| Biometric auth | PLACEHOLDER |
| Secure storage | PLACEHOLDER |
| Enigma 1+ (full encryption) | LOCKED |

## ANIMATIONS MAP

| Animation | Component | Trigger |
|-----------|-----------|---------|
| Heart scale | DealCard, AdCard | Double-tap |
| Parallax | DealCard, AdCard | Scroll |
| Spinning disc | DealCard, AdCard | Song playing |
| Progress bar | AdCard | Auto-advance (8s) |
| Shake | PinLockScreen | Wrong PIN |
| Fade + slide | Toast | Show/hide |
| Spring translateY | UndoToast | Dismiss undo |
| Opacity pulse | Skeleton | Loading state |
| Scroll indicators | SwipeIndicators | Swipe direction |

## HAPTICS MAP

| Haptic | Component | Trigger |
|--------|-----------|---------|
| Heavy | DealCard, AdCard | Double-tap like |
| Light | Button, AutoScroll, SwipeFeed | Press, scroll |
| Medium | ActionButtons, DealCard | Comment, share |
| Success | ActionButtons, SwipeFeed | Save, like |
| Selection | SwipeFeed | Batch load |
| Vibration (200ms) | PinLockScreen | Wrong PIN |

## AD ENGINE

| Feature | Detail |
|---------|--------|
| Ad injection rate | 1 ad per 5 deals |
| CTA handling | Linking.openURL(ctaUrl) |
| Impression tracking | impressionId field |
| Advertiser info | Name + business icon |
| Ad label | "Reklama" badge with megaphone |
| Progress bar | Auto-advance timer (8s) |
| Bookmark | Save ads for later |
| Share | Share.share() with deal data |

## TIKTOK-STYLE FEED SPECS

| Feature | Detail |
|---------|--------|
| Swipe direction | Vertical (up/down) |
| Paging | Full-screen snap |
| Card style | Full-screen image + gradient overlay |
| Action bar | Right-side vertical buttons |
| Bottom info | Brand, title, description, tags, song |
| Undo dismiss | 4s auto-dismiss toast |
| Auto-scroll | 8s countdown toggle |
| Shuffle | Randomized feed order |
| Batch loading | 5 items per batch |
| Lite mode delay | 300ms (vs 600ms full) |

## EUROPEAN MARKET

| Country | Flag Code |
|---------|-----------|
| Czech Republic | CZ |
| Slovakia | SK |
| Poland | PL |
| Germany | DE |
| Austria | AT |
| Hungary | HU |
| EU (generic) | EU |

## INTEGRATION STATUS

| Integration | Status |
|-------------|--------|
| TikTok Pixel | PLANNED |
| TikTok Events API | PLANNED |
| TikTok Campaign Structure | PLANNED |
| TikTok Ad Formats | PLANNED |
| TikTok Targeting | PLANNED |
| TikTok Creative Best Practices | PLANNED |
| TikTok Marketing API | PLANNED |
| TikTok Metrics Reporting | PLANNED |
| Fuel Price Tracking (PowerShell) | ACTIVE |
| Firebase/Supabase Backend | NOT STARTED |
| react-native-maps | NOT STARTED |
| EAS Build | CONFIGURED (no builds yet) |

## TEST SUITE

| Metric | Value |
|--------|-------|
| Framework | Jest + jest-expo |
| Test suites | 18 |
| Total tests | 226 |
| Passing | 226 (100%) |
| Snapshots | 40 |
| Coverage areas | components, contexts, utils, data, visual, a11y |

## DOCUMENTATION (35 files)

| Category | Count |
|----------|-------|
| Core design | 3 |
| TikTok integration | 10 |
| Checklists | 4 |
| Security | 2 |
| Legal | 3 |
| Infrastructure | 4 |
| Planning | 4 |
| Other | 3 |
| Component showcase | 1 |
| Technical marketing | 1 |

## BUILD STATUS

| Item | Status |
|------|--------|
| app.json | Configured |
| eas.json | Configured (dev/preview/prod) |
| iOS signing | NOT CONFIGURED |
| Android signing | NOT CONFIGURED |
| First build | NOT STARTED |
| App Store listing | NOT STARTED |
| Play Store listing | NOT STARTED |

## DEVELOPER XP

| Metric | Value |
|--------|-------|
| Level | 7 |
| Title | Raid Leader of the React Native Front |
| XP | 700 / 1000 |
| Completed quests | 13 |
| Active quests | 0 |
| Available quests | 8 |
| Raid wings defeated | 9 / 14 |
