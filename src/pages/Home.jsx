import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingGrid from "../components/ListingGrid";
import FilterBar from "../components/FilterBar";

function Home({ allListings, deleteMode, onDelete, loading }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "default",
  );
  const heroImages = [
    "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (sortOption !== "default") params.sort = sortOption;
    if (selectedCategory !== "all") params.category = selectedCategory;
    setSearchParams(params);
  }, [search, sortOption, selectedCategory, setSearchParams]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const categories = useMemo(() => {
    const unique = new Set(
      allListings
        .map((item) => item.category)
        .filter((cat) => cat && cat.trim() !== ""),
    );
    return ["all", ...unique];
  }, [allListings]);

  const isInvalidRange =
    minPrice && maxPrice && Number(minPrice) > Number(maxPrice);

  const processedListings = useMemo(() => {
    let result = allListings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.location.toLowerCase().includes(search.trim().toLowerCase());

      const matchesMin = minPrice ? item.price >= Number(minPrice) : true;
      const matchesMax = maxPrice ? item.price <= Number(maxPrice) : true;

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesMin && matchesMax && matchesCategory;
    });

    switch (sortOption) {
      case "low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [allListings, search, minPrice, maxPrice, sortOption, selectedCategory]);

  return (
    <main className="bg-transparent">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        {/* SLIDING IMAGES */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Luxury stay background"
              loading={index === currentImage ? "eager" : "lazy"}
              width="1200"
              height="800"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 text-white px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover unique places, handpicked stays, and unforgettable
            experiences.
          </p>
          <button
            onClick={() =>
              document.getElementById("listings").scrollIntoView({
                behavior: "smooth",
              })
            }
            className="bg-rose-500 hover:bg-rose-600 px-8 py-3 rounded-full font-semibold transition"
          >
            Explore Now
          </button>
        </div>
        <div className="absolute bottom-6 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentImage
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <h2
            id="listings"
            className="text-3xl md:text-4xl font-bold dark:text-white mb-3"
          >
            Popular Stays
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {processedListings.length} stays available
          </p>
        </div>

        {/* Filters */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortOption={sortOption}
          setSortOption={setSortOption}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {isInvalidRange && (
          <div className="text-red-500 mt-6">
            Min price cannot be greater than Max price
          </div>
        )}

        {/* STATES */}
        {loading ? (
          <div className="text-center py-20 text-lg">Loading...</div>
        ) : allListings.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              No listings yet
            </h2>
            <button
              onClick={() => navigate("/add-listing")}
              className="px-6 py-3 bg-black text-white rounded-xl"
            >
              Add Your First Listing
            </button>
          </div>
        ) : processedListings.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              No stays found
            </h2>
            <button
              onClick={() => {
                setSearch("");
                setSortOption("default");
                setMinPrice("");
                setMaxPrice("");
                setSelectedCategory("all");
              }}
              className="px-6 py-3 bg-black text-white rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <ListingGrid
            listings={processedListings}
            deleteMode={deleteMode}
            onDelete={onDelete}
          />
        )}
      </div>
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "500+", label: "Happy Guests" },
          { value: "120+", label: "Premium Listings" },
          { value: "4.8", label: "Average Rating" },
          { value: "24/7", label: "Support" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 
                 rounded-3xl p-8 text-center 
                 shadow-md hover:shadow-xl 
                 transition duration-300"
          >
            <h3 className="text-3xl font-bold text-rose-600">{item.value}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-24 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: "🏡",
            title: "Curated Stays",
            desc: "Only quality verified listings.",
          },
          {
            icon: "🔒",
            title: "Secure Booking",
            desc: "Safe and transparent payments.",
          },
          {
            icon: "⭐",
            title: "Top Rated",
            desc: "Highly rated by real guests.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 
                 rounded-3xl p-8 text-center 
                 shadow-md hover:shadow-xl 
                 transition duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-24">
        <h2 className="text-2xl font-bold text-center mb-10 dark:text-white">
          What Guests Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              “Amazing stay! Everything was perfect.”
            </p>
            <div className="mt-4 text-sm font-semibold dark:text-white">
              — Aman
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              “Beautiful location and smooth booking.”
            </p>
            <div className="mt-4 text-sm font-semibold dark:text-white">
              — Priya
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              “Will definitely book again!”
            </p>
            <div className="mt-4 text-sm font-semibold dark:text-white">
              — Rahul
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
