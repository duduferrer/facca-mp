"use server";
import { db } from "@/lib/prisma";

export interface UpdateUser {
  id: string;
  name: string;
  role: "ADMIN" | "USER" | "MASTER";
  member: boolean;
  urlPhoto: string;
}

const updateUserDB = async (user: UpdateUser) => {
  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name.trim(),
        role: user.role,
        member: user.member,
        image: user.urlPhoto,
      },
    });
    return true;
  } catch (e) {
    console.log(e + " Nao foi possivel atualizar o usuario");
    return false;
  }
};

export default updateUserDB;
