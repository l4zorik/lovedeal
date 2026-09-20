# Jesus Focus Plan — TikTok Swipe Mechanism (TOP 4)

> Cíl: Perfektní TikTok-style swipe feed = hlavní feature LoveDeal.
> 9 kroků. Každý krok = jeden soubor kódů. Žádný skok.

---

## Co už máme (stav)

| Komponent | Stav | Kvalita |
|-----------|------|---------|
| `SwipeFeed.js` | ✅ Hotovo | FlatList + pagingEnabled + snapToInterval |
| `DealCard.js` | ✅ Hotovo | Full-screen image, haptics, heart animace, right bar |
| `AdCard.js` | ✅ Hotovo | Nativní reklama v feedu, CTA, spinning disc |
| `ForYou / Following` tab | ✅ Hotovo | Přepínání feedů v hlavičce |
| `Lite Mode` | ✅ Hotovo | Vypíná animace/haptics |
| `Spinning Disc` | ✅ Hotovo | Nepřetržitá rotace |
| `Double Tap Like` | ✅ Hotovo | Srdce animace + haptic |

---

## TOP 4 = Swipe Feed Mechanism

Proč je to TOP 4:
1. **Závislost** — swipe = gambling loop, uživatel nemůže přestat
2. **Retence** — čím víc swipe, tím víc personalized feed
3. **Monetizace** — ads přirozeně v feedu = vyšší CTR
4. **Viralita** — share = organický růst

---

## KROK 1: Infinite Scroll + Preloading

**Problém:** FlatList má `maxToRenderPerBatch={2}`, `windowSize={3}`. Po 20 swipích feed dojde.

**Řešení:** Automatické generování dalších dealů + preloading.

```
Soubor: app/components/SwipeFeed.js
Změna: Přidat onEndReached + generování nových dat
```

**Co přidat:**
- `onEndReached={() => loadMore()}` na FlatList
- `onEndReachedThreshold={0.5}` (načítat když zbývá 50% posledního)
- Stav `allDeals` = původní + nově generované
- Funkce `loadMore()` — přidá 5 nových dealů (rotace z mockData)
- Spinner na spodu (`ActivityIndicator`)

**Výsledek:** Uživatel nikdy nedojde na konec feedu.

---

## KROK 2: Swipe Gesture Animations

**Problém:** Žádná vizuální odezva při swipe. TikTok má progress bar + parallax.

**Řešení:** Animated scrollY → parallax efekty na kartách.

```
Soubor: app/components/DealCard.js
Změna: Přidat parallax na image + bottom info
```

**Co přidat:**
- Předat `scrollY` jako prop do DealCard
- `image.transform: [{ translateY: scrollY.interpolate(...) }]` — obrázek se posouvá pomaleji
- `bottomInfo.opacity` — fade out při swipe nahoru
- `rightBar.transform` — mírný posun doprava při swipe

**Výsledek:** Plynulý parallax = premium pocit.

---

## KROK 3: Progress Indicator (Top Bar)

**Problém:** Uživatel neví, kolik času zbývá na kartě (TikTok má progress bar nahoře).

**Řešení:** Časovač + vizuální progress bar.

```
Soubor: app/components/DealCard.js
Změna: Přidat progress bar + auto-advance timer
```

**Co přidat:**
- `ProgressBar` — úzký pruh nahoře (šířka = čas na kartě)
- `useEffect` s `setInterval` — každých 100ms update
- Po 8 sekundách automatický advance na další kartu
- Reset timeru při interakci (like, save, tap)
- Bar se zvýrazní = čas běží, zmizí = pauza

**Výsledek:** TikTok-style auto-advance + vizuální feedback.

---

## KROK 4: Haptic Feedback Chain

**Problém:** Haptics jsou jednorázové. TikTok má řetězec mikro-haptics.

**Řešení:** Mikro-haptics pro každou akci.

```
Soubor: app/components/DealCard.js + AdCard.js
Změna: Rozšířit haptics pro všechny interakce
```

**Co přidat:**
- `onScrollBeginDrag` → `Haptics.selectionAsync()` (začátek swipe)
- `onMomentumScrollEnd` → `Haptics.impactAsync(Light)` (karta zapadla)
- `like` → `Haptics.impactAsync(Heavy)` (už je, nechat)
- `save` → `Haptics.notificationAsync(Success)`
- `share` → `Haptics.impactAsync(Medium)`
- `doubleTap` → `Haptics.impactAsync(Heavy)` (už je, nechat)
- **Lite Mode:** Pokud `isLite`, žádné haptics

**Výsledek:** Každá interakce = hmatatelná odezva.

