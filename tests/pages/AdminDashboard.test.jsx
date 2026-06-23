import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../../src/pages/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../src/hooks/usePortfolioData', () => ({
  default: vi.fn(() => ({
    data: {
      profile: { name: 'Test' },
      experience: [],
      education: [],
      certificates: [],
      projects: [],
      socialLinks: []
    },
    refetch: vi.fn()
  }))
}));

vi.mock('../../src/lib/supabase', () => ({
  supabase: {
    auth: {
      signOut: vi.fn()
    }
  }
}));

vi.mock('../../src/components/admin/ProfileManager', () => ({
  default: () => <div data-testid="profile-manager">Profile Manager</div>
}));

vi.mock('../../src/components/admin/EntityManager', () => ({
  default: ({ title }) => <div data-testid={`entity-manager-${title}`}>Entity Manager {title}</div>
}));

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dashboard and default tab', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('profile-manager')).toBeInTheDocument();
  });

  it('navigates to home when View Site is clicked', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('View Site'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('calls signOut and navigates to login when Logout is clicked', async () => {
    const { supabase } = await import("../../src/lib/supabase");
    
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Logout'));
    
    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/admin/login');
    });
  });

  it('switches tabs correctly', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('tab', { name: /experience/i }));
    expect(screen.getByTestId('entity-manager-Experience')).toBeInTheDocument();
  });
});
