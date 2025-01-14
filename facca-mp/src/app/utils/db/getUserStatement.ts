"use server";
import { db } from "@/lib/prisma";

const getUserStatement = async (userID: string) => {
  const statement = db.financialOperation.findMany({
    where: {
      userID: {
        equals: userID,
      },
    },
  });
  return statement;
};

export default getUserStatement;
