"use client";
import { MenuIcon, ShoppingBasketIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetTrigger } from "./ui/sheet";
import MenuContent from "./menuContent";
import Link from "next/link";
import Cart from "./cart";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/providers/cartProvider";

const Header = () => {
  const [productQty, setProductQty] = useState(0)
  const { products, setProducts } = useContext(CartContext);

  useEffect(()=>{
    const totalProd = products.reduce((acc, prod)=>acc+prod.quantity,0)
    setProductQty(totalProd)
  },[products])

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
          <div className="">
              {(()=>{
                if(productQty>0 && productQty<10){
                  return  <p className="bg-primary rounded-full justify-center w-4 text-xs absolute right-5 top-11 text-white">{productQty.toString()}</p>
                }else if(productQty>=10){
                  return  <p className="bg-primary rounded-full justify-center w-5 text-xs absolute right-5 top-11 text-white">9+</p>
                }else{
                  return  <p className="bg-primary rounded-full justify-center w-4 text-xs absolute right-5 top-11 text-white"></p>
                }}
              )()}
            <ShoppingBasketIcon className="w-7"/> 
          </div>

          </Button>
        </SheetTrigger>
        <Cart />
      </Sheet>
    </Card>
  );
};

export default Header;
