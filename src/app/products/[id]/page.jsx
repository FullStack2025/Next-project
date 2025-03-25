"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchData = async () => {
    if (!params?.id) return;
    try {
      const response = await axios.get(`http://localhost:1458/products/${params.id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params?.id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center text-gray-500">Loading...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Product not found</div>;
  }

  // Fallback image
  const fallbackImage = "/error.webp"; // Ensure this exists in /public

  // Logic to determine the main image source
  let imageSrc = fallbackImage;
  if (Array.isArray(product.images) && product.images.length > 0) {
    try {
      new URL(product.images[0]);
      imageSrc = product.images[0];
    } catch {
      imageSrc = fallbackImage;
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={product.productName}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array.isArray(product.images) && product.images.length > 0 ? (
              product.images.map((img, index) => {
                // Logic to determine the thumbnail image source
                let thumbnailSrc = fallbackImage;
                if (img) {
                  try {
                    new URL(img);
                    thumbnailSrc = img;
                  } catch {
                    thumbnailSrc = fallbackImage;
                  }
                }

                return (
                  <button
                    key={index}
                    className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-indigo-500 hover:border-indigo-700"
                  >
                    <Image
                      src={thumbnailSrc}
                      alt={`${product.productName} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })
            ) : (
              <p className="text-gray-500 col-span-4 text-center">No images available</p>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={product.brandImage}
                  alt={product.brand}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium text-gray-700">{product.brand}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.productName}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.star
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600 fill-current"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews.length} reviews)</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-indigo-600">₹{product.price}</div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Colors</h3>
            <div className="flex gap-3">
              {Array.isArray(product.colors) && product.colors.length > 0 ? (
                product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))
              ) : (
                <span className="text-gray-500">No colors available</span>
              )}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Sizes</h3>
            <div className="flex gap-2 flex-wrap">
              {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                product.sizes.map((size, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {size}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No sizes available</span>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Details</h3>
            <p className="text-gray-600 dark:text-gray-300">{product.details}</p>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4">
            <Link href="#" passHref>
              <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition duration-300">
                Add to Cart
              </button>
            </Link>
            <button className="w-14 h-14 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-500 transition duration-300">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            <span>Free delivery on orders over ₹300</span>
          </div>
        </div>
      </div>

      {/* Details and Reviews Section */}
      <div className="mt-16 bg-white shadow-lg rounded-lg p-6">
        <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex gap-8">
            <button className="px-4 py-2 text-indigo-600 border-b-2 border-indigo-600 font-medium">
              Details
            </button>
            <button className="px-4 py-2 text-gray-500 dark:text-gray-400 font-medium">
              Reviews
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Details</h3>
          <p className="text-gray-600 dark:text-gray-300">{product.details}</p>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviews ({product.reviews.length})</h3>
          {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="border-t border-gray-200 py-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{review.name}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}