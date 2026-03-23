import { Globe, MessageCircle, Zap } from "lucide-react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import PictureCard from "../components/PictureCard";
import PictureSkeleton from "../components/PictureSkeleton";
import { picturesQueries } from "../features/pictures/pictures.queries";

const HomePage = () => {
  const { data: pictures, isLoading, error } = picturesQueries.useFindAll();

  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <div>
      <header className="text-center">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          Where Art Meets
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            Real-Time Conversation
          </span>
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Discover breathtaking artworks and join live discussions with art
          enthusiasts from around the world.
        </p>

        <div className="flex flex-wrap justify-center gap-8 text-slate-500">
          <div className="flex items-center gap-2 p-4 rounded-full bg-yellow-500/10 text-yellow-500 text-xl">
            <Zap className="w-5 h-5" /> Real-time Updates
          </div>
          <div className="flex items-center gap-2 p-4 rounded-full bg-indigo-500/10 text-indigo-500 text-xl">
            <MessageCircle className="w-5 h-5" /> Live Chat
          </div>
          <div className="flex items-center gap-2 p-4 rounded-full bg-green-500/10 text-green-500 text-xl">
            <Globe className="w-5 h-5" /> Global Community
          </div>
        </div>
      </header>

      <main className="px-6 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Gallery</h2>
          <Link
            to="/pictures"
            className="bg-indigo-600/15 text-indigo-600 rounded-full py-2 px-4 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <PictureSkeleton key={i} />
              ))
            : pictures
                ?.slice(0, 10)
                .map((picture) => (
                  <PictureCard key={picture.id} picture={picture} />
                ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
