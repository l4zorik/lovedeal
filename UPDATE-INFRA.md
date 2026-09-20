# LoveDeal - Infrastruktura Updatu Balíčků

## Obsah
1. [Přehled](#1-přehled)
2. [Aktuální balíčky](#2-aktuální-balíčky)
3. [Procedura updatu](#3-procedura-updatu)
4. [Bezpečnostní pravidla](#4-bezpečnostní-pravidla)
5. [Testování po updatu](#5-testování-po-updatu)
6. [Rollback plán](#6-rollback-plán)
7. [Plán updatů](#7-plán-updatů)

---

## 1. Přehled

Dokumentace správy závislostí a updatů pro projekt LoveDeal.
Verze dokumentu: 1.0.0
Poslední aktualizace: 2026-09-20

---

## 2. Aktuální balíčky

### Core Framework
| Balíček | Verze | Typ | Stav |
|---------|-------|-----|------|
| expo | ~57.0.24 | core | ✅ Aktuální |
| react | 19.2.3 | core | ✅ Aktuální |
| react-native | 0.86.3 | core | ✅ Aktuální |
| expo-router | ^57.0.22 | routing | ✅ Aktuální |

### UI & Animace
| Balíček | Verze | Typ | Stav |
|---------|-------|-----|------|
| @expo/vector-icons | ^15.1.1 | icons | ✅ OK |
| expo-image | ^57.0.5 | images | ✅ OK |
| react-native-gesture-handler | ^3.3.0 | gestures | ✅ OK |
| react-native-reanimated | ^4.7.0 | animations | ✅ OK |
| react-native-screens | ^4.28.0 | navigation | ✅ OK |

### Bezpečnost & Storage
| Balíček | Verze | Typ | Stav |
|---------|-------|-----|------|
| @react-native-async-storage/async-storage | ^3.1.1 | storage | ✅ OK |
| expo-crypto | ~57.0.3 | crypto | ✅ OK |
| expo-screen-capture | ^57.0.0 | security | ✅ OK |

### Notifikace & Lokalizace
| Balíček | Verze | Typ | Stav |
|---------|-------|-----|------|
| expo-notifications | ~57.0.20 | notifications | ✅ OK |
| expo-location | ~57.0.19 | location | ✅ OK |
| expo-haptics | ^57.0.3 | haptics | ✅ OK |

### Sítě & Data
| Balíček | Verze | Typ | Stav |
|---------|-------|-----|------|
| @react-native-community/netinfo | 12.0.1 | network | ✅ OK |
| expo-application | ~57.0.3 | app info | ✅ OK |
| expo-linking | ^57.0.10 | deep links | ✅ OK |

### Testování
| Balíček | Verze | Typ | Stav |
|---------|-------|-----|------|
| jest-expo | ^57.0.5 | testing | ✅ OK |
| @testing-library/react-native | ^14.0.1 | testing | ✅ OK |
| @testing-library/jest-native | ^5.4.3 | testing | ✅ OK |
| @types/jest | ^30.0.0 | types | ✅ OK |
| react-test-renderer | ^19.3.0 | testing | ✅ OK |

---

## 3. Procedura updatu

### Před updatem
```bash
# 1. Záloha aktuálního stavu
git status
git stash save "pred-update-$(date +%Y%m%d)"

# 2. Kontrola aktuální verze
npm outdated

# 3. Kontrola závislostí
npm audit
```

### Provedení updatu
```bash
# 1. Update jednoho balíčku
npm install <package>@<version>

# 2. Update všech balíčků (bezpečné)
npm update

# 3. Update Expo SDK (major)
npx expo install --fix

# 4. Vyčištění cache
npx expo start --clear
```

### Po updatu
```bash
# 1. Spuštění testů
npm test

# 2. Kontrola typů (pokud TS)
npm run typecheck

# 3. Build test
npx expo run:android --variant development
npx expo run:ios --simulator

# 4. EAS Build test
eas build --profile development --platform android
```

---

## 4. Bezpečnostní pravidla

### Kategorie balíčků
- **CRITICAL** (jádro): expo, react, react-native - update pouze po důkladném testování
- **HIGH** (klíčové): expo-router, react-native-reanimated - update s testy
- **MEDIUM** (funkční): expo-image, expo-haptics - update s validací
- **LOW** (doplňky): @expo/vector-icons - update bez omezení

### Pravidla
1. **Nikdy** neupdatuj CRITICAL balíčky bez testování na všech platformách
2. **Vždy** prováděj update v feature branch
3. **Vždy** spouštěj testy po updatu
4. **Vždy** dokumentuj update v CHANGELOG.md
5. **Před** major update - kontroluj breaking changes v CHANGELOG

---

## 5. Testování po updatu

### Checklist
- [ ] `npm test` - všechny testy prochází
- [ ] `npx expo start` - aplikace se spouští
- [ ] Feed se načítá správně
- [ ] Swipe funguje plynule
- [ ] Animace běží na 60 FPS
- [ ] Haptics fungují
- [ ] Notifikace přicházejí
- [ ] Deep linking funguje
- [ ] Build pro Android úspěšný
- [ ] Build pro iOS úspěšný

### Automatizované testy
```bash
# Plný test
npm run test:ci

# S coverage
npm run test:coverage

# Watch mode pro vývoj
npm run test:watch
```

---

## 6. Rollback plán

### Kdy rollback
- Testy neprochází
- Aplikace padá při spuštění
- Kritická regrese v UI/UX

### Postup rollbacku
```bash
# 1. Vrať změny
git checkout -- package.json package-lock.json

# 2. Přeinstaluj
rm -rf node_modules
npm install

# 3. Vyčisti cache
npx expo start --clear

# 4. Otestuj
npm test
```

### Rollback z gitu
```bash
# Vrať konkrétní commit
git revert <commit-hash>

# Nebo reset na předchozí stav
git reset --hard HEAD~1
```

---

## 7. Plán updatů

### Q4 2026
| Balíček | Akce | Priorita | Status |
|---------|------|----------|--------|
| expo | Minor update | HIGH | 📋 Plánován |
| react-native | Patch update | MEDIUM | 📋 Plánován |
| expo-router | Minor update | HIGH | 📋 Plánován |

### Q1 2027
| Balíček | Akce | Priorita | Status |
|---------|------|----------|--------|
| expo SDK 58 | Major update | CRITICAL | 📋 Plánován |
| react 20 | Major update | CRITICAL | 📋 Plánován |

### automatické updaty
- Dependabot / Renovate pro GitHub
- Expo auto-update notifikace
- Týdenní `npm audit` kontrola

---

## Kontakt

- **Správce balíčků:** LoveDeal tým
- **Poslední audit:** 2026-09-20
- **Příští audit:** 2026-10-20
