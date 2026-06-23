import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectList from '../../src/components/ProjectList';
import { getFullUrl } from '../../src/lib/utils';

vi.mock('@iconify/react', () => ({
  Icon: (props) => <span data-testid="icon" {...props} />
}));

vi.mock('../../src/lib/utils', () => ({
  getFullUrl: vi.fn((link) => (link ? `https://github.com/${link}` : null))
}));

describe('ProjectList', () => {
  it('renders project correctly with all details', () => {
    const projects = [
      {
        id: 1,
        title: 'Portfolio',
        link: 'user/portfolio',
        description: ['Built with React'],
        technology: 'React, Vite, CSS'
      }
    ];

    render(<ProjectList projects={projects} />);

    expect(screen.getAllByText('Portfolio')[0]).toBeInTheDocument();
    expect(screen.getByText('Built with React')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', 'https://github.com/user/portfolio');
  });

  it('renders project without link and tags', () => {
    const projects = [
      {
        id: 2,
        title: 'Secret Project',
        description: ['Cannot share link']
      }
    ];
    
    getFullUrl.mockReturnValueOnce(null);

    render(<ProjectList projects={projects} />);

    expect(screen.getByText('Secret Project')).toBeInTheDocument();
    expect(screen.getByText('Cannot share link')).toBeInTheDocument();
    
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });
});
