import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CertificationItemList from '../../src/components/CertificationItemList';

vi.mock('@iconify/react', () => ({
  Icon: (props) => <span data-testid="icon" {...props} />
}));

describe('CertificationItemList', () => {
  const items = [
    {
      id: 1,
      title: 'AWS Certified',
      provider: 'Amazon',
      date: '2023',
      file_url: 'https://example.com/cert1'
    },
    {
      id: 2,
      title: 'No File Cert',
      provider: 'Test',
      date: '2024'
    }
  ];

  it('renders a list of certification items', () => {
    render(<CertificationItemList items={items} />);
    
    expect(screen.getByText('AWS Certified')).toBeInTheDocument();
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    
    expect(screen.getByText('No File Cert')).toBeInTheDocument();
  });

  it('renders link if file_url is provided', () => {
    render(<CertificationItemList items={items} />);
    
    const link = screen.getByRole('link', { name: /view certificate/i });
    expect(link).toHaveAttribute('href', 'https://example.com/cert1');
  });

  it('renders no file available text if file_url is not provided', () => {
    render(<CertificationItemList items={items} />);
    
    expect(screen.getByText('No file available')).toBeInTheDocument();
  });
});
