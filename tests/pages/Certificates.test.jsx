import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Certificates from '../../src/pages/Certificates';

vi.mock('../../src/components/CertificationItemList', () => ({
  default: ({ items }) => <div data-testid="cert-list">Items: {items.length}</div>
}));

describe('Certificates Component', () => {
  it('renders correctly with default props', () => {
    render(<Certificates />);
    
    expect(screen.getByText('Credentials')).toBeInTheDocument();
    expect(screen.getByText('Certificates & Training')).toBeInTheDocument();
    expect(screen.getByTestId('cert-list')).toHaveTextContent('Items: 0');
  });

  it('renders custom profile and certificates data', () => {
    const mockProfile = {
      certificates_eyebrow: 'My Certs',
      certificates_title: 'Awards',
      certificates_description: 'Some desc'
    };
    const mockCerts = [{ id: 1 }, { id: 2 }];

    render(<Certificates profile={mockProfile} certificates={mockCerts} />);

    expect(screen.getByText('My Certs')).toBeInTheDocument();
    expect(screen.getByText('Awards')).toBeInTheDocument();
    expect(screen.getByText('Some desc')).toBeInTheDocument();
    expect(screen.getByTestId('cert-list')).toHaveTextContent('Items: 2');
  });
});
