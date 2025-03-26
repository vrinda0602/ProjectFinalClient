import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
 
const Register = () => {
  const [formData, setFormData] = useState({
    DEVId: '',
    firstName: '',
    lastName: '',
    email: '',
    availability: '',
    proficiency: '',
    yearsOfExperience: '',
    skills: [],
    // projects: '',
    resume: '',
    dev_location: '',
  });
 
  const [developers, setDevelopers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentDeveloper, setCurrentDeveloper] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [developerId, setDeveloperId] = useState('');
 
  useEffect(() => {
    fetchDevelopers();
  }, []);
 
  const fetchDevelopers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/register');
      setDevelopers(response.data);
    } catch (error) {
      console.error('Error fetching developers:', error);
      setErrorMessage('Error fetching developers. Please try again.');
    }
  };
 
  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === 'resume') {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData({ ...formData, resume: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'skills') {
      const skillsArray = value.split(',').map(skill => skill.trim());
      setFormData({ ...formData, skills: skillsArray });
    } else if (name === 'resume') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, resume: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
 
  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'availability', 'yearsOfExperience', 'skills', 'dev_location'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage(`Please fill out the ${field} field.`);
        return false;
      }
    }
    return true;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
 
    const formDataToSend = { ...formData };
    try {
      let response;
      if (editing) {
        response = await axios.patch(`http://localhost:8000/register/${currentDeveloper._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setEditing(false);
        setCurrentDeveloper(null);
        setSuccessMessage('Updated Successfully');
      } else {
        response = await axios.post('http://localhost:8000/register', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage(`Registered Successfully Developer ID: ${response.data.developer._id}`);
      }
      fetchDevelopers();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form. Please try again.');
    }
  };
 
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/register/${developerId}`);
      setFormData(response.data);
      setEditing(true);
      setCurrentDeveloper(response.data);
    } catch (error) {
      console.error('Error fetching developer:', error);
      setErrorMessage('Error fetching developer. Please try again.');
    }
  };
 
  const fetchDeveloperById = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/register/${developerId}`);
      if (response.data) {
        setFormData(response.data);
        setCurrentDeveloper(response.data);
      } else {
        setErrorMessage('No developer found with the provided ID.');
      }
    } catch (error) {
      console.error('Error fetching developer:', error);
      setErrorMessage('Error fetching developer. Please try again.');
    }
  };
 
  const handleDelete = async (e) => {
    e.preventDefault();
    setDeleting(true);
  };
 
  const deleteDeveloperById = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8000/register/${developerId}`);
      if (response.status === 200) {
        fetchDevelopers();
        setSuccessMessage('Deleted Successfully');
        setFormData({
          DEVId: '',
          firstName: '',
          lastName: '',
          email: '',
          availability: '',
          proficiency: '',
          yearsOfExperience: '',
          skills: '',
          // projects: '',
          resume: '',
          dev_location: '',
        });
        setDeveloperId('');
      } else {
        setErrorMessage('No developer found with the provided ID.');
      }
    } catch (error) {
      console.error('Error deleting developer:', error);
      setErrorMessage('Error deleting developer. Please try again.');
    }
  };
 
  return (
    <div>
      {successMessage ? (
        <form onClick={handleSubmit} id="re">
          <h3>{successMessage}</h3>
        </form>
      ) : (
        <form id="sec">
          <h3 id="reg">Register As A Developer</h3>
          <p>Please use this form to contact a member of our website team</p>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <p>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="availability" >Availability:</label>
            <select name="availability" id="av" value={formData.availability} onChange={handleChange}>
              <option value="Part-Time">Part-Time</option>
              <option value="Full-Time">Full-Time</option>
            </select>
          </p>
          <p>
            <label htmlFor="proficiency">Proficiency:</label>
            <select name="proficiency" id="av" value={formData.proficiency} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </p>
          <p>
            <label htmlFor="yearsOfExperience">Experience:</label>
            <input type="text" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="skills">Skills:</label>
            <input type="text" name="skills" id="av" value={formData.skills} onChange={handleChange} />
          </p>
          {/* <p>
            <label htmlFor="projects">Projects (JSON):</label>
            <textarea name="projects" value={formData.projects} onChange={handleChange} />
          </p> */}
          <p>
            <label htmlFor="resume" >Upload Resume:</label>
            <input type="file" name="resume" onChange={handleChange} />
          </p>
          <p>
            <label htmlFor="dev_location" >Location:</label>
            <input type="text" name="dev_location" value={formData.dev_location} onChange={handleChange} />
          </p>
          {editing && (
            <p>
              <label htmlFor="DEVId" id="pa">Developer ID:</label>
              <input
                type="text"
                name="developerId"
                placeholder="Enter the Developer ID"
                value={developerId}
                onChange={(e) => setDeveloperId(e.target.value)}
              />
              <button onClick={fetchDeveloperById}>Fetch Developer</button>
            </p>
          )}
          {deleting && (
            <p>
              <label htmlFor="DEVId" id="pa">Developer ID:</label>
              <input
                type="text"
                name="developerId"
                placeholder="Enter the Developer ID"
                value={developerId}
                onChange={(e) => setDeveloperId(e.target.value)}
              />
              <button onClick={deleteDeveloperById}>Delete Developer</button>
            </p>
          )}
          <br/>
         
          <button type="submit" style={{ marginRight: '10px' }} onClick={handleSubmit}>
            {editing ? 'Update' : 'Register'}
          </button>
          <button style={{ marginRight: '10px' }} onClick={handleEdit}>
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </form>
      )}
     
    </div>
  );
};
 
export default Register;
           
 
 
 
 