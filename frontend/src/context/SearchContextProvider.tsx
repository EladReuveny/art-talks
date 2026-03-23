import { createContext, useState } from "react";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
