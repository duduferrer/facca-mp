import getUsers from "@/app/utils/db/getUsers";
import UsersManagerTable from "./ui/usersManagerTable";

const ManageUsersPage = async () => {
  const users = await getUsers();
  return (
    <>
      <UsersManagerTable users={users} />
    </>
  );
};

export default ManageUsersPage;
