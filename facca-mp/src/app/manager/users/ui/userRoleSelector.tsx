"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const rolesOptions = [
  {
    value: "USER",
    label: "USER",
  },
  {
    value: "ADMIN",
    label: "ADMIN",
  },
  {
    value: "MASTER",
    label: "MASTER",
  },
];

const UserRoleSelector = ({
  setRole,
  role,
}: {
  setRole: Dispatch<SetStateAction<"ADMIN" | "USER" | "MASTER">>;
  role: "ADMIN" | "USER" | "MASTER";
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<"ADMIN" | "USER" | "MASTER">(role);
  useEffect(() => {
    setRole(value);
  }, [value]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? rolesOptions.find((role) => role.value === value)?.label
            : "Selecione a Função..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Busque uma função..." />
          <CommandList>
            <CommandEmpty>Função não encontrada</CommandEmpty>
            <CommandGroup>
              {rolesOptions.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue as "ADMIN" | "USER" | "MASTER");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === role.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {role.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UserRoleSelector;
