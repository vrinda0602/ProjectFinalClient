
import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ReactPaginate from 'react-paginate';
import './BrowseDeveloper.css';

const BrowseDeveloper = () => {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const developersPerPage = 8;

    useEffect(() => {
        fetch("http://localhost:8000/browse/dev/skill/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch developers");
                }
                return response.json();
            })
            .then((data) => {
                setDevelopers(data);
                setPageCount(Math.ceil(data.length / developersPerPage));
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * developersPerPage;
    const currentDevelopers = developers.slice(offset, offset + developersPerPage);

    if (loading) return <p>Loading developers...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-2 f">
            <div className="card p-4 mb-4 bdr1">
                <h2 className="mb-4" style={{ color: '#275fb9', textAlign: 'left' }}>Browse Developers</h2>
                <table className="table table-borderless" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th className="dev-id">Developer Id</th>
                            <th className="skills">Skills</th>
                            <th>Availability</th>
                            <th>Experience</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDevelopers.map((dev) => (
                            <tr key={dev._id}>
                                <td>{dev._id}</td>
                                <td>{dev.skills.join(", ")}</td>
                                <td>{dev.availability}</td>
                                <td>{dev.yearsOfExperience} years</td>
                                <td>{dev.dev_location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default BrowseDeveloper;