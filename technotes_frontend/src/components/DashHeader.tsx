import React from "react";
import { Link } from "react-router-dom";
const DashHeader = () => {
  return (
    <header>
      <div className="flex gap-x-10">
        <Link to="/dash/users">
          <h1>techNotes dashHeader users</h1>
        </Link>
        <Link to="/dash/notes">
          <h1>techNotes dashHeader notes</h1>
        </Link>
        <nav>{/* nav btn */}</nav>
      </div>
    </header>
  );
};

export default DashHeader;
