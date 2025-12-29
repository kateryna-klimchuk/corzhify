export const ProductOverviewSkeleton: React.FunctionComponent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border rounded-lg border-gray-200 shadow-card overflow-hidden animate-pulse">
      <div className="w-full h-[400px] md:h-[520px] bg-gray-200" />
      <div className="flex flex-col p-4 md:p-6">
        <div className="space-y-4 flex-grow">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex py-3">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="flex-1 ml-4 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <div className="w-20 h-10 bg-gray-200 rounded-lg" />
          <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
