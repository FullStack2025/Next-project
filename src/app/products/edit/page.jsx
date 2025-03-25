"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function EditProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:1458/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const openDialog = (product) => {
    setSelectedProduct({ ...product }); // Deep copy to avoid mutating original
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1458/products/${selectedProduct.id}`, {
        ...selectedProduct,
        colors: Array.isArray(selectedProduct.colors) ? selectedProduct.colors : selectedProduct.colors ? selectedProduct.colors.split(",").map(c => c.trim()) : [],
        sizes: Array.isArray(selectedProduct.sizes) ? selectedProduct.sizes : selectedProduct.sizes ? selectedProduct.sizes.split(",").map(s => s.trim()) : [],
        images: Array.isArray(selectedProduct.images) ? selectedProduct.images : selectedProduct.images ? selectedProduct.images.split(",").map(i => i.trim()) : [],
      });
      setProducts(products.map((p) =>
        p.id === selectedProduct.id ? { ...selectedProduct } : p
      ));
      closeDialog();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: name === "star" ? Number(value) : value,
    }));
  };

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  // Fallback image
  const fallbackImage = "/error.webp"; // Ensure this exists in /public

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Products</h1>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-left">Product Name</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Details</th>
                  <th className="py-3 px-6 text-left">Star Rating</th>
                  <th className="py-3 px-6 text-left">Brand</th>
                  <th className="py-3 px-6 text-left">Colors</th>
                  <th className="py-3 px-6 text-left">Sizes</th>
                  <th className="py-3 px-6 text-left">Images</th>
                  <th className="py-3 px-6 text-left">Reviews</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400 text-sm font-light">
                {products.map((product) => {
                  // Validate image URL
                  let imageSrc = fallbackImage;
                  if (Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
                    try {
                      new URL(product.images[0]);
                      imageSrc = product.images[0];
                    } catch {
                      imageSrc = fallbackImage;
                    }
                  }

                  // Ensure colors, sizes, and images are arrays
                  const colors = Array.isArray(product.colors) ? product.colors : product.colors ? product.colors.split(",").map(c => c.trim()) : [];
                  const sizes = Array.isArray(product.sizes) ? product.sizes : product.sizes ? product.sizes.split(",").map(s => s.trim()) : [];
                  const images = Array.isArray(product.images) ? product.images : product.images ? product.images.split(",").map(i => i.trim()) : [];

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <td className="py-3 px-6 text-left">
                        <Image
                          src={imageSrc}
                          alt={product.productName}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">{product.productName}</td>
                      <td className="py-3 px-6 text-left">₹{product.price}</td>
                      <td className="py-3 px-6 text-left">{product.details}</td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < product.star ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">{product.brand}</td>
                      <td className="py-3 px-6 text-left">{colors.join(", ") || "N/A"}</td>
                      <td className="py-3 px-6 text-left">{sizes.join(", ") || "N/A"}</td>
                      <td className="py-3 px-6 text-left">{images.join(", ") || "N/A"}</td>
                      <td className="py-3 px-6 text-left">
                        {Array.isArray(product.reviews) && product.reviews.length > 0
                          ? product.reviews.map((r) => `${r.name}: ${r.rating}/5 - ${r.comment}`).join("; ")
                          : "No reviews"}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <button
                          onClick={() => openDialog(product)}
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Dialog/Modal */}
      {isDialogOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={selectedProduct.productName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={selectedProduct.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Details</label>
                <textarea
                  name="details"
                  value={selectedProduct.details}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Star Rating</label>
                <input
                  type="number"
                  name="star"
                  min="0"
                  max="5"
                  value={selectedProduct.star}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={selectedProduct.brand}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Colors (comma-separated)</label>
                <input
                  type="text"
                  name="colors"
                  value={Array.isArray(selectedProduct.colors) ? selectedProduct.colors.join(", ") : selectedProduct.colors || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, colors: e.target.value.split(",").map(c => c.trim()) })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Sizes (comma-separated)</label>
                <input
                  type="text"
                  name="sizes"
                  value={Array.isArray(selectedProduct.sizes) ? selectedProduct.sizes.join(", ") : selectedProduct.sizes || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, sizes: e.target.value.split(",").map(s => s.trim()) })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Images (comma-separated URLs)</label>
                <input
                  type="text"
                  name="images"
                  value={Array.isArray(selectedProduct.images) ? selectedProduct.images.join(", ") : selectedProduct.images || ""}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, images: e.target.value.split(",").map(i => i.trim()) })}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>
              {/* Reviews editing could be complex; skipping for simplicity */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="bg-gray-300 text-gray-800 py-1 px-3 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}