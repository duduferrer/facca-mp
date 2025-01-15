import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
