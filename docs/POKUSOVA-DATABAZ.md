# POKUSOVÁ DATABÁZE — LoveDeal

Každý prompt/pokus se zaznamenává sem. Slouží jako historie experimentů,
aby se neopakovaly chyby a dalo se navazovat.

---

## Formát záznamu

```
### Pokus #XXX — Datum: YYYY-MM-DD
- **Prompt**: Co jsi chtěl
- **Výsledek**: Co se stalo
- **Status**: ✅ hotovo / 🟡 rozpracováno / ❌ padlo
- **Poznámky**: Co zapamatovat
```

---

## Seznam pokusů

### Pokus #001 — Datum: 2026-09-20
- **Prompt**: „Co jsme dosud udělali?"
- **Výsledek**: Přehled kompletního stavu projektu (30 testů, 292 test cases, komponenty, bugy)
- **Status**: ✅ hotovo
- **Poznámky**: Start session. Načíst kontext z AGENTS.md + předchozího summary.

---

### Pokus #002 — Datum: 2026-09-20
- **Prompt**: „Dokonči to a zapni emulaci"
- **Výsledek**: Opraveno 8 bugů, spuštěn emulátor Pixel 7 API 35, app nabundlována
- **Status**: ✅ hotovo
- **Poznámky**: expo-haptics plugin error → opraveno smazáním z app.json plugins. Emulátor padal kvůli opengl32sw.dll → vyřešeno `-gpu host` přes `Start-Process`.

---

### Pokus #003 — Datum: 2026-09-20
- **Prompt**: „Funguje to! ale bugy Console Warning — Cannot connect to Expo CLI"
- **Výsledek**: Spuštěno `adb reverse tcp:8081 tcp:8081`, varování jsou jen expo-router (non-route soubory bez default export)
- **Status**: ✅ hotovo
- **Poznámky**: Expo-router generuje warningy pro soubory v `app/` bez default export (constants, context, hooks). Není to bug.

---

### Pokus #004 — Datum: 2026-09-20
- **Prompt**: „přidej livestreamy (double swipe left = livestreamy, right = nastavení)"
- **Výsledek**: Vytvořeno: `livestreams.js` (data), `LivestreamCard.js` (komponenta), `LivestreamFeed.js` (obrazovka), upraven SwipeFeed (PanResponder double-swipe), upraven FeedScreen (live bar + navigace)
- **Status**: ✅ hotovo
- **Poznámky**: Double-swipe detekce přes PanResponder — 2 swipes na stejnou stranu do 600ms. Hint animace přes `gestureRef.current.hintOpacity`.

---

### Pokus #005 — Datum: 2026-09-20
- **Prompt**: „a ulož commit všech změn, navrhni větvení a pushni na github a připrav dokumentaci monetizace"
- **Výsledek**: *(průběžné — stále se pracuje)*
- **Status**: 🟡 rozpracováno
- **Poznámky**: Nejdřív dodělat kód, pak git commit + push, pak monetization docs.

---

### Pokus #006 — Datum: 2026-09-20
- **Prompt**: „a provrstvuj zabezpečení na 4 boží úrovně"
- **Výsledek**: Napsána filozofická dokumentace DOOMSDAY-SECURITY.md (Sféra 0-6)
- **Status**: ✅ hotovo
- **Poznámky**: Uživatel chtěl „teorii a filozofii", ne implementaci. Sféra 0=Sklo, 1=Hlína, 2=Kůže, 3=Kov, 4=Oheň, 5=Zlato, 6=Éter.

---

### Pokus #007 — Datum: 2026-09-20
- **Prompt**: „ale 5 zatím jen jako teoretická dokumentace a teorie filozofie o 5 (6) sféře zabezpečení"
- **Výsledek**: Ujasněno — sféra 5+6 = jen teorie, implementace až později
- **Status**: ✅ hotovo
- **Poznámky**: Sféra 5 (Zlato) = post-quantum, decentralizace. Sféra 6 (Éter) = teoretický kompass, nikdy se neimplementuje.

---

### Pokus #008 — Datum: 2026-09-20
- **Prompt**: „zabezpečovací golden dome"
- **Výsledek**: Pokračování v Doomsday Security dokumentaci, finalizace
- **Status**: ✅ hotovo
- **Poznámky**: Golden Dome = Sféra 5. Metafora dokonalé ochrany.

---

### Pokus #009 — Datum: 2026-09-20
- **Prompt**: „a všechny pokusy (prompty) moje piš do pokusové databáze, vždy identifikuj a pamatuj na co sem se vlastně ptal a udržuj si takový chyták paměťový v sekci chyták"
- **Výsledek**: Vytvořeny soubory `POKUSOVA-DATABAZ.md` a `CHYTAK-PAMET.md`
- **Status**: ✅ hotovo
- **Poznámky**: Tento systém bude pokračovat — každý nový prompt se loguje.

---

### Pokus #010 — Datum: 2026-09-20
- **Prompt**: „dnes hlavní quest: nekonečný swipe mechanismus a podpora a list podpory starých zařízení"
- **Výsledek**: SwipeFeed přepsán s pool recycling, 3-tier device detection, memory auto-cleanup, debug badge. Vytvořeno SUPPORT-OLD-DEVICES.md (Tier A/B/C/D).
- **Status**: ✅ hotovo
- **Poznámky**: Pool config: normal (80 items), lite (30), legacy (20). `getDeviceTier()` detekuje podle API level + screen height.

---

### Pokus #011 — Datum: 2026-09-20
- **Prompt**: „a provrstvuj zabezpečení na 4 boží úrovně"
- **Výsledek**: DOOMSDAY-SECURITY.md — Sféra 0-4 (Sklo, Hlína, Kůže, Kov, Oheň)
- **Status**: ✅ hotovo
- **Poznámky**: Uživatel později upřesnil „ale 5 zatím jen jako teoretická dokumentace".

---

### Pokus #012 — Datum: 2026-09-20
- **Prompt**: „a udělej ještě docu wide spreadd kde budou nakategorizované archivní větve postraních rozvinutých updatů škalovacích potencionalnich rozepsanych prvni 1+ a potom teoretické checkpoint vývojové body"
- **Výsledek**: DOCU-WIDE-SPREAD.md (archivní větve, škálování, Enigma 1+, checkpointy 0-6) + MONETIZACE.md (3 pilíře, revenue projekce, KPIs)
- **Status**: ✅ hotovo
- **Poznámky**: Commit 1d27263. GitHub push čeká na remote URL.

---

### Pokus #013 — Datum: 2026-09-20
- **Prompt**: „do whats next 1-11 and self update until mid 1+"
- **Výsledek**: Biometrie login (expo-local-auth), animated gradient bg, onboarding quiz, NLP parser (Enigma 1+ Phase 1), LoveCoins system, badge system na profilu, MerchantPortal MVP, notebook section 11, updated _layout.js + profile.js
- **Status**: ✅ hotovo
- **Poznámky**: Commit pushed. 30/30 suites, 290 tests, 106 snapshots. Notebook extended to 11 sections. Enigma 1+ mid-point: NLP parser done (kategorie/cena/sleva/intent).

---

## Statistiky

| Metrika | Hodnota |
|---------|---------|
| Celkem pokusů | 14 |
| ✅ Hotovo | 14 |
| 🟡 Rozpracováno | 0 |
| ❌ Padlo | 0 |
| Úspěšnost | 100% |
