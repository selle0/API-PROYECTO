import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  Navbar  from "../components/navbar/navbar";
import { Home } from "../components/home/home";
import  Noticia from "../components/noticia/noticia";
import Admin from "../components/admin/admin";
import UltimasNoticias from "../components/noticia/ultimasNoti";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar onSearch={handleSearch} /> <br></br>
                <Home></Home>
                <Noticia searchTerm={searchTerm}/>
                </div>
            }
          />
          <Route
            path="/admin"
            element={
              <div>
                <Navbar />
                <Admin />
              </div>
            }
          />
          <Route
            path="/ultimasNoti"
            element={
              <div>
                <Navbar />
                <UltimasNoticias />
              </div>
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
