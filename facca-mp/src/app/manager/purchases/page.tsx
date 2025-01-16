"use client";
import React, { useEffect, useState } from "react";
import { DatePickerWithRange } from "./ui/dateRangePicker";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { OrdersTable, TableOrder } from "./ui/table";

import { getOrders } from "@/app/utils/db/getTransaction";
import UserSelector from "@/components/userSelector";
export const dynamic = "force-dynamic";
const Purchases = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [finalSum, setFinalSum] = useState(0);
  const [userId, setUserId] = useState("");
  const [orders, setOrders] = useState<TableOrder[] | undefined>([]);
  const handleSearchClick = async () => {
    if (userId && date) {
      setOrders(await getOrders(date, userId));
    } else {
      console.error(
        "Nao foi possivel buscar os pedidos, usuario ou data nao definidos."
      );
    }
  };
  useEffect(() => {
    setFinalSum(0);
    orders?.map((order) => {
      setFinalSum((prev) => prev + Number(order.finalPrice));
    });
  }, [orders]);
  return (
    <div className="mt-3">
      <h1 className="text-center font-bold text-2xl">Histórico de Compras</h1>
      <div className="flex p-6 justify-center gap-2">
        <div className="">
          <DatePickerWithRange date={date} setDate={setDate} />
          <UserSelector setUser={setUserId} />
        </div>
        <Button onClick={handleSearchClick}>Buscar</Button>
      </div>
      {orders ? (
        <OrdersTable data={orders} finalSum={finalSum} userId={userId} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Purchases;