---

## KROK 5: Ad Integration v Feedu

**Problém:** Ads jsou v mockData náhodně. TikTok je dává každých 5-8 karet.

**Řešení:** Systém pozic pro ads.

```
Soubor: app/components/SwipeFeed.js
Změna: Ad injection logika
```

**Co přidat:**
- Konstanta `AD_FREQUENCY = 5` (každá 5. karta)
- Při `loadMore()` — vložit ad card na správnou pozici
- Tracking: `impressionId` + timestamp pro každé zobrazení
- Ad se nenačítá znovu (skip při scrollování zpět)

**Výsledek:** Přirozená monetizace jako na TikToku.

---

## KROK 6: Share Sheet (Sdílení)

**Problém:** Share tlačítko existuje, ale nic nedělá.

**Řešení:** Nativní share sheet + deep link.

```
Soubor: app/components/DealCard.js
Změna: Nahradit prázdný share handler
```

**Co přidat:**
- Import `Share` z `react-native`
- `handleShare()` — otevře nativní share sheet
- Share obsah: `deal.title` + `deal.salePrice` + URL
- **Deep link:** `lovedeal://deal/{id}`
- TikTok share tracking: `trackEvent('Share', { content_id, platform })`

**Výsledek:** Sdílení = organický růst.

---

## KROK 7: Swipe Revert (Undo)

**Problém:** Když uživatel přeswipne deal, je pryč navždy.

**Řešení:** Undo gesto (swipe doleva) nebo tlačítko.

```
Soubor: app/components/SwipeFeed.js
Změna: Přidat undo mechaniku
```

**Co přidat:**
- Swipe doleva = „Odmítnuto" (ne odebrat, jen označit)
- Undo tlačítko na 3 sekundy po swipu
- Toast: „Deal zachován" s tlačítkem „Zpět"
- `dismissedDeals` pole — pro pozdější obnovení

**Výsledek:** Odpouští chyby = vyšší retence.

---

## KROK 8: Personalization Hook

**Problém:** Feed je statický. TikTok personalizuje.

**Řešení:** Lokální scoring systém.

```
Soubor: app/context/FeedContext.js (nový)
Změna: Nový context pro personalizaci
```

**Co přidat:**
- `FeedContext` s `userPreferences` = { likedCategories: {}, viewTime: {} }
- Po každém like: `likedCategories[category] += 1`
- Po každém swipe: `viewTime[deal.id] = seconds`
- `sortFeed(deals)` — řadí podle skóre
- Skóre = `categoryWeight * 2 + viewTimeWeight + randomFactor`
- `randomFactor` = 0.1-0.3 (zajistí diversitu)

**Výsledek:** Čím víc swipe, tím lepší feed.

---

## KROK 9: Performance Audit

**Problém:** Pokud vše přidáme, může to zpomalit.

**Řešení:** Optimalizace + profiling.

```
Soubor: app/components/SwipeFeed.js + DealCard.js
Změna: Performance tuning
```

**Co přidat:**
- `React.memo(DealCard, (prev, next) => prev.deal.id === next.deal.id)` — skip re-render
- `useCallback` pro všechny handlery (už je většina)
- FlatList `getItemLayout` — přesné výpočty (už je)
- `removeClippedSubviews={false}` — už je (Android fix)
- `maxToRenderPerBatch={1}` — snížit z 2
- `windowSize={2}` — snížit z 3
- Profilovat: `console.time` / `console.timeEnd` na render
- Cíl: **60 FPS** při swipe

**Výsledek:** Plynulý feed i na slabých telefonech.

---

## Pořadí implementace

```
1. Infinite Scroll     → SwipeFeed.js
2. Parallax            → DealCard.js
3. Progress Bar        → DealCard.js
4. Haptic Chain        → DealCard.js + AdCard.js
5. Ad Injection        → SwipeFeed.js
6. Share Sheet         → DealCard.js
7. Swipe Undo          → SwipeFeed.js
8. Personalization     → nový FeedContext.js
9. Performance         → všechny soubory
```

---

## Metriky po dokončení

| Metrika | Cíl |
|---------|-----|
| FPS při swipe | 60 |
| Čas na kartu | 3-8 sekund |
| Like rate | > 10% |
| Save rate | > 5% |
| Share rate | > 2% |
| Session length | > 5 minut |
| Feed dojde | Nikdy (infinite) |

---

## Shrnutí

9 kroků = 9 změn. Každý krok je nezávislý. Lze implementovat postupně.
Výsledek: LoveDeal bude mít **plnohodnotný TikTok swipe mechanism** jako TOP 4 feature.
