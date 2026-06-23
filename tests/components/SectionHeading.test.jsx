import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionHeading from '../../src/components/SectionHeading';

describe('SectionHeading', () => {
  it('renders title correctly', () => {
    render(<SectionHeading title="About Me" />);
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  });

  it('renders eyebrow text when provided', () => {
    render(<SectionHeading title="About Me" eyebrow="Introduction" />);
    expect(screen.getByText('Introduction')).toBeInTheDocument();
  });

  it('renders children as intro paragraph', () => {
    render(
      <SectionHeading title="About Me">
        This is an introduction.
      </SectionHeading>
    );
    expect(screen.getByText('This is an introduction.')).toBeInTheDocument();
  });
});
