# TikTok - Metriky a Reporting

## Klicove metriky

### Awareness metriky
| Metrika | Popis | Vypocet |
|---------|-------|---------|
| Impressions | Pocet zobrazeni | - |
| Reach | Pocet unikatnich uzivatelu | - |
| CPM | Cost per 1000 impressions | (cost / impressions) x 1000 |
| Frequency | Prumerny pocet zobrazeni na uzivatele | impressions / reach |

### Engagement metriky
| Metrika | Popis | Vypocet |
|---------|-------|---------|
| Clicks | Pocet kliknuti | - |
| CTR | Click-through rate | (clicks / impressions) x 100 |
| CPC | Cost per click | cost / clicks |
| Video Views | Pocet 6-sec viewu | - |
| CPV | Cost per view | cost / views |
| Video Completion | Dokonceni videa | completions / views x 100 |

### Conversion metriky
| Metrika | Popis | Vypocet |
|---------|-------|---------|
| Conversions | Pocet konverzi | - |
| CPA | Cost per action | cost / conversions |
| CVR | Conversion rate | (conversions / clicks) x 100 |
| ROAS | Return on ad spend | revenue / cost |
| Revenue | Prijem z reklam | - |

### App metriky
| Metrika | Popis | Vypocet |
|---------|-------|---------|
| Installs | Pocet nainstalovani | - |
| CPI | Cost per install | cost / installs |
| IPR | Install rate | (installs / clicks) x 100 |
| Retention | Uzivatelé po X dnech | retained / installed x 100 |

---

## Reportovani

### Typy reportu
1. **Basic report** - Zakladni metriky
2. **Campaign report** - Detail kampane
3. **Ad group report** - Detail skupiny
4. **Ad report** - Detail reklamy
5. **Audience report** - Demographics breakdown
6. **Placement report** - Kde se reklamy zobrazuji

### API Reporting
```
GET /report/integrated/get/
Parameters:
- advertiser_id
- report_type (BASIC, CAMPAIGN, AD_GROUP, AD)
- data_level (AUCTION_AD, AUCTION_ADGROUP, AUCTION_CAMPAIGN)
- dimensions (campaign_id, adgroup_id, ad_id, stat_time_day)
- metrics (impressions, clicks, cost, conversions, cpc, cpm, cpa)
- start_date
- end_date
- page
- page_size
```

### Datova latence
- Real-time: ~3 hodiny
- Daily report: ~6 hodin po konci dne
- Full data: 3 dny

---

## A/B Testing

### Co testovat
1. Hooky (prvni 3 sekundy)
2. CTA (text, umisteni)
3. Targeting (Interest vs Lookalike)
4. Bidding (Cost Cap vs Max Delivery)
5. Kreativy (UGC vs Product demo)

### Pravidla testovani
- Jeden promenna na test
- Min. 100 konverzi na variantu
- Test trva min. 7 dni
- Statisticka signifikance: 95%
