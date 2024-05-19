import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="p-10">
      <nav>
        <ul className="flex gap-x-10">
          <li>
            <Link to={`home`}>home</Link>
          </li>
          <li>
            <Link to={`/`}>Root</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
