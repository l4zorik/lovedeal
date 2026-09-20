# LoveDeal - Základní Checklist Vývoje

> 🚀 Začátek vývoje - pouze základní app
> ⏳ Enigma 1+ až na konec (napojení AI mapy)

---

## 📊 PRIORITA

| # | Úkol | Priorita | Čas | Stav |
|---|------|----------|-----|------|
| 1 | Základní app struktura | 🔴 VYSOKÁ | 1 den | ✅ |
| 2 | Feed + Swipe | 🔴 VYSOKÁ | 2-3 dny | ✅ |
| 3 | DealCard + AdCard | 🔴 VYSOKÁ | 2-3 dny | ✅ |
| 4 | Tab navigace | 🔴 VYSOKÁ | 1 den | ✅ |
| 5 | Základní styling | 🟡 STŘEDNÍ | 1-2 dny | 🟡 |
| 6 | Mock data | 🟡 STŘEDNÍ | 1 den | ✅ |
| 7 | Testy | 🟡 STŘEDNÍ | 2-3 dny | ✅ |
| 8 | Push notifikace | 🟠 NÍZKÁ | 2-3 dny | 📋 |
| 9 | Kamera + Galerie | 🟠 NÍZKÁ | 3-5 dní | 📋 |
| 10 | Lokalita + Mapa | 🟠 NÍZKÁ | 3-5 dní | 📋 |
| 11 | AI Toolbox (základ) | 🟠 NÍZKÁ | 1 týden | 📋 |
| 12 | Social (základ) | 🟠 NÍZKÁ | 1 týden | 📋 |
| 13 | Ad Engine (základ) | 🟠 NÍZKÁ | 1 týden | 📋 |
| 14 | **Enigma 1+** | ⏳ NA KONEC | 2-3 týdny | ⏳ |
| 15 | **AI Map Engine** | ⏳ NA KONEC | 2-3 týdny | ⏳ |

---

## ✅ CO UŽ MÁME (Fáze 0)

### Hotovo
- [x] Expo SDK 57
- [x] React Native 0.86.3
- [x] Expo Router
- [x] SwipeFeed komponenta
- [x] DealCard s parallax
- [x] AdCard (základní)
- [x] ActionButtons
- [x] UndoToast
- [x] AutoScroll
- [x] ErrorBoundary
- [x] Lite mod
- [x] Haptic feedback
- [x] Progress bar (8s)
- [x] Spinning disc
- [x] 17 testů
- [x] Základní dokumentace

---

## 🔴 TEĎ: Základní App

### 1. UI Dokončení (1-2 dny)
- [ ] Dark mode Consistent
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Pull to refresh
- [ ] Skeleton loading

### 2. Feed Vylepšení (2-3 dny)
- [ ] Skeleton loading pro karty
- [ ] Lazy loading obrázků
- [ ] Cache obrázků
- [ ] Offline režim (čtení)
- [ ] Swipe gestures jemnější

### 3. DealCard Vylepšení (1-2 dny)
- [ ] Ceny s formátováním (19,90 Kč)
- [ ] Sleva badge (% OFF)
- [ ] Časová lhůta (platí do)
- [ ] Kategorie badge
- [ ] Shop logo

### 4. Navigace (1 den)
- [ ] Přechody mezi screens
- [ ] Deep linking (základní)
- [ ] Back handler
- [ ] Tab badge počty

### 5. Data (1 den)
- [ ] Mock deals data (50+ položek)
- [ ] Mock ads data (10+ položek)
- [ ] Mock user data
- [ ] Categories data
- [ ] Shops data

---

## 🟡 PO ZÁKLADU: Funkce

### 6. Vytvoření Dealu (3-5 dní)
- [ ] Kamera integrace
- [ ] Galerie výběr
- [ ] Jednoduchý editor
- [ ] Formulář (název, cena, popis)
- [ ] Kategorie výběr
- [ ] Lokalita (GPS)
- [ ] Upload na server (dummy)

### 7. Profil (2-3 dny)
- [ ] Profilní foto
- [ ] Základní info
- [ ] Seznam deals
- [ ] Nastavení

### 8. Notifikace (2-3 dny)
- [ ] Push notifikace (Expo)
- [ ] In-app notifikace
- [ ] Badge počet

### 9. Objevit (2-3 dny)
- [ ] Kategorie grid
- [ ] Vyhledávání
- [ ] Filtry
- [ ] Seznam obchodů

### 10. Mapa (3-5 dní)
- [ ] Základní mapa (react-native-maps)
- [ ] Markery deals
- [ ] Vlastní poloha
- [ ] Detail po tapu

---

## 🟠 MEDIUM: AI + Social

### 11. AI Toolbox (základ) (1 týden)
- [ ] Panel zprava (overlay)
- [ ] 3 záložky (Agents, Map, Nástěnka)
- [ ] Základní Agent card
- [ ] Mapa v panelu
- [ ] Nástěnka (Google Keep styl)

### 12. Social (základ) (1 týden)
- [ ] Social feed
- [ ] Příspěvky
- [ ] Komentáře
- [ ] Sdílení

### 13. Ad Engine (základ) (1 týden)
- [ ] AdEngine servis
- [ ] Frequency capping
- [ ] Impression tracking
- [ ] Click tracking

---

## ⏳ NA KONEC: Enigma + AI Mapa

### 14. Enigma 1+ (2-3 týdny)
- [ ] AES-256 šifrování
- [ ] TLS 1.3
- [ ] Certificate pinning
- [ ] Token management
- [ ] Biometrie
- [ ] Screen protection
- [ ] Root detection
- [ ] Audit logging
- [ ] Rate limiting
- [ ] Access control

### 15. AI Map Engine (2-3 týdny)
- [ ] ML pipeline
- [ ] Real-time scoring
- [ ] User profiling
- [ ] Interest graph
- [ ] Smart targeting
- [ ] Predictive analytics

---

## 📅 ČASOVÁ OSA

```
TÝDEN 1-2: Základní app
├── UI dokončení
├── Feed vylepšení
├── DealCard vylepšení
├── Navigace
└── Mock data

TÝDEN 3-4: Funkce
├── Vytvoření dealu
├── Profil
├── Notifikace
├── Objevit
└── Mapa

TÝDEN 5-6: AI + Social
├── AI Toolbox
├── Social
└── Ad Engine

TÝDEN 7+: Enigma + AI Mapa
├── Enigma 1+
└── AI Map Engine
```

---

## 🎯 MILSTONY

### M1: Basic App (Týden 2)
- [ ] Aplikace se spouští
- [ ] Feed funguje
- [ ] DealCard se zobrazuje
- [ ] Navigace funguje

### M2: Features (Týden 4)
- [ ] Vytváření dealů
- [ ] Profil
- [ ] Notifikace
- [ ] Mapa

### M3: AI + Social (Týden 6)
- [ ] AI Toolbox
- [ ] Social feed
- [ ] Ad tracking

### M4: Production Ready (Týden 8+)
- [ ] Enigma 1+
- [ ] AI Map Engine
- [ ] Test coverage 80%+
- [ ] Performance optimalizace

---

> 📅 Poslední aktualizace: 2026-09-20
> 👤 Autor: MaxiGreens a.s.
> ⏳ Enigma až na konec!
