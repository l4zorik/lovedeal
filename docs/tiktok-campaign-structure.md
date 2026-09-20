# TikTok - Struktura Kampane

## 3-tier hierarchie
```
Campaign (1 cil)
  └── Ad Group (2-4 na campaign)
        └── Ad (3-5 kreativ na group)
```

## Campaign level
- Advertising objective (co chcete dosahnout)
- Budget (daily nebo lifetime)
- A/B test (volitelne)

### Cile kampani
| Cil | Popis |
|-----|-------|
| Reach | Maximalizace impressionu |
| Traffic | Kliknuti na landing page |
| Video Views | Zobrazeni videa 6s+ |
| Lead Generation | Ziskani kontaktnich udaju |
| Conversions | Konverze na webu/appce |
| App Install | Nainstalovani aplikace |
| Community Interaction | Page views, follows |

## Ad Group level
- Placements (TikTok, Pangle, oboji)
- Targeting (demographics, interests, behaviors)
- Schedule (start, end, day-parting)
- Budget (daily spend)
- Bidding strategy (Cost Cap, Max Delivery)
- Optimization goal (CPA, CPC, CPM)

## Ad level
- Creative (video/image)
- Ad text (caption)
- CTA button
- Landing page URL
- Profile (avatar, jmeno)

---

## Best practices pro strukturu

### Pocet ad groups
- 2-4 ad groups na campaign
- Kazdy ad group = jina audience
- Testujte Interest vs Lookalike vs Broad

### Pocet kreativ
- 3-5 kreativ na ad group
- Tydeni refresh proti fatigue
- Testujte ruzne hooky, ne obsah

### Budget
- Min. 10-50x target CPA na ad group
- CBO pro automatickou distribuci
- Nedelejte zmeny behem learning phase

### Naming convention
```
Campaign: [Cil] - [Produkt] - [Datum]
Ad Group: [Audience] - [Targeting] - [Bid]
Ad: [Hook] - [Format] - [Varianta]
```

---

## Priklad struktury pro LoveDeal

```
Campaign: Conversions - LoveDeal App - 2026-Q1
├── Ad Group: Broad Czech - 18-35 - Cost Cap 15 CZK
│   ├── Ad: Hook "Slevy co najdes jinde" - InFeed - Var A
│   ├── Ad: Hook "Usetri 50% na módě" - InFeed - Var B
│   └── Ad: Hook "TikTok style dealů" - Spark - Var C
├── Ad Group: Lookalike Buyers - Narrow - Cost Cap 12 CZK
│   ├── Ad: UGC Creator review - InFeed - Var A
│   └── Ad: Before/After sleva - InFeed - Var B
└── Ad Group: Retargeting - Cart Abandoners - Max Delivery
    ├── Ad: "Zapomnel jsi neco?" - InFeed - Var A
    └── Ad: "Tvuj deal ceka" - InFeed - Var B
```
