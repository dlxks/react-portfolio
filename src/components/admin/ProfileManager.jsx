import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ProfileManager = ({ profileData, token, onUpdate }) => {
  const [formData, setFormData] = useState({ ...profileData });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    setFormData({ ...profileData });
  }, [profileData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append('file', file);

    setStatus({ type: 'info', message: 'Uploading résumé…' });
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fileData
      });
      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, resume_url: data.url }));
        setStatus({ type: 'success', message: 'Résumé uploaded. Click "Update Profile" to save.' });
      } else {
        const errorData = await response.json();
        setStatus({ type: 'danger', message: errorData.error || 'Failed to upload résumé.' });
      }
    } catch {
      setStatus({ type: 'danger', message: 'An error occurred while uploading.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus({ type: 'success', message: 'Profile updated successfully!' });
        if (onUpdate) onUpdate();
      } else {
        const errorData = await response.json();
        setStatus({ type: 'danger', message: errorData.error || 'Failed to update profile.' });
      }
    } catch {
      setStatus({ type: 'danger', message: 'An error occurred while updating.' });
    }
  };

  return (
    <div className="mt-3">
      {status.message && <Alert variant={status.type}>{status.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="text" name="birthday" value={formData.birthday || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={formData.age || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Degree</Form.Label>
              <Form.Control type="text" name="degree" value={formData.degree || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" name="contact" value={formData.contact || ''} onChange={handleChange} />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={3} name="address" value={formData.address || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Résumé (PDF)</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="resume_url"
                value={formData.resume_url || ''}
                onChange={handleChange}
                placeholder="Or enter a résumé URL manually"
              />
              {formData.resume_url && (
                <a
                  href={formData.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small d-inline-block mt-2"
                >
                  View current résumé
                </a>
              )}
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>
    </div>
  );
};

export default ProfileManager;
