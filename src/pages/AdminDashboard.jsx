import { useNavigate } from 'react-router-dom';
import { Container, Button, Tab, Row, Col, Nav } from 'react-bootstrap';
import ProfileManager from '../components/admin/ProfileManager';
import EntityManager from '../components/admin/EntityManager';
import usePortfolioData from '../hooks/usePortfolioData';

import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const { data, refetch: fetchData } = usePortfolioData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <Container className="py-5 admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h2 className="mb-0 fs-4 fw-bold text-dark">Admin Dashboard</h2>
        <div>
          <Button variant="outline-secondary" size="sm" className="me-2 px-3" onClick={() => navigate('/')}>View Site</Button>
          <Button variant="outline-danger" size="sm" className="px-3" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <Tab.Container id="admin-tabs" defaultActiveKey="profile">
        <Row>
          <Col sm={3} className="mb-4">
            <Nav variant="pills" className="flex-column gap-1">
              <Nav.Item>
                <Nav.Link eventKey="profile" className="px-3 py-2 rounded-3" style={{fontWeight: 500}}>Personal Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="experience" className="px-3 py-2 rounded-3" style={{fontWeight: 500}}>Experience</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="education" className="px-3 py-2 rounded-3" style={{fontWeight: 500}}>Education</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="certificates" className="px-3 py-2 rounded-3" style={{fontWeight: 500}}>Certifications</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="projects" className="px-3 py-2 rounded-3" style={{fontWeight: 500}}>Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="social_links" className="px-3 py-2 rounded-3" style={{fontWeight: 500}}>Social Links</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="bg-white p-4 rounded-4 shadow-sm border">
              <Tab.Pane eventKey="profile">
                <ProfileManager 
                  profileData={data.profile} 
                  onUpdate={fetchData} 
                />
              </Tab.Pane>
              <Tab.Pane eventKey="experience">
                <EntityManager 
                  data={data.experience} 
                  endpoint="experience" 
                  onUpdate={fetchData} 
                  title="Experience" 
                  columns={[{key: 'company', label: 'Company'}, {key: 'position', label: 'Position'}, {key: 'duration', label: 'Duration'}]}
                  fields={[
                    {name: 'company', label: 'Company', required: true}, 
                    {name: 'position', label: 'Position', required: true}, 
                    {name: 'duration', label: 'Duration', type: 'date-range', required: true}, 
                    {name: 'description', label: 'Description (one point per line)', type: 'array-textarea', required: true, rows: 5}
                  ]}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="education">
                <EntityManager 
                  data={data.education} 
                  endpoint="education" 
                  onUpdate={fetchData} 
                  title="Education" 
                  columns={[{key: 'school', label: 'School'}, {key: 'degree', label: 'Degree'}, {key: 'duration', label: 'Duration'}]}
                  fields={[
                    {name: 'school', label: 'School', required: true}, 
                    {name: 'location', label: 'Location'}, 
                    {name: 'level', label: 'Level'}, 
                    {name: 'degree', label: 'Degree', required: true}, 
                    {name: 'duration', label: 'Duration', type: 'date-range', required: true}, 
                    {name: 'grade', label: 'Grade'}
                  ]}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="certificates">
                <EntityManager 
                  data={data.certificates} 
                  endpoint="certificates" 
                  onUpdate={fetchData} 
                  title="Certification" 
                  columns={[{key: 'title', label: 'Title'}, {key: 'provider', label: 'Provider'}, {key: 'date', label: 'Date'}]}
                  fields={[
                    {name: 'title', label: 'Title', required: true}, 
                    {name: 'provider', label: 'Provider', required: true}, 
                    {name: 'date', label: 'Date', type: 'date-range', required: true}, 
                    {name: 'file_url', label: 'Certificate File', type: 'file'}
                  ]}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="projects">
                <EntityManager 
                  data={data.projects} 
                  endpoint="projects" 
                  onUpdate={fetchData} 
                  title="Project" 
                  columns={[{key: 'title', label: 'Title'}, {key: 'technology', label: 'Technology'}]}
                  fields={[
                    {name: 'title', label: 'Title', required: true}, 
                    {name: 'technology', label: 'Technology', required: true}, 
                    {name: 'link', label: 'Project Link'}, 
                    {name: 'description', label: 'Description (one point per line)', type: 'array-textarea', required: true, rows: 5}
                  ]}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="social_links">
                <EntityManager 
                  data={data.socialLinks} 
                  endpoint="social_links" 
                  onUpdate={fetchData} 
                  title="Social Link" 
                  columns={[{key: 'platform', label: 'Platform'}, {key: 'url', label: 'URL'}, {key: 'icon', label: 'Icon'}]}
                  fields={[
                    {name: 'platform', label: 'Platform Name (e.g., YouTube)', required: true}, 
                    {name: 'url', label: 'URL (e.g., https://youtube.com/...)', required: true}, 
                    {name: 'icon', label: 'Iconify Name (e.g., bi:youtube)'}
                  ]}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminDashboard;
