import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../booklogo.png";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <a
          className="navbar-brand"
          href="/"
        >
          <img width={"50px"} src={logo} />{" "}
        </a>

        <div className="collapse navbar-collapse"></div>
        <Link className="btn btn-outline-light" to="/books/add">
          Add Book
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
