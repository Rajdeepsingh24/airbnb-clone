import { useState, useEffect } from "react";
import defaultListings from "../data/listings";

const STORAGE_KEY = "airbnb_listings";

export function useListings() {
  const [allListings, setAllListings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return defaultListings;
      }

      const parsed = JSON.parse(saved);

      // Validate structure
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return defaultListings;
      }

      // Ensure required fields exist
      const isValid = parsed.every(
        (item) =>
          item.id !== undefined &&
          item.title &&
          item.location &&
          item.price !== undefined,
      );

      return isValid ? parsed : defaultListings;
    } catch (error) {
      console.error("LocalStorage error:", error);
      return defaultListings;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allListings));
  }, [allListings]);

  // Generate unique ID
  const generateId = () => {
    return allListings.length
      ? Math.max(...allListings.map((item) => item.id)) + 1
      : 1;
  };

  // Add listing
  const addListing = (newListing) => {
    const listingWithDefaults = {
      ...newListing,
      id: generateId(),
      rating: 0,
      reviews: 0,
      guests: newListing.guests || 1,
      bedrooms: newListing.bedrooms || 1,
      bathrooms: newListing.bathrooms || 1,
      area: newListing.area || 500,
    };

    setAllListings((prev) => [...prev, listingWithDefaults]);
  };

  // Update listing
  const updateListing = (updatedListing) => {
    setAllListings((prev) =>
      prev.map((item) =>
        item.id === updatedListing.id ? updatedListing : item,
      ),
    );
  };

  // Delete listing
  const deleteListing = (id) => {
    setAllListings((prev) => prev.filter((item) => item.id !== id));
  };

  // Rate listing
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
