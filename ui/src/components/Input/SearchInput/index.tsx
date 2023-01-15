import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

export const SearchInput = ({ ...rest }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div className="w-full component__search_input">
      <div
        className={`text-white border hover:border-white rounded-2xl bg-base py-2 px-4 flex items-center bg-base1 relative ${isFocus ? "border-white" : "border-gray-500"}`}
      >
        <SearchIcon className="w-6 h-6 text-primary" />
        <input
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className="flex-1 outline-none bg-transparent text-gray py-2 ml-2"
          {...rest}
        />
      </div>
    </div>
  )
}