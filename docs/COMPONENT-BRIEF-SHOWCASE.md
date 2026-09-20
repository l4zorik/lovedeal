# LOVEDEAL COMPONENT BRIEF SHOWCASE
## Full Technical Specification for Power-User Specification Lovers

> *Every prop. Every behavior. Every animation. No fluff. Pure spec.*

---

## DESIGN SYSTEM

### Color Palette -- Autumn Amber Theme

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#C8842D` | CTAs, active states, tab highlights |
| `primaryDark` | `#A66B1F` | Pressed states, gradients |
| `secondary` | `#8B5E3C` | Secondary actions, backgrounds |
| `accent` | `#D4A843` | Stars, ratings, premium badges |
| `success` | `#6B8E23` | Success states, verified badges |
| `warning` | `#DAA520` | Warnings, half-stars |
| `danger` | `#C0392B` | Errors, destructive actions |
| `background` | `#1A1410` | App background (dark mode) |
| `surface` | `#2A2118` | Card backgrounds |
| `surfaceLight` | `#3D3028` | Elevated surfaces |
| `text` | `#FFF8F0` | Primary text (warm white) |
| `textSecondary` | `rgba(255,248,240,0.6)` | Secondary text |
| `textTertiary` | `rgba(255,248,240,0.35)` | Disabled/hint text |

### Spacing Scale

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
| `xl` | 20px |
| `xxl` | 24px |
| `xxxl` | 32px |

### Border Radius

| Token | Value |
|-------|-------|
| `sm` | 6px |
| `md` | 10px |
| `lg` | 16px |
| `xl` | 20px |
| `full` | 9999px (pill) |

### Shadow System

| Token | Elevation | Opacity | Blur |
|-------|-----------|---------|------|
| `sm` | 2 | 0.18 | 2px |
| `md` | 5 | 0.25 | 8px |
| `lg` | 10 | 0.35 | 16px |

---

## COMPONENT CATALOG

### 1. DealCard -- The Core Experience

```
Type:       Function Component (memo)
Lines:      509
Haptics:    Heavy (double-tap), Light (scroll), Medium (share), Success (like)
Animations: Parallax, heart scale, spinning disc, progress bar
Context:    None (pure props)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `deal` | `Deal` | required | Deal data object |
| `isLite` | `boolean` | required | Lite mode toggle |
| `config` | `Config` | required | Animation/feature config |
| `scrollY` | `Animated.Value` | required | Scroll position for parallax |
| `onDismiss` | `() => void` | required | Swipe-up callback |
| `onLike` | `(id) => void` | required | Like callback |
| `customization` | `Customization` | required | Visual customization |

**Deal Object Shape:**
```typescript
{
  id: string;
  type: 'deal' | 'ad';
  brand: string;
  handle: string;
  avatar: string;
  title: string;
  description: string;
  tags: string[];
  song: string;
  discount: string;
  originalPrice: string;
  salePrice: string;
  image: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  verified: boolean;
  category: string;
  location: string;
  country: string;
}
```

**Customization Object:**
```typescript
{
  cardStyle: 'elevated' | 'flat' | 'outlined';
  showDiscount: boolean;
  showOriginalPrice: boolean;
  showTags: boolean;
  showSong: boolean;
  gradientOpacity: number; // 0.0 - 1.0
}
```

**Config Object:**
```typescript
{
  animations: boolean;
  haptics: boolean;
  parallax: boolean;
  spinningDisc: boolean;
  progressBar: boolean;
  simpleGradients: boolean;
}
```

**Behaviors:**
- Double-tap anywhere on image -> heart animation + Heavy haptic
- Single tap -> no action (prevents accidental likes)
- Swipe up -> dismiss deal (triggers `onDismiss`)
- Share button -> `Share.share()` with deal title + link
- Spinning disc rotates when song is playing
- Progress bar auto-advances at config speed
- Parallax effect on scroll (image moves slower than content)
- European flag detection: CZ, SK, PL, DE, AT, HU, EU
- `memo` wrapped -- only re-renders when props change

---

### 2. AdCard -- Revenue Engine

```
Type:       Function Component (memo)
Lines:      498
Haptics:    Heavy (double-tap), Light (scroll), Medium (share), Success (like)
Animations: Parallax, heart scale, spinning disc, progress bar
Context:    None (pure props)
```

**Props:** Same as DealCard, plus:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `deal` | `Deal` | required | Must have `type: 'ad'`, `cta`, `ctaUrl`, `advertiser`, `impressionId` |

**Extra Deal Fields for Ads:**
```typescript
{
  type: 'ad';
  cta: string;           // Button text (e.g., "Koupit")
  ctaUrl: string;        // Deep link URL
  advertiser: string;    // Advertiser name
  impressionId: string;  // Tracking ID
}
```

**Behaviors:**
- CTA button -> `Linking.openURL(ctaUrl)`
- "Reklama" badge with megaphone icon (top-left)
- Advertiser info row with business icon
- Bookmark button for saving ads
- Same heart/share/dismiss as DealCard
- `memo` wrapped

---

### 3. SwipeFeed -- The Feed Engine

```
Type:       Function Component
Lines:      246
Haptics:    Light (scroll), Heavy (dismiss), Success (like), Selection (batch)
Animations: Scroll tracking, batch loading
Context:    None (pure props)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Deal[]` | required | Array of deals |
| `isLite` | `boolean` | required | Lite mode toggle |
| `customization` | `Customization` | required | Card customization |

**Behaviors:**
- FlatList with `pagingEnabled` (full-screen swipe)
- Ad injection: 1 ad per 5 deals
- Batch loading: 5 items at a time
- Undo toast on dismiss (4s auto-dismiss)
- Auto-scroll with 8s countdown
- Shuffle algorithm for feed variety
- Lite mode: reduces load delay (300ms vs 600ms)
- `maxToRenderPerBatch` and `windowSize` configurable

---

### 4. ActionButtons -- Engagement Bar

```
Type:       Function Component
Lines:      102
Haptics:    Light (like), Medium (comment/share), Success (save)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `deal` | `Deal` | required | Deal with engagement counts |
| `isLiked` | `boolean` | required | Current like state |
| `onLike` | `() => void` | required | Like handler |
| `isSaved` | `boolean` | required | Current save state |
| `onSave` | `() => void` | required | Save handler |

**Layout:** Vertical button bar (right side of card)
```
[heart icon]     1K
[chat icon]      10
[bookmark icon]  20
[share icon]     5
```

**Behaviors:**
- Counts formatted with K suffix (e.g., 1000 -> "1K")
- Active states: filled heart (primary), filled bookmark (accent)
- Inactive states: outline icons (textTertiary)
- Glass background on icon containers

---

### 5. Button -- Universal CTA

```
Type:       Function Component
Lines:      148
Haptics:    Light (press)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Button text |
| `onPress` | `() => void` | required | Press handler |
| `variant` | `string` | `'primary'` | primary/secondary/outline/ghost/danger |
| `size` | `string` | `'medium'` | small/medium/large |
| `loading` | `boolean` | `false` | Show spinner |
| `disabled` | `boolean` | `false` | Disabled state |
| `icon` | `string` | `undefined` | Ionicons name prefix |

**Variants:**
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| `primary` | `COLORS.primary` | `#FFF8F0` | none |
| `secondary` | `COLORS.surface` | `COLORS.primary` | none |
| `outline` | transparent | `COLORS.primary` | `COLORS.primary` |
| `ghost` | transparent | `COLORS.primary` | none |
| `danger` | `COLORS.danger` | `#FFF8F0` | none |

**Sizes:**
| Size | Padding | Font |
|------|---------|------|
| `small` | 8px 16px | 12px |
| `medium` | 12px 24px | 14px |
| `large` | 16px 32px | 16px |

---

### 6. Input -- Form Field

