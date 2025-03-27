
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Import the CSS file for styling

const Skill = () => {
  const { skill } = useParams(); // useParams is a hook that is used as a function
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/browse/dev/skill/${skill}`)
      .then(resp => resp.json())
      .then(response => {
        setDevelopers(response);
        setLoading(false); // ensures loading stops after fetching data
      })
      .catch(error => {
        console.error('There was an error fetching the developers!', error);
        setError("Failed to load developers");
        setLoading(false);
      });
  }, [skill]);

  return (
    <div className="container mt-2" id='register-o'>
      <div className="card p-4 mb-4 bdr1">
        <h2 className="mb-4" style={{ color: '#275fb9' }}>Developers with {skill} skills</h2>
        <table className="table table-borderless" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th className="dev-id">Dev Id</th>
              <th className="skills">Skills</th>
              <th>Availability</th>
              <th>Experience</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {developers != null && developers.map((dev, index) => (
              <tr key={index}>
                <td>{dev._id}</td>
                <td>{dev.skills.join(", ")}</td>
                <td>{dev.availability}</td>
                <td>{dev.yearsOfExperience} years</td>
                <td>{dev.dev_location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Skill;