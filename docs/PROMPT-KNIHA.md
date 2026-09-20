# LoveDeal - Prompt Kniha

> Kompletní průvodce všemi komponenty projektu
> Verze: 1.0.0 | Autor: MaxiGreens a.s.

---

## OBSAH

1. [Strom projektu](#1-strom-projektu)
2. [Core komponenty](#2-core-komponenty)
3. [UI komponenty](#3-ui-komponenty)
4. [Feed systém](#4-feed-systém)
5. [AI Toolbox](#5-ai-toolbox)
6. [Social Media](#6-social-media)
7. [Kontexty](#7-kontexty)
8. [Utility](#8-utility)
9. [Hooky](#9-hooky)
10. [Navigace](#10-navigace)

---

## 1. Strom projektu

```
lovedeal-app/
│
├── app/
│   ├── _layout.js                          # Root layout
│   │
│   ├── (tabs)/
│   │   ├── _layout.js                      # Tab navigace
│   │   ├── index.js                        # Feed (hlavní)
│   │   ├── discover.js                     # Objevit
│   │   ├── create.js                       # Vytvořit deal
│   │   ├── notifications.js                # Upozornění
│   │   ├── profile.js                      # Profil
│   │   ├── settings.js                     # Nastavení
│   │   └── map/
│   │       └── index.js                    # Mapa
│   │
│   ├── components/
│   │   ├── SwipeFeed.js                     # Levý swipe feed
│   │   ├── DealCard.js                      # Karta dealu
│   │   ├── AdCard.js                        # Reklamní karta
│   │   ├── ActionButtons.js                 # Akční tlačítka
│   │   ├── UndoToast.js                     # Zpět toast
│   │   ├── AutoScroll.js                    # Auto scroll
│   │   ├── QuickActions.js                  # Rychlé akce
│   │   ├── NotificationBadge.js             # Badge
│   │   ├── ErrorBoundary.js                 # Chybový handling
│   │   ├── LiteSettings.js                  # Lite nastavení
│   │   ├── LoginScreen.js                   # Přihlášení
│   │   ├── PinLockScreen.js                 # PIN zámek
│   │   ├── ScreenGuard.js                   # Ochrana obrazovky
│   │   │
│   │   ├── social/                          # NOVÉ: Social Media
│   │   │   ├── SocialFeed.js                # Social feed
│   │   │   ├── ProfileCard.js               # Profil karta
│   │   │   ├── FollowButton.js              # Sledovat tlačítko
│   │   │   ├── CommentSection.js            # Komentáře
│   │   │   ├── ShareSheet.js                # Sdílení
│   │   │   └── LikeAnimation.js             # Like animace
│   │   │
│   │   └── ai-toolbox/                      # NOVÉ: AI Toolbox
│   │       ├── AgentPanel.js                # Panel agentů
│   │       ├── AgentCard.js                 # Karta agenta
│   │       ├── MapExplorer.js               # Průzkumník mapy
│   │       ├── MapMarker.js                 # Značka na mapě
│   │       ├── NastenkaBoard.js             # Nástěnka (Google Keep)
│   │       ├── NastenkaCard.js              # Karta na nástěnce
│   │       └── AIToolbar.js                 # AI lišta
│   │
│   ├── context/
│   │   ├── FeedContext.js                   # Feed data
│   │   ├── LiteModeContext.js               # Lite mód
│   │   ├── SecurityContext.js               # Bezpečnost
│   │   ├── EnigmaContext.js                 # Enigma šifrování
│   │   ├── DeviceContext.js                 # Zařízení
│   │   ├── AnalyticsContext.js              # Analytika
│   │   └── SocialContext.js                 # NOVÉ: Social kontext
│   │
│   ├── constants/
│   │   ├── theme.js                         # Barvy, spacing
│   │   └── mockData.js                      # Testovací data
│   │
│   ├── hooks/
│   │   ├── usePerformance.js                # Výkon
│   │   ├── useNetwork.js                    # Síť
│   │   └── useDevice.js                     # Zařízení
│   │
│   └── utils/
│       ├── SecurityUtils.js                 # Šifrování
│       ├── SecureStorage.js                 # Bezpečné úložiště
│       ├── Permissions.js                   # Oprávnění
│       └── DeepLinking.js                   # Deep links
│
├── docs/
│   ├── DOKUMENTACE.md
│   ├── PROMPT-KNIHA.md                      # Tento soubor
│   ├── KREATIVNI-NASTENKA.md
│   ├── CHECKLIST-TECHNOLOGII.md
│   └── ...
│
├── app.json
├── eas.json
├── package.json
└── denni-logovani.ps1
```

---

## 2. Core komponenty

### `_layout.js`
```
URČENÍ: Root layout aplikace
PROMPT: Vytvoř root layout s expo-router, zabezpečení context providers
VSTUP: Žádný
VÝSTUP: Root navigator
ZÁVISLOSTI: FeedContext, LiteModeContext, SecurityContext
```

### `package.json`
```
URČENÍ: Definice balíčků a závislostí
PROMPT: Spravuj závislosti, verze, skripty
AKTUÁLNÍ VERZE: 1.0.0
FRAMEWORK: Expo SDK 57
```

---

## 3. UI komponenty

### `DealCard.js`
```
URČENÍ: Zobrazení jednoho dealu v feedu
PROMPT: Vytvoř kartu dealu s obrázkem, cenou, slevou, akcemi
PROPS: { deal, isLite, config, scrollY, onDismiss, onLike, customization }
STAV: liked, saved, showHeart, imgError
ANIMACE: heartScale, rightBarTranslateX, bottomInfoOpacity
FUNKCE:
  - Double tap na like
  - SpinningDisc (hudba)
  - ProgressBar (8s auto-advance)
  - Parallax efekt
  - Share sheet
  - Save deal
```

### `AdCard.js`
```
URČENÍ: Reklamní karta v feedu
PROMPT: Vytvoř nativní reklamu ve stylu dealu
PROPS: { ad, isLite }
FUNKCE:
  - Impression tracking
  - Click tracking
  - CTA tlačítko
```

### `ActionButtons.js`
```
URČENÍ: Akční panel vpravo
PROMPT: Vytvoř vertikální panel s ikonami
TLAČÍTKA:
  - ❤️ Like
  - 💬 Komentáře
  - 📤 Sdílení
  - 💾 Uložit
  - 🏪 Profil obchodu
```

### `UndoToast.js`
```
URČENÍ: Toast pro zpět akci
PROMPT: Vytvoř dočasný toast s tlačítkem Zpět
TRVÁNÍ: 4 sekundy
FUNKCE: Vrátí poslední swipe
```

### `AutoScroll.js`
```
URČENÍ: Automatické posouvání feedu
PROMPT: Vytvoř timer pro auto-advance
INTERVAL: 8 sekund
RESET: Při interakci uživatele
```

### `ErrorBoundary.js`
```
URČENÍ: Zachycení chyb Reactu
PROMPT: Vytvoř error boundary s fallback UI
CHYBY: Runtime errors, render errors
```

### `ScreenGuard.js`
```
URČENÍ: Ochrana proti screenshotům
PROMPT: Vytvoř ochranu obrazovky
FUNKCE: Screenshot detection, blur
```

---

## 4. Feed systém

### `SwipeFeed.js` - LEVÝ SWIPE FEED
```
URČENÍ: Hlavní TikTok-style feed
PROMPT: Vytvoř vertikální swipe feed s infinite scroll
KONFIGURACE:
  - LOAD_BATCH: 5 (počet načtených položek)
  - AD_FREQUENCY: 5 (frekvence reklam)
  - SCREEN_HEIGHT: plná výška obrazovky

FUNKCE:
  ✅ Infinite scroll (onEndReached)
  ✅ Shuffle náhodné pořadí
  ✅ Ad injection každých 5 karet
  ✅ Haptic feedback řetězec
  ✅ Loading indicator
  ✅ Undo toast

SWIPE CHOVÁNÍ:
  - SWIPE UP → další deal
  - SWIPE DOWN → předchozí deal
  - DOUBLE TAP → like
  - LONG PRESS → menu

ANIMACE:
  - Parallax scrolling
  - Smooth transitions
  - 60 FPS
```

### `FeedContext.js`
```
URČENÍ: Správa feed dat
PROMPT: Vytvoř context pro feed data a personalizaci
STAV:
  - deals: Deal[]
  - likedCategories: string[]
  - viewTime: Record<string, number>
  - sortDeals(): Deal[] (scoring)
```

---

## 5. AI Toolbox - PRAVÝ SWIPE

### Přehled
```
URČENÍ: Panel s AI nástroji
AKTIVACE: Swipe doprava z feedu
UMÍSTĚNÍ: Pravý panel (overlay)
```

### `AIToolbar.js` - Hlavní panel
```
URČENÍ: Lišta s AI nástroji
PROMPT: Vytvoř toolbar s 3 záložkami
ZÁLOŽKY:
  1. 🤖 Agents - AI agenti
  2. 🗺️ Map - Průzkum mapy
  3. 📌 Nástěnka - Google Keep styl

ANIMACE:
  - Slide in zprava
  - Gesture handler pro swipe
  - Backdrop overlay
```

### `AgentPanel.js` - AI Agenti
```
URČENÍ: Panel s AI agenty
PROMPT: Vytvoř seznam AI agentů pro pomoc

AGENTS:
  1. 🛒 Deal Hunter
     - Hledá nejlepší deals
     - Porovnává ceny
     - Upozorňuje na slevy

  2. 💰 Price Tracker
     - Sleduje ceny
     - Predikuje změny
     - Historie cen

  3. 🏪 Store Assistant
     - Pomáhá v obchodech
     - Navigace
     - Skladovost

  4. 📊 Analytics Bot
     - Statistiky nákupů
     - Grafy
     - Doporučení

  5. 🎯 Personal Shopper
     - Osobní nákupčí
     - Preferencie
     - Doporučení
```

### `AgentCard.js` - Karta agenta
```
URČENÍ: Zobrazení jednoho agenta
PROPS: { agent, isActive, onSelect }
FUNKCE:
  - Avatar agenta
  - Popis funkcí
  - Stav (online/offline)
  - Quick action
```

### `MapExplorer.js` - Mapa
```
URČENÍ: Průzkum deals na mapě
PROMPT: Vytvoř interaktivní mapu s markery

FUNKCE:
  ✅ Zobrazení deals na mapě
  ✅ Filtry (vzdálenost, kategorie, cena)
  ✅ Cluster markers
  ✅ Detail dealu po tapu
  ✅ Navigace k obchodu
  ✅ Street view

DATA:
  - deals: Deal[] (s lokací)
  - filters: Filter[]
  - userLocation: { lat, lng }
```

### `MapMarker.js` - Značka na mapě
```
URČENÍ: Custom marker pro deal
PROPS: { deal, onPress }
VZHLED:
  - Ikona kategorie
  - Cena
  - Vzdálenost
  - Animace
```

### `NastenkaBoard.js` - Nástěnka (Google Keep)
```
URČENÍ: Kreativní nástěnka ve stylu Google Keep
PROMPT: Vytvoř board s kartami jako Google Keep

FUNKCE:
  ✅ Vytvoření nové karty
  ✅ Přetažení (drag & drop)
  ✅ Barevné kategorie
  ✅ Připnutí (pin)
  ✅ Vyhledávání
  ✅ Řazení (datum, barva, kategorie)

TYPY KARET:
  - 📝 Text
  - 📷 Obrázek
  - ✅ Checklist
  - 🔗 Odkaz
  - 📍 Lokace
  - 🤖 AI generované
```

### `NastenkaCard.js` - Karta na nástěnce
```
URČENÍ: Jedna karta na nástěnce
PROPS: { card, onEdit, onDelete, onPin }
STYL:
  - Barevný okraj dle kategorie
  - Pin ikona
  - Časové razítko
  - Preview obsahu
```

---

## 6. Social Media

### Přehled
```
URČENÍ: Social funkce aplikace
INTEGRACE: TikTok, Instagram styl
```

### `SocialFeed.js` - Social feed
```
URČENÍ: Feed s sociálním obsahem
PROMPT: Vytvoř feed s příspěvky uživatelů

TYPY PŘÍSPĚVKŮ:
  - 📸 Deal post (fotka + popis)
  - 🎥 Video deal
  - 📊 Anketa
  - 🏷️ Spropitné
  - 📍 Check-in

INTERAKCE:
  - ❤️ Like
  - 💬 Komentář
  - 📤 Sdílení
  - 💾 Uložit
  - 🚫 Nahlásit
```

### `ProfileCard.js` - Profil karta
```
URČENÍ: Zobrazení profilu uživatele
PROPS: { user, isOwnProfile }
FUNKCE:
  - Avatar + jméno
  - Bio
  - Počet followers/following
  - Sledovat/Sledován
  - Grid/Seznam příspěvků
```

### `FollowButton.js` - Sledovat
```
URČENÍ: Tlačítko sledování
STAVY:
  - Sledovat (modré)
  - Sledujete (šedé)
  - Žádost odeslána
ANIMACE: Pulse, color transition
```

### `CommentSection.js` - Komentáře
```
URČENÍ: Sekce komentářů
FUNKCE:
  - Seznam komentářů
  - Odpovědi (vlákna)
  - Like na komentář
  - Smazání vlastního
  - Nahlašování
```

### `ShareSheet.js` - Sdílení
```
URČENÍ: Native share sheet
PLATFORMY:
  - Android native share
  - iOS native share
  - Web clipboard
SÍTĚ:
  - TikTok
  - Instagram
  - Facebook
  - Twitter/X
  - WhatsApp
  - Telegram
  - Kopírovat odkaz
```

### `LikeAnimation.js` - Like animace
```
URČENÍ: Animace při like
ANIMACE:
  - Srdce vyskočí
  - Particles
  - Haptic feedback
  - Sound effect (volitelné)
```

---

## 7. Kontexty

### `FeedContext.js`
```
URČENÍ: Správa feed dat a personalizace
STAV:
  - deals: Deal[]
  - likedCategories: Map<string, number>
  - viewTime: Map<string, number>
  - savedDeals: Deal[]

METODY:
  - addDeal(deal)
  - removeDeal(id)
  - likeCategory(category)
  - trackView(dealId, duration)
  - sortDeals(): Deal[] (AI scoring)
```

### `SocialContext.js` - NOVÝ
```
URČENÍ: Správa sociálních dat
STAV:
  - user: User
  - followers: User[]
  - following: User[]
  - posts: Post[]
  - notifications: Notification[]

METODY:
  - followUser(userId)
  - unfollowUser(userId)
  - createPost(post)
  - likePost(postId)
  - commentPost(postId, text)
  - sharePost(postId, platform)
```

### `LiteModeContext.js`
```
URČENÍ: Správa lite módu
KONFIGURACE:
  - animations: boolean
  - haptics: boolean
  - parallax: boolean
  - spinningDisc: boolean
  - progressBar: boolean
  - maxToRenderPerBatch: number
  - windowSize: number
  - dataSaver: boolean
  - offlineCache: boolean
```

### `SecurityContext.js`
```
URČENÍ: Bezpečnostní kontext
STAV:
  - isAuthenticated: boolean
  - pin: string | null
  - biometric: boolean
  - session: Session

METODY:
  - login(credentials)
  - logout()
  - setPin(pin)
  - verifyPin(pin)
  - enableBiometric()
```

### `EnigmaContext.js`
```
URČENÍ: Enigma 1+ šifrování
FUNKCE:
  - encrypt(data): string
  - decrypt(data): string
  - hash(data): string
  - verify(data, hash): boolean
```

---

## 8. Utility

### `SecurityUtils.js`
```
URČENÍ: Bezpečnostní funkce
FUNKCE:
  - encryptAES(data, key): string
  - decryptAES(data, key): string
  - hashSHA256(data): string
  - generateToken(): string
  - validateInput(input): boolean
```

### `SecureStorage.js`
```
URČENÍ: Bezpečné úložiště
FUNKCE:
  - setSecure(key, value)
  - getSecure(key): any
  - removeSecure(key)
  - clearSecure()
```

### `Permissions.js`
```
URČENÍ: Správa oprávnění
OPRÁVNĚNÍ:
  - camera
  - location
  - notifications
  - storage
  - haptics
```

### `DeepLinking.js`
```
URČENÍ: Deep link handling
SCHEMA: lovedeal://
ROUTY:
  - lovedeal://deal/{id}
  - lovedeal://profile/{id}
  - lovedeal://store/{id}
  - lovedeal://settings
```

---

## 9. Hooky

### `usePerformance.js`
```
URČENÍ: Monitoring výkonu
METRIKY:
  - renderTime
  - fps
  - memoryUsage
  - networkLatency
```

### `useNetwork.js`
```
URČENÍ: Stav sítě
STAV:
  - isConnected: boolean
  - type: 'wifi' | 'cellular' | 'none'
  - isInternetReachable: boolean
```

### `useDevice.js`
```
URČENÍ: Informace o zařízení
INFO:
  - platform: 'ios' | 'android' | 'web'
  - isTablet: boolean
  - screenDimensions: { width, height }
  - isLiteMode: boolean
```

---

## 10. Navigace

### `(tabs)/_layout.js`
```
URČENÍ: Tab navigace
TABS:
  1. 🔥 Feed (index)
  2. 🧭 Objevit (discover)
  3. ➕ Vytvořit (create)
  4. 🗺️ Mapa (map)
  5. 🔔 Upozornění (notifications)
  6. ⚙️ Nastavení (settings)
  7. 👤 Profil (profile)

STYL:
  - Background: COLORS.surface
  - Active: COLORS.primary
  - Height: 85px
```

### `map/index.js`
```
URČENÍ: Mapa obrazovka
KOMPONENTY: MapExplorer, MapMarker
FUNKCE:
  - Zobrazení deals na mapě
  - Filtry
  - Detail dealu
  - Navigace
```

---

## 🔄 AKTUALIZACE - Nové funkce

### LEFT SWIPE (Feed)
```
SMĚR: Levý swipe
AKCE: Skip / Dismiss deal
ANIMACE: Card flies left
FUNKCE:
  - Označit jako "nechci vidět"
  - Skrýt podobné
  - Undo toast (4s)
```

### RIGHT SWIPE (AI Toolbox)
```
SMĚR: Pravý swipe
AKCE: Otevřít AI Toolbox
PANEL: Overlay zprava
ZÁLOŽKY:
  1. 🤖 Agents
  2. 🗺️ Map
  3. 📌 Nástěnka
```

### SOCIAL MEDIA
```
INTEGRACE:
  - Profil uživatele
  - Sledování
  - Komentáře
  - Sdílení
  - Notifikace
```

---

## 📋 CHECKLIST pro vývojáře

### Před implementací
- [ ] Přečíst PROMPT-KNIHA.md
- [ ] Pochopit kontext komponenty
- [ ] Zkontrolovat závislosti
- [ ] Dodržet Ježice styl (kompaktní)
- [ ] Dodržet Enigma 1+ (bezpečnost)

### Při implementaci
- [ ] Psát kompaktní kód
- [ ] Přidat haptics
- [ ] Přidat error handling
- [ ] Testovat na Lite módu
- [ ] Logovat do Analytics

### Po implementaci
- [ ] Spustit testy
- [ ] Otestovat na Android
- [ ] Otestovat na iOS
- [ ] Otestovat na Web
- [ ] Aktualizovat dokumentaci

---

> 📅 Poslední aktualizace: 2026-09-20
> 👤 Autor: MaxiGreens a.s. / LoveDeal tým
> 🦔 Ježice styl: Kompaktní, ostražitý, adaptabilní
> 🔐 Enigma 1+: Šifrovaný, auditovaný, izolovaný
