# LoveDeal — Monetizace

## Přehled

LoveDeal monetizuje přes **3 hlavní pilíře**: reklamy, premium předplatné a B2B partnerství.

---

## Pilíř 1: Reklamy (In-App Advertising)

### Typy reklam

| Typ | Umístění | CPM (odhad) | UX dopad |
|-----|----------|-------------|----------|
| Native Deal Card | SwipeFeed (každých 5) | €3-8 | Nízký |
| Banner (spodní) | Discover, Profile | €1-3 | Střední |
| Interstitial | Mezi swipe session | €8-15 | Vysoký |
| Rewarded Video | Za bonusové body | €12-25 | Nízký (opt-in) |
| Sponsored Livestream | Livestream bar | €20-50 | Nízký |

### TikTok Ads Integration

- **TikTok Pixel**: Sledování konverzí z reklam
- **Events API**: Server-side tracking (CAPI)
- **Campaign Structure**: Awareness → Consideration → Conversion
- **Targeting**: CZ, SK, PL + EU generický
- **Creative**: 15-60s vertical video, UGC style

### Revenue projekce (reklamy)

| Úroveň | MAU | RPM | Měsíční revenue |
|--------|-----|-----|-----------------|
| Alpha | 100 | €0 | €0 |
| Beta | 1K | €2 | €2K |
| V1.0 | 10K | €3 | €30K |
| V1.5 | 50K | €4 | €200K |
| V2.0 | 100K | €5 | €500K |
| V3.0 | 1M | €6 | €6M |

---

## Pilíř 2: Premium předplatné (LoveDeal Pro)

### Free tier (současný)
- Plný přístup k feedu
- Základní notifikace
- 1 profil
- Reklamy (nativní + banner)

### Pro tier — €4.99/měsíc nebo €49.99/rok

| Funkce | Free | Pro |
|--------|------|-----|
| Feed | ✅ | ✅ (ad-free) |
| Reklamy | ✅ (nativní) | ❌ (žádné) |
| Notifikace | Základní | Personalizované + AI |
| Hledání | Text | Semantic (AI) |
| Livestream | Sledování | Sledování + chat + nákup |
| Offline | ❌ | ✅ (cache) |
| Profil | 1 | Neomezený |
| Export dealů | ❌ | ✅ (CSV, PDF) |
| Priority support | ❌ | ✅ (24h) |
| Early access | ❌ | ✅ (nové funkce) |
| Enigma AI | Základní | Plný přístup |

### Pro tier — €9.99/měsíc (Business)

Vše z Pro +:
- API přístup
- Bulk import/export
- Analytics dashboard
- Multi-user (tým)
- White-label reports
- Dedicated support

### Revenue projekce (předplatné)

| Úroveň | Pro uživatelé | ARPU | Měsíční revenue |
|--------|---------------|------|-----------------|
| V1.0 | 500 | €5 | €2.5K |
| V1.5 | 5K | €5 | €25K |
| V2.0 | 20K | €6 | €120K |
| V3.0 | 100K | €7 | €700K |

---

## Pilíř 3: B2B Partnerství (Obchody & Brandy)

### Obchodní model

```
Obchod (MaxiGreens, Alza, Mall)
    │
    ├── Placený listing ─────── €50-500/měsíc (výše v feedu)
    │
    ├── Sponsored deals ─────── €100-1000/deal (zvýraznění)
    │
    ├── Livestream partnership ─ €500-5000/event (brand integration)
    │
    ├── Data insights ────────── €200-2000/měsíc (anonymizovaná data)
    │
    └── API access ───────────── €100-500/měsíc (feed API)
```

### Revenue projekce (B2B)

| Úroveň | Partneři | ARPM | Měsíční revenue |
|--------|----------|------|-----------------|
| V1.0 | 10 | €200 | €2K |
| V1.5 | 50 | €300 | €15K |
| V2.0 | 200 | €400 | €80K |
| V3.0 | 1000 | €500 | €500K |

---

## Kombinovaná revenue projekce

| Rok | Úroveň | Reklamy | Předplatné | B2B | Celkem |
|-----|--------|---------|------------|-----|--------|
| 2026 | Alpha | €0 | €0 | €0 | €0 |
| 2027 Q1 | V1.0 | €30K | €2.5K | €2K | €34.5K/měs |
| 2027 Q3 | V1.5 | €200K | €25K | €15K | €240K/měs |
| 2028 | V2.0 | €500K | €120K | €80K | €700K/měs |
| 2029 | V3.0 | €6M | €700K | €500K | €7.2M/měs |

---

## Náklady (odhad)

| Položka | Měsíční náklad |
|---------|---------------|
| Server (Firebase/Supabase) | €100-10K |
| CDN + storage | €50-500 |
| AI (Enigma API) | €200-5K |
| App Store poplatky | 15-30% revenue |
| Marketing | €500-10K |
| Vývoj (tým) | €10K-50K |
| **Celkem** | **€11K-76K** |

---

## Časová osa monetizace

```
2026 Q3-Q4 ─── Alpha (žádná monetizace)
2027 Q1 ─────── V1.0 Basic Ads (CPM nativní)
2027 Q2 ─────── V1.0 Premium (€4.99)
2027 Q3 ─────── V1.5 B2B partnerships
2027 Q4 ─────── V1.5 TikTok Ads integration
2028 Q1 ─────── V2.0 Pro tier (€9.99)
2028 Q2 ─────── V2.0 Data insights
2028 Q3 ─────── V2.0 Livestream monetization
2029 ────────── V3.0 Global expansion
```

---

## Key Metrics (KPIs)

| Metrika | V1.0 cíl | V2.0 cíl | V3.0 cíl |
|---------|----------|----------|----------|
| DAU/MAU ratio | 20% | 30% | 40% |
| Retention D1 | 40% | 50% | 60% |
| Retention D7 | 20% | 30% | 40% |
| Retention D30 | 10% | 20% | 30% |
| ARPU (free) | €0.30 | €0.50 | €0.80 |
| ARPU (pro) | €5 | €7 | €10 |
| Conversion (free→pro) | 2% | 5% | 8% |
| CPM (ads) | €3 | €5 | €7 |
| LTV (user) | €2 | €8 | €20 |

---

*„Monetizace není zlo. Je to palivo, které umožňuje milionům lidí nakupovat chytřeji."*
— LoveDeal Business Model, 2026
