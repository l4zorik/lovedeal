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
