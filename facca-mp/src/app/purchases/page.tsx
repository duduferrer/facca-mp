"use client";
import React, { useEffect, useState } from "react";
import { DatePickerWithRange } from "./ui/dateRangePicker";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { getOrders } from "../utils/db/getTransaction";
import { useSession } from "next-auth/react";
import { OrdersTable, TableOrder } from "./ui/table";

const Purchases = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [finalSum, setFinalSum] = useState(0);
  const { data: session } = useSession();
  const [orders, setOrders] = useState<TableOrder[] | undefined>([]);
  const handleSearchClick = async () => {
    if (session) {
      setOrders(await getOrders(date, session.user.id));
    } else {
      console.log("Faça Login");
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
        </div>
        <Button onClick={handleSearchClick}>Buscar</Button>
      </div>
      {orders ? <OrdersTable data={orders} finalSum={finalSum} /> : ""}
    </div>
  );
};

export default Purchases;
