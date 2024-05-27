import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const onLogoutClicked = () => {
    sendLogout(null);
    if (isSuccess) {
      navigate("/home");
    }
  };

  const logoutButton = (
    <button title="logout" onClick={onLogoutClicked} type="button">
      Logout
    </button>
  );

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;
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
        <nav>{logoutButton}</nav>
      </div>
    </header>
  );
};

export default DashHeader;
