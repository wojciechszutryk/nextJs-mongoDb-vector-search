const ProductsSkeleton = (): JSX.Element => {
  return (
    <div>
      {[...Array(10)].map((_, i) => (
        <li
          key={i}
          className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 animate-pulse list-none"
        >
          <div className="h-8 bg-gray-200 rounded mb-2 w-5/6 min-w-90"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-2/6 min-w-40"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-1/6 min-w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-5/12 min-w-50"></div>
        </li>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
