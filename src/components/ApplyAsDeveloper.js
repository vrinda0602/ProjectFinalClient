import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';

const ApplyAsDeveloper = () => {
  const [developerId, setDeveloperId] = useState('');
  const [projectIds, setProjectIds] = useState(['']);
  const [applications, setApplications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await fetch('http://localhost:8000/organisation/get');
    const data = await response.json();
    console.log(data); // Log the data to verify its structure
    setApplications(data);
};

  const handleAddProjectId = () => {
    setProjectIds([...projectIds, '']);
  };

  const handleProjectIdChange = (index, value) => {
    const newProjectIds = [...projectIds];
    newProjectIds[index] = value;
    setProjectIds(newProjectIds);
  };

  const handleRemoveProjectId = (index) => {
    const newProjectIds = projectIds.filter((_, i) => i !== index);
    setProjectIds(newProjectIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApplication = { developerId, projectIds };
    try {
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:8000/organisation/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newApplication)
        });
      } else {
        response = await fetch('http://localhost:8000/organisation/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newApplication)
        });
      }

      const result = await response.json();
      if (response.ok) {
        setMessage(isEditing ? 'Application updated successfully!' : 'Application submitted successfully!');
        setError('');
        fetchApplications();
        setDeveloperId('');
        setProjectIds(['']);
        setIsEditing(false);
        setEditId(null);
      } else {
        setMessage('');
        setError(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  const handleEditApplication = (id) => {
    const application = applications.find(app => app._id === id);
    setDeveloperId(application.developerId);
    setProjectIds(application.projectIds);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDeleteApplication = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/organisation/${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Application deleted successfully!');
        setError('');
        fetchApplications();
      } else {
        setMessage('');
        setError(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setDeveloperId('');
    setProjectIds(['']);
    setIsEditing(false);
    setMessage('');
    setError('');
  };

  return (
    <div className="container mt-2" id='appl'>
      <div className="card p-4 shadow" id='a-b' style={{ borderColor: '#1C478E', maxWidth: '800px' }}>
        <h2 className="mb-4" style={{ color: '#275fb9', textAlign: 'left' }}>Apply As Developer</h2>
       
        {message && <Alert variant="info">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
       
        <Form onSubmit={handleSubmit} className="p-4 border">
          {/* Developer ID */}
          <Form.Group className="mb-3" controlId="developerId">
            <Form.Label>Developer ID *</Form.Label>
            <Form.Control
              type="text"
              value={developerId}
              onChange={(e) => setDeveloperId(e.target.value)}
              required
            />
          </Form.Group>
 
          {/* Project IDs */}
          {projectIds.map((projectId, index) => (
            <InputGroup className="mb-2" key={index}>
              <Form.Control
                type="text"
                placeholder="Project ID *"
                value={projectId}
                onChange={(e) => handleProjectIdChange(index, e.target.value)}
                required
              />
              <Button variant="danger" onClick={() => handleRemoveProjectId(index)}>
                ❌
              </Button>
            </InputGroup>
          ))}
 
          {/* Add More Button */}
          <Button variant="outline-primary" onClick={handleAddProjectId} className="mb-3">
            Add More
          </Button>
 
          {/* Submit and Reset Buttons */}
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              {isEditing ? 'Update' : 'Submit'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
 
        <div className="col-md-12 mt-4">
          <h5 style={{ color: '#0000ff', textAlign: 'left' }}>Applications List</h5>
          {Array.isArray(applications) && applications.length > 0 ? (
           <ul className="list-group">
            {applications.map(app => (
              <li key={app._id} className="list-group-item d-flex justify-content-between align-items-center">
                {app.developerId} - {app.projectIds ? app.projectIds.join(', ') : 'No Project IDs'}
                <div>
                  <Button variant="warning" className="me-2" onClick={() => handleEditApplication(app._id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteApplication(app._id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
          ) : (
            <p>No Applications found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyAsDeveloper;