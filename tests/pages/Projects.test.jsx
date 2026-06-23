import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Projects from '../../src/pages/Projects';

vi.mock('../../src/components/ProjectList', () => ({
  default: ({ projects }) => <div data-testid="project-list">Items: {projects.length}</div>
}));

describe('Projects Component', () => {
  it('renders correctly with default props', () => {
    render(<Projects />);
    
    expect(screen.getByText('My work')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByTestId('project-list')).toHaveTextContent('Items: 0');
  });

  it('renders custom profile and projects data', () => {
    const mockProfile = {
      projects_eyebrow: 'Portfolio',
      projects_title: 'My Creations',
      projects_description: 'Look at my stuff'
    };
    const mockProjects = [{ id: 1 }];

    render(<Projects profile={mockProfile} projects={mockProjects} />);

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('My Creations')).toBeInTheDocument();
    expect(screen.getByText('Look at my stuff')).toBeInTheDocument();
    expect(screen.getByTestId('project-list')).toHaveTextContent('Items: 1');
  });
});
