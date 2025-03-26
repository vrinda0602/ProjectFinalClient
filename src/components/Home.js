import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Web from '../images/web folder/web.jpg';
 
const Home = () => {
  const [developers, setDevelopers] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:8000/browse//dev/latest')
      .then(response => response.json())
      .then(data => {
        setDevelopers(data);
      })
      .catch(error => {
        console.error('Error fetching latest developers:', error);
      });
  }, []);
 
  return (
    <div className="container" >
      {/* Welcome Section */}
      <div className="card p-4 mb-4 f1" id='register-o'>
        <div className="row">
          <div className="col-md-6">
            <h2 className="text">Welcome to DCX Developer Directory!</h2>
            <h3>Who Are We?</h3>
            <p>
              We are a fictional website and service that lists top web developers around the world. Search and browse fictional web developers on our website absolutely FREE!
            </p>
            <h3>What Skills Do Our Developers Have?</h3>
            <p>
              Our listed fictional web developers' skills range from Graphic design with Photoshop, Illustrator, and Fireworks to markup languages like HTML5, XHTML, and XML to programming languages such as Javascript, PHP, Python, and ASP.
            </p>
          </div>
          <div className="col-md-6 img1">
            <img src={Web} alt="Welcome" className="img-fluid" />
          </div>
        </div>
      </div>
     
      {/* Developers Section */}
      <div className="card p-4 f2" id='a-b'>
        <h2 className="mb-3" >Latest DCX Developers</h2>
        <div className="row">
          {developers.map((dev, index) => (
            <div key={index} className="col-md-3 mb-3">
              <div className="card h-100 shadow-sm p-3 c1">
                <h5 className="text-primary">{dev.firstName} {dev.lastName}</h5>
                <p><strong>Location:</strong> {dev.dev_location}</p>
                <p><strong>Skills:</strong> { dev.skills}</p>
                <p><strong>Availability:</strong> {dev.availability}</p>
                <a href="#" className="btn btn-primary btn-sm">View Profile</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default Home;

