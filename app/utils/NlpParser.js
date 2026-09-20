const CATEGORY_MAP = {
  jidlo: ['jidlo', 'jídlo', 'potraviny', 'restaurace', 'obed', 'oběd', 'vecere', 'večeře', 'kafe', 'kava', 'pizza', 'burgery', 'salat', 'salát'],
  elektronika: ['telefon', 'mobil', 'notebook', 'pocitac', 'počítač', 'sluchatka', 'sluchátka', 'tablet', 'televize', 'tv', 'monitor', 'klavesnice', 'klávesnice', 'mys'],
  moda: ['triko', 'tričko', 'kabat', 'kabát', 'boty', 'tenisky', 'saten', 'šaty', 'kalhoty', 'mikina', 'bunda'],
  domacnost: ['nabytek', 'nábytek', 'lustr', 'koberec', 'postel', 'gauc', 'gaůč', 'zidle', 'židle', 'stul', 'stůl'],
  sport: ['beh', 'běh', 'posilovna', 'kolo', 'lyze', 'lyže', 'plavani', 'plavání', 'fitness', 'joga', 'jóga'],
  kultura: ['kino', 'divadlo', 'koncert', 'muzeum', 'vystava', 'výstava'],
  cestovani: ['cestovani', 'cestování', 'dovolena', 'dovolená', 'letenky', 'letenka', 'hotel', 'ubytovani', 'ubytování'],
  auto: ['auto', 'benzin', 'nafta', 'servis', 'pneumatiky', 'gumy', 'mytí', 'myti'],
  zdravi: ['lekarna', 'lékárna', 'vitaminy', 'leky', 'léky', 'zubní', 'zubar', 'zubař', 'optika'],
  zvirata: ['zvire', 'zvíře', 'pes', 'kocka', 'kočka', 'akvarium', 'krmivo'],
};

const PRICE_PATTERN = /(\d+[\.,]?\d*)\s*(Kč|CZK|Kc|\$|€|eur)/i;
const PRICE_UNDER = /pod\s+(\d+)\s*(Kč|Kc|CZK)?/i;
const DISCOUNT_PATTERN = /(\d+)\s*%\s*(sleva|slevu|levnější|levnejsi)/i;
const NEARBY_PATTERN = /pobl[ií][žz]|v okolí|blízko|close|nearby/i;
const COMPARE_PATTERN = /porovnat|srovnat|porovnávání|compare/i;

function detectCategories(text) {
  const lower = text.toLowerCase();
  const found = [];
  for (const [cat, keywords] of Object.entries(CATEGORY_MAP)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        found.push(cat);
        break;
      }
    }
  }
  return found;
}

function extractPrice(text) {
  const under = text.match(PRICE_UNDER);
  if (under) return { type: 'under', value: parseFloat(under[1]) };
  const match = text.match(PRICE_PATTERN);
  if (match) return { type: 'exact', value: parseFloat(match[1].replace(',', '.')) };
  return null;
}

function detectDiscount(text) {
  const match = text.match(DISCOUNT_PATTERN);
  if (match) return parseInt(match[1]);
  return null;
}

function detectIntent(text) {
  const lower = text.toLowerCase();
  if (COMPARE_PATTERN.test(lower)) return 'compare';
  if (NEARBY_PATTERN.test(lower)) return 'nearby';
  if (PRICE_UNDER.test(lower) || /levn[ýí]/.test(lower)) return 'cheap';
  if (/nejlep[šs]/.test(lower) || /top/.test(lower)) return 'best';
  if (/nov[ýí]/.test(lower) || /právě/.test(lower)) return 'new';
  if (/expiruj|končí|konci|expir/.test(lower)) return 'expiring';
  return 'search';
}

export function parseQuery(text) {
  if (!text || typeof text !== 'string') {
    return { intent: 'search', categories: [], price: null, discount: null, raw: '' };
  }
  const trimmed = text.trim();
  return {
    intent: detectIntent(trimmed),
    categories: detectCategories(trimmed),
    price: extractPrice(trimmed),
    discount: detectDiscount(trimmed),
    raw: trimmed,
  };
}

export function filterDealsByQuery(deals, parsed) {
  if (!deals || !Array.isArray(deals)) return [];
  let result = [...deals];

  if (parsed.categories.length > 0) {
    result = result.filter((d) => {
      const cat = (d.category || '').toLowerCase();
      const tags = (d.tags || []).map((t) => t.toLowerCase());
      return parsed.categories.some((pc) =>
        cat.includes(pc) || tags.some((t) => t.includes(pc))
      );
    });
  }

  if (parsed.price) {
    if (parsed.price.type === 'under') {
      result = result.filter((d) => {
        const p = parseFloat(d.salePrice || d.price);
        return !isNaN(p) && p < parsed.price.value;
      });
    } else if (parsed.price.type === 'exact') {
      result = result.filter((d) => {
        const p = parseFloat(d.salePrice || d.price);
        return !isNaN(p) && Math.abs(p - parsed.price.value) < parsed.price.value * 0.2;
      });
    }
  }

  if (parsed.discount) {
    result = result.filter((d) => {
      const disc = d.discount || 0;
      return disc >= parsed.discount;
    });
  }

  switch (parsed.intent) {
    case 'best':
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'cheap':
      result.sort((a, b) => {
        const pa = parseFloat(a.salePrice || a.price) || Infinity;
        const pb = parseFloat(b.salePrice || b.price) || Infinity;
        return pa - pb;
      });
      break;
    case 'new':
      result.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      break;
    case 'expiring':
      result.sort((a, b) => {
        const ea = new Date(a.expiresAt || Date.now()).getTime();
        const eb = new Date(b.expiresAt || Date.now()).getTime();
        return ea - eb;
      });
      break;
  }

  return result;
}

export function suggestFromQuery(text) {
  const parsed = parseQuery(text);
  if (parsed.categories.length > 0 && parsed.price) {
    return `Hledam ${parsed.categories.join(', ')} ${parsed.price.type === 'under' ? 'pod ' + parsed.price.value + ' Kc' : ' kolem ' + parsed.price.value + ' Kc'}`;
  }
  if (parsed.categories.length > 0) {
    return `Dealy v kategorii ${parsed.categories.join(', ')}`;
  }
  if (parsed.price) {
    return parsed.price.type === 'under' ? `Levne deals pod ${parsed.price.value} Kc` : `Dealy kolem ${parsed.price.value} Kc`;
  }
  return null;
}
