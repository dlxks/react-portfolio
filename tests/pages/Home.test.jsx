import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/Home';

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid={`icon-${icon}`}>{icon}</span>,
}));

vi.mock('../../src/lib/utils', () => ({
  getFullUrl: (url) => url,
}));

describe('Home Component', () => {
  it('renders default home content', () => {
    render(<Home profile={{}} />);

    expect(screen.getByText('Hi, my name is')).toBeInTheDocument();
    expect(screen.getByText('Front-End & Web Developer')).toBeInTheDocument();
    expect(screen.getByText('View my work')).toBeInTheDocument();
    expect(screen.getByText('About me')).toBeInTheDocument();
  });

  it('renders with custom profile data', () => {
    const mockProfile = {
      name: 'Jane Doe',
      intro_eyebrow: 'Hello, I am',
      intro_title: 'Full Stack Engineer',
      intro_description: 'I build stuff.'
    };
    const mockLinks = [{ platform: 'twitter', url: 'https://twitter.com', icon: 'bi:twitter' }];

    render(<Home profile={mockProfile} socialLinks={mockLinks} />);

    expect(screen.getByText('Hello, I am')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Engineer')).toBeInTheDocument();
    expect(screen.getByText('I build stuff.')).toBeInTheDocument();
    expect(screen.getByTestId('icon-bi:twitter')).toBeInTheDocument();
  });
});
