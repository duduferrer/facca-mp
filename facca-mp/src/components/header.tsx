"use client";
import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

const Header = () => {
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
  };
  const { status, data } = useSession();
  const { setTheme, theme } = useTheme();
  const [isChecked, setChecked] = useState(false);
  useEffect(() => {
    theme == "dark" ? setChecked(true) : setChecked(false);
  }, []);
  useEffect(() => {
    isChecked ? setTheme("dark") : setTheme("light");
    console.log(isChecked);
    localStorage.setItem("theme-isChecked", isChecked.toString());
  }, [isChecked]);

  return (
    <Card className="flex justify-between p-5 items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} className="rounded" variant={"ghost"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex items-center justify-between mb-12 mt-5">
            <SheetHeader className="text-2xl font-bold">Menu</SheetHeader>
            <div className="flex gap-2 items-center">
              <Switch onCheckedChange={setChecked} checked={isChecked} />
              <MoonIcon size={20} />
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <div className="mb-4">
              {status == "unauthenticated" ? (
                <div>
                  <p className="font-bold">Bem-vindo! </p>
                  <p>
                    Clique em <span className="font-semibold">Entrar</span> para
                    fazer login.{" "}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image?.toString()}
                      alt={data?.user?.name?.toString().split(" ")[0]}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.toString().slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    Olá,{" "}
                    <span className="font-semibold">
                      {data?.user?.name?.toString().split(" ")[0].toUpperCase()}
                      !
                    </span>
                  </p>
                </div>
              )}
            </div>
            {status == "unauthenticated" ? (
              <Button variant={"outline"} onClick={handleLoginClick}>
                <LogInIcon className="mr-2" /> Entrar
              </Button>
            ) : (
              <Button variant={"outline"} onClick={handleLogoutClick}>
                <LogOutIcon className="mr-2" /> Sair
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <h1 className="font-black text-2xl"> FACCA </h1>
      <Button size={"icon"} className="rounded" variant={"ghost"}>
        <ShoppingBasketIcon />
      </Button>
    </Card>
  );
};

export default Header;
