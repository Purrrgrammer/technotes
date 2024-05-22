import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="p-4">
      <nav className="m-5">
        <ul className="flex justify-around items-center bg-slate-300">
          <li className="p-2">
            <Link to={`home`}>Logo</Link>
          </li>
          <li className="p-2">
            <Link to={`/`}>Go to root</Link>
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
