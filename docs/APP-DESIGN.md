# LoveDeal - App Design: Social + Swipe + AI

> Nový design aplikace s Social Media, Left/Right Swipe a AI Toolbox

---

## 📱 App Flow

```
┌─────────────────────────────────────────────────────┐
│                    APP LAYOUT                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │              FEED (TikTok style)             │   │
│   │                                             │   │
│   │    ← SWIPE LEFT        SWIPE RIGHT →        │   │
│   │    (Skip/Dismiss)      (AI Toolbox)         │   │
│   │                                             │   │
│   │         ↑ SWIPE UP (Next deal)              │   │
│   │         ↓ SWIPE DOWN (Prev deal)            │   │
│   │                                             │   │
│   │         ❤️ DOUBLE TAP (Like)                │   │
│   │                                             │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │         RIGHT SIDE PANEL (AI Toolbox)        │   │
│   │  ┌─────────┬─────────┬─────────┐            │   │
│   │  │ 🤖      │ 🗺️      │ 📌      │            │   │
│   │  │ Agents  │ Map     │ Nástěnka│            │   │
│   │  └─────────┴─────────┴─────────┘            │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │              BOTTOM TABS                     │   │
│   │  🔥    🧭    ➕    🗺️    🔔    ⚙️    👤    │   │
│   │ Feed Disc Create Map  Notif Set  Prof      │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Swipe Mechanics

### Left Swipe - Skip/Dismiss
```
SMĚR: ← (doleva)
AKCE: Přeskočit deal
ANIMACE:
  - Card odlétá doleva
  - Fade out opacity
  - Nahradí se nová karta

UI FEEDBACK:
  - ❌ červený křížek uprostřed
  - "Přeskočeno" toast

FUNKCE:
  - Označit jako "nechci vidět"
  - Skrýt podobné deals
  - Undo toast (4s)
  - Feed se naučí preference
```

### Right Swipe - AI Toolbox
```
SMĚR: → (doprava)
AKCE: Otevřít AI Toolbox
ANIMACE:
  - Panel se přisune zprava
  - Backdrop fade in
  - Staggered animation pro záložky

PANEL:
  - Šířka: 85% obrazovky
  - Background: semi-transparent
  - Close: tap mimo panel nebo swipe left
```

### Swipe Up - Next Deal
```
SMĚR: ↑ (nahoru)
AKCE: Další deal
ANIMACE:
  - Current card letí nahoru
  - New card přijíždí zespodu
  - 60 FPS plynulá animace

HAPTICS:
  - selectionAsync při swipe
  - impactAsync(Light) po dokončení
```

### Swipe Down - Previous Deal
```
SMĚR: ↓ (dolů)
AKCE: Předchozí deal
OMEZENÍ: Max 5 zpět (cache)
ANIMACE: Opačná k swipe up
```

### Double Tap - Like
```
GESTURE: Dvojklik
AKCE: Like deal
ANIMACE:
  - Srdce vyskočí ze středu
  - Particle effect
  - Scale 0 → 1.2 → 1

HAPTICS:
  - impactAsync(Heavy)
```

---

## 🤖 AI Toolbox - Right Panel

### Layout
```
┌─────────────────────────────────────┐
│  AI Toolbox                    ✕    │
├─────────────────────────────────────┤
│  ┌─────────┬─────────┬─────────┐    │
│  │ 🤖      │ 🗺️      │ 📌      │    │
│  │ Agents  │ Map     │ Nástěnka│    │
│  └─────────┴─────────┴─────────┘    │
├─────────────────────────────────────┤
│                                     │
│         (Obsah záložky)             │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### 🤖 Agents Tab
```
┌─────────────────────────────────────┐
│  AI Agents                          │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │ 🛒 Deal Hunter              │    │
│  │ Hledá nejlepší deals        │    │
│  │ ● Online                    │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 💰 Price Tracker            │    │
│  │ Sleduje ceny                │    │
│  │ ● Online                    │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🏪 Store Assistant          │    │
│  │ Pomáhá v obchodech          │    │
│  │ ○ Offline                   │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 📊 Analytics Bot            │    │
│  │ Statistiky nákupů           │    │
│  │ ● Online                    │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🎯 Personal Shopper         │    │
│  │ Osobní nákupčí              │    │
│  │ ● Online                    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 🗺️ Map Tab
```
┌─────────────────────────────────────┐
│  Map Explorer              📍 🔄    │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │      📍  📍                 │    │
│  │         📍    📍            │    │
│  │    📍         📍            │    │
│  │         📍                  │    │
│  │      📍      📍             │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│  Filtry: [Jídlo] [Elektro] [🎵]    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📍 Albert - 200m            │    │
│  │ Sleva 30% na mléko          │    │
│  │ ⭐ 4.5                      │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### 📌 Nástěnka Tab (Google Keep)
```
┌─────────────────────────────────────┐
│  Nástěnka                 🔍 + 📌   │
├─────────────────────────────────────┤
│  ┌─────────────┬─────────────┐      │
│  │ 📌          │             │      │
│  │ Nákupní     │ Recept na   │      │
│  │ seznam      │ palačinky   │      │
│  │             │             │      │
│  │ • mléko     │ 📷          │      │
│  │ • vejce     │             │      │
│  │ • mouka     │             │      │
│  ├─────────────┼─────────────┤      │
│  │ 🎯          │ 💡          │      │
│  │ Cíle na     │ Nápady na   │      │
│  │ příští      │ výlet       │      │
│  │ týden       │             │      │
│  │             │ • Brno      │      │
│  │ ✅          │ • Praha     │      │
│  └─────────────┴─────────────┘      │
│                                     │
│  + Nová karta                       │
└─────────────────────────────────────┘
```

