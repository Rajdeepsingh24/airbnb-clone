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
    <main className="max-w-7xl mx-auto px-6 py-10 bg-transparent">
      {/* Heading */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-gray-900 dark:text-white">
          Find your next stay
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {processedListings.length} stays found
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
        <div className="text-red-500 mb-6">
          Min price cannot be greater than Max price
        </div>
      )}

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : allListings.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No listings yet</h2>
          <button
            onClick={() => navigate("/add-listing")}
            className="px-6 py-3 bg-black text-white rounded-xl"
          >
            Add Your First Listing
          </button>
        </div>
      ) : processedListings.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No stays found</h2>
          <button
            onClick={() => {
              setSearch("");
              setSortOption("default");
              setMinPrice("");
              setMaxPrice("");
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
    </main>
  );
}

export default Home;
