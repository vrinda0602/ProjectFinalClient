import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';

const ApplyAsOrganisation = () => {
  const [organisationId, setOrganisationId] = useState('');
  const [developerIds, setDeveloperIds] = useState(['']);
  const [applications, setApplications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const response = await fetch('http://localhost:8000/apply/get');
    const data = await response.json();
    setApplications(data);
  };

  const handleAddDeveloperId = () => {
    setDeveloperIds([...developerIds, '']);
  };

  const handleDeveloperIdChange = (index, value) => {
    const newDeveloperIds = [...developerIds];
    newDeveloperIds[index] = value;
    setDeveloperIds(newDeveloperIds);
  };

  const handleRemoveDeveloperId = (index) => {
    const newDeveloperIds = developerIds.filter((_, i) => i !== index);
    setDeveloperIds(newDeveloperIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApplication = { organisationId, developerIds };
    const url = isEditing ? `http://localhost:8000/apply/${editId}` : 'http://localhost:8000/apply/add';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newApplication)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        fetchApplications();
        setOrganisationId('');
        setDeveloperIds(['']);
        setIsEditing(false);
        setEditId(null);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleEditApplication = (id) => {
    const application = applications.find(app => app._id === id);
    setOrganisationId(application.organisationId);
    setDeveloperIds(application.developerIds);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDeleteApplication = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/apply/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        fetchApplications();
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleReset = () => {
    setOrganisationId('');
    setDeveloperIds(['']);
    setIsEditing(false);
    setEditId(null);
    setMessage('');
  };

  return (
    <div className="container mt-2" id='appl'>
      <div className="card p-4 shadow" id='a-b' style={{ borderColor: '#1C478E', maxWidth: '800px' }}>
        <h2 className="mb-4" style={{ color: '#275fb9', textAlign: 'left' }}>Apply As Organisation</h2>
        
        {message && <Alert variant="info">{message}</Alert>}
        
        <Form onSubmit={handleSubmit} className="p-4 border">
          {/* Organisation ID */}
          <Form.Group className="mb-3" controlId="organisationId">
            <Form.Label>Organisation ID *</Form.Label>
            <Form.Control
              type="text"
              value={organisationId}
              onChange={(e) => setOrganisationId(e.target.value)}
              required
            />
          </Form.Group>
  
          {/* Developer IDs */}
          {developerIds.map((developerId, index) => (
            <InputGroup className="mb-2" key={index}>
              <Form.Control
                type="text"
                placeholder="Developer ID *"
                value={developerId}
                onChange={(e) => handleDeveloperIdChange(index, e.target.value)}
                required
              />
              <Button variant="danger" onClick={() => handleRemoveDeveloperId(index)}>
                ❌
              </Button>
            </InputGroup>
          ))}
  
          {/* Add More Button */}
          <Button variant="outline-primary" onClick={handleAddDeveloperId} className="mb-3">
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
          <ul className="list-group">
            {applications.map(app => (
              <li key={app._id} className="list-group-item d-flex justify-content-between align-items-center">
                {app.organisationId} - {app.developerIds ? app.developerIds.join(', ') : 'No Developer IDs'}
                <div>
                  <Button variant="warning" className="me-2" onClick={() => handleEditApplication(app._id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteApplication(app._id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplyAsOrganisation;