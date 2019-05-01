import React from "react";
import logo from "../../takeFlight.svg";
import "./style.css";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <a className="navbar-brand" href="/index">
        <img
          src={logo}
          id="takeFlightLogo"
          alt="takeflight"
          height="70"
          width="280"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/index">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/index">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/index">
              Pricing
            </a>
          </li>
        </ul>
      </div>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button type="button" className="btn btn-outline-dark" id="login">
              Log In
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-dark" id="signup">
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
