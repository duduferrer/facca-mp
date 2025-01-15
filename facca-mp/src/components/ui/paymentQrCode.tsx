import { generatePixMP } from "@/app/utils/pixGenerator";
import { Card } from "./card";
import { Button } from "./button";
import { CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { BRL } from "@/app/utils/convertAsCurrency";

const PaymentQrCode = ({
  amount,
  transactionId,
}: {
  amount: string;
  transactionId: string;
}) => {
  const pix = generatePixMP(amount, transactionId);
  const [qrCode, setQrCode] = useState("");
  const handleCopyClick = () => {
    navigator.clipboard.writeText(pix).then(() => {
      toast({
        variant: "default",
        title: "Copiado!",
        description: "Pix copia e cola copiado com sucesso!",
      });
    });
  };
  useEffect(() => {
    QRCode.toDataURL(pix).then((url) => {
      setQrCode(url);
    });
  }, []);
  return (
    <Card className="overflow-clip text-center py-3 -mt-2 mb-2">
      <p className="text-secondary-foreground text-sm">
        Pix: {BRL.format(Number(amount))}
      </p>
      <Image
        src={qrCode}
        alt="qrcode"
        width={200}
        height={200}
        className="pb-3 mx-auto"
      />
      <Button variant="outline" onClick={handleCopyClick}>
        <CopyIcon />
        Copiar
      </Button>
    </Card>
  );
};

export default PaymentQrCode;
