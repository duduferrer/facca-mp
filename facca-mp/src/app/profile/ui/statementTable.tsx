"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BRL } from "@/app/utils/convertAsCurrency";
import { FinancialOperation, User } from "@prisma/client";
import getUserStatement from "@/app/utils/db/getUserStatement";
import { useEffect, useState } from "react";

const StatementTable = ({ userID }: { userID: string | undefined }) => {
  const [data, setData] = useState<FinancialOperation[]>([]);
  useEffect(() => {
    if (!userID) {
      <p>Usuário nao encontrado</p>;
    } else {
      const fetchData = async () => {
        const statementData = await getUserStatement(userID);
        setData(statementData);
      };
      fetchData();
    }
  }, [userID]);
  return (
    <Table className="">
      <TableHeader className="">
        <TableRow className="">
          <TableHead>Data</TableHead>
          <TableHead className="text-center">Valor</TableHead>
          <TableHead className="text-center">Observação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((operation) => {
          const opType =
            operation.type == "REFUND" ? "text-green-400" : "text-red-400";
          return (
            <TableRow className={opType} key={operation.id}>
              <TableCell className="text-left">
                {operation.timeStamp.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-center">
                {BRL.format(Number(operation.value))}
              </TableCell>
              <TableCell className="text-left">
                {operation.observation}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default StatementTable;
