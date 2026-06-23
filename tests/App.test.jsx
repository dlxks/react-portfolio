import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { describe, it, expect, vi } from 'vitest';

vi.mock('aos', () => ({
  default: { init: vi.fn(), refresh: vi.fn() }
}));

vi.mock('../src/hooks/useAOS', () => ({
  default: vi.fn()
}));

vi.mock('../src/hooks/usePortfolioData', () => ({
  default: () => ({
    data: {
      profile: { name: 'Test User' },
      experience: [],
      education: [],
      certificates: [],
      projects: [],
      socialLinks: []
    },
    loading: false
  })
}));

describe('App', () => {
  it('renders portfolio page successfully', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
