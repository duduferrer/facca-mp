"use server";
import { db } from "@/lib/prisma";
import { FaccaOpType, UserOpType } from "@prisma/client";

interface OperationProps {
  value: number;
  observation: string;
  transactionBy: string;
}

export interface FaccaOperationProps extends OperationProps {
  type: FaccaOpType;
  isMP: Boolean;
}

export interface UserOperationProps extends OperationProps {
  userId: string;
  type: UserOpType;
}

type Props = UserOperationProps | FaccaOperationProps;

const createFinancialOp = async (props: Props) => {
  //  USER - FinancialOperation
  if ("userId" in props)
    try {
      await db.$transaction([
        db.financialOperation.create({
          data: {
            type: props.type,
            value: props.value,
            observation: props.observation,
            transactionBy: props.transactionBy,
            userID: props.userId,
          },
        }),
        db.user.update({
          where: {
            id: props.userId,
          },
          data: {
            balance:
              props.type === "REFUND"
                ? {
                    increment: props.value,
                  }
                : {
                    decrement: props.value,
                  },
          },
        }),
      ]);
      return true;
    } catch (e) {
      console.log(e + " Nao foi possivel criar transacao");
      return false;
    }

  //   FACCAOperation
  if ("isMP" in props) {
    try {
      await db.fACCAOperation.create({
        data: {
          type: props.type,
          isMP: Boolean(props.isMP),
          value: props.value,
          observation: props.observation,
          transactionBy: props.transactionBy,
        },
      });
      return true;
    } catch (e) {
      console.log(e + " Nao foi possivel criar transacao");
      return false;
    }
  }
};

export default createFinancialOp;
