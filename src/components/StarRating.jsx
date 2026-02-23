function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return (
            <span key={index} className="text-rose-500 text-lg">
              ★
            </span>
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <span key={index} className="text-rose-300 text-lg">
              ★
            </span>
          );
        } else {
          return (
            <span key={index} className="text-gray-300 text-lg">
              ★
            </span>
          );
        }
      })}
      <span className="ml-2 text-sm font-semibold text-gray-700">{rating}</span>
    </div>
  );
}

export default StarRating;
