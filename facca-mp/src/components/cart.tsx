import { useContext, useEffect, useState } from "react";
import { SheetContent } from "./ui/sheet";
import { CartContext } from "@/app/providers/cartProvider";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import CartCard from "./cartCard";
import { BRL } from "@/app/utils/convertAsCurrency";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const Cart = () => {
  const { products, setProducts } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const desconto = 3.2;
  useEffect(() => {
    let sum = 0;

    products
      .map((product) => {
        sum = Number(product.sellPrice) * product.quantity + sum;
        return sum;
      })
      .forEach((el) => el + sum);
    setSubtotal(sum);
  }, [products]);

  const handleDeleteCartClick = () => {
    setProducts([]);
  };
  const handleBuyClick = async () => {};
  return (
    <SheetContent side={"right"} className="overflow-auto">
      <div className="flex">
        <ShoppingCart className="mt-1" />
        <h1 className="ml-2 text-2xl font-bold">Carrinho</h1>
      </div>
      <div>
        {products.length == 0 ? (
          <div className="mt-10">
            <p className="mb-4">Seu carrinho está vazio! </p>
            <p>
              <span className="font-bold">Clique</span> em um produto para
              adicioná-lo.
            </p>
          </div>
        ) : (
          <>
            {products.map((prod) =>
              prod.quantity > 0 ? <CartCard key={prod.id} product={prod} /> : ""
            )}
            <Card className="mt-5">
              <div className="flex pt-3">
                <div className="flex mx-auto gap-7">
                  <p>Subtotal</p>
                  <p>{BRL.format(subtotal)}</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex mx-auto gap-7">
                  <p>Desconto</p>
                  <p>- {BRL.format(desconto)}</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex mx-auto mt-5 gap-7">
                  <p className="font-semibold text-3xl">Total</p>
                  <p className="font-semibold text-xl mt-auto">
                    {BRL.format(subtotal - desconto)}
                  </p>
                </div>
              </div>
              <div className="flex py-3">
                <Button
                  className="gap-3 mt-5 w-3/4 font-bold text-xl h-12 mx-auto"
                  onClick={handleBuyClick}
                >
                  <ShoppingCartIcon />
                  Comprar
                </Button>
              </div>
            </Card>
            <div className="py-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="mx-auto flex w-3/4 bg-destructive"
                    variant={"outline"}
                  >
                    Limpar Carrinho
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Limpar o Carrinho</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja limpar o carrinho? Essa ação não pode
                    ser desfeita.
                  </AlertDialogDescription>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteCartClick}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  );
};

export default Cart;
