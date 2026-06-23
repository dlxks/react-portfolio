import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProfileManager from '../../../src/components/admin/ProfileManager';
import { supabase } from '../../../src/lib/supabase';

// Mock Supabase
vi.mock('../../../src/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    storage: {
      from: vi.fn(),
    },
  },
}));

describe('ProfileManager', () => {
  const mockOnUpdate = vi.fn();
  const mockProfileData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    intro_eyebrow: 'Hi, my name is',
    intro_title: 'Web Developer',
    about_description: 'I am a developer.',
    profile_image_url: 'http://example.com/image.jpg',
    resume_url: 'http://example.com/resume.pdf',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <ProfileManager
        profileData={mockProfileData}
        onUpdate={mockOnUpdate}
      />
    );

  it('renders profile data correctly', () => {
    renderComponent();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Web Developer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('http://example.com/image.jpg')).toBeInTheDocument();
  });

  it('updates form values on change', () => {
    renderComponent();
    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Jane Doe' } });
    expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const updateMock = vi.fn().mockReturnValue({ eq: eqMock });
    supabase.from.mockReturnValue({
      update: updateMock,
    });

    renderComponent();
    fireEvent.click(screen.getByText('Update Profile'));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('personal_info');
      expect(updateMock).toHaveBeenCalled();
      expect(eqMock).toHaveBeenCalledWith('id', 1);
      expect(mockOnUpdate).toHaveBeenCalled();
      expect(screen.getByText('Profile updated successfully!')).toBeInTheDocument();
    });
  });

  it('handles error on submit', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const eqMock = vi.fn().mockResolvedValue({ error: new Error('Update failed') });
    const updateMock = vi.fn().mockReturnValue({ eq: eqMock });
    supabase.from.mockReturnValue({
      update: updateMock,
    });

    renderComponent();
    fireEvent.click(screen.getByText('Update Profile'));

    await waitFor(() => {
      expect(screen.getByText('Update failed')).toBeInTheDocument();
    });
    
    consoleSpy.mockRestore();
  });
});
