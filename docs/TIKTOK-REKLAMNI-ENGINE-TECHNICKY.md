# TikTok Reklamní Engine - Technická Dokumentace

> ⚙️ Praktický technický průvodce reklamním systémem
> 📐 Rozšířeno o Enigma 1+ principy

---

## 📐 ARCHITEKTURA ENGINU

```
┌─────────────────────────────────────────────────────────────────┐
│                    TIKTOK ADS ENGINE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   CLIENT    │    │   SERVER    │    │   ML CORE   │         │
│  │  (App/Web)  │───▶│  (API GW)   │───▶│  (Models)   │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                  │                  │                  │
│         ▼                  ▼                  ▼                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Pixel     │    │  Auction    │    │  Feature    │         │
│  │   SDK       │    │  Engine     │    │  Store      │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. ML PIPELINE - Jak se učí reklamy

### 1.1 Feature Engineering

```python
# Vstupní data pro ML model
USER_FEATURES = {
    # Demografie
    "age": int,                    # 18-65
    "gender": str,                 # M/F/Other
    "location": {lat, lng},        # Geolokace
    "device": str,                 # iOS/Android/Web
    "os_version": str,             # iOS 17, Android 14
    
    # Chování (historie)
    "watch_time_avg": float,       # Průměrný čas sledování
    "likes_count": int,            # Počet likeů
    "shares_count": int,           # Počet sdílení
    "comments_count": int,         # Počet komentářů
    "follows_count": int,          # Počet sledovaných
    "videos_watched": int,         # Počet zhlédnutých videí
    
    # Kontext
    "time_of_day": int,            # 0-23 hodina
    "day_of_week": int,            # 0-6 den v týdnu
    "session_duration": float,     # Délka relace (min)
    "battery_level": int,          # 0-100 %
    "connection_type": str,        # WiFi/4G/5G
    
    # Zájmy (z historie)
    "interest_categories": list,   # ["beauty", "food", "travel"]
    "content_preferences": dict,   # {category: score}
    "purchase_intent": float,      # 0.0-1.0
}

AD_FEATURES = {
    "ad_id": str,
    "advertiser_id": str,
    "creative_type": str,          # video/image/carousel
    "category": str,               # kategorie produktu
    "bid_price": float,            # CPC/CPM bid
    "budget_daily": float,         # Denní budget
    "target_audience": dict,       # Cílová skupina
    "historical_ctr": float,       # Historická CTR
    "historical_cvr": float,       # Historická konverze
    "quality_score": float,        # Kvalita kreativy
}
```

### 1.2 ML Modely

```
┌─────────────────────────────────────────────────────────────┐
│                    ML MODEL STACK                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LAYER 1: Candidate Generation (výběr z milionů)           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Model: Two-Tower (User + Ad embeddings)            │   │
│  │  Input: User features + Ad features                 │   │
│  │  Output: Top 10,000 candidate ads                   │   │
│  │  Latency: ~10ms                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  LAYER 2: Fine Ranking (přesné skórování)                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Model: DeepFM / DCN-V2                             │   │
│  │  Input: User + Ad + Context features                │   │
│  │  Output: CTR/CVR predikce                           │   │
│  │  Latency: ~20ms                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  LAYER 3: Re-Ranking (přeuspořádání)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Model: LambdaMART / GBDT                           │   │
│  │  Input: Fine-ranked list + business rules           │   │
│  │  Output: Final ranked list                          │   │
│  │  Latency: ~5ms                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Training Pipeline

```python
# Trénovací pipeline
class TrainingPipeline:
    def __init__(self):
        self.data_sources = [
            "impressions",      # Zobrazení
            "clicks",          # Kliknutí
            "conversions",     # Konverze
            "video_views",     # Zhlédnutí videí
            "purchases",       # Nákupy
        ]
    
    def train_ctr_model(self):
        """
        Trénování modelu pro Click-Through Rate
        """
        # 1. Sběr dat (posledních 7-30 dní)
        data = self.collect_data(days=30)
        
        # 2. Feature engineering
        features = self.engineer_features(data)
        
        # 3. Train/val/test split
        train, val, test = self.split_data(features)
        
        # 4. Training
        model = DeepFM()
        model.fit(train, val, epochs=10, batch_size=256)
        
        # 5. Evaluace
        auc = model.evaluate(test)
        print(f"CTR AUC: {auc:.4f}")
        
        # 6. Deploy
        self.deploy_model(model, version="v1.2.3")
        
    def train_cvr_model(self):
        """
        Trénování modelu pro Conversion Rate
        """
        # Podobné jako CTR, ale s conversion labels
        pass
```

