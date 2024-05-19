import React from "react";
import { Link } from "react-router-dom";
const DashHeader = () => {
  return (
    <header>
      <div>
        <Link to="/dash/notes">
          <h1>techNotes dashHeader</h1>
        </Link>
        <nav>{/* nav btn */}</nav>
      </div>
    </header>
  );
};

export default DashHeader;