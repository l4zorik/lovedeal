import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoveCoinsContext = createContext(null);

const STORAGE_KEY = '@lovedeal_lovecoins';
const STORAGE_KEY_TRANSACTIONS = '@lovedeal_lc_transactions';

const COIN_PACKS = [
  { id: 'starter', name: 'Starter', coins: 100, price: '29 Kc', color: '#CD7F32' },
  { id: 'popular', name: 'Popular', coins: 500, price: '99 Kc', color: '#C0C0C0', best: true },
  { id: 'mega', name: 'Mega', coins: 1500, price: '249 Kc', color: '#FFD700' },
  { id: 'ultra', name: 'Ultra', coins: 5000, price: '699 Kc', color: '#B9F2FF' },
];

const BOOST_COSTS = {
  superlike: 10,
  highlight_1h: 25,
  highlight_24h: 100,
  featured_1d: 200,
  featured_7d: 1000,
  undo: 5,
  extra_photos: 15,
};

const EARN_ACTIONS = {
  daily_login: { coins: 5, desc: 'Prihlaseni dnes', limit: 1 },
  daily_swipe_10: { coins: 3, desc: 'Proswipovat 10 dealu', limit: 1 },
  daily_swipe_50: { coins: 10, desc: 'Proswipovat 50 dealu', limit: 1 },
  first_like: { coins: 2, desc: 'Prvni like dne', limit: 1 },
  first_share: { coins: 5, desc: 'Prvni sdileni dne', limit: 1 },
  streak_3: { coins: 20, desc: 'Rada 3 dny', limit: 1 },
  streak_7: { coins: 50, desc: 'Rada 7 dni', limit: 1 },
  streak_30: { coins: 200, desc: 'Rada 30 dni', limit: 1 },
  refer_friend: { coins: 50, desc: 'Pozvi kamarada', limit: 5 },
  post_deal: { coins: 10, desc: 'Pridat deal', limit: 3 },
  complete_profile: { coins: 15, desc: 'Dokoncit profil', limit: 1 },
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function LoveCoinsProvider({ children }) {
  const [coins, setCoins] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [dailyEarns, setDailyEarns] = useState({});
  const loadedRef = useRef(false);

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    AsyncStorage.setItem(STORAGE_KEY, String(coins));
  }, [coins]);

  useEffect(() => {
    if (!loadedRef.current) return;
    AsyncStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions.slice(-100)));
  }, [transactions]);

  const loadData = async () => {
    try {
      const [c, t, d] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(STORAGE_KEY_TRANSACTIONS),
        AsyncStorage.getItem('@lovedeal_lc_daily'),
      ]);
      if (c) setCoins(parseInt(c) || 0);
      if (t) setTransactions(JSON.parse(t));
      if (d) {
        const parsed = JSON.parse(d);
        if (parsed.date === todayKey()) setDailyEarns(parsed.earned || {});
      }
    } catch {}
    loadedRef.current = true;
  };

  const addCoins = useCallback((amount, reason) => {
    setCoins((prev) => prev + amount);
    setTransactions((prev) => [
      { id: Date.now().toString(36), type: 'earn', amount, reason, date: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const spendCoins = useCallback((amount, reason) => {
    if (coins < amount) return false;
    setCoins((prev) => prev - amount);
    setTransactions((prev) => [
      { id: Date.now().toString(36), type: 'spend', amount, reason, date: new Date().toISOString() },
      ...prev,
    ]);
    return true;
  }, [coins]);

  const canSpend = useCallback((amount) => coins >= amount, [coins]);

  const earnDaily = useCallback((actionId) => {
    const action = EARN_ACTIONS[actionId];
    if (!action) return false;
    const today = todayKey();
    const key = `${today}_${actionId}`;
    const current = dailyEarns[key] || 0;
    if (current >= action.limit) return false;
    setDailyEarns((prev) => {
      const next = { ...prev, [key]: current + 1 };
      AsyncStorage.setItem('@lovedeal_lc_daily', JSON.stringify({ date: today, earned: next }));
      return next;
    });
    addCoins(action.coins, action.desc);
    return true;
  }, [dailyEarns, addCoins]);

  const getBoostCost = useCallback((boostId) => BOOST_COSTS[boostId] || 0, []);

  const buyBoost = useCallback((boostId) => {
    const cost = BOOST_COSTS[boostId];
    if (!cost) return false;
    return spendCoins(cost, `Boost: ${boostId}`);
  }, [spendCoins]);

  const getBalance = useCallback(() => coins, [coins]);
  const getHistory = useCallback(() => transactions, [transactions]);

  return (
    <LoveCoinsContext.Provider
      value={{
        coins,
        COIN_PACKS,
        BOOST_COSTS,
        EARN_ACTIONS,
        addCoins,
        spendCoins,
        canSpend,
        earnDaily,
        getBoostCost,
        buyBoost,
        getBalance,
        getHistory,
      }}
    >
      {children}
    </LoveCoinsContext.Provider>
  );
}

export function useLoveCoins() {
  const ctx = useContext(LoveCoinsContext);
  if (!ctx) throw new Error('useLoveCoins must be used within LoveCoinsProvider');
  return ctx;
}

export { COIN_PACKS, BOOST_COSTS, EARN_ACTIONS };
