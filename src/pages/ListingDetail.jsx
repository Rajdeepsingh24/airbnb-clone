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
          className="px-6 py-2 bg-black text-white rounded-lg"
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
    rating,
    reviews,
    guests,
    bedrooms,
    bathrooms,
    area,
  } = listing;

  return (
    <div className="min-h-screen bg-transparent">
      {/* HERO IMAGE */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Mobile Back */}
        <button
          onClick={() => navigate(-1)}
          className="fixed top-[120px] left-4 z-50 md:hidden
                     bg-black/60 backdrop-blur-sm text-white 
                     px-4 py-2 rounded-full text-sm"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Desktop Back */}
        <button
          onClick={() => navigate(-1)}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-gray-100 dark:bg-gray-800 
                     text-gray-800 dark:text-gray-200 
                     text-sm font-medium mb-8"
        >
          ← BACK
        </button>

        {/* Highlights */}
        <div className="flex flex-wrap gap-12 py-8 border-b border-gray-200 dark:border-slate-700 mb-12">
          {[
            { icon: "👤", label: "Guests", value: guests },
            { icon: "🛏", label: "Bedrooms", value: bedrooms },
            { icon: "🛁", label: "Bathrooms", value: bathrooms },
            { icon: "📐", label: "Area", value: `${area} sqft` },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-lg font-semibold dark:text-white">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Title + Rating */}
        <div className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{title}</h1>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <span className="text-lg font-semibold">⭐ {rating}</span>
              <span>{reviews} reviews</span>
              <span>·</span>
              <span>{location}</span>
            </div>

            {deleteMode && (
              <button
                onClick={() => {
                  onDelete(listingId);
                  navigate("/");
                }}
                className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-lg"
              >
                Delete This Listing
              </button>
            )}
          </div>

          <Link
            to={`/edit/${listingId}`}
            className="px-6 py-2 border border-black dark:border-gray-500 
                       dark:text-white rounded-full text-sm font-medium"
          >
            Edit Listing
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-16">
            {/* About */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">
                About this stay
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Host */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow border dark:border-slate-700">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-400 to-orange-400 flex items-center justify-center text-white text-xl font-bold">
                  R
                </div>
                <div>
                  <div className="font-semibold dark:text-white">
                    Hosted by Rajdeep
                  </div>
                  <div className="text-sm text-gray-500">
                    Superhost · 3 years hosting
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Free WiFi",
                  "Kitchen",
                  "Free Parking",
                  "Air Conditioning",
                  "Smart TV",
                  "Private Bathroom",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <span>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                House Rules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Check-in after 2 PM",
                  "No smoking",
                  "No parties",
                  "Pets allowed",
                ].map((rule, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-gray-100 dark:bg-slate-600 dark:text-white text-gray-900"
                  >
                    {rule}
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">
                Where you'll be
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                {location}
              </p>
              <div className="h-72 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  title="map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    location,
                  )}&output=embed`}
                ></iframe>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-3xl shadow-xl p-8 lg:sticky lg:top-28">
              <div className="text-xl font-bold dark:text-white mb-6">
                ₹{Number(price).toLocaleString()}{" "}
                <span className="text-base font-normal text-gray-500">
                  / night
                </span>
              </div>

              <button className="w-full bg-rose-500 text-white py-3 rounded-xl mb-4">
                Reserve
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="w-full border py-2 rounded-xl text-sm"
              >
                Rate this stay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-80">
            <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">
              Rate this stay
            </h2>

            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className={`text-3xl ${
                    star <= selectedRating ? "text-rose-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button onClick={() => setShowModal(false)} className="px-4 py-2">
                Cancel
              </button>

              <button
                onClick={() => {
                  onRate(listingId, selectedRating);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg"
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
