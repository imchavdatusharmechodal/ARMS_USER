import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import user from "../Image/user.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div>
      {/* nav fixx */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <Link to={"/Dashboard"}>
            <img src={logo} />
          </Link>
        </div>
        <div className="overflow-y">
          <div className="sidebar-link">
            <ul>
              <li
                className={location.pathname === "/Dashboard" ? "active" : ""}
              >
                <NavLink to={"/Dashboard"}>
                  <i className="fa-solid fa-house"></i>Dashboard
                </NavLink>
              </li>
              <li
                className={
                  location.pathname === "/new-appliction" ? "active" : ""
                }
              >
                <NavLink to={"/new-appliction"}>
                  <i class="fa-brands fa-creative-commons-sampling"></i> New
                  Application
                </NavLink>
              </li>
              {/* <li
                className={
                  location.pathname === "/UploadDocument" ? "active" : ""
                }
              >
                <NavLink to={"/UploadDocument"}>
                  <i class="fa-solid fa-file-signature"></i> Upload Document
                </NavLink>
              </li> */}
              <li className={location.pathname === "/" ? "active" : ""}>
                <NavLink
                  to={"/"}
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user_id');
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> LogOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fixx">
        <nav className="top-header navbar navbar-expand-lg sticky-top navbar-light">
          <div className="py-2 container-fluid">
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search"
              />
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse navheight justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav navbarbottom mb-lg-0 align-items-lg-center">
                <li className="nav-item">
                  <div className="user-id">
                    <h2>
                      User Id : <span>U@SE123</span>
                    </h2>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
