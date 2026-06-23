import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useActiveSection from '../../src/hooks/useActiveSection';

describe('useActiveSection', () => {
  let observeMock;
  let disconnectMock;
  let triggerObserver;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    window.IntersectionObserver = class {
      constructor(callback) {
        triggerObserver = callback;
      }
      observe = observeMock;
      disconnect = disconnectMock;
    };

    document.getElementById = vi.fn((id) => {
      if (id === 'missing') return null;
      return { id };
    });
  });

  it('should initialize with the first section id if provided', () => {
    const { result } = renderHook(() => useActiveSection(['home', 'about']));
    expect(result.current).toBe('home');
  });

  it('should initialize with empty string if no section ids provided', () => {
    const { result } = renderHook(() => useActiveSection([]));
    expect(result.current).toBe('');
  });

  it('should observe valid elements', () => {
    renderHook(() => useActiveSection(['home', 'missing', 'about']));
    expect(document.getElementById).toHaveBeenCalledWith('home');
    expect(document.getElementById).toHaveBeenCalledWith('missing');
    expect(document.getElementById).toHaveBeenCalledWith('about');
    expect(observeMock).toHaveBeenCalledTimes(2); // 'missing' returns null so it is filtered out
  });

  it('should update active section when intersection occurs', () => {
    const { result } = renderHook(() => useActiveSection(['home', 'about']));

    act(() => {
      triggerObserver([
        { isIntersecting: true, intersectionRatio: 0.8, target: { id: 'about' } },
        { isIntersecting: true, intersectionRatio: 0.5, target: { id: 'home' } },
        { isIntersecting: false, intersectionRatio: 0, target: { id: 'projects' } },
      ]);
    });

    // Should pick the one with highest intersectionRatio, which is 'about' (0.8)
    expect(result.current).toBe('about');
  });

  it('should disconnect observer on unmount', () => {
    const { unmount } = renderHook(() => useActiveSection(['home']));
    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
