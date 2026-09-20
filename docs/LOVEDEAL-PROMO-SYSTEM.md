# LOVEDEAL PROMO SYSTEM — Technicka Speciala

> Plny promo/reklamni system inspirovany TikTok Ads.
> 1:1 kvalita, cesky trh primarne, EU sekundarne.

---

## 1. ARCHITEKTURA SYSTEMU

### 1.1 Hierarchy kampani
- **Kampan (Campaign)**: Cil (awareness, traffic, conversions, app installs)
- **Reklamni skupina (Ad Group)**: Cileni, rozpoct, casovani, umisteni
- **Reklama (Ad)**: Jednotlivy reklamni prvek s kreativou
- **Kreativa (Creative)**: Medium (foto/video), text, CTA, landing

### 1.2 Typy kampani (LoveDeal)
- **Awareness** — Znamost znacky | CPM | MaxiGreens, velke retzce
- **Traffic** — Kliknuti na web/obchod | CPC | E-shopy, restaurace
- **Conversions** — Nakup, registrace | CPA | E-shopy, sluzby
- **App Installs** — Stazeni apky | CPI | Jine appky
- **Lead Generation** — Sber emailu/telefonu | CPL | B2B, sluzby
- **Deal Boost** — Zvyseni viditelnosti dealu | CPE | Merchanti, influenceri
- **Livestream Promo** — Zvyseni sledovanosti streamu | CPV | Influenceri

---

## 2. UMISTENI REKLAM (PLACEMENTS)

### 2.1 In-Feed Ads
- Pozice: Mezi organickymi dealy v hlavnim feedu
- Format: Identicky s DealCard (foto/video + popis + cena + CTA)
- Oznaceni: Maly badge Reklama / Sponzorovano (transparentni, ale viditelny)
- Chovani: Lze preskocit (swipe nahoru), lze interagovat (like, save, share)
- Frekvence: Max 1 reklama na 5 organickych dealu (pomer 1:5)
- Algoritmus: razeni dle relevance + bidu + kvality kreativy

### 2.2 Brand Takeover
- Pozice: Cela obrazovka pri spusteni appky
- Format: Full-screen foto/video (3-5 sekund), pot preskoceni
- Omezeni: Max 1 takeover denne na uzivatele
- Cena: Premium (CPM 50-200 Kc)

### 2.3 TopView
- Pozice: Prvni prvek v feedu (nahore)
- Format: Video 9:16 (az 60s), auto-play, muted
- Vyhoda: Garantovana pozice #1

### 2.4 Branded Deal Cards
- Pozice: Specialni karta v feedu s brandingem inzerenta
- Format: Vlastni barvy, logo, CTA tlacitko
- Funkce: Kliknuti -> detail dealu -> presmerovani na e-shop/obchod

### 2.5 Livestream Overlay Ads
- Pozice: Banner behem livestreamu (spodni 20%)
- Format: Maly deal card overlay, tap-to-expand

### 2.6 Profile Boost
- Pozice: Doporucene profily v sekci Objevit
- Format: Zvyrazneny profil s badge Doporuceno

### 2.7 Search Ads
- Pozice: Vysledky vyhledavani (top 3 pozice)
- Format: Reklamni deal card oznacena Reklama
- Funkce: PPC (pay per click), relevance-based ranking

---

## 3. CILENI (TARGETING)

### 3.1 Demograficke
- **Vek**: 13-17, 18-24, 25-34, 35-44, 45-54, 55+ (nebo custom range)
- **Pohlavi**: Muz, Zena, Ostatni, Bez omezeni
- **Lokace**: CZ (primarne), SK, PL, DE, AT, HU + mesta/regiony
- **Jazyk**: Cestina, Slovenstina, Polstina, Nemcina, Madarstina
- **Zarizeni**: iOS, Android, verze OS
- **Sit**: WiFi, mobilni, oboji

