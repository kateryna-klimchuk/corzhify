export const ProductCardSkeleton: React.FunctionComponent = () => {
  return (
    <li className="flex flex-col items-center border rounded-lg border-gray-200 p-4 bg-white animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />
      <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-1/2 h-4 bg-gray-200 rounded mb-4" />
      <div className="w-1/3 h-6 bg-gray-200 rounded" />
    </li>
  );
};

export const ProductGridSkeleton: React.FunctionComponent<{ count?: number }> = ({
  count = 6,
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </ul>
  );
};
