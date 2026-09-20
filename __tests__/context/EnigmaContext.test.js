import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { EnigmaProvider, useEnigma, ENIGMA_ACHIEVEMENTS } from '../../app/context/EnigmaContext';

const wrapper = ({ children }) => <EnigmaProvider>{children}</EnigmaProvider>;

describe('EnigmaContext', () => {
  it('poskytuje výchozí stav', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    expect(result.current.enigmaCount).toBe(0);
    expect(result.current.unlockedAchievements).toEqual([]);
    expect(result.current.totalSaved).toBe(0);
    expect(result.current.streak).toBe(0);
  });

  it('incrementEnigma zvyšuje count', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    act(() => {
      result.current.incrementEnigma(5);
    });
    expect(result.current.enigmaCount).toBe(5);
  });

  it('triggerEnigma zvyšuje o 1', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    act(() => {
      result.current.triggerEnigma();
    });
    expect(result.current.enigmaCount).toBe(1);
  });

  it('unlockAchievement odemkne achievement a přidá odměnu', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    let success;
    act(() => {
      success = result.current.unlockAchievement('first_like');
    });
    expect(success).toBe(true);
    expect(result.current.unlockedAchievements).toContain('first_like');
    const achievement = ENIGMA_ACHIEVEMENTS.find((a) => a.id === 'first_like');
    expect(result.current.enigmaCount).toBe(achievement.reward);
  });

  it('unlockAchievement nepřidá duplicitní', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    act(() => {
      result.current.unlockAchievement('first_like');
    });
    const countBefore = result.current.enigmaCount;
    let success;
    act(() => {
      success = result.current.unlockAchievement('first_like');
    });
    expect(success).toBe(false);
    expect(result.current.enigmaCount).toBe(countBefore);
  });

  it('unlockAchievement vrací false pro neznámý achievement', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    let success;
    act(() => {
      success = result.current.unlockAchievement('nonexistent');
    });
    expect(success).toBe(false);
  });

  it('trackAction odemkne first_like', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    act(() => {
      result.current.trackAction('like');
    });
    expect(result.current.unlockedAchievements).toContain('first_like');
  });

  it('trackAction odemkne first_save', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    act(() => {
      result.current.trackAction('save');
    });
    expect(result.current.unlockedAchievements).toContain('first_save');
  });

  it('addSavedAmount přidává úsporu', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    act(() => {
      result.current.addSavedAmount(500);
    });
    expect(result.current.totalSaved).toBe(500);
  });

  it('getAchievements vrací seznam s unlocked stavem', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    act(() => {
      result.current.unlockAchievement('first_like');
    });
    const achievements = result.current.getAchievements();
    expect(achievements.length).toBe(ENIGMA_ACHIEVEMENTS.length);
    const firstLike = achievements.find((a) => a.id === 'first_like');
    expect(firstLike.unlocked).toBe(true);
  });

  it('getProgress vrací procenta', () => {
    const { result } = renderHook(() => useEnigma(), { wrapper });
    const progress = result.current.getProgress();
    expect(progress.total).toBe(ENIGMA_ACHIEVEMENTS.length);
    expect(progress.unlocked).toBe(0);
    expect(progress.percentage).toBe(0);
  });

  it('ENIGMA_ACHIEVEMENTS má správnou strukturu', () => {
    ENIGMA_ACHIEVEMENTS.forEach((a) => {
      expect(a.id).toBeDefined();
      expect(a.name).toBeDefined();
      expect(a.desc).toBeDefined();
      expect(a.icon).toBeDefined();
      expect(a.reward).toBeGreaterThan(0);
    });
  });
});
