# LoveDeal — Seznam podpory starých zařízení

## Filozofie

LoveDeal musí běžet na všem. Nejen na nových telefonech — ale i na starých,
rozbitých, zapomenutých. Protože slevy potřebují **všichni**.

---

## Třídy zařízení

### 🟢 Tier A — Plná podpora (60 FPS)

| Zařízení | RAM | Chip | OS | Stav |
|----------|-----|------|----|------|
| iPhone 12 / 12 mini | 4GB | A14 | iOS 16+ | ✅ Plný |
| iPhone 13 / 13 mini | 4GB | A15 | iOS 16+ | ✅ Plný |
| iPhone SE 3 (2022) | 4GB | A15 | iOS 16+ | ✅ Plný |
| Samsung Galaxy S21 | 8GB | Exynos 2100 | Android 13+ | ✅ Plný |
| Samsung Galaxy S22 | 8GB | Snapdragon 8 Gen 1 | Android 14+ | ✅ Plný |
| Google Pixel 6 | 8GB | Tensor G1 | Android 14+ | ✅ Plný |
| Google Pixel 7 | 8GB | Tensor G2 | Android 15+ | ✅ Plný |
| OnePlus 9 | 8/12GB | Snapdragon 888 | Android 13+ | ✅ Plný |
| Xiaomi 12 | 8GB | Snapdragon 8 Gen 1 | Android 13+ | ✅ Plný |

### 🟡 Tier B — Lite režim (30 FPS, omezené animace)

| Zařízení | RAM | Chip | OS | Stav |
|----------|-----|------|----|------|
| iPhone X / XR / XS | 3GB | A11/A12 | iOS 15+ | 🟡 Lite |
| iPhone 11 | 4GB | A13 | iOS 16+ | 🟡 Lite |
| iPhone SE 2 (2020) | 3GB | A13 | iOS 15+ | 🟡 Lite |
| Samsung Galaxy S10 / S10e | 8GB | Exynos 9820 | Android 12+ | 🟡 Lite |
| Samsung Galaxy A52 / A53 | 6GB | Snapdragon 720G | Android 12+ | 🟡 Lite |
| Google Pixel 5 | 8GB | Snapdragon 765G | Android 14+ | 🟡 Lite |
| Google Pixel 4a | 6GB | Snapdragon 730 | Android 13+ | 🟡 Lite |
| OnePlus 7 / 7T | 8GB | Snapdragon 855 | Android 12+ | 🟡 Lite |
| Xiaomi Redmi Note 11 | 4GB | Snapdragon 680 | Android 12+ | 🟡 Lite |
| Huawei P30 / P30 Pro | 8GB | Kirin 980 | EMUI 12+ | 🟡 Lite |

### 🟠 Tier C — Minimální režim (15 FPS, jen text + karty)

| Zařízení | RAM | Chip | OS | Stav |
|----------|-----|------|----|------|
| iPhone 8 / 8 Plus | 2GB | A11 | iOS 15+ | 🟠 Min |
| iPhone 7 / 7 Plus | 2/3GB | A10 | iOS 15+ | 🟠 Min |
| Samsung Galaxy S8 / S8+ | 4GB | Exynos 8895 | Android 9+ | 🟠 Min |
| Samsung Galaxy A32 | 4GB | Helio G85 | Android 12+ | 🟠 Min |
| Xiaomi Redmi 9 | 4GB | Helio G80 | Android 11+ | 🟠 Min |
| Motorola Moto G7 | 4GB | Snapdragon 632 | Android 10+ | 🟠 Min |
| Nokia 5.3 | 4GB | Snapdragon 665 | Android 11+ | 🟠 Min |

### 🔴 Tier D — Offline režim (žádná animace, jen data)

| Zařízení | RAM | Chip | OS | Stav |
|----------|-----|------|----|------|
| Samsung Galaxy J7 (2017) | 2GB | Exynos 7870 | Android 8+ | 🔴 Offline |
| Samsung Galaxy A10 | 2GB | Exynos 7884 | Android 9+ | 🔴 Offline |
| Huawei Y6 (2019) | 2GB | Helio A22 | Android 9+ | 🔴 Offline |
| Xiaomi Redmi Go | 1GB | Snapdragon 425 | Android 8.1+ | 🔴 Offline |
| jakékoliv 1GB zařízení | 1GB | — | — | 🔴 Offline |

---

## Detekce zařízení (v kódu)

```javascript
function getDeviceTier() {
  const { height } = Dimensions.get('window');
  const platform = Platform.OS;
  const version = Platform.Version;

  // iOS tier detection
  if (platform === 'ios') {
    if (version >= 16) return 'A';
    if (version >= 15) return 'B';
    return 'C';
  }

  // Android tier detection
  if (platform === 'android') {
    if (version >= 33 && height >= 800) return 'A';
    if (version >= 28 && height >= 700) return 'B';
    if (version >= 26) return 'C';
    return 'D';
  }

  return 'A'; // default
}
```

---

## SwipeFeed konfigurace podle tieru

| Parametr | Tier A | Tier B | Tier C | Tier D |
|----------|--------|--------|--------|--------|
| FPS | 60 | 30 | 15 | 10 |
| batchLoad | 6 | 4 | 2 | 1 |
| loadAhead | 5 | 3 | 1 | 1 |
| recycleBeyond | 10 | 6 | 3 | 2 |
| maxPoolSize | 80 | 40 | 20 | 10 |
| Animace | Plné | Zjednodušené | Minimální | Žádné |
| Parallax | ✅ | ❌ | ❌ | ❌ |
| Spinning disc | ✅ | ❌ | ❌ | ❌ |
| Auto-scroll | ✅ | ✅ (pomalejší) | ❌ | ❌ |
| Haptics | ✅ | ✅ (lehké) | ❌ | ❌ |
| removeClippedSubviews | false | true | true | true |

---

## Podporované OS verze

| Platforma | Minimální | Doporučená | Cílená |
|-----------|-----------|------------|--------|
| iOS | 15.0 | 16.0+ | 17.0+ |
| Android | 8.0 (API 26) | 12+ (API 31) | 14+ (API 34) |
| HarmonyOS | 2.0 | 3.0+ | 4.0+ |

---

## Testovaná zařízení (emulace)

| Emulátor | API | Tier | Stav |
|----------|-----|------|------|
| Pixel 7 API 35 | 35 | A | ✅ Testováno |
| Pixel 5 API 31 | 31 | B | 🟡 Plánováno |
| Galaxy S8 API 27 | 27 | C | 🟡 Plánováno |
| Nexus 5 API 24 | 24 | D | 🟡 Plánováno |

---

## Paměťové limity

| Tier | Max paměť (JS heap) | Max cache | Max obrázky |
|------|---------------------|-----------|-------------|
| A | 512 MB | 50 MB | 20 |
| B | 256 MB | 25 MB | 10 |
| C | 128 MB | 10 MB | 5 |
| D | 64 MB | 3 MB | 2 |

---

*„Nenecháme nikoho za zádem. Ani toho s Galaxy J7."*
— LoveDeal Team, 2026
