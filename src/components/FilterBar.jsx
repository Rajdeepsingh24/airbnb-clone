function FilterBar({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortOption,
  setSortOption,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-col gap-6 mb-10">
      {/* Categories */}
      <div className="flex gap-2 flex-wrap items-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 active:scale-95 ${
              selectedCategory === cat
                ? "bg-black text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm w-full sm:w-28 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-2 rounded-lg text-w-full sm:w-28 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-4 py-2 rounded-lg text-sm"
        >
          <option value="default">Recommended</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="az">Title: A → Z</option>
          <option value="za">Title: Z → A</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