---

## 📱 Social Media Integration

### Profile Screen
```
┌─────────────────────────────────────┐
│  ← Profil              ⚙️           │
├─────────────────────────────────────┤
│         ┌───────────┐               │
│         │  AVATAR   │               │
│         └───────────┘               │
│           Jan Novák                 │
│         @jan.novak                  │
│                                     │
│  ┌─────┬─────┬─────┐               │
│  │ 156 │ 1.2K│ 89  │               │
│  │Posty│Foll.│Foll.│               │
│  └─────┴─────┴─────┘               │
│                                     │
│  [Upravit profil] [Sdílet]          │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📸 Grid │ 📝 Seznam │ 📊    │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────┬─────┬─────┐               │
│  │ 📸  │ 📸  │ 📸  │               │
│  ├─────┼─────┼─────┤               │
│  │ 📸  │ 📸  │ 📸  │               │
│  └─────┴─────┴─────┘               │
└─────────────────────────────────────┘
```

### Social Feed
```
┌─────────────────────────────────────┐
│  Feed                    🔔 👤      │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │ 👤 Jan Novák        2h     │    │
│  │ 📍 Albert Praha            │    │
│  │                             │    │
│  │ ┌───────────────────────┐   │    │
│  │ │                       │   │    │
│  │ │      📸 DEAL          │   │    │
│  │ │                       │   │    │
│  │ └───────────────────────┘   │    │
│  │                             │    │
│  │ Mléko za 19.90! 🥛          │    │
│  │ #sleva #mléko #nakup        │    │
│  │                             │    │
│  │ ❤️ 156  💬 23  📤 12       │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 👤 Marie Svobodová   5h    │    │
│  │ ...                        │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## 🎨 Design System

### Barvy
```javascript
COLORS = {
  primary: '#FF6B35',      // Oranžová (láska + deal)
  secondary: '#1A1410',     // Tmavě hnědá
  background: '#0D0A07',    // Skoro černá
  surface: '#1A1410',       // Povrch
  surfaceLight: '#2A2118',  // Světlejší povrch
  
  text: '#FFF8F0',          // Hlavní text
  textSecondary: '#A89B8C', // Sekundární text
  textTertiary: '#6B5D4F',  // Teriární text
  
  success: '#4CAF50',       // Zelená
  warning: '#FFC107',       // Žlutá
  error: '#F44336',         // Červená
  info: '#2196F3',          // Modrá
  
  like: '#FF1744',          // Srdce
  save: '#FFD700',          // Uložit
  share: '#00BCD4',         // Sdílet
}
```

### Spacing
```javascript
SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

### Border Radius
```javascript
BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
}
```

---

## 📋 Checklist - Implementace

### Fáze 1: Základ
- [ ] Aktualizovat SwipeFeed pro left/right swipe
- [ ] Vytvořit AI Toolbox panel
- [ ] Přidat SocialContext
- [ ] Vytvořit základní SocialFeed

### Fáze 2: AI Agents
- [ ] Vytvořit AgentPanel
- [ ] Implementovat Deal Hunter
- [ ] Implementovat Price Tracker
- [ ] Přidat Store Assistant

### Fáze 3: Mapa
- [ ] Vytvořit MapExplorer
- [ ] Přidat markery
- [ ] Implementovat filtry
- [ ] Přidat navigaci

### Fáze 4: Nástěnka
- [ ] Vytvořit NastenkaBoard
- [ ] Implementovat drag & drop
- [ ] Přidat barvy/kategorie
- [ ] Připnutí karet

### Fáze 5: Social
- [ ] Vytvořit ProfileCard
- [ ] Implementovat FollowButton
- [ ] Přidat CommentSection
- [ ] Vytvořit ShareSheet

### Fáze 6: Testování
- [ ] Test swipe gesture
- [ ] Test AI agents
- [ ] Test mapa
- [ ] Test nástěnka
- [ ] Test social funkce
- [ ] Test Lite mód
- [ ] Test na Android
- [ ] Test na iOS
- [ ] Test na Web

---

> 📅 Poslední aktualizace: 2026-09-20
> 👤 Autor: MaxiGreens a.s.
> 🦔 Ježice: Kompaktní, ostražitý, adaptabilní
> 🔐 Enigma 1+: Šifrovaný, auditovaný, izolovaný