---

## 2. REAL-TIME AUUKCE - Detailní průběh

### 2.1 Flow aukce (50ms celkem)

```
TIME: 0ms
┌─────────────────────────────────────────────────────────────┐
│ USER: Otevře TikTok / scrolluje feed                        │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
TIME: 1-5ms
┌─────────────────────────────────────────────────────────────┐
│ CLIENT: Odešle ad request                                    │
│                                                             │
│ {                                                           │
│   "user_id": "abc123",                                      │
│   "device": "iPhone 15",                                    │
│   "location": {"lat": 50.07, "lng": 14.43},                │
│   "context": {                                              │
│     "time": "2026-09-20T14:30:00Z",                        │
│     "session_id": "xyz789",                                 │
│     "feed_position": 5                                      │
│   }                                                         │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
TIME: 5-15ms
┌─────────────────────────────────────────────────────────────┐
│ SERVER: Candidate Generation                                 │
│                                                             │
│ 1. Fetch user embedding z Feature Store                     │
│ 2. Retrieve top 10,000 candidates (ANN search)             │
│ 3. Filter: budget, frequency cap, targeting                 │
│ 4. Výsledek: ~1,000 relevantních kandidátů                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
TIME: 15-35ms
┌─────────────────────────────────────────────────────────────┐
│ SERVER: Fine Ranking                                         │
│                                                             │
│ 1. Pro každého kandidáta spočítej:                          │
│    - pCTR (predicted CTR)                                   │
│    - pCVR (predicted CVR)                                   │
│    - Ad Rank = Bid × pCTR × pCVR × Quality                 │
│ 2. Seřaď podle Ad Rank                                      │
│ 3. Výsledek: Top 100 reklam                                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
TIME: 35-45ms
┌─────────────────────────────────────────────────────────────┐
│ SERVER: Re-Ranking + Business Rules                          │
│                                                             │
│ 1. Aplikuj frequency cap (max 3x denně)                    │
│ 2. Aplikuj pacing (rozložení budgetu)                       │
│ 3. Aplikuj diversity (ne 5x stejná značka)                 │
│ 4. Aplikuj brand safety (ne u kontroverzního obsahu)       │
│ 5. Výsledek: Final Top 10-20                                │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
TIME: 45-50ms
┌─────────────────────────────────────────────────────────────┐
│ CLIENT: Render reklamy                                       │
│                                                             │
│ 1. Stáhni kreativu (video/obrázek)                          │
│ 2. Zobraz v feedu                                           │
│ 3. Log impression                                           │
│ 4. Start tracking timer                                     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Aukční algoritmus

```python
class AdAuction:
    def __init__(self):
        self.min_bid = 0.01  # minimální bid v USD
        
    def calculate_ad_rank(self, ad, user, context):
        """
        Ad Rank = Bid × Quality × Context
        """
        # 1. Bid Price (kolik platí)
        bid = ad['bid_price']
        
        # 2. Quality Score (kvalita reklamy)
        quality = self.calculate_quality(ad)
        
        # 3. User Context (relevance pro uživatele)
        context_score = self.calculate_context(ad, user, context)
        
        # 4. Final Ad Rank
        ad_rank = bid * quality * context_score
        
        return ad_rank
    
    def calculate_quality(self, ad):
        """
        Quality Score = f(CTR, CVR, relevance, feedback)
        """
        # Historická výkonnost
        historical_ctr = ad.get('historical_ctr', 0.01)
        historical_cvr = ad.get('historical_cvr', 0.01)
        
        # Kvalita kreativy
        creative_score = ad.get('quality_score', 0.5)
        
        # User feedback (hide/report)
        negative_feedback = ad.get('negative_feedback_rate', 0.0)
        
        # Quality Score
        quality = (
            0.4 * historical_ctr +
            0.3 * historical_cvr +
            0.2 * creative_score +
            0.1 * (1 - negative_feedback)
        )
        
        return quality
    
    def calculate_context(self, ad, user, context):
        """
        Context Score = relevance reklamy pro uživatele
        """
        # Category match
        category_match = 1.0 if ad['category'] in user['interests'] else 0.3
        
        # Time match (reklama na jídlo kolem oběda)
        time_match = self.time_relevance(ad, context['time_of_day'])
        
        # Location match (reklama na obchod poblíž)
        location_match = self.location_relevance(ad, user['location'])
        
        context_score = (
            0.5 * category_match +
            0.3 * time_match +
            0.2 * location_match
        )
        
        return context_score
    
    def run_auction(self, candidates, user, context):
        """
        Spustí aukci a vrátí vítěze
        """
        scored = []
        
        for ad in candidates:
            ad_rank = self.calculate_ad_rank(ad, user, context)
            scored.append({
                'ad': ad,
                'ad_rank': ad_rank,
                'bid': ad['bid_price']
            })
        
        # Seřaď podle Ad Rank
        scored.sort(key=lambda x: x['ad_rank'], reverse=True)
        
        # Vrát top 10
        return scored[:10]
