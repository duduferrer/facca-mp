import {db} from '@/lib/prisma'; 

export async function getUserBalance(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { balance: true },
  });

  return Number(user?.balance ?? 0);
}