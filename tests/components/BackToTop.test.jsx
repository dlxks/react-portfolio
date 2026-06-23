import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BackToTop from '../../src/components/BackToTop';

vi.mock('@iconify/react', () => ({
  Icon: (props) => <span data-testid="icon" {...props} />
}));

describe('BackToTop', () => {
  it('should not be visible initially', () => {
    render(<BackToTop />);
    const button = screen.getByRole('button', { name: /back to top/i });
    expect(button.className).not.toContain('is-visible');
  });

  it('should become visible after scrolling past 400px', () => {
    render(<BackToTop />);
    const button = screen.getByRole('button', { name: /back to top/i });
    
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    fireEvent.scroll(window);
    
    expect(button.className).toContain('is-visible');
  });

  it('should scroll to top when clicked', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;
    
    render(<BackToTop />);
    const button = screen.getByRole('button', { name: /back to top/i });
    
    fireEvent.click(button);
    
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
