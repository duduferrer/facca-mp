"use client";
import { MenuIcon, ShoppingBasketIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import MenuContent from "./menuContent";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {
  return (
    <Card className="flex justify-between p-5 items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} className="rounded" variant={"ghost"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <MenuContent />
      </Sheet>
      <Link href={"/"}>
        <h1 className="font-black text-2xl"> FACCA </h1>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"} className="rounded" variant={"ghost"}>
            <ShoppingBasketIcon />
          </Button>
        </SheetTrigger>
        <Cart />
      </Sheet>
    </Card>
  );
};

export default Header;
