import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../App.css';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const projectsPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:8000/projects/getAll')
      .then(response => {
        setProjects(response.data);
        setPageCount(Math.ceil(response.data.length / projectsPerPage));
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * projectsPerPage;
  const currentProjects = projects.slice(offset, offset + projectsPerPage);

  return (
    <div className="container mt-2">
      <div className="card p-4 mb-4 br1" id='pro'>
        <h2 className="mb-4" style={{ color:'#275fb9'}}>Our Projects</h2>
        <div className="row">
          {currentProjects.map((project, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm p-3">
                <h5 className="text-primary">{project.projectName}</h5>
                <p><strong>Project_Id:</strong> {project._id}</p>
                <p><strong>Organisation:</strong> {project.organisationName}</p>
                <p><strong>Description:</strong> {project.projectDescription}</p>
                <p><strong>Skills Required:</strong> {project.skillsRequired.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"previous"}
          nextClassName={"next"}
          breakClassName={"break-me"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Project;