### 3.2 zajmy (Interest Targeting)
- **Kategorie dealu**: Jidlo, Elektronika, Moda, Domacnost, Sport, Kultura, Cestovani, Auto, Zdravi, Zvirata
- **Chovani v appce**: Aktivni kupujici, Hledaci slev, Premium uzivatele, Novi uzivatele
- **Interakce**: Libilo se X+ dealu v kategorii, Ulozilo X+ dealu, Sdilelo X+ dealu
- **Frekvence navstev**: Denni, Tydenni, Mesicni, Pripadnostni

### 3.3 Chovani (Behavioral)
- **Nakupni umysl**: Hledal konkretni produkt, Porovnaval ceny, Pridal do seznamu
- **Geolokace**: Byl v konkretnim obchode/oblasti (geofencing)
- **Casove vzorce**: Aktivni v urcite hodiny/dny
- **Engagement level**: Vysoky (10+ interakci/teden), Stredni (3-9), Nizky (0-2)

### 3.4 Custom Audiences (vlastni publikum)
- **Email list**: Import emailu (SHA-256 hash pro matchovani)
- **App events**: Uzivatele kteri: dokoncili nakup, opustili kosik, zaregistrovali se
- **Web events**: Pixel tracking (navsteva webu, pridani do kosiku, nakup)
- **Engagement**: Uzivatele kteri: libili se deal, ulozili deal, sdileli deal, navstivili profil

### 3.5 Lookalike Audiences (podobne publikum)
- **Source**: Custom audience (napr. kupujici za poslednich 30 dni)
- **Similarity**: 1% (nejpodobnejsi), 3%, 5%, 10% (nejsirsi)
- **Omezeni**: Min 1000 uzivatelu v source audience
- **Aktualizace**: Automaticky kazdych 7 dni

### 3.6 Retargeting
- **Window**: 7, 14, 30, 60, 90 dni zpetne
- **Triggers**: Videl deal ale neklikl, Kliknul ale nenakoupil, Pridal do kosiku ale nedokoncil
- **Exclusions**: Jiz nakoupili, Blokovali reklamy, Jsou v Custom Audience

---

## 4. BIDDING & ROZPOCET

### 4.1 Bidding Models
- **CPM** — Cost per 1000 impressions | Awareness, Brand Awareness
- **CPC** — Cost per click | Traffic, Consideration
- **CPA** — Cost per action (nakup, registrace) | Conversions
- **CPI** — Cost per install | App installs
- **oCPM** — Optimized CPM (auto-bidding) | Conversions (automaticky optimalizuje)
- **CPV** — Cost per view (video) | Video views, Livestream
- **CPE** — Cost per engagement | Deal boost

### 4.2 Automaticky bidding (Auto-Bid)
- System automaticky nastavi bid pro maximalni vysledky v ramci rozpoctu
- Algoritmus: Machine learning na historickych datech + real-time auction
- Min bid: 0.50 Kc (CPC), 5 Kc (CPM)
- Max bid: nastaveno inzerentem

### 4.3 Manualni bidding
- Inzerent nastavi max cenu za kliknuti/zobrazeni/akci
- System se ridi limitem, ale muze byt pod maximum
- Vhodne pro zkusene inzerenty s daty

### 4.4 Rozpoct
- **Denni rozpoct**: Min 50 Kc/den, max neomezeno
- **Celkovej rozpoct**: Min 500 Kc, max neomezeno
- **Platba**: Kreditni karta, Apple Pay, Google Pay, bankovni prevod
- **Fakturace**: Mesicni pro B2B (s ICO/DIC)

### 4.5 Aukce (Auction)
- **Skore reklamy = Bid x Kvalita kreativy x Relevance skore**
- **Bid**: Nabidnuta cena
- **Kvalita kreativy**: Hodnoceni (CTR, doba zobrazeni, interakce)
- **Relevance**: Shoda s cilovym publikem, obsah dealu
- **Vysledek**: Vyhrava nejvysi skore, ale cena = druha nejvyssi + 0.01 Kc

