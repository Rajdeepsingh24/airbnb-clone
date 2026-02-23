import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddListing({ addListing, updateListing, allListings }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const listingId = id ? Number(id) : null;

  const existingListing =
    isEditMode && allListings
      ? allListings.find((item) => item.id === listingId)
      : null;

  const [title, setTitle] = useState(existingListing?.title || "");
  const [location, setLocation] = useState(existingListing?.location || "");
  const [price, setPrice] = useState(existingListing?.price || "");
  const [image, setImage] = useState(existingListing?.image || "");
  const [description, setDescription] = useState(
    existingListing?.description || "",
  );
  const [category, setCategory] = useState(existingListing?.category || "");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!category) newErrors.category = "Category is required";
    if (!category) newErrors.category = "Category is required";
    if (!price || Number(price) <= 0)
      newErrors.price = "Price must be greater than 0";

    const imagePattern = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
    if (!imagePattern.test(image.trim()))
      newErrors.image = "Enter a valid image URL (jpg, png, webp)";

    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (isEditMode) {
      updateListing({
        id: listingId,
        title,
        location,
        price: Number(price),
        image,
        description,
        category,
        rating: existingListing?.rating || 0,
        reviews: existingListing?.reviews || 0,
      });
    } else {
      addListing({
        id: Date.now(),
        title,
        location,
        price: Number(price),
        image,
        description,
        category,
        rating: 0,
        reviews: 0,
      });
    }

    window.scrollTo(0, 0);
    navigate("/");
  };

  const inputStyle = (field) =>
    `w-full border p-3 rounded-lg transition ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-black"
    }`;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-rose-500 font-medium hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Listing" : "Add New Listing"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyle("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputStyle("location")}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Price (e.g. 3000)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputStyle("price")}
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputStyle("category")}
          >
            <option value="">Select Category</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
            <option value="Desert">Desert</option>
            <option value="Lake">Lake</option>
            <option value="Luxury">Luxury</option>
          </select>

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={inputStyle("image")}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyle("description")}
            rows="4"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          {isEditMode ? "Update Listing" : "Add Listing"}
        </button>
      </form>
    </div>
  );
}

export default AddListing;
