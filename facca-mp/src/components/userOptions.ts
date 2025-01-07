"use server";

import getUsers from "@/app/utils/db/getUsers";

export interface userOptionI {
  value: string;
  label: string;
}

const UserOptions = async () => {
  const users = await getUsers();
  const userOptions = users!.map((user) => {
    return {
      value: user.id,
      label: user.name ? user.name : user.email!,
    };
  });
  return userOptions;
};
export default UserOptions;