```
Type:       Function Component
Lines:      101
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label above input |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `value` | `string` | `undefined` | Current value |
| `onChangeText` | `(text) => void` | `undefined` | Change handler |
| `secureTextEntry` | `boolean` | `false` | Password mode |
| `icon` | `string` | `undefined` | Ionicons prefix |
| `error` | `string` | `undefined` | Error message |
| `disabled` | `boolean` | `false` | Disabled state |
| `multiline` | `boolean` | `false` | Multi-line input |
| `style` | `object` | `undefined` | Custom styles |

**Behaviors:**
- Focus state: border changes to `COLORS.primary`
- Error state: border changes to `COLORS.danger`, error text below
- Disabled: 0.5 opacity
- Multiline: minHeight 100px

---

### 7. Modal + BottomSheet

```
Type:       Function Component (two exports)
Lines:      142
```

**Modal Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | required | Show/hide |
| `onClose` | `() => void` | required | Close handler |
| `title` | `string` | `undefined` | Header title |
| `children` | `ReactNode` | required | Content |
| `size` | `string` | `'medium'` | small/medium/large/full |
| `showClose` | `boolean` | `true` | Show close button |

**BottomSheet Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | required | Show/hide |
| `onClose` | `() => void` | required | Close handler |
| `title` | `string` | `undefined` | Header title |
| `children` | `ReactNode` | required | Content |

**Behaviors:**
- Modal: fade animation, centered
- BottomSheet: slide-up animation from bottom
- Backdrop press to close
- Size modes control max height

---

### 8. Toast + ToastContainer

```
Type:       Function Component (two exports)
Lines:      120
Animations: Fade + slide (opacity + translateY)
```

**Toast Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | required | Toast text |
| `type` | `string` | `'info'` | info/success/error/warning |
| `visible` | `boolean` | required | Show/hide |
| `duration` | `number` | `3000` | Auto-hide ms |
| `onHide` | `() => void` | `undefined` | Hide callback |

**Types:**
| Type | Icon | Color |
|------|------|-------|
| `info` | `information-circle` | `COLORS.primary` |
| `success` | `checkmark-circle` | `COLORS.success` |
| `error` | `alert-circle` | `COLORS.danger` |
| `warning` | `warning` | `COLORS.warning` |

---

### 9. Badge

```
Type:       Function Component
Lines:      112
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Badge content |
| `variant` | `string` | `'primary'` | primary/secondary/success/warning/error/outline |
| `size` | `string` | `'medium'` | small/medium/large |
| `dot` | `boolean` | `false` | Show dot indicator |
| `style` | `object` | `undefined` | Custom styles |

---

### 10. Chip

```
Type:       Function Component
Lines:      82
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Chip text |
| `icon` | `string` | `undefined` | Ionicons prefix |
| `selected` | `boolean` | `false` | Selected state |
| `onPress` | `() => void` | `undefined` | Press handler |
| `variant` | `string` | `'default'` | default/outline/filled |

---

### 11. Card (Compound)

```
Type:       Function Component (4 exports)
Lines:      70
```

**Exports:** `Card`, `CardHeader`, `CardContent`, `CardFooter`

**Card Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Card content |
| `variant` | `string` | `'default'` | default/elevated/outlined/filled |
| `style` | `object` | `undefined` | Custom styles |

---

### 12. Avatar

```
Type:       Function Component
Lines:      51
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `uri` | `string` | `undefined` | Image URL |
| `name` | `string` | `undefined` | Fallback initials |
| `size` | `number` | `40` | Diameter in px |
| `online` | `boolean` | `false` | Online indicator |
| `style` | `object` | `undefined` | Custom styles |

**Behaviors:**
- If `uri` provided -> `Image`
- If only `name` -> initials circle (primary bg)
- Online indicator: 8px green dot with white border

---

### 13. Rating

```
Type:       Function Component
Lines:      38
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Rating value |
| `max` | `number` | `5` | Max stars |
| `size` | `number` | `16` | Star size in px |
| `showValue` | `boolean` | `true` | Show numeric value |

**Behaviors:**
- Full star: `star` (accent color)
- Half star: `star-half` (accent color)
- Empty star: `star-outline` (textTertiary)
- Value formatted to 1 decimal

---

### 14. Skeleton + SkeletonCard

```
Type:       Function Component (two exports)
Lines:      76
Animations: Opacity pulse (0.3 -> 0.7, 1s loop)
```

**Skeleton Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number/string` | required | Width |
| `height` | `number/string` | required | Height |
| `style` | `object` | `undefined` | Custom styles |

