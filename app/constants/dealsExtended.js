const IMG = 'https://via.placeholder.com/800x600/FFF8F0/1A1410?text=';

export const DEALS_FASHION = [
  { id: 21, title: 'Dziny slim fit', price: 599, originalPrice: 999, discount: 40, category: 'fashion', shopId: 9, image: IMG+'Dziny', expiresAt: '2026-09-30', likes: 234, comments: 34, shares: 67, distance: 2.5 },
  { id: 22, title: 'Tricko basic', price: 199, originalPrice: 399, discount: 50, category: 'fashion', shopId: 9, image: IMG+'Tricko', expiresAt: '2026-09-28', likes: 345, comments: 45, shares: 89, distance: 2.5 },
  { id: 23, title: 'Sukne letni', price: 449, originalPrice: 799, discount: 44, category: 'fashion', shopId: 10, image: IMG+'Sukne', expiresAt: '2026-09-29', likes: 189, comments: 23, shares: 45, distance: 3.1 },
  { id: 24, title: 'Bunda denim', price: 1299, originalPrice: 1999, discount: 35, category: 'fashion', shopId: 10, image: IMG+'Bunda', expiresAt: '2026-09-27', likes: 267, comments: 34, shares: 56, distance: 3.1 },
  { id: 25, title: 'Tenisky canvas', price: 599, originalPrice: 999, discount: 40, category: 'fashion', shopId: 9, image: IMG+'Tenisky', expiresAt: '2026-09-30', likes: 345, comments: 56, shares: 123, distance: 2.5 },
  { id: 26, title: 'Kabelka kzena', price: 1499, originalPrice: 2499, discount: 40, category: 'fashion', shopId: 10, image: IMG+'Kabelka', expiresAt: '2026-09-28', likes: 198, comments: 23, shares: 45, distance: 3.1 },
  { id: 27, title: 'Hodinky sportovni', price: 2999, originalPrice: 4999, discount: 40, category: 'fashion', shopId: 11, image: IMG+'Hodinky', expiresAt: '2026-09-30', likes: 456, comments: 67, shares: 134, distance: 4.5 },
  { id: 28, title: 'Slunecni bryle', price: 399, originalPrice: 799, discount: 50, category: 'fashion', shopId: 9, image: IMG+'Bryle', expiresAt: '2026-09-27', likes: 234, comments: 34, shares: 67, distance: 2.5 },
  { id: 29, title: 'Pasek kzeny', price: 299, originalPrice: 599, discount: 50, category: 'fashion', shopId: 10, image: IMG+'Pasek', expiresAt: '2026-09-29', likes: 156, comments: 12, shares: 23, distance: 3.1 },
  { id: 30, title: 'Cepice zimni', price: 349, originalPrice: 699, discount: 50, category: 'fashion', shopId: 11, image: IMG+'Cepice', expiresAt: '2026-09-30', likes: 112, comments: 8, shares: 15, distance: 4.5 },
];

export const DEALS_HOME = [
  { id: 31, title: 'Luxusni polstar', price: 499, originalPrice: 899, discount: 44, category: 'home', shopId: 5, image: IMG+'Polstar', expiresAt: '2026-09-30', likes: 178, comments: 23, shares: 45, distance: 1.8 },
  { id: 32, title: 'Uklidovy set', price: 299, originalPrice: 599, discount: 50, category: 'home', shopId: 3, image: IMG+'Uklid', expiresAt: '2026-09-28', likes: 134, comments: 12, shares: 23, distance: 2.1 },
  { id: 33, title: 'Kuchynsky robot', price: 3999, originalPrice: 5999, discount: 33, category: 'home', shopId: 6, image: IMG+'Robot', expiresAt: '2026-09-30', likes: 345, comments: 56, shares: 123, distance: 4.1 },
  { id: 34, title: 'Sadu nozu', price: 899, originalPrice: 1499, discount: 40, category: 'home', shopId: 7, image: IMG+'Noze', expiresAt: '2026-09-29', likes: 234, comments: 34, shares: 67, distance: 5.2 },
  { id: 35, title: 'Povleceni 140x200', price: 599, originalPrice: 999, discount: 40, category: 'home', shopId: 5, image: IMG+'Povleceni', expiresAt: '2026-09-28', likes: 167, comments: 23, shares: 45, distance: 1.8 },
  { id: 36, title: 'Kavovar DeLonghi', price: 6999, originalPrice: 9999, discount: 30, category: 'home', shopId: 6, image: IMG+'Kavovar', expiresAt: '2026-09-30', likes: 456, comments: 78, shares: 198, distance: 4.1 },
  { id: 37, title: 'Tyckovy vysavac', price: 2499, originalPrice: 3999, discount: 37, category: 'home', shopId: 7, image: IMG+'Vysavac', expiresAt: '2026-09-27', likes: 289, comments: 45, shares: 89, distance: 5.2 },
  { id: 38, title: 'Mikrovlnka', price: 1499, originalPrice: 2499, discount: 40, category: 'home', shopId: 6, image: IMG+'Mikrovlnka', expiresAt: '2026-09-29', likes: 178, comments: 23, shares: 45, distance: 4.1 },
  { id: 39, title: 'Zehlicka', price: 899, originalPrice: 1299, discount: 31, category: 'home', shopId: 7, image: IMG+'Zehlicka', expiresAt: '2026-09-30', likes: 134, comments: 12, shares: 23, distance: 5.2 },
  { id: 40, title: 'digestor', price: 3499, originalPrice: 4999, discount: 30, category: 'home', shopId: 6, image: IMG+'Digestor', expiresAt: '2026-09-28', likes: 198, comments: 34, shares: 56, distance: 4.1 },
];

