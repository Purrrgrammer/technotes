import React from "react";
import { Link } from "react-router-dom";
const DashHeader = () => {
  return (
    <header>
      <div className="flex gap-x-10">
        <Link to="/dash/users">
          <h1>userslist</h1>
        </Link>
        <Link to="/dash/notes">
          <h1>noteslist</h1>
        </Link>
        <Link to="/dash/users/new">
          <h1>add new user</h1>
        </Link>
        <Link to="/dash/notes">
          <h1>add new note</h1>
        </Link>
        <nav>{/* nav btn */}</nav>
      </div>
    </header>
  );
};

export default DashHeader;
