# TikTok - Marketing API

## Zakladni info
- Base URL: https://business-api.tiktok.com/open_api/v1.3
- Autentizace: OAuth2 nebo App ID + Secret
- Format: REST JSON

## Hlavni endpointy

### Campaign Management
```
GET  /campaign/get/           - Seznam kampani
POST /campaign/create/        - Vytvoreni kampane
GET  /adgroup/get/            - Seznam ad groups
POST /adgroup/create/         - Vytvoreni ad group
GET  /ads/get/                - Seznam ads
POST /ads/create/             - Vytvoreni ad
```

### Audience Management
```
POST /custom_audience/create/ - Vytvoreni custom audience
GET  /custom_audience/get/    - Seznam audiences
POST /lookalike_audience/create/ - Vytvoreni lookalike
```

### Reporting
```
GET  /report/integrated/get/  - Report data
GET  /report/task/create/     - Vytvoreni report tasku
GET  /report/task/check/      - Kontrola stavu tasku
```

### Creative
```
POST /creative/website_item/create/ - Vytvoreni kreativy
GET  /creative/website_item/get/    - Seznam kreativ
```

---

## Struktura odpovedi
```json
{
  "code": 0,
  "message": "OK",
  "request_id": "abc123",
  "data": {
    "list": [...],
    "page_info": {
      "total_number": 100,
      "page": 1,
      "page_size": 20
    }
  }
}
```

## Chybove kody
- 0: Uspech
- 40001: Neplatny parametr
- 40002: Neplatny access token
- 40100: Authorization failed
- 40200: Token expired

## Rate limiting
- 10 požadavku za sekundu na ucet
- 429 Too Many Requests - backoff
