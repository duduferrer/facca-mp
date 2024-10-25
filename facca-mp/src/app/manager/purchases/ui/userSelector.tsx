"use client";
import { userOptionI } from "./userOptions";
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
import UserOptions from "./userOptions";

const UserSelector = ({
  setUser,
}: {
  setUser: Dispatch<SetStateAction<string>>;
}) => {
  const [userOptions, setUserOptions] = useState<userOptionI[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  useEffect(() => {
    setUser(value);
  }, [value]);
  useEffect(() => {
    UserOptions().then((res) => setUserOptions(res));
  }, []);
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
            ? userOptions.find((user) => user.value === value)?.label
            : "Selecione Usuario..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Busque um Usuário..." />
          <CommandList>
            <CommandEmpty>Usuário não encontrado</CommandEmpty>
            <CommandGroup>
              {userOptions.map((user) => (
                <CommandItem
                  value={user.label}
                  key={user.value}
                  onSelect={() => {
                    setValue(user.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === user.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UserSelector;
