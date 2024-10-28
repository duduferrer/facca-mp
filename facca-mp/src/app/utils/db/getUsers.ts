"use server";
import { db } from "@/lib/prisma";
import { User } from "@prisma/client";

const getUsers = async () => {
  try {
    const users: User[] = await db.user.findMany({});
    return users;
  } catch (e) {
    console.error("Erro ao buscar usuarios" + e);
  }
};
export default getUsers;
