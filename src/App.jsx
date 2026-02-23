import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DeleteModal from "./components/DeleteModal";
import DeleteBanner from "./components/DeleteBanner";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";
import AddListing from "./pages/AddListing";

import { useListings } from "./hooks/useListings";

function App() {
  const location = useLocation();

  // Hide navbar actions on add/edit page
  const isAddOrEditPage =
    location.pathname === "/add-listing" ||
    location.pathname.startsWith("/edit/");

  // Listings logic
  const { allListings, addListing, updateListing, deleteListing, rateListing } =
    useListings();

  // UI states
  const [deleteMode, setDeleteMode] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  // Dark mode effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Delete handlers
  const handleDeleteClick = (id) => {
    if (deleteMode) {
      setPendingDeleteId(id);
    }
  };

  const confirmDelete = () => {
    if (pendingDeleteId !== null) {
      deleteListing(pendingDeleteId);
    }
    setPendingDeleteId(null);
    setDeleteMode(false);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
  };

  return (
    <ErrorBoundary>
      <div className="bg-gray-50 dark:bg-gray-800 min-h-screen transition-colors duration-300 flex flex-col">
        {/* Navbar */}
        <Navbar
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          hideActions={isAddOrEditPage}
        />

        {/* Delete Mode Banner */}
        {deleteMode && <DeleteBanner />}

        {/* Main Content */}
        <div className="flex-grow animate-fade">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  allListings={allListings}
                  deleteMode={deleteMode}
                  onDelete={handleDeleteClick}
                />
              }
            />

            <Route
              path="/listing/:id"
              element={
                <ListingDetail
                  allListings={allListings}
                  onRate={rateListing}
                  deleteMode={deleteMode}
                  onDelete={handleDeleteClick}
                />
              }
            />

            <Route
              path="/add-listing"
              element={
                <AddListing
                  addListing={addListing}
                  updateListing={updateListing}
                  allListings={allListings}
                />
              }
            />

            <Route
              path="/edit/:id"
              element={
                <AddListing
                  addListing={addListing}
                  updateListing={updateListing}
                  allListings={allListings}
                />
              }
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

        {/* Delete Modal */}
        {pendingDeleteId && (
          <DeleteModal onCancel={cancelDelete} onConfirm={confirmDelete} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
