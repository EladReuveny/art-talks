import { Palette } from "lucide-react";
import { Link } from "react-router";

type LogoProps = {};

const Logo = ({}: LogoProps) => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 cursor-pointer hover:opacity-75"
    >
      <Palette className="text-indigo-600 w-8 h-8" />
      <span className="text-2xl font-bold tracking-tight">
        Art <span className="text-indigo-600">Talks</span>
      </span>
    </Link>
  );
};

export default Logo;
