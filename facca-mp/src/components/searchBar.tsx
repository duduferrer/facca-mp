"use client"
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect } from "react";


type SearchBarProps = {
  setSearchTerm: (event: string) => void;
  searchTerm: string;
};
const SearchBar = ({setSearchTerm: setSearchTerm, searchTerm: searchTerm}: SearchBarProps) => {
  return (
    <div className="flex py-4">
      <Input placeholder="Pesquisar" onChange={e=>setSearchTerm(e.target.value)} value={searchTerm}/>
      <Button variant={"outline"}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchBar;
