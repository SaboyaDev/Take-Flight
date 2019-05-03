import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Footer() {
  return (
    <footer>
      <nav className="footer navbar navbar-light bg-light">
        <Link to="/" className="navbar-brand">
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