```

---

## 3. AD RANKING ALGORITHM

### 3.1 Vzorec

```
Ad Rank = Bid Price × Expected CTR × Expected CVR × Quality Score
```

### 3.2 Komponenty

| Komponenta | Výpočet | Vliv |
|------------|---------|------|
| **Bid Price** | CPC/CPM bid inzerenta | Přímý (lineární) |
| **Expected CTR** | ML predikce | Silný (exponenciální) |
| **Expected CVR** | ML predikce | Silný (exponenciální) |
| **Quality Score** | Historie + feedback | Střední |

### 3.3 Příklad výpočtu

```python
# Inzerent A: Brand X
ad_a = {
    'bid_price': 0.50,          # $0.50 CPC
    'expected_ctr': 0.03,       # 3% CTR
    'expected_cvr': 0.10,       # 10% CVR
    'quality_score': 0.85       # Vysoká kvalita
}

# Inzerent B: Brand Y
ad_b = {
    'bid_price': 0.80,          # $0.80 CPC (vyšší bid)
    'expected_ctr': 0.01,       # 1% CTR (nízká kvalita)
    'expected_cvr': 0.05,       # 5% CVR
    'quality_score': 0.60       # Nižší kvalita
}

# Výpočet Ad Rank
rank_a = 0.50 * 0.03 * 0.10 * 0.85 = 0.001275
rank_b = 0.80 * 0.01 * 0.05 * 0.60 = 0.000240

# Vítěz: Brand A (i přes nižší bid!)
# Důvod: Vyšší kvalita a relevance
```

---

## 4. USER PROFILING

### 4.1 Signal typy

```
┌─────────────────────────────────────────────────────────────┐
│                    USER PROFILING                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  EXPLICIT SIGNALS (uživatel řekl)                           │
│  ├── Nastavení profilu (věk, pohlaví)                      │
│  ├── Sledované účty                                         │
│  ├── Lajknutý obsah                                         │
│  └── Zadané vyhledávání                                     │
│                                                             │
│  IMPLICIT SIGNALS (systém odhadl)                           │
│  ├── Čas strávený na videu                                  │
│  ├── Poměr dokončených videí                                │
│  ├── Scroll speed                                           │
│  ├── Čas mezi interakcemi                                   │
│  ├── Zda sdílel/komentoval                                  │
│  └── Zda navštívil profil                                   │
│                                                             │
│  CONTEXTUAL SIGNALS (kontext)                               │
│  ├── Čas (hodina, den)                                      │
│  ├── Lokalita                                               │
│  ├── Zařízení                                               │
│  └── Připojení (WiFi vs mobilní)                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Interest Graph

```python
class UserProfiler:
    def __init__(self):
        self.interest_decay = 0.95  # Úpadek zájmu za den
        
    def update_interests(self, user_id, interaction):
        """
        Aktualizace grafu zájmů po interakci
        """
        # Získej aktuální profile
        profile = self.get_profile(user_id)
        
        # Váha interakce
        weight = self.get_interaction_weight(interaction.type)
        # like=1, comment=2, share=3, watch_full=1.5
        
        # Aktualizuj scoring pro kategorii
        category = interaction.content_category
        current_score = profile.interests.get(category, 0)
        new_score = current_score + (weight * 0.1)
        
        # Omez na 0-1
        new_score = min(1.0, max(0.0, new_score))
        
        profile.interests[category] = new_score
        
        # Ulož
        self.save_profile(user_id, profile)
        
    def get_interests(self, user_id):
        """
        Vrátí seřazené zájmy
        """
        profile = self.get_profile(user_id)
        
        # Aplikuj decay (starší interakce mají menší váhu)
        for category, score in profile.interests.items():
            days_old = (datetime.now() - profile.last_update).days
            decayed_score = score * (self.interest_decay ** days_old)
            profile.interests[category] = decayed_score
        
        # Seřaď podle skóre
        sorted_interests = sorted(
            profile.interests.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return sorted_interests
```