### 5.2 Prvky reklamni karty
Foto/Video + Badge Reklama + Obchod + Nazev dealu + Popis + Sleva + Cenal + Hodnoceni + Like/Ulozit/Sdilet/Koupit

---

## 6. ANALYTICS & REPORTING

### 6.1 Metriky (per kampan)
- **Impressions** — Pocet zobrazeni
- **Reach** — Unikatni uzivatele
- **Frequency** — Prumerna frekvence (Impressions / Reach)
- **Clicks** — Kliknuti
- **CTR** — Click-through rate (Clicks / Impressions x 100)
- **CPC** — Cost per click (Spend / Clicks)
- **CPM** — Cost per mille (Spend / Impressions x 1000)
- **Conversions** — Pocet dokoncenych akci
- **CVR** — Conversion rate (Conversions / Clicks x 100)
- **CPA** — Cost per action (Spend / Conversions)
- **ROAS** — Return on ad spend (Revenue / Spend)
- **Engagement** — Likes + Saves + Shares
- **Video Views** — Zhlédnuti videa (3s+ in-feed, cele takeover)
- **VTR** — View-through rate (Video Views / Impressions x 100)
- **Bounce Rate** — Okamzity odchod
- **Time on Deal** — Prumerna doba na strance dealu

### 6.2 Dashboard (inzerent)
- Prehled: Celkove vysledky, trend, srovnani s minulym obdobim
- Grafy: Impressions/time, Clicks/time, Conversions/time, Spend/time
- Tabulka: Detailni data po dnech/hodinach
- Export: CSV, PDF, API endpoint
- Real-time: Live data s 5min zpozdenim

### 6.3 Attribution (pricteni)
- **Last click** — Konverze se pripocte poslednimu kliknuti
- **First click** — Konverze se pripocte prvnimu kliknuti
- **Linear** — Rovnomerne mezi vsemi touchpointy
- **Time decay** — Vce vahy poslednim interakcim
- **Position-based** — 40% prvni, 40% posledni, 20% mezi

### 6.4 Reporting API
GET /api/v1/campaigns/{id}/report?from=2026-09-01&to=2026-09-20&metrics=impressions,clicks,conversions
- Rate limit: 100 req/min
- Format: JSON, CSV
- Webhooks: Push notifikace pri dosazeni cilu

---

## 7. MODERACE & KVALITA

### 7.1 Pravidla reklam
- **Zakazany obsah**: Alkohol (do 18), tabak, zbrane, gambling, politika, nabozenstvi
- **Povinne udaje**: Cena, prodejce, platnost, podminky
- **Transparentnost**: Jasne oznaceni Reklama / Sponzorovano
- **Kvalita**: Min 720p foto, min 720p video, citekly text

### 7.2 AI Moderace
- **OCR**: Kontrola textu na obrazu (cena, podminky)
- **Image recognition**: Detekce zakazaneho obsahu
- **Text analysis**: NLP pro kontrolu popisu (klamava reklama)
- **Duplicate detection**: Detekce duplicitnich reklam
- **Spam detection**: Detekce spamu a podvodu

### 7.3 Review proces
1. **Auto-review** (pod 1 min): AI kontrola zakladnich pravidel
2. **Fast-track** (pod 1 hod): Pro trusted inzerenty (historie bez poruseni)
3. **Manual review** (pod 24 hod): Pro nove inzerenty nebo flagged ads
4. **Appeal**: Odvolani zamitnute reklamy (do 7 dni)

### 7.4 Trust Score (duverihodnost)
- **Novy inzerent**: Score 0, vse manualni review
- **Po 10 schvalenych reklamach**: Score +10, auto-review
- **Po 50 schvalenych**: Score +25, fast-track
- **Poruseni pravidel**: Score -20 az -50 (podle zavaznosti)
- **Ban**: Score pod -50 nebo 3 zavazna poruseni

---

## 8. INZERENTSKY PORTAL (MERCHANT ADS MANAGER)

