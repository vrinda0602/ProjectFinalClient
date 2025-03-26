
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../App.css';

const NavMenu = () => {
  return (
    <nav id="menu">
      <ul>
        <li className="menuitem"><Link to="/">Home</Link></li>
        <li className="menuitem"><Link to="/about">About Us</Link></li>
        <li className="menuitem"><Link to="/BrowseDeveloper">Browse Developers</Link></li>
        <li className="menuitem"><Link to="/register">Register As Developer</Link></li>
        <li className="menuitem"><Link to="/contactForm">Register As Organization</Link></li>
        <li className="menuitem"><Link to="/Projects">Projects</Link></li>
        <li>
          <div className="dropdown">
            <button className="dropbtn">Apply As</button>
            <div className="dropdown-content">
              <Link to="/applyDev">Developer</Link><br/>
              <Link to="/applyOrg">Organisation</Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;