---

## 5. FREQUENCY CAPPING

### 5.1 Pravidla

```python
class FrequencyCap:
    def __init__(self):
        self.rules = {
            'daily': 3,           # Max 3x denně
            'hourly': 1,          # Max 1x za hodinu
            'lifetime': 10,       # Max 10x celkově
            'cooldown_hours': 4,  # Min 4h mezi zobrazeními
        }
        
    def can_show(self, user_id, ad_id):
        """
        Kontrola zda lze reklamu zobrazit
        """
        history = self.get_history(user_id, ad_id)
        
        # Daily cap
        today_count = history.get_today_count()
        if today_count >= self.rules['daily']:
            return False, "Daily cap reached"
        
        # Hourly cap
        last_shown = history.get_last_shown()
        if last_shown:
            hours_since = (datetime.now() - last_shown).hours
            if hours_since < self.rules['cooldown_hours']:
                return False, "Cooldown active"
        
        # Lifetime cap
        total_count = history.get_total_count()
        if total_count >= self.rules['lifetime']:
            return False, "Lifetime cap reached"
        
        return True, "OK"
```

### 5.2 Fatigue Detection

```python
def detect_creative_fatigue(ad_id, impressions, clicks):
    """
    Detekce únavy z kreativy
    """
    # CTR pokles
    recent_ctr = calculate_ctr(impressions[-100:], clicks[-100:])
    baseline_ctr = calculate_ctr(impressions[-1000:-100], clicks[-1000:-100])
    
    ctr_decline = (baseline_ctr - recent_ctr) / baseline_ctr
    
    # Pokud CTR klesl o > 30%, kreativa je unavená
    if ctr_decline > 0.30:
        return True, ctr_decline
    
    return False, ctr_decline
```

---

## 6. PACING & BUDGET

### 6.1 Pacing algoritmus

```python
class BudgetPacer:
    def __init__(self, daily_budget, start_hour=0, end_hour=24):
        self.daily_budget = daily_budget
        self.hours_remaining = end_hour - start_hour
        
    def get_hourly_budget(self, current_hour, spent_so_far):
        """
        Vrátí budget pro aktuální hodinu
        """
        hours_left = self.hours_remaining - (current_hour - start_hour)
        
        if hours_left <= 0:
            return 0
        
        # Rovnoměrné rozložení
        ideal_spend = (daily_budget / self.hours_remaining) * (current_hour - start_hour)
        actual_spend = spent_so_far
        
        # Tempo: pokud utrácíš méně, zrychli
        if actual_spend < ideal_spend * 0.8:
            # Utrácíš méně než 80% - zrychli
            hourly_budget = (daily_budget - actual_spend) / hours_left * 1.2
        elif actual_spend > ideal_spend * 1.2:
            # Utrácíš více než 120% - zpomal
            hourly_budget = (daily_budget - actual_spend) / hours_left * 0.8
        else:
            # Jdeš podle plánu
            hourly_budget = (daily_budget - actual_spend) / hours_left
        
        return max(0, hourly_budget)
```

---

## 7. ATTRIBUTION MODEL

### 7.1 Okna

```
┌─────────────────────────────────────────────────────────────┐
│                    ATTRIBUTION WINDOWS                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CLICK-THROUGH ATTRIBUTION                                  │
│  ─────────────────────────                                  │
│  Okno: 7 dní po kliknutí                                   │
│  Logika: Klikl na reklamu → do 7 dnů nakoupil → přičte se  │
│                                                             │
│  View:   ──────[AD]──────[CLICK]──────[PURCHASE]──────▶    │
│  Time:         0          +1h          +2d                  │
│                           ✅ PLATÍ (do 7 dnů)              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  VIEW-THROUGH ATTRIBUTION                                   │
│  ────────────────────────                                   │
│  Okno: 1 den po zobrazení                                  │
│  Logika: Viděl reklamu → do 24h nakoupil → přičte se       │
│                                                             │
│  View:   ──────[AD]──────────────────[PURCHASE]──────▶     │
│  Time:         0                       +18h                 │
│                                      ✅ PLATÍ (do 24h)     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Post-Click vs Post-View

```python
class AttributionModel:
    def __init__(self):
        self.click_window = 7 * 24 * 3600  # 7 dní v sekundách
        self.view_window = 24 * 3600        # 24 hodin
        
    def attribute(self, conversion, events):
        """
        Přiřaď konverzi k reklamě
        """
        # Priorita: Click > View
        for event in reversed(events):  # Od nejnovějšího
            if event.type == 'click':
                time_diff = conversion.timestamp - event.timestamp
                if time_diff <= self.click_window:
                    return {
                        'attribution': 'click-through',
                        'ad_id': event.ad_id,
                        'time_to_convert': time_diff
                    }
            
            elif event.type == 'view':
                time_diff = conversion.timestamp - event.timestamp
                if time_diff <= self.view_window:
                    return {
                        'attribution': 'view-through',
                        'ad_id': event.ad_id,
                        'time_to_convert': time_diff
                    }
        
        return {'attribution': 'none'}
