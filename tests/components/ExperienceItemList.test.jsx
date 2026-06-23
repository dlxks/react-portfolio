import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ExperienceItemList from '../../src/components/ExperienceItemList';

describe('ExperienceItemList', () => {
  it('renders experience item details', () => {
    const item = {
      position: 'Frontend Developer',
      company: 'Tech Corp',
      duration: '2020 - Present',
      description: ['Developed UI components', 'Fixed bugs']
    };
    
    render(<ExperienceItemList item={item} />);
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('2020 - Present')).toBeInTheDocument();
    
    expect(screen.getByText('Developed UI components')).toBeInTheDocument();
    expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
  });
});
