"use client";
import React from "react";
import { DatePickerWithRange } from "./ui/dateRangePicker";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { Button } from "@/components/ui/button";

const Purchases = () => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  return (
    <div className="mt-3">
      <h1 className="text-center font-bold text-2xl">Histórico de Compras</h1>
      <div className="flex p-6 justify-center gap-2">
        <div className="">
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <Button>Buscar</Button>
      </div>
      <p>TABLE</p>
    </div>
  );
};

export default Purchases;
