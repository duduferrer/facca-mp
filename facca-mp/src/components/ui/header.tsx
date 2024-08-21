import { MenuIcon, ShoppingBasketIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

const Header = () => {
  return (
    <Card className="flex justify-between p-5 items-center">
      <Button size={"icon"} className="rounded" variant={"ghost"}>
        <MenuIcon />
      </Button>
      <h1 className="font-black text-2xl"> FACCA </h1>
      <Button size={"icon"} className="rounded" variant={"ghost"}>
        <ShoppingBasketIcon />
      </Button>
    </Card>
  );
};

export default Header;
