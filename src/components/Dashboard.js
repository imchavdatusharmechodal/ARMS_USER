import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';


const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

     const [filterStatus, setFilterStatus] = useState('All');
   const [searchTerm, setSearchTerm] = useState('');

   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


 const filteredApplications = applications.filter(app => {
    const status = (app.status || '').replace(/\s+/g, '').toLowerCase();
    const filter = (filterStatus || '').replace(/\s+/g, '').toLowerCase();

    // Status filter
    let statusMatch = false;
    if (filter === 'all' || filter === 'selectstatus') statusMatch = true;
    else if (filter === 'pending') statusMatch = status === 'pending';
    else if (filter === 'inprogress') statusMatch = status === 'inprogress';
    else if (filter === 'returned' || filter === 'return') statusMatch = status === 'returned' || status === 'return';

    // Search filter
    const term = searchTerm.trim().toLowerCase();
    let searchMatch = true;
    if (term) {
      searchMatch =
        (app.applicant_name || '').toLowerCase().includes(term) ||
        (app.mobile_number || '').toLowerCase().includes(term) ||
        (`F${String(app.id).padStart(3, '0')}`).toLowerCase().includes(term);
    }

    return statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
const paginatedApplications = filteredApplications.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) setCurrentPage(page);
};

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
}

useEffect(() => {
  const fetchApplications = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setLoading(false);
      return;
    }
    const userInfo = parseJwt(token);
    const userId = userInfo.user_id || userInfo.id; // Adjust according to your JWT payload

    try {
      const response = await fetch(
        `https://lampserver.uppolice.co.in/arms/get-application`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      let apps = [];
      if (data.status && Array.isArray(data.data)) {
        apps = data.data
          .map(item => item.application)
          .filter(app => app && app.id && app.user_id === userId) // Filter by user_id
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (data.status && data.data && data.data.application) {
        const app = data.data.application;
        apps = app.user_id === userId ? [app] : [];
      }
      setApplications(apps);
    } catch (error) {
      setApplications([]);
    }
    setLoading(false);
  };
  fetchApplications();
}, []);

  const handleViewClick = (appId) => {
    setSelectedAppId(appId);
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://lampserver.uppolice.co.in/arms/application/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications((prev) => prev.filter((app) => app.id !== id));
      alert("Application deleted successfully!");
    } catch (error) {
      console.error("Failed to delete application", error);
      alert("Failed to delete application");
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="asside">
        <div className="about-first">
          <div className="row">
            <div className="col-12 mb-24">
              <div className="bg-box">
                <div className="pro-add-new px-0">
                  <p>
                     List Of Application <span>{filteredApplications.length}</span>
                  </p>
                  <div className="status-search">
                    <div>
                      <select
                        name="entryType"
                        className="form-control"
                        id="entryType"
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                      >
                        <option value="Select Status">Select Status</option>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Inprogress">In Progress</option>
                        <option value="Return">Returned</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="search"
                        className="form-control me-2"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>  
                  </div>
                </div>
                {/* Edit Modal */}
                <div
                  className="modal fade"
                  id="exampleModaledit"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Edit Grievance File
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="user-details">
                          <form>
                            <div className="form-floating mb-4 mt-2">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingFileNo"
                                placeholder="File No"
                              />
                              <label htmlFor="floatingFileNo">File No</label>
                            </div>
                            <div className="form-floating mb-4">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingServiceName"
                                placeholder="Service Name"
                              />
                              <label htmlFor="floatingServiceName">Service Name</label>
                            </div>
                            <div className="form-floating mb-4">
                              <input
                                type="date"
                                className="form-control"
                                id="floatingApplicationDate"
                                placeholder="Application Date"
                              />
                              <label htmlFor="floatingApplicationDate">Application Date</label>
                            </div>
                            <div className="form-floating mb-4">
                              <select
                                className="form-select form-control"
                                id="floatingStatus"
                                aria-label="Status"
                              >
                                <option selected>Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                              </select>
                              <label htmlFor="floatingStatus">Status</label>
                            </div>
                            <div className="upload-reset-btn mb-0 justify-content-center pt-2">
                              <button className="btn btn-upload" data-bs-dismiss="modal">
                                Save changes
                              </button>
                              <button className="btn btn-reset me-0" data-bs-dismiss="modal">
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* View Modal */}
                <div
                  className="modal fade"
                  id="viewModal"
                  tabIndex="-1"
                  aria-labelledby="viewModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                       
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            type="button"
                            className="btn btn-verify"
                            data-bs-dismiss="modal"
                            onClick={() => navigate('/UploadDocument')}
                          >
                            Upload Document
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => navigate(`/filled-pdf/${selectedAppId}`)}
                          >
                            Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End View Modal */}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">File No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Service Name</th>
                        <th scope="col">Application Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">View</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="10" className="text-center">Loading...</td>
                        </tr>
                      ) : paginatedApplications.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">No applications found.</td>
                        </tr>
                      ) : (
                        paginatedApplications
                        .filter(app => app && app.id)
                        .map((app, idx)   => (
                    <tr key={app.id}>
                      <th scope="row">{(currentPage - 1) * itemsPerPage + idx + 1}</th>
                      <td>{`F${app.id.toString().padStart(3, '0')}`}</td>
                      <td>{app.applicant_name}</td>
                      <td>{app.mobile_number}</td>
                      <td>{app.service}</td>
                      <td>{new Date(app.created_at).toLocaleDateString()}</td>
                            <td>
                              <span className={`badge bg-${app.status === 'pending' ? 'warning text-dark' : app.status === 'resolved' ? 'success' : 'info text-dark'}`}>
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-link p-0"
                                data-bs-toggle="modal"
                                data-bs-target="#viewModal"
                                onClick={() => handleViewClick(app.id)}
                              >
                                <i className="fa-solid fa-eye text-success"></i>
                              </button>
                            </td>
                             <td>
                             {app.user_remarks || "-"}
                             </td>
                            <td>
                      <div className="icon-up-del">
                        <button
                          className="btn btn-danger text-white m-0"
                          onClick={() => handleDelete(app.id)}
                        >
                          <i className="fa-solid fa-trash m-0"></i>
                        </button>
                      </div>
                    </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pro-add-new px-0 mb-0 pt-3">
  <p>
    {filteredApplications.length === 0
      ? "0"
      : `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredApplications.length)} of ${filteredApplications.length}`}
  </p>
  <nav aria-label="...">
    <ul className="pagination pagination-sm mb-0">
      <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
      </li>
      {[...Array(totalPages)].map((_, idx) => (
        <li key={idx} className={`page-item${currentPage === idx + 1 ? " active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
            {idx + 1}
          </button>
        </li>
      ))}
      <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </li>
    </ul>
  </nav>
</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;