```

---

## 8. LOVEDEAL AD ENGINE - Návrh implementace

### 8.1 Architektura

```
┌─────────────────────────────────────────────────────────────┐
│                 LOVEDEAL AD ENGINE                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   AdCard    │    │  AdEngine   │    │  AdStore    │     │
│  │  Component  │───▶│  Service    │───▶│  (SQLite)   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Tracking   │    │  Targeting  │    │  Analytics  │     │
│  │  Service    │    │  Service    │    │  Service    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 AdEngine komponenta

```javascript
// app/services/AdEngine.js

class AdEngine {
  constructor() {
    this.ads = [];                    // Databáze reklam
    this.userProfile = {};            // Profil uživatele
    this.frequencyMap = {};           // Počet zobrazení
    this.impressionLog = [];          // Log zobrazení
  }

  // Získej reklamu pro zobrazení
  getAdForUser(userId, context) {
    // 1. Filtr podle targetingu
    let candidates = this.filterByTargeting(this.ads, context);
    
    // 2. Filtr podle frequency capu
    candidates = this.filterByFrequency(candidates, userId);
    
    // 3. Seřaď podle skóre
    const ranked = this.rankAds(candidates, userId, context);
    
    // 4. Vrát nejlepší
    return ranked[0];
  }

  // Filtr podle targetingu
  filterByTargeting(ads, context) {
    return ads.filter(ad => {
      // Věk
      if (ad.targeting.age_min && context.userAge < ad.targeting.age_min) return false;
      if (ad.targeting.age_max && context.userAge > ad.targeting.age_max) return false;
      
      // Lokalita
      if (ad.targeting.cities && !ad.targeting.cities.includes(context.city)) return false;
      
      // Kategorie
      if (ad.targeting.categories && !ad.targeting.categories.some(c => context.userInterests.includes(c))) return false;
      
      // Čas
      if (ad.targeting.hours) {
        const hour = new Date().getHours();
        if (!ad.targeting.hours.includes(hour)) return false;
      }
      
      return true;
    });
  }

  // Frequency capping
  filterByFrequency(ads, userId) {
    return ads.filter(ad => {
      const key = `${userId}_${ad.id}`;
      const count = this.frequencyMap[key] || 0;
      return count < ad.frequencyCap;
    });
  }

  // Skórování
  rankAds(ads, userId, context) {
    return ads.map(ad => ({
      ad,
      score: this.calculateScore(ad, userId, context)
    }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.ad);
  }

  // Výpočet skóre
  calculateScore(ad, userId, context) {
    let score = 0;
    
    // Bid (40%)
    score += (ad.bid / 1.0) * 0.4;
    
    // Relevance (30%)
    score += this.calculateRelevance(ad, context) * 0.3;
    
    // Kvalita (20%)
    score += ad.qualityScore * 0.2;
    
    // Čerstvost (10%)
    score += this.calculateFreshness(ad) * 0.1;
    
    return score;
  }

  // Relevance skóre
  calculateRelevance(ad, context) {
    let relevance = 0;
    
    // Kategorie match
    if (context.userInterests.includes(ad.category)) {
      relevance += 0.5;
    }
    
    // Lokalita match
    if (ad.targeting.cities?.includes(context.city)) {
      relevance += 0.3;
    }
    
    // Čas match (reklama na jídlo kolem oběda)
    if (ad.category === 'food' && context.hour >= 11 && context.hour <= 14) {
      relevance += 0.2;
    }
    
    return Math.min(1, relevance);
  }

  // Log impression
  logImpression(userId, adId) {
    this.impressionLog.push({
      userId,
      adId,
      timestamp: Date.now()
    });
    
    // Zvyš frequency
    const key = `${userId}_${adId}`;
    this.frequencyMap[key] = (this.frequencyMap[key] || 0) + 1;
  }
}

export default new AdEngine();
```

