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
  const [isLoading, setLoading] = useState(false);

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
    if (isLoading) {
      return null;
    }
    setLoading(true);
    if (!session?.user.id) {
      askLogin();
    } else if (
      session.user.id == "cm6p0mk040003qfwct4rz5trc" ||
      session.user.id == "cm8al7apv00005545fxly4je4"
    ) {
      //apptmabh@gmail.com e appbhsbwh@gmail.com
      audio?.play();
      toast({
        variant: "destructive",
        title: "Ué",
        description: "Faça login na sua conta para fazer a compra",
      });
    } else {
      if (products.length > 0) {
        const orderPlaced = await addOrderToDB(
          products,
          session.user.id,
          discount,
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
    setLoading(false);
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
              prod.quantity > 0 ? (
                <CartCard key={prod.id} product={prod} />
              ) : (
                ""
              ),
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
                  {!isLoading ? (
                    <>
                      <ShoppingCartIcon />
                      Comprar
                    </>
                  ) : (
                    <>
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-secondary animate-spin fill-primary"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Aguarde...</span>
                      </div>
                    </>
                  )}
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
