"use client";
import { BRL } from "@/app/utils/convertAsCurrency";

import updateUserDB, { UpdateUser } from "@/app/utils/db/updateUser";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/use-toast";
import { User } from "@prisma/client";

import Image from "next/image";
import { useEffect, useState } from "react";
import UserRoleSelector from "./userRoleSelector";

const UserManagerCard = ({ user }: { user: User }) => {
  const [urlPhoto, setUrlPhoto] = useState(user.image);
  const [notValidImg, setNotValidImg] = useState(false);
  const [name, setName] = useState(user.name);
  const [updateUser, setUpdateUser] = useState<UpdateUser>();
  const [email] = useState(user.email);
  const [role, setRole] = useState<"ADMIN" | "USER" | "MASTER">(user.role);
  const [isMember, setIsMember] = useState(user.member);
  const [balance] = useState(user.balance);

  const handleURLClick = () => {
    navigator.clipboard.readText().then((text) => {
      fetch(text).then((res) => {
        res.blob().then((buff) => {
          if (buff.type.startsWith("image/")) {
            setUrlPhoto(text);
            setNotValidImg(false);
          } else {
            setNotValidImg(true);
          }
        });
      });
    });
  };

  const handleUpdateUser = () => {
    if (name == undefined || urlPhoto == null) {
      console.error("TODOS OS CAMPOS PRECISAM SER PREENCHIDOS.");
    } else {
      setUpdateUser({
        id: user.id,
        name: name,
        role: role,
        member: isMember,
        urlPhoto: urlPhoto,
      });
    }
  };
  const callUpdateDB = () => {
    if (updateUser != undefined) {
      updateUserDB(updateUser).then((success) => {
        if (success) {
          location.reload();
          window.onload = () => {
            toast({
              variant: "default",
              title: "Sucesso!",
              description: "O usuário foi atualizado!",
            });
          };
        } else {
          toast({
            variant: "destructive",
            title: "Falha!",
            description: "Houve um erro ao atualizar o usuário.",
          });
        }
      });
    } else {
      toast({
        variant: "destructive",
        title: "Falha!",
        description:
          "Houve um erro ao atualizar o usuário. Usuário nao foi definido.",
      });
    }
  };
  useEffect(() => {
    if (updateUser) {
      callUpdateDB();
    }
  }, [updateUser]);

  return (
    <div className="flex ">
      <div className="my-auto mr-2">
        <Image
          src={
            urlPhoto
              ? urlPhoto
              : (process.env.NEXT_PUBLIC_NO_IMAGE_PRODUCT as string)
          }
          alt={"aa"}
          width={100}
          height={100}
          className="size-24 mx-auto"
        />
        <Button
          onClick={() => handleURLClick()}
          className="mt-2 mx-auto flex"
          variant={"outline"}
        >
          Colar URL Foto
        </Button>
        {notValidImg ? (
          <p className="text-wrap text-sm">
            A URL colada nao é uma imagem válida
          </p>
        ) : (
          ""
        )}
      </div>
      <Card className="space-y-2 w-full">
        <CardContent>
          <p>
            Nome
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name?.toString()}
            />
          </p>
          <div className="items-end">
            <p>Email</p>
            <p>{email}</p>
          </div>
          <div className="items-end">
            <p>
              Membro Facca{" "}
              <Input
                type="checkbox"
                defaultChecked={isMember}
                onChange={(e) => setIsMember(Boolean(e.target.value))}
              />
            </p>
          </div>
          <div>
            <p>
              Função
              <UserRoleSelector setRole={setRole} role={role} />
            </p>
          </div>
          <div>
            <p>Saldo: {BRL.format(Number(balance))}</p>
          </div>

          <div className="pt-4 flex justify-between">
            <DialogClose>
              <Button onClick={() => handleUpdateUser()}>Salvar</Button>
            </DialogClose>
            <DialogClose>
              <Button autoFocus variant={"outline"} className="">
                Descartar
              </Button>
            </DialogClose>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagerCard;
