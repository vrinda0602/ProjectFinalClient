import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import NewsletterForm from '../components/Newsletter'; // Import the NewsletterForm component

const LeftMenu = () => {
  const location = useLocation();

  return (
    <nav id="leftMenu">
      <h3>Skills</h3>
      <ul>
        <li><Link to="/skills/ReactJs">React Js</Link></li>
        <li><Link to="/skills/SEO">SEO</Link></li>
        <li><Link to="/skills/Backend">Backend Developer</Link></li>
        <li><Link to="/skills/jQuery">jQuery</Link></li>
        <li><Link to="/skills/Javascript">Javascript</Link></li>
        <li><Link to="/skills/Web">Web Programming</Link></li>
        <li><Link to="/skills/Fullstack-Developer">Fullstack Developer</Link></li>
        <li><Link to="/skills/Internet-Marketing">Internet Marketing</Link></li>
        <li><Link to="/skills/Content-Creation">Content Creation</Link></li>
      </ul>

      {location.pathname === '/' && <NewsletterForm />} {/* Render NewsletterForm only on Home page */}
    </nav>
  );
};

export default LeftMenu;
