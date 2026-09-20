import { useState, useEffect, useRef, useCallback } from 'react';
import { InteractionManager } from 'react-native';

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memory: 0,
    renderTime: 0,
    interactionTime: 0,
  });
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationRef = useRef(null);

  useEffect(() => {
    let running = true;
    const measureFPS = () => {
      if (!running) return;
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      if (delta >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / delta);
        setMetrics((prev) => ({ ...prev, fps: Math.min(fps, 60) }));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      frameCountRef.current++;
      animationRef.current = requestAnimationFrame(measureFPS);
    };
    animationRef.current = requestAnimationFrame(measureFPS);
    return () => {
      running = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const measureRender = useCallback((label) => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const duration = Math.round(end - start);
      setMetrics((prev) => ({ ...prev, renderTime: duration }));
      if (duration > 16) {
        console.warn(`[Perf] Slow render: ${label} took ${duration}ms`);
      }
    };
  }, []);

  const measureInteraction = useCallback((label) => {
    const start = performance.now();
    InteractionManager.runAfterInteractions(() => {
      const duration = Math.round(performance.now() - start);
      setMetrics((prev) => ({ ...prev, interactionTime: duration }));
      if (duration > 100) {
        console.warn(`[Perf] Slow interaction: ${label} took ${duration}ms`);
      }
    });
  }, []);

  return { metrics, measureRender, measureInteraction };
}

export function useRenderCount(componentName) {
  const renderCount = useRef(0);
  renderCount.current++;
  if (__DEV__ && renderCount.current > 10) {
    console.warn(`[Perf] ${componentName} rendered ${renderCount.current} times`);
  }
  return renderCount.current;
}

export function useWhyDidUpdate(name, props) {
  const prevProps = useRef(props);
  useEffect(() => {
    if (__DEV__) {
      const changes = {};
      Object.keys(props).forEach((key) => {
        if (props[key] !== prevProps.current[key]) {
          changes[key] = { from: prevProps.current[key], to: props[key] };
        }
      });
      if (Object.keys(changes).length > 0) {
        console.log(`[WhyDidUpdate] ${name}:`, changes);
      }
    }
    prevProps.current = props;
  });
}
