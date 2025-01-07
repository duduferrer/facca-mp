"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BRL } from "@/app/utils/convertAsCurrency";
import { User } from "@prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import UserManagerCard from "./userManagerCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BadgeCheck, BadgeX } from "lucide-react";
const UsersManagerTable = ({ users }: { users: User[] | undefined }) => {
  if (users == undefined) {
    return (
      <>
        <h1>Houve um erro ao importar usuarios.</h1>
      </>
    );
  } else {
    return (
      <Table className="">
        <TableHeader className="">
          <TableRow className="">
            <TableHead>Nome</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Membro Facca</TableHead>
            <TableHead className="text-center">Tipo</TableHead>
            <TableHead className="text-center">Saldo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <Dialog key={user.id}>
              <HoverCard>
                <DialogTrigger asChild>
                  <TableRow className="cursor-pointer">
                    <HoverCardTrigger asChild>
                      <TableCell className="max-w-48 text-ellipsis text-nowrap overflow-hidden">
                        {user.name}
                      </TableCell>
                    </HoverCardTrigger>
                    <TableCell className="text-center">{user.email}</TableCell>
                    {user.member ? (
                      <TableCell className="text-center">
                        <BadgeCheck className="text-center" />
                      </TableCell>
                    ) : (
                      <TableCell className="text-center">
                        <BadgeX className="text-center" />
                      </TableCell>
                    )}
                    <TableCell className="text-center">{user.role}</TableCell>

                    {Number(user.balance) > 0 ? (
                      <TableCell className="text-center overflow-hidden text-nowrap text-ellipsis">
                        {BRL.format(Number(user.balance))}
                      </TableCell>
                    ) : (
                      <TableCell className="text-center text-red-600 overflow-hidden text-nowrap text-ellipsis">
                        {BRL.format(Number(user.balance))}
                      </TableCell>
                    )}
                  </TableRow>
                </DialogTrigger>
                <HoverCardContent className="">
                  <div>{user.name}</div>
                </HoverCardContent>
              </HoverCard>
              <DialogContent className="w-full">
                <UserManagerCard user={user} />
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export default UsersManagerTable;
