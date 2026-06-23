import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BulletList from '../../src/components/BulletList';

describe('BulletList', () => {
  it('renders nothing if items are not provided or empty', () => {
    const { container } = render(<BulletList />);
    expect(container.firstChild).toBeNull();
  });

  it('renders list items correctly', () => {
    const items = ['Item 1', 'Item 2'];
    render(<BulletList items={items} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toBe('Item 1');
    expect(listItems[1].textContent).toBe('Item 2');
  });

  it('applies custom className', () => {
    const { container } = render(<BulletList items={['Item']} className="custom-class" />);
    expect(container.firstChild.className).toBe('custom-class');
  });
});
