import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId}></User>)
      : null;
    content = <div>{tableContent}</div>;
    return content;
  }
  return content;
};

export default UsersList;
