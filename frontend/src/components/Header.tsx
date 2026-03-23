import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useSearch } from "../hooks/useSearch.hook";
import Logo from "./Logo";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const { searchTerm, setSearchTerm } = useSearch();

  const navigate = useNavigate();

  return (
    <header>
      <nav className="fixed top-0 w-screen z-50 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Logo />

        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="search"
            placeholder="Search art or artists..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-2 border-transparent outline-none rounded-full focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(
                  searchTerm ? `/pictures/?q=${searchTerm}` : `/pictures`,
                );
              }
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* <Link to="/login" className="px-4 py-2 text-slate-600 font-medium hover:text-indigo-600 transition-colors">
            Sign In
          </Link> */}
          <Link
            to="/pictures"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:bg-indigo-700"
          >
            Join Discussion
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
