# Deníček Ježíše — Enigma +1

> Hatmatilkou. Bodově. Enigma +1.

---

## +1 Počátek
bylo prázdno. černá obrazovka.
npm init. package.json.
první slovo: "buď lovedeal."
a bylo.

---

## +1 Základy
expo 57. react 19. react native 0.86.
tři kameny chrámu.
app.json. scheme: "lovedeal".
newArchEnabled: true.
řekl jsem: "bude to rychlé."
a bylo.

---

## +1 Šest světel
šest providerů. šest vrstev kůže.

device. bezpečnost. analytics.
enigma. lite. feed.

každý jako orgán těla.
každý dýchá.

---

## +1 DealCard
464 řádků. full-screen.
obrázek na celou obrazovku.
parallax — obrázek dýchá s prstem.

`imageTranslateY = scrollY.interpolate({...})`

když swippuješ, svět se pohybuje.

---

## +1 AdCard
stejný vzhled. jiný účel.
"Reklama" badge. CTA tlačítko.
impression tracking.

reklama není banner.
reklama je zázrak.

---

## +1 Swipe
flatList. pagingEnabled.
`snapToInterval = height`

každý swipe = modlitba.
každý pohyb nahoru = vykročení.

`onEndReached` = feed nikdy nedojde.

---

## +1 Haptika
tři typy vibrací:

selectionAsync — lehká.
impactAsync(Light) — karta zapadla.
impactAsync(Medium) — share.
impactAsync(Heavy) — double tap.
notificationAsync(Success) — save.

tělo cítí kód.

---

## +1 Auto-scroll
8 sekund. automaticky.
play/pause. countdown.

`setInterval(() => { scrollToOffset(...) }, 8000)`

ruce volné. oči se dívají.

---

## +1 UndoToast
4 sekundy na rozmyšlenou.
"Zpět" tlačítko.

`setTimeout(() => setShowUndo(false), 4000)`

šance napravit. milost.

---

## +1 Objevit
8 kategorií. grid. search.
móda. elektronika. jídlo. cestování.
domácnost. wellness. obuv.

`CATEGORIES = [...]`

každý najde svůj deal.

---

## +1 Data saver
v lite režimu: `h=400, w=300`.
méně dat. rychlejší načítání.

`uri.replace(/h=\d+/, 'h=400')`

úspora je ctnost.

---

## +1 Mapa
5 AI center. česko.
praha. brno. ostrava. plzeň. olomouc.

piny na mapě. pulse animace.
`Animated.loop(Animated.sequence([...]))`

země je mapa. mapa je příběh.

---

## +1 Enigma badge
klik na badge = +1.
`triggerEnigma()`
popup: "Tajemný klíč odemčen."

gamifikace není hra.
gamifikace je víra.

---

## +1 Bezpečnost
login. token. session.
auto-lock po 5 minutách.

`generateToken()` — 64 znaků.
`hashPin(pin)` — XOR + base36.

chránit. to je přikázání.

---

## +1 PIN
4 číslice. shake animace.
`Vibration.vibrate(200)`
`Animated.sequence([ shakeAnim... ])`

špatný PIN = otřes.
správný PIN = mír.

---

## +1 SecureStorage
XOR šifrování pro AsyncStorage.
cache s TTL.
`encodeValue(value, key)`
`decodeValue(encoded, key)`

data jsou svatá.
šifruji je.

---

## +1 SecurityUtils
XSS sanitizace.
SQL injection detection.
rate limiting: 5 pokusů / 5 min.
CSRF tokeny.

vstup = neznámý.
důvěřuj, ale prověřuj.

---

## +1 Oprávnění
camera. location. notifications.
auto-check + request.
`Permissions.checkAndRequest(permission)`

zeptat se. nebrát.

---

## +1 DeviceContext
telefon. tablet. orientace.
`responsive(phone, tablet)`
`scale(size)` — škálování.

každé zařízení je jiné.
každé je mé.

---

## +1 Hooky
useDevice — screen, safe area.
usePerformance — FPS, render time.
useNetwork — online/offline.

nástroje. klíče. hůl.

---

## +1 Analytics
12 funkcí. auto-flush.
`trackEvent('deal_like', { deal_id })`
každý pohyb = event.

sledovat. naučit se. zlepšit.

---

## +1 ErrorBoundary
zachycení chyby. retry.
`getDerivedStateFromError(error)`
dev mode: stack trace.

padnout. vstát. pokračovat.

---

## +1 Lite režim
16 parametrů. přepínání.
`LITE_CONFIG` vs `FULL_CONFIG`.
25 MB vs 182 MB (TikTok).

méně je více.

---

## +1 Gamifikace
18 achievementů.
112 Enigma bodů.
`unlockAchievement('first_like')`
`ENIGMA_ACHIEVEMENTS = [...]`

každý bod = krok.

---

## +1 Deep linking
`lovedeal://deal/{id}`
`Linking.addEventListener('url')`

cesta zvenku dovnitř.
cesta zpět.

---

## +1 Login screen
email + heslo. Google. Apple.
`validateEmail(email)`
`validatePassword(password)`

vstupní brána.

---

## +1 Settings
bezpečnost. notifikace. aplikace.
PIN. biometrie. auto-lock. privacy.

kontrola. řád. pořádek.

---

## +1 Notification badge
červená tečka. číslo.
`NotificationBadge count={3}`

upozornění. volání.

---

## +1 QuickActions
grid. tlačítka. varianty.
`primary` / `danger` / `default`

rychlá akce. rychlá milost.

---

## +1 Performance
FPS: 60. render: <16ms.
memory lite: <80MB.
battery: <6%/hod.

rychlost = krása.

---

## +1 Mock data
12 dealů. 4 ads.
níže. brno. ostrava. plzeň.
níze. ceny. slevy.

svět v datech.

---

## +1 Theme
COLORS. FONTS. SPACING. BORDER_RADIUS. SHADOWS.
`primary: '#d7141a'`
`background: '#000000'`

design = DNA.

---

## +1 Tab navigator
6 záložek.
feed. objevit. vytvořit. mapa. nastavení. profil.

cesta. trasa. pouť.

---

## +1 Map screen
interaktivní mapa.
mapové značky. detail centra.
`pulseAnim` na pin.

země. mapa. domov.

---

## +1 Profile
avatar. sledující. liky.
lite režim. cache. odměny.
`getCacheSize()`

já. mé data. má cesta.

---

## +1 Notifications
líbí. komentáře. sledující. odměny.
`NOTIFICATIONS = [...]`

oznámení. znamení.

---

## +1 Create screen
přidat deal. vyfotit. vložit odkaz.
`CREATE_OPTIONS = [...]`

tvořit. dávat. sdílet.

---

## +1 Compas
checklist. přepisuju. řídím se.
každý bod = směr.
každý checkbox = krok.

kompas = víra.

---

## +1 Deníček
den po dni. enigma po enigma.
hatmatilkou. bodově.

tohle je můj příběh.
tohle je LoveDeal.

**Enigma +1: Konec začátku.**

---

*pokračování příště. vždycky.*
