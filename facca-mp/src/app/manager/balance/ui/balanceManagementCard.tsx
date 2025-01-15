"use client";

import createFinancialOp, {
  FaccaOperationProps,
  UserOperationProps,
} from "@/app/utils/db/createFinancialOp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserSelector from "@/components/userSelector";
import { toast } from "@/hooks/use-toast";
import { FaccaOpType, UserOpType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface BalanceManCardProps {
  type: "ADD" | "SUB";
  balanceDialogContext: "USER" | "FACCA";
}

const BalanceManCard = ({
  type,
  balanceDialogContext,
}: BalanceManCardProps) => {
  const [userId, setUserId] = useState("");
  const [value, setValue] = useState(0);
  const transactionTypeText = type == "ADD" ? "Adicionar" : "Remover";

  const [transactionType, setTransactionType] = useState<
    FaccaOpType | UserOpType
  >();
  const [observation, setObservation] = useState("");
  const { data } = useSession();
  const transactionBy = data?.user.id;
  const [isMP, setIsMP] = useState<Boolean>(false);

  const [faccaProps, setFaccaProps] = useState<FaccaOperationProps>();
  const [userProps, setUserProps] = useState<UserOperationProps>();

  const handleSetProps = () => {
    if (transactionBy != undefined && balanceDialogContext == "USER") {
      setTransactionType(type == "ADD" ? "REFUND" : "PAYMENT");
      if (transactionType == "REFUND" || transactionType == "PAYMENT") {
        setUserProps({
          userId: userId,
          type: transactionType,
          value: value,
          transactionBy: transactionBy,
          observation: observation,
        });
      }
    }
    if (transactionBy != undefined && balanceDialogContext == "FACCA") {
      setTransactionType(type == "ADD" ? "INCOME" : "OUTCOME");
      if (transactionType == "INCOME" || transactionType == "OUTCOME") {
        setFaccaProps({
          type: transactionType,
          value: value,
          transactionBy: transactionBy,
          observation: observation,
          isMP: isMP,
        });
      }
    }
  };
  const handleSaveButton = () => {
    handleSetProps();
    if (balanceDialogContext == "FACCA" && faccaProps != undefined) {
      createFinancialOp(faccaProps).then((success) => {
        if (success) {
          location.reload();
          window.onload = () => {
            toast({
              variant: "default",
              title: "Sucesso!",
              description: "Operação realizada!",
            });
          };
        } else {
          toast({
            variant: "destructive",
            title: "Falha!",
            description: "Houve um erro ao realizar a operação",
          });
        }
      });
    }
    if (balanceDialogContext == "USER" && userProps != undefined) {
      createFinancialOp(userProps);
    }
  };

  return (
    <Card>
      <CardContent className="p-3">
        <h1 className="font-semibold text-center p-3">
          {transactionTypeText} - {balanceDialogContext}
        </h1>
        <div className="grid grid-cols-1">
          {balanceDialogContext == "USER" ? (
            <div>
              <div className="grid grid-cols-1">
                <Label>Nome</Label>
                <UserSelector setUser={setUserId} />
              </div>
              <Label>Valor</Label>
              <Input
                type="number"
                defaultValue={0}
                className=""
                step="0.01"
                onChange={(e) => setValue(Number(e.target.value))}
              />
              <Label>Observação</Label>
              <Input type="text" />
            </div>
          ) : (
            <div>
              <Label>Valor</Label>
              <Input
                type="number"
                defaultValue={0}
                className=""
                step="0.01"
                onChange={(e) => setValue(Number(e.target.value))}
              />

              <div>
                <Label>MarketPlace</Label>
                <Input
                  type="checkbox"
                  onChange={(e) => setIsMP(Boolean(e.target.value))}
                />
              </div>

              <Label>Observação</Label>
              <Input
                type="text"
                onChange={(e) => setObservation(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="mt-3 justify-center flex gap-2">
          <Button onClick={() => handleSaveButton()}>Salvar</Button>
          <DialogClose>
            <Button>Cancelar</Button>
          </DialogClose>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceManCard;

// TODO OBSERVATION NOT SAVING
// TODO PAGE NOT REFRESHING
