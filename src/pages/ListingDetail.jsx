import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function ListingDetail({ allListings, onRate, deleteMode, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const listingId = Number(id);
  const listing = allListings.find((item) => item.id === listingId);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-semibold mb-4 dark:text-white">
          Listing not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded-lg transform active:scale-95 transition duration-200"
        >
          Go Home
        </button>
      </div>
    );
  }

  const {
    title,
    location,
    price,
    image,
    description,
    rating = 0,
    reviews = 0,
  } = listing;

  return (
    <div className="bg-transparent min-h-screen">
      {/* HERO IMAGE */}
      <div className="w-full h-[300px] md:h-[500px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-600 dark:text-gray-300 font-medium hover:underline"
        >
          ← Back
        </button>

        {/* Title + Rating */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {title}
            </h1>

            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              {reviews > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold">⭐ {rating}</span>
                  <span>{reviews} reviews</span>
                </div>
              ) : (
                <div className="text-sm">No ratings yet</div>
              )}

              <div>{location}</div>

              {deleteMode && (
                <button
                  onClick={() => {
                    onDelete(listingId);
                    navigate("/");
                  }}
                  className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transform active:scale-95 transition duration-200"
                >
                  Delete This Listing
                </button>
              )}
            </div>
          </div>

          <Link
            to={`/edit/${listingId}`}
            className="inline-block px-6 py-2 border border-black dark:border-gray-500 dark:text-white rounded-full text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Edit Listing
          </Link>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">
                About this stay
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>

            <hr className="border-gray-200 dark:border-slate-700 opacity-60" />

            <div>
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                What this place offers
              </h3>

              <div className="grid grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                <div>📶 Free WiFi</div>
                <div>🍳 Kitchen</div>
                <div>🚗 Free Parking</div>
                <div>❄️ Air Conditioning</div>
                <div>📺 Smart TV</div>
                <div>🛁 Private Bathroom</div>
              </div>
            </div>
          </div>

          {/* RIGHT PRICE BOX */}
          <div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl shadow-xl dark:shadow-black/40 p-8 lg:sticky lg:top-28">
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                ₹{Number(price).toLocaleString()}
                <span className="text-base font-normal text-gray-600 dark:text-gray-300">
                  {" "}
                  / night
                </span>
              </div>

              <button
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl transform active:scale-95 transition duration-200 font-semibold"
                onClick={() => alert("Reservation feature coming soon 🚀")}
              >
                Reserve
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                You won’t be charged yet
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="w-full mt-4 border border-black dark:border-gray-500 dark:text-white py-2 rounded-xl text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transform active:scale-95 transition duration-200"
              >
                Rate this stay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ RATING MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-black/30 p-6 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">
              Rate this stay
            </h2>

            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className={`text-3xl transition ${
                    star <= selectedRating ? "text-rose-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedRating(0);
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>

              <button
                disabled={selectedRating === 0}
                onClick={() => {
                  onRate(listingId, selectedRating);
                  setShowModal(false);
                  setSelectedRating(0);
                }}
                className={`px-4 py-2 rounded-lg transform active:scale-95 transition duration-200 ${
                  selectedRating === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-rose-500 text-white hover:bg-rose-600"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingDetail;
