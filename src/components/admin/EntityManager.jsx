import { useState } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const EntityManager = ({ data, endpoint, token, onUpdate, title, fields, columns }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleClose = () => {
    setShowModal(false);
    setStatus({ type: '', message: '' });
  };

  const handleShowAdd = () => {
    setFormData({});
    setIsEditing(false);
    setShowModal(true);
  };

  const handleShowEdit = (item) => {
    // Process fields if needed (e.g. array to string)
    const processedData = { ...item };
    fields.forEach(f => {
      if (f.type === 'array-textarea' && Array.isArray(processedData[f.name])) {
        processedData[f.name] = processedData[f.name].join('\n');
      }
    });
    setFormData(processedData);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append('file', file);

    setStatus({ type: 'info', message: 'Uploading file...' });
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: fileData
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, [fieldName]: data.url });
        setStatus({ type: 'success', message: 'File uploaded successfully!' });
      } else {
        const errorData = await response.json();
        setStatus({ type: 'danger', message: errorData.error || 'Failed to upload file.' });
      }
    } catch {
      setStatus({ type: 'danger', message: 'An error occurred while uploading.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Pre-process form data before sending (e.g., textarea string back to array)
    const payload = { ...formData };
    fields.forEach(f => {
      if (f.type === 'array-textarea' && typeof payload[f.name] === 'string') {
        payload[f.name] = payload[f.name].split('\n').map(s => s.trim()).filter(s => s !== '');
      }
    });

    const url = isEditing ? `/api/${endpoint}/${formData.id}` : `/api/${endpoint}`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        handleClose();
        if (onUpdate) onUpdate();
      } else {
        const errorData = await response.json();
        setStatus({ type: 'danger', message: errorData.error || 'Failed to save.' });
      }
    } catch {
      setStatus({ type: 'danger', message: 'An error occurred while saving.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${title.toLowerCase()}?`)) return;
    try {
      const response = await fetch(`/api/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok && onUpdate) {
        onUpdate();
      } else {
        alert('Failed to delete item.');
      }
    } catch {
      alert('Error occurred while deleting.');
    }
  };

  return (
    <div className="mt-3">
      <Button variant="success" className="mb-3" onClick={handleShowAdd}>+ Add {title}</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            {columns.map(col => <th key={col.key}>{col.label}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {columns.map(col => <td key={col.key}>{item[col.key]}</td>)}
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowEdit(item)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 2} className="text-center">No records found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit' : 'Add'} {title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {status.message && <Alert variant={status.type}>{status.message}</Alert>}
            {fields.map(field => (
              <Form.Group className="mb-3" key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'textarea' || field.type === 'array-textarea' ? (
                  <Form.Control
                    as="textarea"
                    rows={field.rows || 3}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.type === 'array-textarea' ? 'Enter each point on a new line' : ''}
                  />
                ) : field.type === 'file' ? (
                  <div>
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileUpload(e, field.name)}
                      className="mb-2"
                    />
                    <Form.Control
                      type="text"
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder="Or enter URL manually"
                    />
                  </div>
                ) : (
                  <Form.Control
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EntityManager;
