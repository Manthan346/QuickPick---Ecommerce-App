import React from "react";
import { useSearch } from "../Context/SearchContext";
import { CircleX } from "lucide-react";

const SearchBar = () => {
  const { searchText, setSearchText, showSearch, setShowSearch } = useSearch();

  if (!showSearch) return null;

  return (
    <div className="w-full flex justify-center px-3 mt-3">
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="
            w-full
            px-4
            py-2
            pr-10
            border
            border-gray-300
            rounded-md
            bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-foreground-500
          "
        />

        <CircleX
          size={20}
          onClick={() => setShowSearch(false)}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            cursor-pointer
            text-gray-500
            hover:text-black
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;