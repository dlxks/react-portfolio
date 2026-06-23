import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../../src/pages/About';

// Mock Iconify to prevent actual network requests
vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid="icon">{icon}</span>,
}));

describe('About Component', () => {
  const mockProfile = {
    birthday: '1990-01-01',
    age: '30',
    contact: '123-456-7890',
    degree: 'BSc Computer Science',
    email: 'test@example.com',
    address: '123 Test St',
    about_eyebrow: 'Get to know me test',
    about_title: 'About Test',
    about_description: 'Test description',
    profile_image_url: 'http://test.com/img.jpg',
    name: 'Test Name',
    about_role: 'Test Role'
  };

  it('renders the about section with profile data', () => {
    render(<About profile={mockProfile} />);

    expect(screen.getByText('About Test')).toBeInTheDocument();
    expect(screen.getByText('Get to know me test')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Test Role')).toBeInTheDocument();

    expect(screen.getByText('1990-01-01')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('BSc Computer Science')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'http://test.com/img.jpg');
    expect(img).toHaveAttribute('alt', 'Test Name portrait');
  });

  it('renders default values when profile data is missing', () => {
    render(<About profile={{}} />);
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Get to know me')).toBeInTheDocument();
    expect(screen.getByText('Front-End Developer & Web Developer')).toBeInTheDocument();
  });
});
