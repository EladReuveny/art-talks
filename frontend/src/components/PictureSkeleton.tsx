type PictureSkeletonProps = {};

const PictureSkeleton = ({}: PictureSkeletonProps) => (
  <div className="rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
    <div className="aspect-4/5 bg-slate-200" />
    <div className="p-6 space-y-3">
      <div className="h-6 bg-slate-200 rounded-md w-3/4" />
      <div className="h-4 bg-slate-200 rounded-md w-1/2" />
      <div className="pt-4 border-t border-slate-50 flex justify-between">
        <div className="h-4 bg-slate-200 rounded-md w-1/4" />
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PictureSkeleton;
