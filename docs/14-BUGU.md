# LoveDeal — 14 NEJKRITIČTĚJŠÍCH BUGŮ

> Enigma +1: Bug hunting
> Stav: OPRAVUJI

---

## SEZNAM 14 BUGŮ

| # | Soubor | Bug | Stav |
|---|--------|-----|------|
| 1 | `settings.js:40` | `Alert.prompt` crashne na Androidu | ⏳ |
| 2 | `SwipeFeed.js:101` | Dismiss nikdy neodstraní deal | ⏳ |
| 3 | `DealCard.js:132` | Auto-advance nefunguje | ⏳ |
| 4 | `map/index.js:133` | Map pins neviditelné (špatná pozice) | ⏳ |
| 5 | `DealCard.js:263` | Memo ignoruje config change | ⏳ |
| 6 | `AdCard.js:249` | Memo ignoruje config change | ⏳ |
| 7 | `SwipeFeed.js:132` | `onLike` nikdy předán | ⏳ |
| 8 | `LiteSettings.js:20` | Toggles neaplikují změny | ⏳ |
| 9 | `SecurityContext.js:59` | `privacyMode` se nenačte | ⏳ |
| 10 | `SecurityContext.js:43` | `appLockTimeout` se nepersistuje | ⏳ |
| 11 | `SecurityContext.js:179` | Auto-lock podle login time | ⏳ |
| 12 | `settings.js:130` | 5 tlačítek v Alert (Android max 3) | ⏳ |
| 13 | `SecurityContext.js:14` | `Math.random()` pro tokeny | ⏳ |
| 14 | `SecurityContext.js:137` | Žádný rate limit na PIN | ⏳ |

---

## BUG 1: Alert.prompt crashne na Androidu
**Soubor:** `app/(tabs)/settings.js:40-48`
**Problém:** `Alert.prompt` je iOS-only. Na Androidu padá.
**Řešení:** Vlastní modal s TextInput pro PIN.

## BUG 2: Dismiss nikdy neodstraní deal
**Soubor:** `app/components/SwipeFeed.js:101-118`
**Problém:** `handleDismiss` ukazuje undo toast, ale nikdy neodstraní deal z `allDeals`.
**Řešení:** Přidat `setAllDeals(prev => prev.filter(...))`.

## BUG 3: Auto-advance nefunguje
**Soubor:** `app/components/DealCard.js:132-134`
**Problém:** Progress bar zavolá `onDismiss`, ale ten neodstraní deal (bug #2).
**Řešení:** Závisí na opravě bugu #2.

## BUG 4: Map pins neviditelné
**Soubor:** `app/(tabs)/map/index.js:133`
**Problém:** Vzorec pro `top` produkuje >100% pro všechna česká města.
**Řešení:** Přepočítat na správné souřadnice (48.5-51.1 lat, 12.1-18.9 lng).

## BUG 5: Memo ignoruje config (DealCard)
**Soubor:** `app/components/DealCard.js:263-265`
**Problém:** Memo porovnává jen `deal.id` a `isLite`, ignoruje `config`.
**Řešení:** Přidat `config` do porovnání nebo odstranit custom comparator.

## BUG 6: Memo ignoruje config (AdCard)
**Soubor:** `app/components/AdCard.js:249-251`
**Problém:** Stejný jako bug #5.
**Řešení:** Stejný jako bug #5.

## BUG 7: onLike nikdy předán
**Soubor:** `app/components/SwipeFeed.js:132-141`
**Problém:** SwipeFeed nepředává `onLike` prop do DealCard.
**Řešení:** Předat `onLike` z SwipeFeed nebo FeedContext.

## BUG 8: LiteSettings toggles nefungují
**Soubor:** `app/components/LiteSettings.js:20-27`
**Problém:** Toggles mění jen lokální state, nikdy neuloží do contextu.
**Řešení:** Přidat "Použít" tlačítko nebo sync s contextem.

## BUG 9: privacyMode se nenačte
**Soubor:** `app/context/SecurityContext.js:59-78`
**Problém:** `loadAuthState` nikdy nečte `STORAGE_KEY_PRIVACY`.
**Řešení:** Přidat `AsyncStorage.getItem(STORAGE_KEY_PRIVACY)`.

## BUG 10: appLockTimeout se nepersistuje
**Soubor:** `app/context/SecurityContext.js:43`
**Problém:** Timeout je vždy 300000ms, nikdy se neuloží.
**Řešení:** Načíst z AsyncStorage + uložit při změně.

## BUG 11: Auto-lock podle login time
**Soubor:** `app/context/SecurityContext.js:179-181`
**Problém:** `updateActivity` nikdy zavoláno. Auto-lock podle loginu.
**Řešení:** Volat `updateActivity` z globálního touch handleru.

## BUG 12: 5 tlačítek v Alert (Android max 3)
**Soubor:** `app/(tabs)/settings.js:130-134`
**Problém:** Android podporuje max 3 tlačítka. Zbytek zmizí.
**Řešení:** Vlastní modal nebo action sheet.

## BUG 13: Math.random() pro tokeny
**Soubor:** `app/context/SecurityContext.js:14-21`
**Problém:** Tokeny jsou prediktable (ne kryptograficky bezpečné).
**Řešení:** Použít `expo-crypto` nebo `crypto.getRandomValues()`.

## BUG 14: Žádný rate limit na PIN
**Soubor:** `app/context/SecurityContext.js:137-150`
**Problém:** Útočník může zkusit 10000 PINů bez omezení.
**Řešení:** Integrovat `checkRateLimit` ze SecurityUtils.

---

*Seznam se aktualizuje při opravách. Enigma +1.*
