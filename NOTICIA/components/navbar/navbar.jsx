import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/Sandstone/bootstrap.min.css";


export const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
      onSearch(searchTerm);
    };
  

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Noticias
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>


            
          </ul>

          <form className="d-flex">
          <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
            <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={handleSearch}>
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
 export default Navbar;