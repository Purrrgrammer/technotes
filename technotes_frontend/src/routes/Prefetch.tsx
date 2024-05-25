import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../features/users/usersApiSlice";
import { store } from "../app/store";

const Prefetch = () => {
  useEffect(() => {
    console.log("Subscribing Data");
    const users = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate(null)
    );
    const notes = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate(null)
    );
    return () => {
      console.log("Unsubscribing"); //when we leave protected pages ((dash))

      users.unsubscribe();
      notes.unsubscribe();
    }; //cleanup ffunction
  }, []);

  return <Outlet />;
};

export default Prefetch;
