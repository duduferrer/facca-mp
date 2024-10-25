"use client";
import { BRL } from "@/app/utils/convertAsCurrency";
import createProductDB, { CreateProductI } from "@/app/utils/db/createProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import CategorySelector from "./categorySelector";

const CreateProduct = () => {
  const [urlPhoto, setUrlPhoto] = useState("");
  const [notValidImg, setNotValidImg] = useState(false);
  const [profit, setProfit] = useState(0);
  const [cost, setCost] = useState(0);
  const [sell, setSell] = useState(0);
  const [sellSugestion, setSellSugestion] = useState(0);
  const [faccaPrice, setFaccaPrice] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [createProduct, setCreateProduct] = useState<CreateProductI>();

  useEffect(() => {
    setProfit(faccaPrice - cost);
  }, [cost, faccaPrice]);
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

  const handleCreateProduct = () => {
    setCreateProduct({
      name: name,
      buyPrice: cost,
      sellPrice: sell,
      barcode: barcode,
      imageURL: urlPhoto,
      stock: stock,
      category: category,
    });
  };
  const callCreateProductDB = () => {
    console.log(createProduct);
    if (createProduct != undefined) {
      createProductDB(createProduct).then((success) => {
        if (success) {
          location.reload();
          window.onload = () => {
            toast({
              variant: "default",
              title: "Sucesso!",
              description: "O produto foi criado!",
            });
          };
        } else {
          toast({
            variant: "destructive",
            title: "Falha!",
            description: "Houve um erro ao criar o produto.",
          });
        }
      });
    } else {
      toast({
        variant: "destructive",
        title: "Falha!",
        description:
          "Houve um erro ao criar o produto. Produto nao foi definido.",
      });
    }
  };
  useEffect(() => {
    if (createProduct) {
      callCreateProductDB();
    }
  }, [createProduct]);
  useEffect(() => {
    const sellSugestion = cost + (cost * 100) / 100;
    setSellSugestion(sellSugestion);
  }, [cost]);
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE) {
      const sellPriceWDiscount =
        sell - sell * Number(process.env.NEXT_PUBLIC_DISCOUNT_PERCENTAGE);
      setFaccaPrice(sellPriceWDiscount);
    }
  }, [sell]);
  return (
    <div className="flex ">
      <div className="my-auto mr-2">
        <Image
          src={
            urlPhoto
              ? urlPhoto
              : (process.env.NEXT_PUBLIC_NO_IMAGE_PRODUCT as string)
          }
          alt={"Foto do Produto"}
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
              defaultValue={""}
            />
          </p>
          <div className="items-end">
            <p>Preço de Custo: R$</p>
            <Input
              type="number"
              onChange={(e) => setCost(Number(e.target.value))}
              defaultValue={0}
              className="text-center"
              step="0.01"
            />
          </div>
          <div className="items-end">
            <p>Preço de Venda: R$</p>
            <Input
              type="number"
              onChange={(e) => setSell(Number(e.target.value))}
              defaultValue={sell}
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
              defaultValue={""}
            />
          </div>
          <div className="mt-2">
            <p>Estoque:</p>
            <Input
              type="number"
              onChange={(e) => setStock(Number(e.target.value))}
              defaultValue={0}
            />
          </div>
          <p>Categoria</p>
          <CategorySelector setCategory={setCategory} />
          <div className="pt-4 flex justify-between">
            <DialogClose>
              <Button onClick={() => handleCreateProduct()}>Salvar</Button>
            </DialogClose>
            <DialogClose>
              <Button
                autoFocus
                variant={"outline"}
                className="hover:bg-destructive"
              >
                Descartar
              </Button>
            </DialogClose>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreateProduct;
