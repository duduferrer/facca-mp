import getUsers from "@/app/utils/db/getUsers";
import UsersManagerTable from "./ui/usersManagerTable";
export const dynamic = "force-dynamic";
const ManageUsersPage = async () => {
  const users = await getUsers();
  return (
    <>
      <UsersManagerTable users={users} />
    </>
  );
};

export default ManageUsersPage;
