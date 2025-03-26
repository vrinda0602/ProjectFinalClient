import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavMenu from './components/NavMenu';
import LeftMenu from './components/LeftMenu';
import Footer from './components/Footer';
import Home from './components/Home';
import Project from './components/Projects';
import ContactForm from './components/Organisation';
import AboutUs from './components/AboutUs';
import RegisterDev from './components/Register';
import BrowseDeveloper from './components/BrowseDeveloper';
import Skill from './components/Skill'; // Import the Skill component
import './App.css';
import ApplyAsOrganisation from './components/ApplyAsOrganisation';
import ApplyAsDeveloper from './components/ApplyAsDeveloper';
// import DeveloperForm from './components/developer';

 
const App = () => {
  return (
   <div>
      <div id='container'>
        <Header />
        <NavMenu />
        <div className="row">
          <div className="col-md-3">
            <LeftMenu />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/register" element={<RegisterDev />} />
              <Route path="/skills/:skill" element={<Skill />} /> 
              <Route path="/ContactForm" element={<ContactForm />} />
              <Route path="/BrowseDeveloper" element={<BrowseDeveloper />} />
              <Route path="/applyOrg" element={<ApplyAsOrganisation />} />
              <Route path="/applyDev" element={<ApplyAsDeveloper />} />
            </Routes>
          </div>
        </div>
       
      </div>
      <Footer/>
      </div>
   
  );
};
 
export default App;

