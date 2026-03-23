import { MessageCircle } from "lucide-react";
import { Link } from "react-router";
import type { Picture } from "../types/pictures.types";

type PictureCardProps = {
  picture: Picture;
};

const PictureCard = ({ picture }: PictureCardProps) => {
  return (
    <Link
      to={`/pictures/${picture.id}`}
      className="group rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl"
    >
      <div className="relative">
        <img
          src={picture.imgUrl}
          alt={picture.title}
          className="w-full h-full object-cover group-hover:scale-105 "
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center">
          <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold translate-y-4 group-hover:translate-y-0 hover:scale-105">
            View & Discuss
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-1 group-hover:text-indigo-600">
          {picture.title}
        </h3>
        <p className="text-slate-500 mb-4">By {picture.artistName}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <span className="flex items-center gap-1 text-slate-400 text-xs uppercase font-bold tracking-wider">
            <MessageCircle className="w-4 h-4" /> Live
          </span>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PictureCard;
