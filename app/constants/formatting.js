export function formatPrice(price) {
  if (price == null) return '';
  const num = Number(price);
  if (isNaN(num)) return String(price);
  return num.toLocaleString('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' Kč';
}

export function formatDiscount(discount) {
  if (!discount) return '';
  return `-${discount}%`;
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const now = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

export function formatExpiry(dateStr) {
  const days = daysUntil(dateStr);
  if (days == null) return '';
  if (days < 0) return 'Vypršelo';
  if (days === 0) return 'Dnes';
  if (days === 1) return 'Zítra';
  if (days <= 7) return `${days} dní`;
  return `${days} dní`;
}

export function getExpiryColor(dateStr) {
  const days = daysUntil(dateStr);
  if (days == null) return '#999';
  if (days <= 1) return '#E53935';
  if (days <= 3) return '#FF9800';
  return '#4CAF50';
}

export function getCategoryColor(categoryId) {
  const map = {
    food: '#FF6B35',
    electronics: '#2196F3',
    fashion: '#9C27B0',
    home: '#4CAF50',
    sports: '#FF9800',
    beauty: '#E91E63',
    toys: '#00BCD4',
    books: '#795548',
    auto: '#607D8B',
    travel: '#3F51B5',
  };
  return map[categoryId] || '#999';
}

export function getCategoryName(categoryId) {
  const map = {
    food: 'Jídlo',
    electronics: 'Elektronika',
    fashion: 'Móda',
    home: 'Domácnost',
    sports: 'Sport',
    beauty: 'Krása',
    toys: 'Hračky',
    books: 'Knihy',
    auto: 'Auto',
    travel: 'Cestování',
  };
  return map[categoryId] || categoryId;
}

export function formatDistance(km) {
  if (km == null) return '';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatNumber(num) {
  if (num == null) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return String(num);
}
