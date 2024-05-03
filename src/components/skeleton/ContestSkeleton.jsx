
export default function ContestSkeleton() {
  return (
    <>
      <div className="animate-pulse lg:w-1/2 w-3/4 bg-slate-600 m-2 h-24 flex flex-col rounded-md  items-center py-2 gap-2">
        <p className="w-[90%] h-7 bg-slate-500 animate-pulse"></p>
        <p className="w-[90%] h-7 bg-slate-500 animate-pulse"></p>
      </div>
      <div className="animate-pulse lg:w-1/2 w-3/4 bg-slate-600 m-2 h-24 flex flex-col rounded-md  items-center py-2 gap-2">
        <p className="w-[90%] h-7 bg-slate-500 animate-pulse"></p>
        <p className="w-[90%] h-7 bg-slate-500 animate-pulse"></p>
      </div>
    </>
  );
}
