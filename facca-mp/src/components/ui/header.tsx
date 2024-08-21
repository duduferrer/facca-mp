import { LogInIcon, MenuIcon, ShoppingBasketIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

const Header = () => {
  return (
    <Card className="flex justify-between p-5 items-center">
      <Sheet>
        <SheetTrigger>
          <Button size={"icon"} className="rounded" variant={"ghost"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>Menu</SheetHeader>
          <div className="mt-4 flex flex-col">
            <Button variant={"outline"}>
              <LogInIcon className="mr-2" /> Entrar
            </Button>
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
