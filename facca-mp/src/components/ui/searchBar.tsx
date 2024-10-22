import { SearchIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";

const SearchBar = () => {
  return (
    <div className="flex py-4">
      <Input placeholder="Pesquisar" />
      <Button variant={"outline"}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBar;
