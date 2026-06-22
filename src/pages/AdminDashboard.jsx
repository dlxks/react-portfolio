import { useNavigate } from 'react-router-dom';
import { Container, Button, Tabs, Tab } from 'react-bootstrap';
import ProfileManager from '../components/admin/ProfileManager';
import EntityManager from '../components/admin/EntityManager';
import usePortfolioData from '../hooks/usePortfolioData';

const AdminDashboard = () => {
  const { data, refetch: fetchData } = usePortfolioData();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <div>
          <Button variant="outline-primary" className="me-2" onClick={() => navigate('/')}>View Site</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <Tabs defaultActiveKey="profile" id="admin-tabs" className="mb-3">
        <Tab eventKey="profile" title="Personal Info">
          <ProfileManager 
            profileData={data.profile} 
            token={token} 
            onUpdate={fetchData} 
          />
        </Tab>
        <Tab eventKey="experience" title="Experience">
          <EntityManager 
            data={data.experience} 
            endpoint="experience" 
            token={token} 
            onUpdate={fetchData} 
            title="Experience" 
            columns={[{key: 'company', label: 'Company'}, {key: 'position', label: 'Position'}, {key: 'duration', label: 'Duration'}]}
            fields={[
              {name: 'company', label: 'Company', required: true}, 
              {name: 'position', label: 'Position', required: true}, 
              {name: 'duration', label: 'Duration', required: true}, 
              {name: 'description', label: 'Description (one point per line)', type: 'array-textarea', required: true, rows: 5}
            ]}
          />
        </Tab>
        <Tab eventKey="education" title="Education">
          <EntityManager 
            data={data.education} 
            endpoint="education" 
            token={token} 
            onUpdate={fetchData} 
            title="Education" 
            columns={[{key: 'school', label: 'School'}, {key: 'degree', label: 'Degree'}, {key: 'duration', label: 'Duration'}]}
            fields={[
              {name: 'school', label: 'School', required: true}, 
              {name: 'location', label: 'Location'}, 
              {name: 'level', label: 'Level'}, 
              {name: 'degree', label: 'Degree', required: true}, 
              {name: 'duration', label: 'Duration', required: true}, 
              {name: 'grade', label: 'Grade'}
            ]}
          />
        </Tab>
        <Tab eventKey="certificates" title="Certifications">
          <EntityManager 
            data={data.certificates} 
            endpoint="certificates" 
            token={token} 
            onUpdate={fetchData} 
            title="Certification" 
            columns={[{key: 'title', label: 'Title'}, {key: 'provider', label: 'Provider'}, {key: 'date', label: 'Date'}]}
            fields={[
              {name: 'title', label: 'Title', required: true}, 
              {name: 'provider', label: 'Provider', required: true}, 
              {name: 'date', label: 'Date', required: true}, 
              {name: 'file_url', label: 'Certificate File', type: 'file'}
            ]}
          />
        </Tab>
        <Tab eventKey="projects" title="Projects">
          <EntityManager 
            data={data.projects} 
            endpoint="projects" 
            token={token} 
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
        </Tab>
        <Tab eventKey="social_links" title="Social Links">
          <EntityManager 
            data={data.socialLinks} 
            endpoint="social_links" 
            token={token} 
            onUpdate={fetchData} 
            title="Social Link" 
            columns={[{key: 'platform', label: 'Platform'}, {key: 'url', label: 'URL'}, {key: 'icon', label: 'Icon'}]}
            fields={[
              {name: 'platform', label: 'Platform Name (e.g., YouTube)', required: true}, 
              {name: 'url', label: 'URL (e.g., https://youtube.com/...)', required: true}, 
              {name: 'icon', label: 'Iconify Name (e.g., bi:youtube)'}
            ]}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
