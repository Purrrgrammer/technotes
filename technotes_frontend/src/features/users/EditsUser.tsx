import React from "react";
import { useSelector } from "react-redux";
import { selectUserById, selectUserIds } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));
  const content = user ? <EditUserForm user={user} /> : "loading";
  console.log(user);

  return <div>{content}</div>;
};

export default EditUser;
