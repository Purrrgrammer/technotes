import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

export interface UserComponentProps {
  userId: string | number;
}
const User = ({ userId }: UserComponentProps) => {
  const user: any = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/users/${userId}`);

  const userRolesString = user
    ? user.roles.toString().replaceAll(",", ", ")
    : null;

  // const cellStatus = user ? user.active ? "" : "table__cell--inactive";

  return (
    <tr className="table__row user">
      <td className={`table__cell `}>{user.username}</td>
      <td className={`table__cell `}>{userRolesString}</td>
      <td className={`table__cell `}>
        <button className="icon-button table__button" onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};

export default User;