export const DEALS_SPORT = [
  { id: 41, title: 'Bezecke boty', price: 1999, originalPrice: 3499, discount: 43, category: 'sports', shopId: 11, image: IMG+'Boty', expiresAt: '2026-09-30', likes: 345, comments: 56, shares: 123, distance: 4.5 },
  { id: 42, title: 'Joga podlozka', price: 499, originalPrice: 999, discount: 50, category: 'sports', shopId: 12, image: IMG+'Joga', expiresAt: '2026-09-28', likes: 234, comments: 34, shares: 67, distance: 3.7 },
  { id: 43, title: 'Hrazda na shyby', price: 799, originalPrice: 1299, discount: 38, category: 'sports', shopId: 11, image: IMG+'Hrazda', expiresAt: '2026-09-29', likes: 189, comments: 23, shares: 45, distance: 4.5 },
  { id: 44, title: 'Cyklo prilba', price: 699, originalPrice: 1199, discount: 42, category: 'sports', shopId: 12, image: IMG+'Prilba', expiresAt: '2026-09-30', likes: 156, comments: 12, shares: 23, distance: 3.7 },
  { id: 45, title: 'Plavecke bryle', price: 299, originalPrice: 599, discount: 50, category: 'sports', shopId: 11, image: IMG+'Bryle', expiresAt: '2026-09-27', likes: 112, comments: 8, shares: 15, distance: 4.5 },
  { id: 46, title: 'Fitness rukavice', price: 199, originalPrice: 399, discount: 50, category: 'sports', shopId: 12, image: IMG+'Rukavice', expiresAt: '2026-09-28', likes: 134, comments: 12, shares: 23, distance: 3.7 },
  { id: 47, title: 'Lavice na cviceni', price: 1499, originalPrice: 2499, discount: 40, category: 'sports', shopId: 11, image: IMG+'Lavice', expiresAt: '2026-09-30', likes: 234, comments: 34, shares: 67, distance: 4.5 },
  { id: 48, title: 'Basketbalovy mic', price: 399, originalPrice: 699, discount: 43, category: 'sports', shopId: 12, image: IMG+'Mic', expiresAt: '2026-09-29', likes: 178, comments: 23, shares: 45, distance: 3.7 },
  { id: 49, title: 'Kolobezka', price: 1999, originalPrice: 3499, discount: 43, category: 'sports', shopId: 11, image: IMG+'Kolobezka', expiresAt: '2026-09-30', likes: 289, comments: 45, shares: 89, distance: 4.5 },
  { id: 50, title: 'Tenisova raketa', price: 1299, originalPrice: 2199, discount: 41, category: 'sports', shopId: 12, image: IMG+'Raketa', expiresAt: '2026-09-28', likes: 198, comments: 34, shares: 56, distance: 3.7 },
  { id: 51, title: 'Trekking hole', price: 599, originalPrice: 999, discount: 40, category: 'sports', shopId: 11, image: IMG+'Hole', expiresAt: '2026-09-29', likes: 145, comments: 23, shares: 45, distance: 4.5 },
  { id: 52, title: 'Ledvinka sportovni', price: 299, originalPrice: 599, discount: 50, category: 'sports', shopId: 12, image: IMG+'Ledvinka', expiresAt: '2026-09-30', likes: 112, comments: 8, shares: 15, distance: 3.7 },
];

export const ALL_DEALS = [
  ...require('./deals').DEALS,
  ...DEALS_FASHION,
  ...DEALS_HOME,
  ...DEALS_SPORT,
];
