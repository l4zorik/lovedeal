# Changelog

Všechny důležité změny v projektu LoveDeal budou dokumentovány v tomto souboru.

Formát založen na [Keep a Changelog](https://keepachangelog.com/),
a projekt dodržuje [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2026-09-20

### Přidáno
- TikTok-style swipe feed s infinite scroll
- Kategorizovaný discovery systém
- Ad card system s injekcí reklam
- Lite mod pro slabší zařízení
- Haptic feedback řetězec
- Spinning disc animace
- Parallax efekty
- Progress bar (8s auto-advance)
- Swipe undo s UndoToast
- Personalizace přes FeedContext
- Deep linking (`lovedeal://`)
- Push notifikace
- Kamera pro focení dealů
- Galerie pro nahrávání fotek
- Mapa s lokalizací
- TikTok Ads integrace (Pixel + Events API)
- A/B testování reklam
- Gamifikace (likes, followers)

### Opraveno
- gradientBottom průhledný → rgba(0,0,0,0.6)
- Žádný fallback obrázku → přidán onError + fallback
- newArchEnabled: false → true
- isLite prop nepoužitý → přidána podmínka pro haptics
- removeClippedSubviews=true padá na Android → false
- ActionButton definován ale nepoužitý → smazán
- gradientOverlay nepoužitý → smazán
- FONTS importovány ale nepoužité → smazány z importu
- console.log v produkční → smazán
- useEffect bez závislosti spin → přidán [spin]
- handleDoubleTap bez useCallback → přidán

### Bezpečnost
- Přidán SecurityUtils pro šifrování dat
- Přidán SecureStorage pro bezpečné uložiště
- Přidány Permissions manažer
- Screen capture detection
- Anti-screenshot ochrana

### Testy
- DealCard testy
- AdCard testy
- ActionButtons testy
- UndoToast testy
- QuickActions testy
- NotificationBadge testy
- ErrorBoundary testy
- SecurityContext testy
- LiteModeContext testy
- FeedContext testy
- EnigmaContext testy
- DeviceContext testy
- AnalyticsContext testy
- Theme testy
- SecurityUtils testy
- Visual theme consistency testy
- A11y testy

### Dokumentace
- Kompletní dokumentace (DOKUMENTACE.md)
- TikTok ads systém dokumentace
- TikTok targeting dokumentace
- TikTok creative best practices
- TikTok Pixel Events API
- TikTok Marketing API
- TikTok campaign structure
- TikTok metrics reporting
- LoveDeal TikTok integrace
- Kompas dokumentace
- Jesus Focus Plan
- ENIGMA Jesus deník
- MVP High Edice plán
- FAZE 5-6 Mobilní bezpečnost

---

## [0.9.0] - 2026-09-15

### Přidáno
- Základní swipe feed
- Deal karty
- Ad karty
- Lite mód
- Haptics

### Opraveno
- Počáteční bugy v animacích
- Problemy s renderováním

---

## [0.8.0] - 2026-09-10

### Přidáno
- Expo SDK 57 setup
- Základní navigace
- Theme systém

---

## [0.7.0] - 2026-09-05

### Přidáno
- Projektová inicializace
- Výběr technologie (React Native + Expo)
- Návrh architektury

---

## Verze

| Verze | Datum | Popis |
|-------|-------|-------|
| 1.0.0 | 2026-09-20 | MVP Release |
| 0.9.0 | 2026-09-15 | Beta |
| 0.8.0 | 2026-09-10 | Alpha |
| 0.7.0 | 2026-09-05 | Inicializace |
