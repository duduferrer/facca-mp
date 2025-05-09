"use client";
import {
  CircleDollarSignIcon,
  CircleUserRound,
  LogInIcon,
  LogOutIcon,
  MoonIcon,
  SheetIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { SheetClose, SheetContent, SheetHeader } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState, useEffect, useContext } from "react";
import { BRL } from "@/app/utils/convertAsCurrency";
import { CartContext } from "@/app/providers/cartProvider";
import Link from "next/link";
import PaymentQrCode from "./ui/paymentQrCode";

const MenuContent = () => {
  const { setProducts, products } = useContext(CartContext);
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const handleLoginClick = async () => {
    await signIn();
  };
  const handleLogoutClick = async () => {
    await signOut();
    setProducts([]);
  };
  const handlePaymentClick = () => {
    setPaymentVisible(!paymentVisible);
  };
  const { status, data } = useSession();
  const { setTheme, theme } = useTheme();
  const [isChecked, setChecked] = useState(false);

  const [balance, setBalance] = useState(
    BRL.format(Number(data?.user.balance))
  );

  useEffect(() => {
    if (data) {
      setBalance(BRL.format(Number(data.user.balance)));
      setAmount(data.user.balance.toFixed(2).toString());
      setUserId(data.user.id);
    }
  }, [products, data]);

  useEffect(() => {
    theme == "dark" ? setChecked(true) : setChecked(false);
  }, []);
  useEffect(() => {
    isChecked ? setTheme("dark") : setTheme("light");
    localStorage.setItem("theme-isChecked", isChecked.toString());
  }, [isChecked]);

  return (
    <SheetContent side={"left"} className="justify-center overflow-auto" >
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
            <>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={data?.user?.image?.toString()}
                    alt={data?.user?.name?.toString().split(" ")[0]}
                  />
                  <AvatarFallback>
                    {data?.user?.name?.toString().slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p>
                  Olá,{" "}
                  <span className="font-semibold">
                    {data?.user?.name?.toString().split(" ")[0].toUpperCase()}!
                  </span>
                </p>
              </div>
              <div className="py-5">
                <p>
                  Saldo:{" "}
                  <span className="font-semibold text-lg">{balance}</span>
                </p>
              </div>
            </>
          )}
        </div>
        {status == "unauthenticated" ? (
          <Button variant={"outline"} onClick={handleLoginClick}>
            <LogInIcon className="mr-2" /> Entrar
          </Button>
        ) : (
          <div>
            <SheetClose asChild>
              <Link href={"/purchases"}>
                <Button className="w-full mb-2" variant={"outline"}>
                  <ShoppingBagIcon className="mr-2" /> Compras
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/profile"}>
                <Button className="w-full mb-2" variant={"outline"}>
                  <CircleUserRound className="mr-2" /> Perfil
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href={
                  "https://docs.google.com/spreadsheets/d/1nw4kLElvnScEY5bAqXZrEi9TnbGcf91-W9dO6EHeDWA/edit?gid=0#gid=0"
                }
              >
                <Button className="w-full mb-2" variant={"outline"}>
                  <SheetIcon className="mr-2" /> FACCA 2025
                </Button>
              </Link>
            </SheetClose>

            <Button
              className="w-full mb-2"
              variant={"outline"}
              onClick={handlePaymentClick}
            >
              <CircleDollarSignIcon className="mr-2" /> Pagamento
            </Button>
            {paymentVisible ? (
              <PaymentQrCode amount={amount} transactionId={userId} />
            ) : (
              <></>
            )}
            <Button
              className="w-full mb-2"
              variant={"outline"}
              onClick={handleLogoutClick}
            >
              <LogOutIcon className="mr-2" /> Sair
            </Button>
          </div>
        )}
      </div>
      <footer className="text-xs flex absolute bottom-0 w-9/12 justify-between invisible">
        <Link href={"/policy"}>Politicas de Privacidade</Link>
        <Link href={"/terms"}>Termos de Serviço</Link>
      </footer>
    </SheetContent>
  );
};

export default MenuContent;