### 8.1 Dashboard
- Prehled kampani: Active, Paused, Completed
- Quick stats: Spend today, Impressions today, Conversions today
- Notifications: Schvaleni/reject reklamy, budget alerts
- Tips: Doporuceni pro zlepseni vysledku

### 8.2 Tvurce kampani (Campaign Creator) — 6 kroku
Krok 1: Cil kampane -> [Awareness] [Traffic] [Conversions] [App Installs] [Deal Boost]
Krok 2: Rozpoct a casovani -> Denni rozpoct Kc, Celkovy rozpoct Kc, Datum zahajeni, Datum ukonceni
Krok 3: Cileni -> Lokace, Vek, Pohlavi, zajmy, Custom audience, Lookalike
Krok 4: Umisteni -> [In-feed] [Takeover] [TopView] [Search] [Livestream]
Krok 5: Kreativa -> Nahrat foto/video, Text reklamy, CTA tlacitko, Landing URL
Krok 6: Prehled a spusteni -> Shrnuti vsech nastaveni, Spustit kampan

### 8.3 Billing
- **Kreditni karta**: Visa, Mastercard, Apple Pay, Google Pay
- **Bankovni prevod**: Pro B2B (faktura s 30 denni splatnosti)
- **Predplaceny kredit**: Dobiti kreditu, cerpani z kreditu
- **Faktury**: Automaticke mesicni faktury (PDF ke stazeni)
- **DPH**: Automaticky vypocet DPH dle sidla inzerenta

---

## 9. ALGORITMUS RAZENI REKLAM

### 9.1 Ranking Formula
Ad Score = 0.35 x Bid + 0.30 x Quality + 0.35 x Relevance + 0.10 x Freshness

### 9.2 Quality Score (1-10)
- **CTR**: Ocekavany vs skutecny click-through rate
- **Engagement rate**: Likes, saves, shares na reklamu
- **Relevance**: Shoda s cilovym publikem
- **Landing experience**: Rychlost nacteni, kvalita landing page

### 9.3 Relevance Score (1-10)
- **Content match**: Shoda obsahu reklamy s zajmy uzivatele
- **User behavior**: Uzivatel historicky reaguje na podobne reklamy
- **Context**: Cas, denni doba, poloha, zarizeni

### 9.4 Ad Fatigue Management
- **Frequency cap**: Max 3 zobrazeni na uzivatele denne
- **Creative rotation**: Automaticka rotace kreativ po 7 dnech
- **Fatigue detection**: Pokud CTR klesne o 30% -> notifikace inzerentovi
- **Auto-pause**: Pokud CTR klesne o 50% -> automaticke pozastaveni
- **Creative refresh**: Navrh na novou kreativu po 14 dnech

---

## 10. REPUTACNI SYSTEM INZERENTU

### 10.1 Trust Score (100-bodovy system)
- **Novy inzerent**: 50 bodu (neutralni start)
- **Za kazdou schvalenou reklamu**: +1 bod (max +30)
- **Za CTR nad 2%**: +2 body (kvalitni kreativa)
- **Za ROAS nad 3.0**: +5 body (efektivni kampan)
- **Za mesicni utratu nad 5000 Kc**: +3 body (verny zakaznik)
- **Za poruseni pravidel**: -10 az -30 bodu (podle zavaznosti)
- **Za zamitnuti reklamy**: -5 bodu
- **Za stiznost od uzivatele**: -3 body

### 10.2 Urovne inzerentu
- **Bronze** (0-29 bodu): Zakladni pristup, vse manualni review
- **Silver** (30-59 bodu): Auto-review, fast-track, zakladni analytics
- **Gold** (60-79 bodu): Priority support, rozsirena analytics, A/B testing
- **Platinum** (80-100 bodu): Dedicated account manager, premium placements, custom reports

