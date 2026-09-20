# LoveDeal - Web Build Configuration

## Spusteni
```bash
npx expo start --web
```

## Build pro produkci
```bash
npx expo export --platform web
```

Vystup bude ve slozce `dist/`.

## Nasazeni

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
- Pripojte git repo
- Build command: `npx expo export --platform web`
- Output directory: `dist`

### GitHub Pages
```bash
npx expo export --platform web
# Nahrajte dist/ do gh-pages branche
```

## Nastaveni
- `app.json` -> `web.output: "single"` pro SPA
- `favicon.ico` v `assets/`
- Meta tagy pro SEO v `index.html`

## Poznamky
- Web verze nema native funkce (haptics, kamera)
- Pouziva se react-native-web pro kompatibilitu
- Velikost bundle: ~500KB gzip
