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
import { addOrderToDB } from "@/app/utils/db/createTransaction";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";



const Cart = () => {
  const { toast } = useToast();
  const { products, setProducts } = useContext(CartContext);
  const { data: session, update } = useSession();
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/para-tira-que-eu-vou-cagar.mp3"));
    }
  }, []);
  useEffect(() => {
    session?.user.member
      ? setDiscount(Number(process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE))
      : setDiscount(0);
  }, [session]);

  useEffect(() => {
    let sum = 0;
    products.map((product) => {
      sum = Number(product.sellPrice) * product.quantity + sum;
    });
    setSubtotal(sum);
  }, [products]);

  const handleLoginClick = async () => {
    await signIn();
  };
  const askLogin = () => {
    toast({
      variant: "destructive",
      title: "Não foi possível realizar a compra",
      description: "É necessário estar logado para realizar uma compra.",
      action: (
        <Button variant={"ghost"} className="border-2">
          <ToastAction onClick={handleLoginClick} altText="Faça Login">
            Fazer Login
          </ToastAction>
        </Button>
      ),
    });
  };
  const handleDeleteCartClick = () => {
    setProducts([]);
  };

  const orderSuccess = () => {
    toast({
      variant: "default",
      title: "Compra Realizada!",
      description:
        "Compra realizada com sucesso, caso deseje, confira no seu perfil.",
    });
    setProducts([]);
    update();
  };
  const orderFail = () => {
    toast({
      variant: "destructive",
      title: "Não foi possível realizar a compra",
      description: "Houve um erro ao finalizar a compra. Tente novamente.",
    });
  };

  const handleBuyClick = async () => {
    if (!session?.user.id) {
      askLogin();
    }else if(session.user.id == 'cm6p0mk040003qfwct4rz5trc'){
      audio?.play()
      toast({      
        variant: "destructive",
        title: "Ué",
        description: "Faça login na sua conta para fazer a compra",})
    } 
    else {
      if (products.length > 0) {
        const orderPlaced = await addOrderToDB(
          products,
          session.user.id,
          discount
        );
        orderPlaced ? orderSuccess() : orderFail();
      } else {
        toast({
          variant: "destructive",
          title: "Não foi possível realizar a compra",
          description: "Seu carrinho está vazio!",
        });
      }
    }
  };
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
                  <p>- {BRL.format(subtotal * discount)}</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex mx-auto mt-5 gap-7">
                  <p className="font-semibold text-3xl">Total</p>
                  <p className="font-semibold text-xl mt-auto">
                    {BRL.format(subtotal - subtotal * discount)}
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
