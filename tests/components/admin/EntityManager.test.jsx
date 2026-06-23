import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EntityManager from '../../../src/components/admin/EntityManager';
import { supabase } from '../../../src/lib/supabase';

// Mock Supabase
vi.mock('../../../src/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    storage: {
      from: vi.fn(),
    },
  },
}));

describe('EntityManager', () => {
  const mockOnUpdate = vi.fn();
  const mockData = [
    { id: 1, name: 'Item 1', role: 'Role 1' },
    { id: 2, name: 'Item 2', role: 'Role 2' },
  ];
  const mockColumns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ];
  const mockFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'role', label: 'Role', type: 'text', required: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
  });

  const renderComponent = () =>
    render(
      <EntityManager
        data={mockData}
        endpoint="test_endpoint"
        title="Test Item"
        fields={mockFields}
        columns={mockColumns}
        onUpdate={mockOnUpdate}
      />
    );

  it('renders the component and table data', () => {
    renderComponent();
    expect(screen.getByText('Test Items')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('opens add modal on add button click', () => {
    renderComponent();
    fireEvent.click(screen.getByText('+ Add Test Item'));
    expect(screen.getByText('Add Test Item')).toBeInTheDocument();
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('opens edit modal on edit button click', () => {
    renderComponent();
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    expect(screen.getByText('Edit Test Item')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Item 1')).toBeInTheDocument();
  });

  it('handles item deletion', async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqMock });
    supabase.from.mockReturnValue({
      delete: deleteMock,
    });

    renderComponent();
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('test_endpoint');
      expect(deleteMock).toHaveBeenCalled();
      expect(eqMock).toHaveBeenCalledWith('id', 1);
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  it('handles item addition', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    supabase.from.mockReturnValue({
      insert: insertMock,
    });

    renderComponent();
    fireEvent.click(screen.getByText('+ Add Test Item'));

    const nameInput = screen.getAllByRole('textbox').find(el => el.name === 'name');
    fireEvent.change(nameInput, { target: { name: 'name', value: 'New Item' } });
    const roleInput = screen.getAllByRole('textbox').find(el => el.name === 'role');
    fireEvent.change(roleInput, { target: { name: 'role', value: 'New Role' } });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('test_endpoint');
      expect(insertMock).toHaveBeenCalled();
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });
  
  it('handles item editing', async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const updateMock = vi.fn().mockReturnValue({ eq: eqMock });
    supabase.from.mockReturnValue({
      update: updateMock,
    });

    renderComponent();
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    const nameInput = screen.getByDisplayValue('Item 1');
    fireEvent.change(nameInput, { target: { name: 'name', value: 'Updated Item 1' } });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('test_endpoint');
      expect(updateMock).toHaveBeenCalled();
      expect(eqMock).toHaveBeenCalledWith('id', 1);
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });
});
