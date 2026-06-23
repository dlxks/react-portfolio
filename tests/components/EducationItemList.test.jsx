import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EducationItemList from '../../src/components/EducationItemList';

describe('EducationItemList', () => {
  it('renders education item details without grade', () => {
    const item = {
      school: 'University',
      degree: 'BS CS',
      duration: '2019 - 2023',
      level: 'College'
    };
    
    render(<EducationItemList item={item} />);
    
    expect(screen.getByText('University')).toBeInTheDocument();
    expect(screen.getByText('BS CS')).toBeInTheDocument();
    expect(screen.getByText('2019 - 2023')).toBeInTheDocument();
    expect(screen.getByText('College')).toBeInTheDocument();
  });

  it('renders education item details with grade', () => {
    const item = {
      school: 'University',
      degree: 'BS CS',
      duration: '2019 - 2023',
      level: 'College',
      grade: '1.0'
    };
    
    render(<EducationItemList item={item} />);
    
    expect(screen.getByText('College · GPA/GWA: 1.0')).toBeInTheDocument();
  });
});
