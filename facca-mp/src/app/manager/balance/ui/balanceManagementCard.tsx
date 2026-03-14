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
  const [isLoading, setLoading] = useState(false);

  const [faccaProps, setFaccaProps] = useState<FaccaOperationProps>();
  const [userProps, setUserProps] = useState<UserOperationProps>();

  // const handleSetProps = () => {
  //   if (transactionBy != undefined && balanceDialogContext == "USER") {
  //     setTransactionType(type == "ADD" ? "REFUND" : "PAYMENT");
  //     if (transactionType == "REFUND" || transactionType == "PAYMENT") {
  //       setUserProps({
  //         userId: userId,
  //         type: transactionType,
  //         value: value,
  //         transactionBy: transactionBy,
  //         observation: observation,
  //       });
  //     }
  //   }
  //   if (transactionBy != undefined && balanceDialogContext == "FACCA") {
  //     setTransactionType(type == "ADD" ? "INCOME" : "OUTCOME");
  //     if (transactionType == "INCOME" || transactionType == "OUTCOME") {
  //       setFaccaProps({
  //         type: transactionType,
  //         value: value,
  //         transactionBy: transactionBy,
  //         observation: observation,
  //         isMP: isMP,
  //       });
  //     }
  //   }
  // };
  const handleSaveButton = async () => {
    if (isLoading) return;
    setLoading(true);

    try {
      let success: boolean | undefined = false;

      if (balanceDialogContext === "FACCA") {
        const opType = type === "ADD" ? "INCOME" : "OUTCOME";
        success = await createFinancialOp({
          type: opType,
          value,
          observation,
          transactionBy: transactionBy!,
          isMP: Boolean(isMP),
        });
      } else {
        const opType = type === "ADD" ? "REFUND" : "PAYMENT";
        success = await createFinancialOp({
          userId: userId,
          type: opType,
          value,
          transactionBy: transactionBy!,
          observation,
        });
      }

      if (success) {
        toast({ title: "Sucesso!", description: "Operação realizada!" });
        window.location.reload();
      } else {
        throw new Error("Falha na operação");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha!",
        description: "Houve um erro.",
      });
    } finally {
      setLoading(false);
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
          <Button onClick={() => handleSaveButton()}>
            {!isLoading ? (
              <>Salvar</>
            ) : (
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
            )}
          </Button>
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
