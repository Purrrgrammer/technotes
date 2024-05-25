import React, { useEffect, useState } from "react";
import { ROLES } from "../../app/config";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";

const AddUserFrom = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChangeUserName = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [roles, setRoles] = useState(["Employee"]);
  const navigate = useNavigate();
  const onRolesChanged = (e) => {
    let newValues = roles;
    newValues.push(e.target.value);
    setRoles([...new Set(newValues)]);
  };
  const canAdd =
    [roles.length, username, password].every(Boolean) && !isLoading;
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canAdd) {
      await addNewUser({ username, password, roles });
    }
  };

  useEffect(() => {
    console.log(username, password, roles);
  }, [username, password, roles]);
  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  return (
    <>
      <h1>Add New User</h1>
      <form onSubmit={onSaveUserClicked} className="form">
        <label htmlFor="username">username</label>
        <input type="text" onChange={onChangeUserName} />
        <label htmlFor="password">password</label>
        <input type="text" onChange={onChangePassword} />
        <select
          size={3}
          onChange={onRolesChanged}
          value={roles}
          multiple={true}
          name="user-role"
          id="role-select"
          className={`form__select ${validRolesClass}`}
        >
          {" "}
          {options}
        </select>
        <button disabled={!canAdd} type="submit">
          save
        </button>
        <button
          onClick={() => {
            setRoles(["Employee"]);
          }}
        >
          clear
        </button>
      </form>
      {roles}
    </>
  );
};

export default AddUserFrom;
