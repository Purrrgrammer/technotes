import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../features/users/usersApiSlice";
import { store } from "../app/store";
import { notesApiSlice } from "../features/notes/notesApiSlice";

const Prefetch = () => {
  useEffect(() => {
    console.log("Subscribing Data");
    //create manual subscibtion => we have access to the state it whill not expired by 5 sec

    //wehn refresh we will have the state including prefilling our form
    const users = store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate(null)
    );
    const notes = store.dispatch(
      notesApiSlice.endpoints.getNotes.initiate(null)
    );
    return () => {
      console.log("Unsubscribing"); //when we leave protected pages ((dash))

      //in unprotected page as well
      users.unsubscribe();
      notes.unsubscribe();
    }; //cleanup ffunction
  }, []);

  return <Outlet />;
};

export default Prefetch;
