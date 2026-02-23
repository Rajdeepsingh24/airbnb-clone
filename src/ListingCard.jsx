import { Link } from "react-router-dom";
import { memo } from "react";

function ListingCard({ data, onDelete, deleteMode, index }) {
  const {
    id,
    title = "Untitled Stay",
    location = "Unknown Location",
    price = 0,
    image,
  } = data;

  return (
    <Link
      to={`/listing/${id}`}
      style={{ animationDelay: `${index * 80}ms` }}
      className="relative group bg-white dark:bg-slate-900 rounded-2xl 
                 overflow-hidden shadow-sm hover:shadow-2xl 
                 dark:shadow-black/30 transition-all duration-400 ease-out 
                 hover:-translate-y-1.5 opacity-0 animate-fade-in"
    >
      {/* Image Wrapper */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover 
                     transition-transform duration-700 ease-out 
                     group-hover:scale-110"
        />

        {/* Soft Hover Overlay */}
        <div
          className="absolute inset-0 bg-black/0 
                        group-hover:bg-black/5 
                        transition-all duration-500"
        ></div>

        {/* Delete Mode Overlay */}
        {deleteMode && (
          <div className="absolute inset-0 bg-red-500/10 pointer-events-none"></div>
        )}
      </div>

      {/* Delete Button */}
      {deleteMode && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(id);
          }}
          className="absolute top-3 right-3 bg-rose-500 text-white px-3 py-1 
                     rounded-full text-xs hover:bg-rose-600 
                     transition-all duration-200 
                     hover:scale-105 active:scale-95 shadow-md"
        >
          Delete
        </button>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col gap-1.5">
        <h2
          className="text-lg font-semibold tracking-tight 
                       text-gray-900 dark:text-white truncate"
        >
          {title}
        </h2>

        <p
          className="text-gray-500 dark:text-gray-400 
                      text-sm truncate"
        >
          {location}
        </p>

        <div className="pt-2">
          <p
            className="text-base font-bold 
                        text-gray-900 dark:text-white"
          >
            ₹{Number(price).toLocaleString()}
            <span
              className="text-sm font-normal 
                             text-gray-500 dark:text-gray-400"
            >
              {" "}
              / night
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default memo(ListingCard);
