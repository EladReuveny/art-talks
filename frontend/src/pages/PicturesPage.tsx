import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import PictureCard from "../components/PictureCard";
import PictureSkeleton from "../components/PictureSkeleton";
import { picturesQueries } from "../features/pictures/pictures.queries";

type PicturesPageProps = {};

const PicturesPage = ({}: PicturesPageProps) => {
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q") || "";

  const { data: pictures, isLoading, error } = picturesQueries.useFindAll(q);

  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return (
    <section>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => <PictureSkeleton key={i} />)
      ) : pictures?.length === 0 ? (
        <h2 className="text-3xl font-bold text-center mt-40">No results</h2>
      ) : (
        <div className="py-4 px-2 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pictures?.map((picture) => (
            <PictureCard key={picture.id} picture={picture} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PicturesPage;
