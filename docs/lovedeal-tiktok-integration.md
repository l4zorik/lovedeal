# LoveDeal - Aplikace TikTok Ads principu

## Jak LoveDeal aplikuje TikTok principy

### 1. Plnoobrazkovy feed (jako TikTok For You)
- SwipeFeed komponent = TikTok-style vertical scroll
- Kazda karta zabira cely displej
- Snap-to-page chovani
- Minimalni UI = maximum obsahu

### 2. In-Feed Ad system
- AdCard komponent = nativni reklama v feedu
- Vypada jako organickej deal (ne jako ad)
- CTA primo v karte (Rezervovat, Koupit, Objednat)
- Ad label "Reklama" pro transparentnost

### 3. Engagement akce
- Like (srdce) s haptic feedback
- Komentar, Share, Bookmark
- Vse na dosah palce (prava strana)
- Animace pri interakci

### 4. Spinning disc
- Animovany disk jako na TikToku
- Vizuálni vazba na audio/brand
- Nepretrzita animace = ziva app

### 5. Lite mod
- Uspech baterie a dat
- Deaktivace animaci a haptics
- Udrzuje zakladni funkcionalitu

---

## Budeci TikTok Ads integrace

### Faze 1: Tracking (nutne)
- Implementace TikTok Pixel na landing page
- Events API pro server-side tracking
- App Events SDK pro mobilni app
- Sledovani: View Deal, Click Deal, Save Deal, Share Deal

### Faze 2: Kampane
- In-Feed Ads pro ziskavani novych uzivatelu
- Spark Ads s creatorskym obsahem
- Retargeting pro cart abandoners
- Lookalike audience z existujicich uzivatelu

### Faze 3: Optimalizace
- A/B testing hooku (3-5 variant)
- Tydeni refresh kreativ
- Smart Targeting po 50+ konverzich
- ROAS-based bidding

---

## Tech stack pro TikTok integrace

### Web (landing page)
```javascript
// TikTok Pixel
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e+""]=+new Date,ttq._o=ttq._o||{},ttq._o[e+""]=n||{};var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=r+"?sdkid="+e+"&lib="+t;var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
}(window, document, 'ttq');
ttq.load('YOUR_PIXEL_ID');
ttq.page();
```

### Mobilni app (Expo)
```javascript
// App Events SDK
import * as TikTokEvents from 'expo-tiktok-events';

// Track deal view
TikTokEvents.trackEvent('ViewContent', {
  content_id: deal.id,
  content_type: 'deal',
  value: deal.salePrice,
  currency: 'CZK'
});

// Track deal save
TikTokEvents.trackEvent('AddToWishlist', {
  content_id: deal.id,
  content_type: 'deal'
});

// Track share
TikTokEvents.trackEvent('Share', {
  content_id: deal.id,
  content_type: 'deal'
});
```

---

## Cilove metriky pro LoveDeal

### Awareness
- CPM < 50 CZK
- Reach > 100K uzivatelu mesicne
- Frequency < 3

### Acquisition
- CPI < 25 CZK
- Install rate > 5%
- DAILY installs > 500

### Engagement
- Like rate > 10%
- Save rate > 5%
- Share rate > 2%
- Session length > 5 min

### Monetization
- Ad revenue per user > 2 CZK/mesic
- ROAS > 2.0
- LTV > 50 CZK
