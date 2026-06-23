import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NavbarContainer from '../../src/components/NavbarContainer';
import useActiveSection from '../../src/hooks/useActiveSection';

vi.mock('@iconify/react', () => ({
  Icon: (props) => <span data-testid="icon" {...props} />
}));

vi.mock('../../src/hooks/useActiveSection', () => ({
  default: vi.fn()
}));

vi.mock('react-bootstrap', () => {
  return {
    Offcanvas: Object.assign(
      ({ show, onHide, children }) => {
        return show ? (
          <div data-testid="offcanvas">
            <button onClick={onHide} data-testid="close-btn">Close</button>
            {children}
          </div>
        ) : null;
      },
      {
        Header: ({ children }) => <div>{children}</div>,
        Title: ({ children }) => <div>{children}</div>,
        Body: ({ children }) => <div>{children}</div>,
      }
    )
  };
});

describe('NavbarContainer', () => {
  const sections = ['home', 'about', 'projects'];

  beforeEach(() => {
    useActiveSection.mockReturnValue('home');
    vi.clearAllMocks();
    
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders brand and navigation links', () => {
    render(<NavbarContainer sections={sections} />);
    
    expect(screen.getByText((content, element) => content.includes('tristan'))).toBeInTheDocument();
    
    sections.forEach(section => {
      expect(screen.getByRole('button', { name: new RegExp(section, 'i') })).toBeInTheDocument();
    });
  });

  it('applies active class to active section', () => {
    useActiveSection.mockReturnValue('about');
    render(<NavbarContainer sections={sections} />);
    
    const aboutBtn = screen.getByRole('button', { name: /about/i });
    expect(aboutBtn.className).toContain('active');
  });

  it('opens and closes mobile menu', () => {
    render(<NavbarContainer sections={sections} />);
    
    const toggleBtn = screen.getByLabelText('Open menu');
    fireEvent.click(toggleBtn);
    
    expect(screen.getByTestId('offcanvas')).toBeInTheDocument();
    
    const closeBtn = screen.getByTestId('close-btn');
    fireEvent.click(closeBtn);
    
    expect(screen.queryByTestId('offcanvas')).not.toBeInTheDocument();
  });

  it('navigates to section on click', () => {
    render(<NavbarContainer sections={sections} />);
    
    const dummyDiv = document.createElement('div');
    dummyDiv.id = 'projects';
    document.body.appendChild(dummyDiv);
    
    const projectBtn = screen.getByRole('button', { name: /projects/i });
    fireEvent.click(projectBtn);
    
    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    
    document.body.removeChild(dummyDiv);
  });
});
