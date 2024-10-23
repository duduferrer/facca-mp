"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BRL } from "../utils/convertAsCurrency";

const Profile = () => {
  const { data } = useSession();
  return (
    <div className="">
      <Card className="w-2/3 mx-auto mt-4 p-10">
        <div className="flex gap-6 ">
          <Avatar className="size-16">
            <AvatarImage
              src={data?.user?.image?.toString()}
              alt={data?.user?.name?.toString().split(" ")[0]}
            />
            <AvatarFallback>
              {data?.user?.name?.toString().slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="mt-auto font-semibold text-lg">{data?.user.name}</p>
        </div>
        <div className="mt-8 mx-auto space-y-1">
          {data?.user.member ? (
            <p className="text-sm font-semibold text-center">
              Participante FACCA ✔️
            </p>
          ) : (
            <p className="text-sm font-semibold text-center">
              Participante FACCA ❌
            </p>
          )}
          <div className="mt-10">
            <p>E-mail: {data?.user.email}</p>
            <p>
              Saldo:{" "}
              {Number(data?.user.balance) > 0 ? (
                <span>{BRL.format(Number(data?.user.balance))}</span>
              ) : (
                <span className="text-red-600">
                  {BRL.format(Number(data?.user.balance))}
                </span>
              )}
            </p>
          </div>
          <div>Extrato de mensalidades e pagamentos</div>
          {/* TABELA
          +----+-------+----+
          |MES | VALOR | E/S| (VERDE E / VERMELHO S) */}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
