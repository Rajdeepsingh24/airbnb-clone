import { useState, useEffect } from "react";
import listings from "../data/listings";

const STORAGE_KEY = "airbnb_listings";

export function useListings() {
  const [allListings, setAllListings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : listings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allListings));
  }, [allListings]);

  const generateId = () => {
    return allListings.length
      ? Math.max(...allListings.map((item) => item.id)) + 1
      : 1;
  };

  const addListing = (newListing) => {
    const listingWithId = {
      ...newListing,
      id: generateId(),
      rating: 0,
      reviews: 0,
    };

    setAllListings((prev) => [...prev, listingWithId]);
  };

  const updateListing = (updatedListing) => {
    setAllListings((prev) =>
      prev.map((item) =>
        item.id === updatedListing.id ? updatedListing : item,
      ),
    );
  };

  const deleteListing = (id) => {
    setAllListings((prev) => prev.filter((item) => item.id !== id));
  };

  const rateListing = (id, newRating) => {
    setAllListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const totalRating = item.rating * item.reviews;
          const updatedReviews = item.reviews + 1;
          const updatedRating = (totalRating + newRating) / updatedReviews;

          return {
            ...item,
            rating: Number(updatedRating.toFixed(1)),
            reviews: updatedReviews,
          };
        }
        return item;
      }),
    );
  };

  return {
    allListings,
    addListing,
    updateListing,
    deleteListing,
    rateListing,
  };
}
