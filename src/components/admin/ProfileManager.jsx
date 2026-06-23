import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { supabase } from '../../lib/supabase';

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

    setStatus({ type: 'info', message: 'Uploading résumé…' });
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, resume_url: data.publicUrl }));
      setStatus({ type: 'success', message: 'Résumé uploaded. Click "Update Profile" to save.' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'danger', message: 'An error occurred while uploading.' });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus({ type: 'info', message: 'Uploading profile image…' });
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, profile_image_url: data.publicUrl }));
      setStatus({ type: 'success', message: 'Profile image uploaded. Click "Update Profile" to save.' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'danger', message: 'An error occurred while uploading image.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const { id, ...updateData } = formData;
      const { error } = await supabase
        .from('personal_info')
        .update(updateData)
        .eq('id', id);
        
      if (error) throw error;
      
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
      setStatus({ type: 'danger', message: err.message || 'An error occurred while updating.' });
    }
  };

  return (
    <div className="mt-2">
      {status.message && <Alert variant={status.type} className="py-2 px-3 small">{status.message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-secondary">Personal Details</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Name</Form.Label>
                  <Form.Control size="sm" type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Email</Form.Label>
                  <Form.Control size="sm" type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                </Form.Group>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small mb-1 text-muted">Birthday</Form.Label>
                      <Form.Control size="sm" type="text" name="birthday" value={formData.birthday || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-2">
                      <Form.Label className="small mb-1 text-muted">Age</Form.Label>
                      <Form.Control size="sm" type="number" name="age" value={formData.age || ''} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Degree</Form.Label>
                  <Form.Control size="sm" type="text" name="degree" value={formData.degree || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Contact</Form.Label>
                  <Form.Control size="sm" type="text" name="contact" value={formData.contact || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Address</Form.Label>
                  <Form.Control size="sm" as="textarea" rows={2} name="address" value={formData.address || ''} onChange={handleChange} />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-secondary">Intro Section</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Intro Eyebrow</Form.Label>
                  <Form.Control size="sm" type="text" name="intro_eyebrow" value={formData.intro_eyebrow || ''} onChange={handleChange} placeholder="Hi, my name is" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Intro Title</Form.Label>
                  <Form.Control size="sm" type="text" name="intro_title" value={formData.intro_title || ''} onChange={handleChange} placeholder="Front-End & Web Developer" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Intro Description</Form.Label>
                  <Form.Control size="sm" as="textarea" rows={3} name="intro_description" value={formData.intro_description || ''} onChange={handleChange} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-secondary">Profile & Résumé Files</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label className="small mb-1 text-muted">Profile Image</Form.Label>
                  <Form.Control size="sm" type="file" accept="image/*" onChange={handleImageUpload} className="mb-2 text-muted" />
                  <Form.Control size="sm" type="text" name="profile_image_url" value={formData.profile_image_url || ''} onChange={handleChange} placeholder="Or enter image URL manually" />
                  {formData.profile_image_url && (
                    <img src={formData.profile_image_url} alt="Profile preview" className="mt-2 border" style={{maxHeight: '60px', borderRadius: '4px'}} />
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Résumé (PDF)</Form.Label>
                  <Form.Control size="sm" type="file" accept="application/pdf" onChange={handleResumeUpload} className="mb-2 text-muted" />
                  <Form.Control size="sm" type="text" name="resume_url" value={formData.resume_url || ''} onChange={handleChange} placeholder="Or enter résumé URL manually" />
                  {formData.resume_url && (
                    <a href={formData.resume_url} target="_blank" rel="noopener noreferrer" className="small d-inline-block mt-1 text-decoration-none">View current résumé</a>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-secondary">About Section</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">About Eyebrow</Form.Label>
                  <Form.Control size="sm" type="text" name="about_eyebrow" value={formData.about_eyebrow || ''} onChange={handleChange} placeholder="Get to know me" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">About Title</Form.Label>
                  <Form.Control size="sm" type="text" name="about_title" value={formData.about_title || ''} onChange={handleChange} placeholder="About" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">About Role</Form.Label>
                  <Form.Control size="sm" type="text" name="about_role" value={formData.about_role || ''} onChange={handleChange} placeholder="Front-End Developer & Web Developer" />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">About Description</Form.Label>
                  <Form.Control size="sm" as="textarea" rows={3} name="about_description" value={formData.about_description || ''} onChange={handleChange} />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-secondary">Section Descriptions</h6>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Resume Section</Form.Label>
                  <Form.Control size="sm" as="textarea" rows={2} name="resume_description" value={formData.resume_description || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Certificates Section</Form.Label>
                  <Form.Control size="sm" as="textarea" rows={2} name="certificates_description" value={formData.certificates_description || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className="small mb-1 text-muted">Projects Section</Form.Label>
                  <Form.Control size="sm" as="textarea" rows={2} name="projects_description" value={formData.projects_description || ''} onChange={handleChange} />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="mt-4 text-end">
          <Button variant="primary" type="submit" size="sm" className="px-4">Update Profile</Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfileManager;
