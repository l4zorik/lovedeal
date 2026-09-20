# Politika Řízení Dokumentace

## Obsah
1. [Přehled](#1-přehled)
2. [Typy dokumentů](#2-typy-dokumentů)
3. [Správa verzí](#3-správa-verzí)
4. [Schvalovací proces](#4-schvalovací-proces)
5. [Přístupová práva](#5-přístupová-práva)
6. [Archivace](#6-archivace)
7. [Kontrola kvality](#7-kontrola-kvality)
8. [Politické řízení](#8-politické-řízení)

---

## 1. Přehled

Tento dokument definuje politiky a procesy pro řízení dokumentace projektu LoveDeal.
Verze: 1.0.0
Platnost: 2026-09-20
Schváleno: LoveDeal tým

---

## 2. Typy dokumentů

### Technická dokumentace
- **Architektonická** - návrh systému, závislosti
- **API dokumentace** - endpointy, schémata
- **Instalační** - setup, konfigurace
- **Uživatelská** - návody, manuály

### Projektová dokumentace
- **Plány** - roadmapy, milníky
- **Reporty** - status, metriky
- **Rizika** - analýzy, mitigace
- **Rozpočty** - náklady, alokace

### Právní dokumentace
- **Smlouvy** - licence, NDA
- **Compliance** - GDPR, podmínky
- **Duševní vlastnictví** - patenty, ochranné známky
- **Soudní** - žaloby, odpovědi

### Marketingová dokumentace
- **Strategie** - cílové skupiny, kanály
- **Kampaně** - plány, výsledky
- **Analytika** - reporty, dashboards
- **TikTok** - ads, pixel, integrace

---

## 3. Správa verzí

### Formát verzí
```
MAJOR.MINOR.PATCH
```
- **MAJOR** - nekompatibilní změny
- **MINOR** - zpětně kompatibilní přidání funkcí
- **PATCH** - zpětně kompatibilní opravy

### Pravidla
1. Každý dokument má svou verzi
2. Změny jsou logovány v CHANGELOG
3. Major verze vyžaduje schválení
4. Minor verze vyžaduje review
5. Patch verze může být automatická

### Časová razítka
- Všechny dokumenty mají `Poslední aktualizace`
- Formát: YYYY-MM-DD
- Povinné pro všechny typy

---

## 4. Schvalovací proces

### Úrovně schválení
| Typ dokumentu | Reviewer | Schvalovatel |
|---------------|----------|--------------|
| Technická | Senior Dev | Tech Lead |
| Projektová | PM | CEO |
| Právní | Legal | CEO + Legal |
| Marketingová | Marketing Lead | CMO |

### Workflow
```
1. Návrh → 2. Review → 3. Úpravy → 4. Schválení → 5. Publikace
```

### Časové rámce
- **Review**: 2 pracovní dny
- **Úpravy**: 3 pracovní dny
- **Schválení**: 1 pracovní den
- **Publikace**: Ihned po schválení

---

## 5. Přístupová práva

### Role
| Role | Čtení | Zápis | Schvalování |
|------|-------|-------|-------------|
| Viewer | ✅ | ❌ | ❌ |
| Editor | ✅ | ✅ | ❌ |
| Reviewer | ✅ | ✅ | ✅ |
| Admin | ✅ | ✅ | ✅ |

### Oprávnění
- **Viewer**: Čte všechny dokumenty
- **Editor**: Upravuje přiřazené dokumenty
- **Reviewer**: Review a komentáře
- **Admin**: Plná správa

### Folder struktura
```
docs/
├── README.md              # Viewer
├── DOKUMENTACE.md         # Editor
├── CHANGELOG.md           # Editor + Auto
├── UPDATE-INFRA.md        # Editor
├── POLITIKA-RAZENI.md     # Admin
├── SOUDNI-DOKUMENTACE.md  # Admin + Legal
├── tiktok-*.md            # Marketing
└── archivum/              # Admin only
```

---

## 6. Archivace

### Staré verze
- Major verze se archivují do `docs/archivum/`
- Minor verze se přepisují
- Patch verze se přepisují

### Retence
| Typ | Doba archivace |
|-----|----------------|
| Technická | 5 let |
| Projektová | 3 roky |
| Právní | 10 let |
| Marketingová | 2 roky |

### Formát archivace
```
docs/archivum/YYYY-MM-DD-dokument-v1.0.0.md
```

---

## 7. Kontrola kvality

### Standardy
1. **Jasnost** - srozumitelný jazyk
2. **Úplnost** - všechny informace
3. **Konzistence** - stejný formát
4. **Aktuálnost** - pravidelné aktualizace
5. **Dostupnost** - snadný přístup

### Kontrolní seznam
- [ ] Formát odpovídá šabloně
- [ ] Verze je správná
- [ ] Datum je aktuální
- [ ] Kontakty jsou platné
- [ ] Odkazy fungují
- [ ] Kontrola pravopisu

### Automatizace
- Linting pro Markdown
- Spell check
- Link validation
- Version bump detection

---

## 8. Politické řízení

### Principy
1. **Transparentnost** - všechny dokumenty jsou dostupné
2. **Odpovědnost** - každý dokument má vlastníka
3. **Kvalita** - review proces je povinný
4. **Konzistence** - jednotný formát
5. **Aktuálnost** - pravidelné aktualizace

### Odpovědnosti
| Role | Odpovědnost |
|------|-------------|
| CEO | Schvalování strategických dokumentů |
| CTO | Technická dokumentace |
| PM | Projektová dokumentace |
| Legal | Právní dokumentace |
| Marketing | Marketingová dokumentace |

### Eskaлаce
1. **Úroveň 1**: Editor → Reviewer
2. **Úroveň 2**: Reviewer → Vlastník oddělení
3. **Úroveň 3**: Vlastník → CEO
4. **Úroveň 4**: CEO → Právní/Board

### Kontroly
- **Týdenní**: Review nových dokumentů
- **Měsíční**: Kontrola aktuálnosti
- **Čtvrtletní**: Audit přístupů
- **Roční**: Přehled politik

### Sankce
- Nedodržení termínů → mmap
- Špatná kvalita → oprava
- Porušení přístupů → odebrání práv
- Únik dat → disciplinární řízení

---

## Kontakt

- **Mateřská společnost:** MaxiGreens a.s.
- **Správce dokumentace:** LoveDeal tým (MaxiGreens a.s.)
- **Poslední audit:** 2026-09-20
- **Příští audit:** 2026-12-20
