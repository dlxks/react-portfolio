import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import usePortfolioData from '../../src/hooks/usePortfolioData';
import { supabase } from '../../src/lib/supabase';

vi.mock('../../src/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

describe('usePortfolioData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data and return it properly sorted', async () => {
    supabase.from.mockImplementation((table) => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockImplementation(() => {
        if (table === 'personal_info') {
          return Promise.resolve({ data: [{ name: 'Test User' }], error: null });
        }
        if (table === 'experience') {
          return Promise.resolve({
            data: [
              { id: 1, duration: 'Jan 2020 - Dec 2020' },
              { id: 2, duration: 'Jan 2021 - Present' },
            ],
            error: null,
          });
        }
        if (table === 'certificates') {
          return Promise.resolve({
            data: [
              { id: 1, date: '2022' },
              { id: 2, date: '2023' },
            ],
            error: null,
          });
        }
        if (table === 'projects') {
          return Promise.resolve({
            data: [{ id: 1, title: 'Project A' }],
            error: null,
          });
        }
        return Promise.resolve({ data: [], error: null });
      }),
    }));

    const { result } = renderHook(() => usePortfolioData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.data.profile).toEqual({ name: 'Test User' });
    expect(result.current.data.projects).toEqual([{ id: 1, title: 'Project A' }]);
    
    // Sort logic should put 'Present' first (larger date value)
    expect(result.current.data.experience[0].duration).toBe('Jan 2021 - Present');
    expect(result.current.data.experience[1].duration).toBe('Jan 2020 - Dec 2020');

    // Certificates sorted by date descending
    expect(result.current.data.certificates[0].date).toBe('2023');
    expect(result.current.data.certificates[1].date).toBe('2022');
  });

  it('should handle fetch errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    supabase.from.mockImplementation(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockImplementation(() => {
        return Promise.resolve({ data: null, error: new Error('Supabase error') });
      }),
    }));

    const { result } = renderHook(() => usePortfolioData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(new Error('Supabase error'));

    consoleSpy.mockRestore();
  });
});
