import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/pages/Footer';

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid={`icon-${icon}`}>{icon}</span>,
}));

vi.mock('../../src/lib/utils', () => ({
  getFullUrl: (url) => url,
  firstWord: (name) => (name ? name.split(' ')[0] : ''),
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1)
}));

describe('Footer Component', () => {
  it('renders footer with profile data', () => {
    const mockProfile = { name: 'John Doe', email: 'john@example.com' };
    const mockLinks = [{ platform: 'github', url: 'https://github.com/john', icon: 'bi:github' }];
    const mockSections = ['about', 'projects'];

    render(<Footer profile={mockProfile} socialLinks={mockLinks} sections={mockSections} />);

    expect(screen.getByText('John.')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByTestId('icon-bi:github')).toBeInTheDocument();
  });
});
