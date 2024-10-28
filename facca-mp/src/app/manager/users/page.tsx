import getUsers from "@/app/utils/db/getUsers";
import UsersManagerTable from "./ui/usersManagerTable";
import { User } from "@prisma/client";
import { useEffect } from "react";

const ManageUsersPage = async () => {
  const users = await getUsers();
  return (
    <>
      <UsersManagerTable users={users} />
    </>
  );
};

export default ManageUsersPage;
