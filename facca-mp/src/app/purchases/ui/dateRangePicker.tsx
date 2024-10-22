"use client";

import * as React from "react";
import { format, setDefaultOptions, subDays } from "date-fns";
import { Calendar as CalendarIcon, CircleXIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

setDefaultOptions({ locale: ptBR });
export function DatePickerWithRange({
  date,
  setDate,
  className,
}: {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  className?: React.HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3" />
            {date?.from ? (
              date.to ? (
                <div className="mx-auto">
                  {format(date.from, "dd/LLL/yyyy")} -{" "}
                  {format(date.to, "dd/LLL/yyyy")}
                </div>
              ) : (
                format(date.from, "dd/LLL/yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            locale={ptBR}
          />
          <PopoverClose className="w-full h-10">
            <CircleXIcon
              size={24}
              className="text-primary/60 hover:text-destructive mx-auto my-2"
            />
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
}
