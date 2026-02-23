import ListingCard from "../ListingCard";

function ListingGrid({ listings, deleteMode, onDelete }) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">No stays found</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
      {listings.map((item) => (
        <ListingCard
          key={item.id}
          data={item}
          onDelete={onDelete}
          deleteMode={deleteMode}
        />
      ))}
    </div>
  );
}

export default ListingGrid;
