import React, { useState } from 'react';


const Organisation = () => {
  const initialFormData = {
    _id: '',
    orgName: '',
    emailAddress: '',
    phoneNumber: '',
    bestTimeToCall: 'Morning', // Set default value
    location: '',
    budget: 100,
    projectName: '',
    projectDesc: '',
    skillsNeeded: [],
    website: '',
    startDate: '',
    approxDuration: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [deleteFormData, setDeleteFormData] = useState({ orgID: '', orgName: '' });
  const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility
  const [isMessageVisible, setIsMessageVisible] = useState(false); // State to control message visibility

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        skillsNeeded: checked
          ? [...prevData.skillsNeeded, value]
          : prevData.skillsNeeded.filter((skill) => skill !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/org/organisations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(res => { 
        setIsSubmitted(true); // Set isSubmitted to true after successful submission
        setIsEditing(false); // Set isEditing to false after successful submission
        setSuccessMessage(`<h4>Saved successfully!<h4><br>Organization ID: ${res._id}<br>Organization Name: ${formData.OrgName}<br>Project Name: ${formData.projectName}<br><h4>Note the Organisation ID for future reference<h4>`); // Set success message with _id
        setFormData(initialFormData); // Reset form data
        setIsFormVisible(false); // Hide form
        setIsMessageVisible(true); // Show message
        
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/org/organisations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setIsSubmitted(true); // Set isSubmitted to true after successful update
        setIsEditing(false); // Set isEditing to false after successful update
        setIsUpdateMode(false); // Exit update mode
        // setSuccessMessage(`Updated successfully! Organization ID:${result._id}, Organization Name: ${formData.OrgName}, Project Name: ${formData.projectName}`); // Set success message
        setSuccessMessage(`<h4>Updated successfully!</h4><br><h5>Organization ID: ${result._id}<br>Organization Name: ${formData.orgName}<br>Project Name: ${formData.projectName}</h5>`); // Set success message with line breaks
        setFormData(initialFormData); // Reset form data
        setIsFormVisible(false); // Hide form
        setIsMessageVisible(true); // Show message
      })
      .catch(error => {
        console.error('There was an error updating the form:', error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setIsDeleteMode(true);
    setIsEditing(false);
    setSuccessMessage('');
    setDeleteMessage('');
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    const { _id, orgName } = deleteFormData;
  
    if (_id && orgName) {
      fetch(`http://localhost:8000/org/organisations?_id=${_id}&OrgName=${orgName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 404) {
            throw new Error('Resource not found');
          }
          return response.json();
        })
        .then(result => {
          console.log(result);
          setIsSubmitted(false); // Reset isSubmitted to false after deletion
          setFormData(initialFormData); // Reset form data
          setIsEditing(true);
          setIsDeleteMode(false);
          setDeleteMessage(result.message); // Set delete message from JSON response
          setIsFormVisible(false); // Hide form
          setIsMessageVisible(true); // Show message
        })
        .catch(error => {
          console.error('There was an error deleting the contact:', error);
        });
    } else {
      alert('_id and Organization Name are required to delete the contact.');
    }
  };
  const handleDeleteChange = (e) => {
    const { name, value } = e.target;
    setDeleteFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsUpdateMode(true);
    setIsEditing(true);
    setSuccessMessage('Edit mode activated successfully!');
    setDeleteMessage('');
  };

  const clearMessages = () => {
    setSuccessMessage('');
    setDeleteMessage('');
  };
  return (
    <section id='register-o'>
      <h3>Register As Organization</h3>
      {isFormVisible && (
        <form onSubmit={(e) => { clearMessages(); isUpdateMode ? handleUpdate(e) : isDeleteMode ? confirmDelete(e) : handleSubmit(e);  }} >
      {(isUpdateMode || isDeleteMode) && (
            <p>
              <label htmlFor="_id">Organization ID:</label>
              <input type="text" id="_id" name="_id" value={formData._id} onChange={handleChange} required disabled={isSubmitted || !isEditing} />
            </p>
            )}

  <p>
    <label htmlFor="orgName">Organization Name:</label>
    <input type="text" name="orgName" value={formData.orgName} onChange={handleChange} required minLength="3" maxLength="50" disabled={isSubmitted || !isEditing} />
  </p>
  <p>
    <label htmlFor="emailAddress">Email Address: </label>
    <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" disabled={isSubmitted || !isEditing} />
  </p>
  <p>
    <label htmlFor="phoneNumber">Phone Number: </label>
    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} pattern="[0-9]{10}" disabled={isSubmitted || !isEditing} />
  </p>
  <p>
    <label htmlFor="bestTimeToCall">Best Time To Call: </label>
    <input type="radio" name="bestTimeToCall" value="Morning" checked={formData.bestTimeToCall === 'Morning'} onChange={handleChange} disabled={isSubmitted || !isEditing} />Morning
    <input type="radio" name="bestTimeToCall" value="Afternoon" checked={formData.bestTimeToCall === 'Afternoon'} onChange={handleChange} disabled={isSubmitted || !isEditing} />Afternoon
    <input type="radio" name="bestTimeToCall" value="Evening" checked={formData.bestTimeToCall === 'Evening'} onChange={handleChange} disabled={isSubmitted || !isEditing} />Evening
  </p>
  <p>
    <label htmlFor="location">Location: </label>
    <input list="location" name="location" value={formData.location} onChange={handleChange} disabled={isSubmitted || !isEditing} />
  </p>
  <fieldset>
    <legend>About Your Project</legend>
    <p>
      <label htmlFor="budget">Budget: </label>
      <input type="range" name="budget" min="100" max="10000" value={formData.budget} onChange={handleChange} disabled={isSubmitted || !isEditing} />
      <input type="text" value={formData.budget} readOnly />
    </p>
    <p>
      <label htmlFor="skillsNeeded">Skills Needed: (Check all that apply) </label>
      <table>
        <tbody>
          <tr>
            <td><input type="checkbox" name="skillsNeeded" value="React" checked={formData.skillsNeeded.includes('React')} onChange={handleChange} disabled={isSubmitted || !isEditing} />React</td>
            <td><input type="checkbox" name="skillsNeeded" value="SEO" checked={formData.skillsNeeded.includes('SEO')} onChange={handleChange} disabled={isSubmitted || !isEditing} />SEO</td>
            <td><input type="checkbox" name="skillsNeeded" value="Backend Developer" checked={formData.skillsNeeded.includes('Backend Developer')} onChange={handleChange} disabled={isSubmitted || !isEditing} />Backend Developer</td>
          </tr>
          <tr>
            <td><input type="checkbox" name="skillsNeeded" value="jQuery" checked={formData.skillsNeeded.includes('jQuery')} onChange={handleChange} disabled={isSubmitted || !isEditing} />jQuery</td>
            <td><input type="checkbox" name="skillsNeeded" value="Java Script" checked={formData.skillsNeeded.includes('Java Script')} onChange={handleChange} disabled={isSubmitted || !isEditing} />Java Script</td>
            <td><input type="checkbox" name="skillsNeeded" value="Web programming" checked={formData.skillsNeeded.includes('Web programming')} onChange={handleChange} disabled={isSubmitted || !isEditing} />Web programming</td>
          </tr>
          <tr>
            <td><input type="checkbox" name="skillsNeeded" value="Fullstack Developer" checked={formData.skillsNeeded.includes('Fullstack Develope')} onChange={handleChange} disabled={isSubmitted || !isEditing} />Fullstack Developer</td>
            <td><input type="checkbox" name="skillsNeeded" value="Internet Marketing" checked={formData.skillsNeeded.includes('Internet Marketing')} onChange={handleChange} disabled={isSubmitted || !isEditing} />Internet Marketing</td>
            <td><input type="checkbox" name="skillsNeeded" value="Content Creation" checked={formData.skillsNeeded.includes('Content Creation')} onChange={handleChange} disabled={isSubmitted || !isEditing} />Content Creation</td>
          </tr>
        </tbody>
      </table>
    </p>
    <p>
      <label htmlFor="projectName">Project Name:</label>
      <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required minLength="3" maxLength="100" disabled={isSubmitted || !isEditing} />
    </p>
    <p>
      <label htmlFor="projectDesc">Project Description:</label>
      <input type="text" name="projectDesc" value={formData.projectDesc} onChange={handleChange} required minLength="10" maxLength="500" disabled={isSubmitted || !isEditing} />
    </p>
    <p>
      <label htmlFor="website"> Website:</label>
      <input type="url" name="website" value={formData.website} onChange={handleChange} pattern="https?://.+" disabled={isSubmitted || !isEditing} />
    </p>
    <p>
      <label htmlFor="startDate">Start Date:</label>
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required disabled={isSubmitted || !isEditing} />
    </p>
    <p>
      <label htmlFor="approxDuration">Approximate duration:</label>
      <input type="date" name="approxDuration" value={formData.approxDuration} onChange={handleChange} required disabled={!isEditing} />
    </p>
  </fieldset>
  {isDeleteMode && (
    <fieldset>
      <legend>Delete Organization</legend>
      <p>
        <label htmlFor="deleteID">Organization id:</label>
        <input type="text" id="deleteID" name="_id" value={deleteFormData._id} onChange={handleDeleteChange} required />
      </p>
      <p>
        <label htmlFor="deleteOrgName">Organization Name:</label>
        <input type="text" id="deleteOrgName" name="orgName" value={deleteFormData.orgName} onChange={handleDeleteChange} required />
      </p>
      <p>
        <button type="submit">Confirm Delete</button>
      </p>
    </fieldset>
  )}
  <button type="submit" style={{ marginRight: '15px' }}>{isUpdateMode ? 'Update' : 'Submit'}</button>
<button type="button" onClick={handleDelete} disabled={isDeleteMode} style={{ marginRight: '15px' }}>Delete Profile</button>
<button type="button" onClick={handleEdit} disabled={isDeleteMode}>Edit Profile</button>
  
</form>
      )}
       {isMessageVisible && (
      <div>
       {isMessageVisible && (
  <div dangerouslySetInnerHTML={{ __html: successMessage }}></div>
)}
 
     <h3>{deleteMessage && <p>{deleteMessage}</p>}</h3>   
      </div>
    )}
</section>
    
  );
};

export default Organisation;