**SkeletonCard:** Pre-built card skeleton (image + title + subtitle + text)

---

### 15. Select

```
Type:       Function Component
Lines:      105
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label above |
| `placeholder` | `string` | `'Vyberte...'` | Placeholder |
| `value` | `string/number` | `undefined` | Selected value |
| `options` | `Option[]` | required | Options array |
| `onSelect` | `(value) => void` | `undefined` | Selection handler |

**Option Shape:**
```typescript
{ value: string | number; label: string }
```

---

### 16. QuickActions (Compound)

```
Type:       Function Component (3 exports)
Lines:      114
```

**Exports:** `QuickAction`, `QuickActionsGrid`, `ActionButton`

**QuickAction Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | required | Ionicons name |
| `label` | `string` | required | Action label |
| `color` | `string` | required | Icon tint color |
| `onPress` | `() => void` | required | Press handler |
| `badge` | `number` | `undefined` | Badge count (99+ cap) |

---

### 17. NotificationBadge + NotificationDot + TabBadge

```
Type:       Function Component (3 exports)
Lines:      77
```

**NotificationBadge Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | required | Notification count |
| `size` | `string` | `'small'` | small (18px) / large (24px) |
| `style` | `object` | `undefined` | Custom styles |

**TabBadge Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | required | Tab icon |
| `label` | `string` | required | Tab label |
| `badgeCount` | `number` | required | Badge count |
| `focused` | `boolean` | required | Tab focused state |

---

### 18. ErrorBoundary

```
Type:       Class Component
Lines:      127
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Protected content |
| `fallback` | `ReactNode` | `undefined` | Custom fallback UI |
| `onError` | `(error) => void` | `undefined` | Error callback |
| `showHome` | `boolean` | `false` | Show home button |
| `navigation` | `object` | `undefined` | Navigation object |

**Behaviors:**
- Catches render errors via `getDerivedStateFromError`
- Logs errors via `componentDidCatch`
- Retry button resets error state
- Dev mode shows stack trace in monospace
- Home button navigates to root

---

### 19. PinLockScreen

```
Type:       Function Component
Lines:      176
Haptics:    Vibration.vibrate(200) on error
Animations: Shake (translateX +/-10)
Context:    useSecurity (unlockApp, pinEnabled)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onUnlock` | `() => void` | required | Unlock callback |

**Behaviors:**
- 4-digit PIN entry with visual dots
- 3x4 circular keypad
- Shake animation on wrong PIN
- Vibration on error (200ms)
- Fingerprint button (if biometric enabled)
- Auto-unlock if PIN not set
- 5-attempt lockout (300s)

---

### 20. LoginScreen

```
Type:       Function Component
Lines:      218
Context:    useSecurity (login, validateEmail, validatePassword)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onLogin` | `() => void` | required | Post-login callback |

**Features:**
- Heart logo circle with "LoveDeal" title
- Email input with mail icon
- Password input with lock icon + show/hide toggle
- Real-time validation (email format, password strength)
- Error box with validation messages
- "nebo" divider
- Google login button (red)
- Apple login button (dark)
- "Nemate ucet? Registrovat se" footer link
- `KeyboardAvoidingView` (iOS padding / Android height)

---

### 21. LiteSettings

```
Type:       Function Component
Lines:      243
Context:    useLiteMode (config, setConfig)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | required | Show/hide |
| `onClose` | `() => void` | required | Close handler |

**Toggle Settings (8):**
1. Animations
2. Haptics
3. Parallax
4. Spinning Disc
5. Progress Bar
6. Simple Gradients
7. Auto-scroll
8. Image Preload

**Preset Buttons:**
- "Lite" -> all animations off, minimal visuals
- "Full" -> everything on

**Features:**
- Cache size display
- Clear cache button
- Apply button commits to context

---

### 22. ScreenGuard

```
Type:       Function Component
Lines:      47
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `screenName` | `string` | required | Current screen name |
| `children` | `ReactNode` | required | Protected content |

**Behaviors:**
- Monitors screenshots on insecure screens
- Insecure screens: profile, settings, payment, wallet, pin, biometric
- On screenshot detected: hides nav bar for 2s (Android)
- Sets StatusBar to light/translucent
- Sets NavigationBar to dark bg, light buttons

---

### 23. AutoScroll

```
Type:       Function Component
Lines:      87
Haptics:    Light (toggle)
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLite` | `boolean` | required | Lite mode toggle |
| `config` | `Config` | required | Feature config |
| `onScrollToNext` | `() => void` | required | Scroll trigger |

**Behaviors:**
- Play/pause toggle with countdown (8s)
- Active state: `COLORS.primary` background
- Inactive state: surface background

---

### 24. SwipeIndicators

```
Type:       Function Component
Lines:      48
Animations: Opacity tied to scroll
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollY` | `Animated.Value` | required | Scroll position |
| `screenHeight` | `number` | required | Screen height |

**Behaviors:**
- Left indicator: `close-circle` (error color) -- dismiss
- Right indicator: `checkmark-circle` (success color) -- like
- Opacity fades based on scroll direction

---

### 25. PullToRefresh + PullToRefreshList

```
Type:       Function Component (two exports)
Lines:      64
```

**PullToRefresh Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Content |
| `onRefresh` | `() => Promise` | required | Async refresh |
| `style` | `object` | `undefined` | Custom styles |

**PullToRefreshList Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | required | List data |
| `renderItem` | `(item) => ReactNode` | required | Item renderer |
| `onRefresh` | `() => Promise` | required | Async refresh |
| `keyExtractor` | `(item) => string` | required | Key extractor |

---

### 26. Loading

```
Type:       Function Component
Lines:      20
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string` | `'large'` | ActivityIndicator size |
| `color` | `string` | `COLORS.primary` | Spinner color |
| `style` | `object` | `undefined` | Custom styles |

---

### 27. EmptyState

```
Type:       Function Component
Lines:      42
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `'cube-outline'` | Ionicons name |
| `title` | `string` | `undefined` | Title text |
| `message` | `string` | `undefined` | Description text |
| `action` | `ReactNode` | `undefined` | Action button slot |

---

### 28. ErrorState

```
Type:       Function Component
Lines:      55
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | `'alert-circle'` | Ionicons name |
| `title` | `string` | `'Neco se pokazilo'` | Error title |
| `message` | `string` | `undefined` | Error description |
| `onRetry` | `() => void` | `undefined` | Retry button handler |

---

### 29. Divider

```
Type:       Function Component
Lines:      27
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `object` | `undefined` | Custom styles |
| `vertical` | `boolean` | `false` | Vertical orientation |

---

### 30. Switch

```
Type:       Function Component
Lines:      17
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | required | Toggle state |
| `onValueChange` | `(value) => void` | required | Change handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `style` | `object` | `undefined` | Custom styles |

**Behaviors:**
- iOS: white thumb, primary track when on
- Android: primary thumb, textTertiary track when off

---

## ARCHITECTURE STATS

| Metric | Value |
|--------|-------|
| Total components | 31 files, 37 named exports |
| Total lines | 4,397 |
| Largest component | DealCard (509 lines) |
| Smallest component | Switch (17 lines) |
| Components with Haptics | 7 (ActionButtons, AdCard, AutoScroll, Button, DealCard, PinLockScreen, SwipeFeed) |
| Components with Animations | 8 (AdCard, DealCard, PinLockScreen, Skeleton, SwipeFeed, SwipeIndicators, Toast, UndoToast) |
| Components using `memo` | 2 (AdCard, DealCard) |
| Class components | 1 (ErrorBoundary) |
| Context consumers | 4 (LiteSettings, LoginScreen, PinLockScreen, SwipeFeed) |
| Czech language UI | 8 components |