### 10.3 Benefity podle urovne
- **Bronze**: Standartni ceny, zakladni podpora, 1 kampan
- **Silver**: 5% sleva na bidding, priorita v aukci, 5 kampani
- **Gold**: 10% sleva, premium umisteni, 20 kampani, A/B testing
- **Platinum**: 15% sleva, dedicated support, neomezeno kampani, custom analytics, prednostni review

### 10.4 Decay a obnoveni
- **Decay**: -1 bod za mesic neaktivity (zadna utrata)
- **Obnoveni**: 5 bodu za prvnich 1000 Kc utraty po neaktivite
- **Reset**: Po 6 mesicich neaktivity se score vynuluje na 30

---

## 11. IMPLEMENTACNI ROADMAPA

### Faze 1 — MVP (tyden 1-4)
- [ ] Zakladni In-Feed Ads (foto + text + CTA)
- [ ] Manualni bidding (CPC, CPM)
- [ ] Zakladni cileni (vek, pohlavi, lokace, kategorie)
- [ ] Auto-review (zakladni AI)
- [ ] Fakturace (kreditni karta)
- [ ] Zakladni dashboard (impressions, clicks, spend)

### Faze 2 — Growth (tyden 5-8)
- [ ] Brand Takeover + TopView
- [ ] Auto-bidding (oCPM)
- [ ] Interest + Behavioral targeting
- [ ] Custom Audiences
- [ ] Video ads (9:16)
- [ ] Rozsirena analytics (CTR, CVR, ROAS)
- [ ] Merchant portal (zakladni)

### Faze 3 — Scale (tyden 9-12)
- [ ] Lookalike Audiences
- [ ] Retargeting
- [ ] Search Ads
- [ ] Livestream Overlay Ads
- [ ] A/B testing kreativ
- [ ] Trust Score + reputacni system
- [ ] Creative Tools (sablony, auto-generace)

### Faze 4 — Premium (tyden 13-16)
- [ ] Profile Boost
- [ ] Branded Deal Cards
- [ ] Lead Generation kampane
- [ ] Reporting API
- [ ] Advanced attribution (multi-touch)
- [ ] B2B billing (faktury, ICO/DIC)
- [ ] Predictive analytics (ML budouci vysledky)

---

## 12. TECHNICKA ARCHITEKTURA (backend)

### 12.1 Sluzby
- **Ad Service**: Sprava kampani, reklam, kreativ
- **Bidding Engine**: Real-time aukce, vypocet skore
- **Targeting Service**: Dle zamerovani, audience segmentace
- **Moderation Service**: AI review, trust scoring
- **Analytics Service**: Sber, zpracovani, reportovani metrik
- **Billing Service**: Fakturace, platby, kreditni system
- **Creative Service**: Uloziste medii, generace kreativ

### 12.2 Data model
- **Campaign**: id, advertiser_id, objective, budget_daily, budget_total, status, start_date, end_date
- **AdGroup**: id, campaign_id, targeting_json, bid_amount, bid_type, placement, schedule
- **Ad**: id, adgroup_id, creative_id, status, cta_type, landing_url
- **Creative**: id, media_url, media_type, text, template_id
- **Impression**: id, ad_id, user_id, timestamp, device, geo, ip_hash
- **Click**: id, impression_id, ad_id, user_id, timestamp
- **Conversion**: id, click_id, ad_id, user_id, action_type, revenue, timestamp
- **Advertiser**: id, name, email, trust_score, tier, billing_info, ico, dic

### 12.3 API endpoints
- POST /api/v1/campaigns — Vytvorit kampan
- GET /api/v1/campaigns/{id} — Ziskat kampan
- PUT /api/v1/campaigns/{id} — Upravit kampan
- POST /api/v1/campaigns/{id}/pause — Pozastavit
- POST /api/v1/campaigns/{id}/resume — Spustit
- GET /api/v1/campaigns/{id}/report — Report metrik
- POST /api/v1/creatives — Nahrat kreativu
- POST /api/v1/audiences — Vytvorit custom audience
- GET /api/v1/advertiser/dashboard — Advertiser dashboard
- POST /api/v1/billing/topup — Dobit kredit
- GET /api/v1/billing/invoices — Faktury

