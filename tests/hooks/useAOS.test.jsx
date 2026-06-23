import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useAOS from '../../src/hooks/useAOS';
import AOS from 'aos';

vi.mock('aos', () => ({
  default: {
    init: vi.fn(),
  },
}));

describe('useAOS', () => {
  let originalMatchMedia;

  beforeEach(() => {
    vi.clearAllMocks();
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('should initialize AOS with prefersReduced = false', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    renderHook(() => useAOS());

    expect(AOS.init).toHaveBeenCalledWith({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: false,
    });
  });

  it('should initialize AOS with prefersReduced = true', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    renderHook(() => useAOS());

    expect(AOS.init).toHaveBeenCalledWith({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      disable: true,
    });
  });
});
