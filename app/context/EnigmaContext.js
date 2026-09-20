import React, { createContext, useContext, useState, useCallback } from 'react';

const EnigmaContext = createContext(null);

const ENIGMA_ACHIEVEMENTS = [
  { id: 'first_like', name: 'První like', desc: 'Poprvé jsi dal like', icon: 'heart', reward: 1 },
  { id: 'first_save', name: 'První uložení', desc: 'Poprvé jsi uložil deal', icon: 'bookmark', reward: 1 },
  { id: 'first_share', name: 'První sdílení', desc: 'Poprvé jsi sdílel deal', icon: 'share', reward: 1 },
  { id: 'swipe_10', name: 'Desítka', desc: 'Proswipoval jsi 10 dealů', icon: 'finger-print', reward: 2 },
  { id: 'swipe_50', name: 'Padesátka', desc: 'Proswipoval jsi 50 dealů', icon: 'finger-print', reward: 5 },
  { id: 'swipe_100', name: 'Stovka', desc: 'Proswipoval jsi 100 dealů', icon: 'finger-print', reward: 10 },
  { id: 'like_10', name: 'Like king', desc: 'Dal jsi 10 liků', icon: 'heart', reward: 3 },
  { id: 'like_50', name: 'Like legend', desc: 'Dal jsi 50 liků', icon: 'heart', reward: 7 },
  { id: 'save_10', name: 'Collector', desc: 'Uložil jsi 10 dealů', icon: 'bookmark', reward: 3 },
  { id: 'share_10', name: 'Influencer', desc: 'Sdílel jsi 10 dealů', icon: 'share', reward: 5 },
  { id: 'night_owl', name: 'Noční sova', desc: 'Používej app po 23:00', icon: 'moon', reward: 2 },
  { id: 'early_bird', name: 'Časný ptáče', desc: 'Používej app před 7:00', icon: 'sunny', reward: 2 },
  { id: 'streak_3', name: 'Řada 3', desc: '3 dny po sobě', icon: 'flame', reward: 3 },
  { id: 'streak_7', name: 'Řada 7', desc: '7 dní po sobě', icon: 'flame', reward: 7 },
  { id: 'streak_30', name: 'Řada 30', desc: '30 dní po sobě', icon: 'flame', reward: 30 },
  { id: 'map_explorer', name: 'Průzkumník', desc: 'Navštiv 3 centra na mapě', icon: 'map', reward: 5 },
  { id: 'deal_hunter', name: 'Lovec dealů', desc: 'Najdi 20 dealů pod 100 Kč', icon: 'search', reward: 10 },
  { id: 'big_spender', name: 'Velký shopař', desc: 'Ušetři celkem 10000 Kč', icon: 'wallet', reward: 15 },
];

export function EnigmaProvider({ children }) {
  const [enigmaCount, setEnigmaCount] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState(null);

  const incrementEnigma = useCallback((amount = 1) => {
    setEnigmaCount((prev) => prev + amount);
  }, []);

  const triggerEnigma = useCallback(() => {
    setEnigmaCount((prev) => prev + 1);
  }, []);

  const unlockAchievement = useCallback((achievementId) => {
    if (unlockedAchievements.includes(achievementId)) return false;
    const achievement = ENIGMA_ACHIEVEMENTS.find((a) => a.id === achievementId);
    if (!achievement) return false;
    setUnlockedAchievements((prev) => [...prev, achievementId]);
    setEnigmaCount((prev) => prev + achievement.reward);
    return true;
  }, [unlockedAchievements]);

  const trackAction = useCallback((action) => {
    const actionMap = {
      like: 'first_like',
      save: 'first_save',
      share: 'first_share',
    };
    if (actionMap[action]) {
      unlockAchievement(actionMap[action]);
    }
  }, [unlockAchievement]);

  const addSavedAmount = useCallback((amount) => {
    setTotalSaved((prev) => prev + amount);
    if (totalSaved + amount >= 10000) {
      unlockAchievement('big_spender');
    }
  }, [totalSaved, unlockAchievement]);

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    if (lastActiveDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActiveDate === yesterday.toDateString()) {
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak >= 3) unlockAchievement('streak_3');
        if (newStreak >= 7) unlockAchievement('streak_7');
        if (newStreak >= 30) unlockAchievement('streak_30');
        return newStreak;
      });
    } else {
      setStreak(1);
    }
    setLastActiveDate(today);
  }, [lastActiveDate, unlockAchievement]);

  const getAchievements = useCallback(() => {
    return ENIGMA_ACHIEVEMENTS.map((a) => ({
      ...a,
      unlocked: unlockedAchievements.includes(a.id),
    }));
  }, [unlockedAchievements]);

  const getProgress = useCallback(() => {
    return {
      total: ENIGMA_ACHIEVEMENTS.length,
      unlocked: unlockedAchievements.length,
      percentage: Math.round((unlockedAchievements.length / ENIGMA_ACHIEVEMENTS.length) * 100),
    };
  }, [unlockedAchievements]);

  return (
    <EnigmaContext.Provider
      value={{
        enigmaCount,
        unlockedAchievements,
        totalSaved,
        streak,
        incrementEnigma,
        triggerEnigma,
        unlockAchievement,
        trackAction,
        addSavedAmount,
        updateStreak,
        getAchievements,
        getProgress,
        ENIGMA_ACHIEVEMENTS,
      }}
    >
      {children}
    </EnigmaContext.Provider>
  );
}

export function useEnigma() {
  const ctx = useContext(EnigmaContext);
  if (!ctx) throw new Error('useEnigma must be used within EnigmaProvider');
  return ctx;
}

export { ENIGMA_ACHIEVEMENTS };