---

## 13. METRIKY & KPIs PRO MAXIGREENS

### 13.1 Tržní metriky
- **ARPDAU** (Average Revenue Per Daily Active User): Cil 0.50 Kc
- **Ad Fill Rate**: Podíl reklamních požadavků které se zobrazí (Cil 95%+)
- **eCPM** (effective CPM): Průměrný výnos na 1000 zobrazení (Cil 30-80 Kc)
- **Ad Revenue / Total Revenue**: Podíl reklamního příjmu (Cil 60-80%)

### 13.2 Inzerentské metriky
- **Avg CTR**: Průměrný click-through rate všech kampaní (Cil 1.5-3%)
- **Avg CVR**: Průměrný conversion rate (Cil 2-5%)
- **Avg ROAS**: Průměrný return on ad spend (Cil 2.0+)
- **Churn Rate**: Měsíční odchod inzerentů (Cil pod 5%)
- **LTV inzerenta**: Lifetime value (Cil 3x CPA)

### 13.3 Uživatelské metriky
- **Ad Tolerance**: Podíl uživatelů kteří neblokují reklamy (Cil 90%+)
- **Ad Engagement Rate**: Interakce s reklamami vs organický obsah (Cil 80%+)
- **Uninstall Rate**: Míra odinstalací po zobrazení reklamy (Cil pod 0.1%)
- **Session Time Impact**: Změna délky sezení po zavedení reklam (Cil: neutrální nebo +)

---

## 14. REVENUE PROJEKCE

### Mesic 1-3 (MVP)
- Pocet inzerentu: 10-30
- Prumerna utrata/inzerent: 1000 Kc/mesic
- Mesicni prijem: 10 000 - 30 000 Kc
- eCPM: 20 Kc

### Mesic 4-6 (Growth)
- Pocet inzerentu: 50-150
- Prumerna utrata/inzerent: 3000 Kc/mesic
- Mesicni prijem: 150 000 - 450 000 Kc
- eCPM: 35 Kc

### Mesic 7-12 (Scale)
- Pocet inzerentu: 200-500
- Prumerna utrata/inzerent: 5000 Kc/mesic
- Mesicni prijem: 1 000 000 - 2 500 000 Kc
- eCPM: 50 Kc

### Rok 2 (Premium)
- Pocet inzerentu: 1000+
- Prumerna utrata/inzerent: 8000 Kc/mesic
- Mesicni prijem: 8 000 000+ Kc
- eCPM: 65 Kc
- B2B segment: 20% inzerentu generuje 60% prijmu

---

## 15. SHRNUTI — TikTok-Level Promo System

LoveDeal promo system pokryva vsechny klicove oblasti kvalitni reklamni platformy:

1. **7 typu kampani** (Awareness, Traffic, Conversions, App Installs, Leads, Deal Boost, Livestream)
2. **7 umisteni** (In-feed, Takeover, TopView, Branded Cards, Livestream Overlay, Profile Boost, Search Ads)
3. **6 dimenzi cileni** (Demografie, zajmy, chovani, Custom Audiences, Lookalike, Retargeting)
4. **7 bidding modelu** (CPM, CPC, CPA, CPI, oCPM, CPV, CPE)
5. **4 kreativni formaty** (Foto, Video, Kolekce, Lottie)
6. **16+ metrik** v analytics dashboardu
7. **4 urovne inzerentu** (Bronze, Silver, Gold, Platinum)
8. **100-bodovy reputacni system**
9. **4-fazova implementace** (MVP -> Growth -> Scale -> Premium)
10. **Revenue projekce** do 2. roku: 8M+ Kc/mesic

Cil: Monetizace pres reklamu bude primarni zdroj prijmu LoveDeal, 
s ambici stat se hlavnim reklamnim kanalem pro ceske a slovenske obchodniky.
