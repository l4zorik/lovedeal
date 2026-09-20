# TikTok - Pixel a Events API

## TikTok Pixel

### Co je TikTok Pixel
- JavaScript kod na vasem webu
- Sdíli website events s TikTok
- Mereni trafficu, kampani, optimalizace

### Co Pixel sbira
- Ad/event info (jaka reklama byla kliknuta)
- Timestamp (kdy se stala akce)
- IP adresa (geolokace)
- User Agent (zarizeni, OS, browser)
- Cookies (1st i 3rd party)
- Metadata a button clicks

### Setup
1. TikTok Ads Manager -> Tools -> Events Manager
2. Connect Data Source -> Web
3. Vase URL
4. Partner Integration nebo Manual Setup

### Data sharing levels (Shopify)
| Level | Co TikTok pouziva | Trade-off |
|-------|-------------------|-----------|
| Standard | Pixel only | Nejednodussi, nejmene dat |
| Enhanced | Pixel + Events API + Advanced Matching | Lepsi pokryti |
| Maximum | Pixel + Events API | Kompletni data |

---

## Events API 2.0

### Co je Events API
- Server-side tracking (nahrada castneho Pixelu)
- Nezavisly na prohlizeci/ad blockers
- Lepsi data accuracy

### Vyhody
- 19% vice zachycenych events (Pixel + Events API)
- 15% lepsi CPA
- Ochrana proti ad blockerum
- Presnejsi attribution

### Podporovane events
- Page View
- Add to Cart
- Initiate Checkout
- Add Payment Info
- Complete Payment
- Search
- Contact
- Submit Form
- Download
- View Content

---

## App Events SDK

### Platformy
- Android (Gradle)
- iOS (CocoaPods)
- Unity

### Setup
```
Android: implementation 'com.tiktok.sdk:tiktok-ads-sdk:...'
iOS: pod 'TikTokAdsSDK'
```

### Podporovane eventy
- Install
- Registration
- Purchase
- Add to Cart
- Content View
- Custom events

---

## Attribution

### Window
- Default: 7 dni click, 1 dni view
- Konfigurovatelne
- Postbacks pres Events API

### Identifiers
- TikTok Click ID (ttclid)
- TikTok Cookie (_ttp)
- External ID (vase systemy)
- Advanced Matching (email, telefon)
