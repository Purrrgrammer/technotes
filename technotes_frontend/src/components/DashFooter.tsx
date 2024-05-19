import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHome = () => {
    navigate("/dash");
  };
  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button title="Home" onClick={onGoHome}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  const content = (
    <footer>
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
  return <div>{content}</div>;
};

export default DashFooter;