### 8.3 AdCard s trackingem

```javascript
// app/components/AdCard.js

import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AdEngine from '../services/AdEngine';

function AdCard({ ad, onImpression, onClick }) {
  const viewStartTime = useRef(Date.now());
  const hasImpressed = useRef(false);

  // Track impression
  useEffect(() => {
    if (!hasImpressed.current) {
      hasImpressed.current = true;
      AdEngine.logImpression(userId, ad.id);
      onImpression?.(ad.id);
    }
  }, []);

  // Track view time
  useEffect(() => {
    return () => {
      const viewDuration = Date.now() - viewStartTime.current;
      if (viewDuration > 1000) {
        // Viděl alespoň 1 sekundu
        AdEngine.logViewTime(userId, ad.id, viewDuration);
      }
    };
  }, []);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    AdEngine.logClick(userId, ad.id);
    onClick?.(ad);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.adCard}>
      <Image source={{ uri: ad.creativeUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.brand}>{ad.brandName}</Text>
        <Text style={styles.title}>{ad.title}</Text>
        <Text style={styles.cta}>{ad.ctaText}</Text>
      </View>
      <View style={styles.adBadge}>
        <Text style={styles.adBadgeText}>Ad</Text>
      </View>
    </TouchableOpacity>
  );
}
```

---

## 9. EKONOMICKÝ MODEL

### 9.1 Ceník

```
┌─────────────────────────────────────────────────────────────┐
│                    LOVEDEAL ADS CENÍK                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  IN-FEED ADS                                                │
│  ─────────────                                              │
│  CPM (Cost Per Mille):  50-150 CZK                         │
│  CPC (Cost Per Click):  5-25 CZK                           │
│  CPA (Cost Per Action): 50-200 CZK                         │
│                                                             │
│  SPONZOROVANÉ DEALS                                         │
│  ──────────────────                                         │
│  Premium placement:  500-2000 CZK/den                       │
│  Top of feed:        1000-5000 CZK/den                      │
│                                                             │
│  AFFILIATE                                                   │
│  ─────────                                                   │
│  Provize: 5-15% z konverze                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Kalkulačka ROI

```python
def calculate_roi(spend, conversions, avg_order_value, commission_rate):
    """
    Výpočet ROI reklamní kampaně
    """
    revenue = conversions * avg_order_value * commission_rate
    roi = (revenue - spend) / spend * 100
    
    return {
        'spend': spend,
        'conversions': conversions,
        'revenue': revenue,
        'roi_percent': roi,
        'cost_per_acquisition': spend / conversions if conversions > 0 else 0
    }

# Příklad
result = calculate_roi(
    spend=10000,           # 10,000 CZK
    conversions=50,        # 50 konverzí
    avg_order_value=500,   # Průměrný nákup 500 CZK
    commission_rate=0.10   # 10% provize
)
# Výsledek: ROI = 150%, CPA = 200 CZK
```

---

## 📋 CHECKLIST - Technický plán vývoje

### Fáze 1: Základ (1-2 týdny)
- [ ] Vytvořit `AdEngine` servis
- [ ] Implementovat základní targeting (věk, město)
- [ ] Implementovat frequency capping (3x denně)
- [ ] Přidat impression tracking (localStorage)
- [ ] Přidat click tracking
- [ ] Otestovat na 100 uživatelích

### Fáze 2: Analytics (2-3 týdny)
- [ ] Integrace Firebase Analytics
- [ ] Tracking CTR, CVR
- [ ] Dashboard pro inzerenty
- [ ] A/B testování kreativ

### Fáze 3: ML (1-2 měsíce)
- [ ] Sběr trénovacích dat
- [ ] Trénování CTR modelu (Firebase ML)
- [ ] Implementace personalizace
- [ ] Real-time scoring

### Fáze 4: Monetizace (3-4 měsíce)
- [ ] Platební brána pro inzerenty
- [ ] Fakturační systém
- [ ] Self-service portal
- [ ] API pro programatický nákup

---

> 📅 Poslední aktualizace: 2026-09-20
> 👤 Autor: MaxiGreens a.s.
> 🦔 Enigma 1+ styl: Šifrovaný, auditovaný, izolovaný
