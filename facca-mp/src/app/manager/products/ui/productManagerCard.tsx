"use client";
import { BRL } from "@/app/utils/convertAsCurrency";
import setProductNotVisible from "@/app/utils/db/setProductNotVisible";
import updateProductDB, { UpdateProduct } from "@/app/utils/db/updateProduct";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Product } from "@prisma/client";
import { PopoverClose } from "@radix-ui/react-popover";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProductManagerCard = ({ product }: { product: Product }) => {
  const [urlPhoto, setUrlPhoto] = useState(product.imageURL);
  const [notValidImg, setNotValidImg] = useState(false);
  const [profit, setProfit] = useState(
    Number(product.sellPrice) - Number(product.buyPrice)
  );
  const [cost, setCost] = useState(Number(product.buyPrice));
  const [sell, setSell] = useState(Number(product.sellPrice));
  const [barcode, setBarcode] = useState(product.barcode);
  const [name, setName] = useState(product.name);
  const [tempStock, setTempStock] = useState(0);
  const [stockLoss, setStockLoss] = useState(0);
  const [stock, setStock] = useState(product.stock);
  const [updateProduct, setUpdateProduct] = useState<UpdateProduct>();
  const [sellSugestion, setSellSugestion] = useState(0);
  const [faccaPrice, setFaccaPrice] = useState(0)
  useEffect(() => {
    const sellSugestion = cost + (cost * 100) / 100;
    setSellSugestion(sellSugestion);
  }, [cost]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE) {
      const sellPriceWDiscount =
        sell - sell * Number(process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE);
      setFaccaPrice(sellPriceWDiscount);
    }}, [sell]);
  useEffect(() => {
    setProfit(sell - cost);
  }, [cost, sell]);
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
  const handleStockAddClick = () => {
    setStock((prev) => prev + tempStock);
  };
  const handleStockLossClick = () => {
    setStockLoss(tempStock);
    setStock((prev) => prev - tempStock);
  };
  const handleUpdateProduct = () => {
    setUpdateProduct({
      productId: product.id,
      name: name,
      buyPrice: cost,
      sellPrice: sell,
      barcode: barcode,
      stockLoss: stockLoss,
      imageURL: urlPhoto,
      stock: stock,
    });
  };
  const callUpdateDB = () => {
    if (updateProduct != undefined) {
      updateProductDB(updateProduct).then((success) => {
        if (success) {
          location.reload();
          window.onload = () => {
            toast({
              variant: "default",
              title: "Sucesso!",
              description: "O produto foi atualizado!",
            });
          };
        } else {
          toast({
            variant: "destructive",
            title: "Falha!",
            description: "Houve um erro ao atualizar o produto.",
          });
        }
      });
    } else {
      toast({
        variant: "destructive",
        title: "Falha!",
        description:
          "Houve um erro ao atualizar o produto. Produto nao foi definido.",
      });
    }
  };
  useEffect(() => {
    if (updateProduct) {
      callUpdateDB();
    }
  }, [updateProduct]);

  const handleDeleteClick = () => {
    setProductNotVisible(product.id).then((res) => {
      if (res == true) {
        location.reload();
        window.onload = () => {
          toast({
            variant: "default",
            title: "Sucesso!",
            description: "O produto foi apagado!",
          });
        };
      } else {
        toast({
          variant: "destructive",
          title: "Falha!",
          description: "Houve uma falha ao apagar o produto",
        });
      }
    });
  };
  return (
    <div className="flex ">
      <div className="my-auto mr-2">
        <Image
          src={
            urlPhoto
              ? urlPhoto
              : (process.env.NEXT_PUBLIC_NO_IMAGE_PRODUCT as string)
          }
          alt={product.name.split(" ")[0]}
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
            Produto:{" "}
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
          </p>
          <div className="items-end">
            <p>Preço de Custo: R$</p>
            <Input
              type="number"
              onChange={(e) => setCost(Number(e.target.value))}
              defaultValue={Number(product.buyPrice)}
              className="text-center"
              step="0.01"
            />
          </div>
          <div className="items-end">
            <p>Preço de Venda: R$</p>
            <Input
              type="number"
              onChange={(e) => setSell(Number(e.target.value))}
              defaultValue={Number(product.sellPrice)}
              className="text-center"
            />
            <p>
              Preço Sugerido: <span>{BRL.format(sellSugestion)}</span>
            </p>
            <p>
              Preço FACCA: <span>{BRL.format(faccaPrice)}</span>
            </p>
          </div>
          {profit < 0 ? (
            <p className="text-right text-red-600">
              Lucro: {BRL.format(profit)}
            </p>
          ) : (
            <p className="text-right">Lucro: {BRL.format(profit)}</p>
          )}
          <div>
            <p>Codigo de Barras:</p>
            <Input
              onChange={(e) => setBarcode(e.target.value)}
              defaultValue={barcode ? barcode : ""}
            />
          </div>
          <div className="flex justify-between items-baseline mt-2">
            <p>Estoque: {stock}</p>
            <div className="gap-4 flex">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="bg-green-600">
                    +
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    <p>Adicionar Produtos ao Estoque</p>
                    <Input
                      onChange={(e) => setTempStock(Number(e.target.value))}
                      type="number"
                    />
                    <PopoverClose asChild>
                      <Button
                        onClick={() => handleStockAddClick()}
                        className="flex ml-auto mt-2"
                      >
                        Confirma
                      </Button>
                    </PopoverClose>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="bg-red-600">
                    -
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  {" "}
                  <div>
                    <p>REMOVER produtos do estoque</p>
                    <Input
                      type="number"
                      onChange={(e) => setTempStock(Number(e.target.value))}
                    />
                    <div className="flex  mt-2">
                      <p className="font-bold">
                        Adiciona como perda de estoque
                      </p>
                      <PopoverClose asChild>
                        <Button
                          onClick={() => handleStockLossClick()}
                          className="flex ml-auto"
                        >
                          Confirma
                        </Button>
                      </PopoverClose>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="pt-4 flex justify-between">
            <DialogClose>
              <Button onClick={() => handleUpdateProduct()}>Salvar</Button>
            </DialogClose>
            <DialogClose>
              <Button autoFocus variant={"outline"} className="">
                Descartar
              </Button>
            </DialogClose>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant={"outline"} className="hover:bg-destructive">
                  <Trash2Icon /> Deletar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que quer excluir o produto? Esta ação é
                    irreversível.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-red-400"
                    onClick={() => handleDeleteClick()}
                  >
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagerCard;
