# TikTok Reklamni System - Technicka Dokumentace

## Obsah
1. Architektura aukce
2. Bidding system
3. Reklamni formaty
4. Targeting
5. Creative best practices
6. Pixel a Events API
7. Marketing API
8. Struktura kampane
9. LoveDeal aplikace

---

## 1. Architektura aukce

Kazdy impression je vyhodnocen v realnem case:

```
Ad Rank = Bid Price x Relevance Score x User Context
```

### Klicove komponenty
- **Ads Manager** - Webovy interface
- **Marketing API** - REST API pro programatickou spravu
- **Events API 2.0** - Server-side tracking
- **TikTok Pixel** - Client-side tracking (JS)
- **App Events SDK** - Native SDK pro mobilni app
- **Creative Center** - Nastroje pro tvorbu kreativ

---

## 2. Bidding system

### Bidding metody

| Metoda | Pocitani | Billing | Pouziti |
|--------|----------|---------|---------|
| CPM | (cost / impressions) x 1000 | Za impression | Reach |
| oCPM | (cost / impressions) x 1000 | Za impression | Conversions, App Install |
| CPV | cost / views x 1000 | Za 6-sec view | Video views |
| CPC | cost / clicks | Za click | Traffic, Conversions |

### Bidding strategie

**Target Cost per Result (goal-based):**
- Nastavite cilene CPA
- System se snazi udrzet average CPA kolem bidu
- Budget = 10-50x target CPA

**Maximum Results (spend-based):**
- Maximalizuje objem vysledku
- Neoptimalizuje k cilene CPA
- Vhodne pro maximalizaci objemu

### Learning Phase
- Trva ~25 konverzi nebo 7 dni
- CPM muze byt vyssi behem learningu
- Nedelejte velke zmeny bidu/budgetu

### Best practices
1. Zacatte s sirsim targetovanim
2. Budget na 10-50x target CPA
3. Zadne velke zmeny v prvnich 3-7 dnech
4. Pocatecni bid vyssi nez postupne zvysovani
5. CBO (Campaign Budget Optimization) = +22% impressions
