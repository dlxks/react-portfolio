import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Resume from '../../src/pages/Resume';

vi.mock('@iconify/react', () => ({
  Icon: ({ icon }) => <span data-testid={`icon-${icon}`}>{icon}</span>,
}));

vi.mock('../../src/components/ExperienceItemList', () => ({
  default: ({ item }) => <div data-testid="exp-item">{item.id}</div>
}));

vi.mock('../../src/components/EducationItemList', () => ({
  default: ({ item }) => <div data-testid="edu-item">{item.id}</div>
}));

describe('Resume Component', () => {
  it('renders default resume content', () => {
    render(<Resume />);

    expect(screen.getByText('My journey')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Download résumé')).toHaveAttribute('href', '/resume/sangangbayan_tristan_resume.pdf');
  });

  it('renders custom profile, experience, and education', () => {
    const mockProfile = {
      resume_eyebrow: 'Career',
      resume_title: 'CV',
      resume_description: 'My CV summary'
    };
    const mockExperience = [{ id: 'exp1' }];
    const mockEducation = [{ id: 'edu1' }];

    render(
      <Resume 
        profile={mockProfile} 
        experience={mockExperience} 
        education={mockEducation} 
        resumeUrl="/custom.pdf" 
      />
    );

    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('CV')).toBeInTheDocument();
    expect(screen.getByText('My CV summary')).toBeInTheDocument();
    expect(screen.getByText('Download résumé')).toHaveAttribute('href', '/custom.pdf');
    
    expect(screen.getByTestId('exp-item')).toBeInTheDocument();
    expect(screen.getByTestId('edu-item')).toBeInTheDocument();
  });
});
