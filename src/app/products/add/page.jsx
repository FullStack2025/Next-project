"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    details: "",
    star: 0,
    brand: "Zudio",
    brandImage: "https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp",
    colors: "",
    sizes: "",
    images: "",
    reviews: [], // Remains an array, but we'll populate it with objects
  });

  // State for a single review input
  const [review, setReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    avatar: "https://via.placeholder.com/40", // Default avatar URL
    date: new Date().toISOString().split("T")[0], // Today's date
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include the review in the reviews array if fields are filled
      const reviewsToSubmit = review.name && review.rating && review.comment ? [review] : [];
      
      await axios.post("http://localhost:1458/products", {
        ...formData,
        id: Date.now().toString(), // Simple ID generation
        colors: formData.colors ? formData.colors.split(",").map((c) => c.trim()) : [],
        sizes: formData.sizes ? formData.sizes.split(",").map((s) => s.trim()) : [],
        images: formData.images ? formData.images.split(",").map((i) => i.trim()) : [],
        reviews: reviewsToSubmit, // Submit the review(s)
      });
      router.push("/"); // Redirect to Home after adding
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: name === "rating" ? Number(value) : value }));
  };

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Star Rating (1-5)</label>
            <input
              type="number"
              name="star"
              value={formData.star}
              onChange={handleChange}
              min="1"
              max="5"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Colors (comma-separated hex codes)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="#000000, #FF0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sizes (comma-separated)</label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="A4, A5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Images (comma-separated URLs)</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/image1.jpg"
            />
          </div>

          {/* Review Section */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Add a Review (Optional)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Reviewer Name</label>
                <input
                  type="text"
                  name="name"
                  value={review.name}
                  onChange={handleReviewChange}
                  className="w-full p-2 border rounded"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={review.rating}
                  onChange={handleReviewChange}
                  min="1"
                  max="5"
                  className="w-full p-2 border rounded"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Comment</label>
                <textarea
                  name="comment"
                  value={review.comment}
                  onChange={handleReviewChange}
                  className="w-full p-2 border rounded"
                  placeholder="Great product!"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Avatar URL (optional)</label>
                <input
                  type="text"
                  name="avatar"
                  value={review.avatar}
                  onChange={handleReviewChange}
                  className="w-full p-2 border rounded"
                  placeholder="https://via.placeholder.com/40"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Add Product
          </button>
        </form>
      </main>
    </div>
  );
}