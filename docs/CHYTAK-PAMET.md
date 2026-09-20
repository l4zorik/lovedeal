# CHYŤÁK PAMĚTI — Co si pamatovat

Tento soubor je **živý** — aktualizuje se s každým promptem.
Obsahuje klíčové informace, na které se ptal uživatel a které nesmí zapomenout.

---

## 🔑 KLÍČOVÉ INFORMACE

### Projekt
- **Název**: LoveDeal
- **Firma**: MaxiGreens a.s. (mateřská firma)
- **Package**: com.lovedeal.app
- **Framework**: React Native 0.86.3 + Expo SDK 57 + Expo Router
- **Dev metody**: Ježice (kompaktní) + Enigma 1+ (odloženo na konec)

### Co chce uživatel
- **TikTok-style feed** — hlavní interface
- **Livestreamy** — double swipe left z feedu
- **Nastavení** — double swipe right z feedu
- **5 sfér zabezpečení** — zatím jen teorie/filozofie (DOOMSDAY-SECURITY.md)
- **Golden Dome** = Sféra 5 (Zlato) = absolutní ochrana
- **Sféra 6 (Éter)** = nikdy se neimplementuje, je to jen kompass
- **Monetizace** — připravit dokumentaci

### Jak uživatel komunikuje
- Píše česky, stručně, telegraficky
- Často jen pár slov: „dokonči to", „zapni emulaci"
- Očekává, že vím kontext z předchozích session
- **NECHCE** — dlouhé vysvětlování, komentáře kód, nudné popisy
- **CHCE** — hotové věci, opravené bugy, fungující emulátor

### Technické poznámky
- Android SDK je v `C:\Android\Sdk` (NE v defaultním AppData)
- Emulátor: `emulator.exe -avd Pixel7_API35 -gpu host -no-audio` přes `Start-Process`
- `adb reverse tcp:8081 tcp:8081` — řeší „Cannot connect to Expo CLI"
- `expo-haptics` NEMÁ config plugin — NEDÁvat do app.json plugins
- Expo-router varování pro non-route soubory = NENÍ to bug
- react-test-renderer 19 má `act()` issues — snapshot-only testy fungují
- Testy: `npx jest --ci` (30 suites, 292 tests, 106 snapshots)

### Bezpečnost (Doomsday)
| Sféra | Název | Implementace |
|-------|-------|-------------|
| 0 | Sklo | ✅ Žádná (výchozí) |
| 1 | Hlína | ✅ PIN + auto-lock (SecurityContext) |
| 2 | Kůže | 🟡 Plánováno (biometrie + 2FA) |
| 3 | Kov | 🔵 Q1 2027 (FIDO2, cert pinning) |
| 4 | Oheň | ⚪ Q3 2027 (RASP, AI, honeypot) |
| 5 | Zlato | ⚪ 2028+ (post-quantum, decentralizace) |
| 6 | Éter | ⚪ Nikdy (teoretický kompass) |

---

## 📋 ÚKOLY K DODĚLÁNÍ

### Hotovo dnes (2026-09-20)
- [x] Opraveno 8 bugů (Rating, AdCard, SwipeFeed, Toast, SecurityContext, ErrorBoundary, DeviceContext, LiteSettings)
- [x] DealCard refactor — duplicitní helpers → formatting.js
- [x] expo-haptics plugin error opraven
- [x] Emulátor spuštěn (Pixel 7 API 35)
- [x] Livestream data + LivestreamCard + LivestreamFeed
- [x] Double-swipe gesture (left=livestreams, right=settings)
- [x] Live bar v FeedScreen
- [x] SwipeFeed PanResponder hint animace
- [x] DOOMSDAY-SECURITY.md (Sféra 0-6 filozofie)
- [x] Pokusová databáze + Chyťák paměti

### Rozpracované
- [ ] Git commit + push na GitHub
- [ ] Monetization documentation
- [ ] SecurityContext upgrade na 5 úrovní (kód, ne jen teorie)

### Blokované
- [ ] Map screen — `react-native-maps` není nainstalovaný
- [ ] Enigma 1+ — čeká na AI map engine
- [ ] Backend — čeká na výběr (Firebase / Supabase)
- [ ] EAS build — čeká na signing certifikáty

---

## 🧠 VZORKY PROMPTŮ (jak uživatel píše)

| Typ | Příklad |
|-----|---------|
| Dokončení | `dokonči to` |
| Emulátor | `zapni emulaci` |
| Feature | `přidej livestreamy` |
| Větvení | `a ulož commit, navrhni větvení, pushni` |
| Zabezpečení | `provrstvuj zabezpečení na 4 boží úrovně` |
| Upřesnění | `ale 5 zatím jen jako teoretická dokumentace` |
| Paměť | `piš do pokusové databáze, udržuj chyták` |
| Oprava | `Funguje to! ale bugy Console Warning` |

---

## 🔄 POSTUP PŘI KAŽDÉM NOVÉM PROMPTU

1. Načti tento soubor (CHYTAK-PAMET.md)
2. Načti POKUSOVA-DATABAZ.md
3. Pochoď kontext z AGENTS.md
4. Identifikuj, co uživatel chce
5. Udělej to (bez zbytečných vysvětlení)
6. Přidej záznam do POKUSOVA-DATABAZ.md
7. Aktualizuj CHYTAK-PAMET.md pokud je nová klíčová info
