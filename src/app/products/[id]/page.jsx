"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage({ params }) {
  // console.log(params.id)
  let [data,setData]=useState(0)
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:1458/products/${params.id}`);
      setData(response.data); // Extract the `data` property
      // console.log(response.data[0]?.id); // Optional chaining to avoid errors
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  useEffect(() => {
    fetchData()
  }, []);
  console.log(data,"shsjh")

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
            <Image
              src={data?.images?.[0] || ""} // Fallback image if data.images[0] is undefined
              alt="Reebok Zig Kinetica 3"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <button className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-primary">
              <Image
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp"
                alt="Thumbnail 1"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
            <button className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp"
                alt="Thumbnail 2"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
            <button className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp"
                alt="Thumbnail 3"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </button>
            <button className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative group">
              <Image
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp"
                alt="Thumbnail 4"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                +4
              </div>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp"
                  alt="Reebok"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">Zudio</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Shoes Zudio 1299</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    className="w-5 h-5 text-gray-300 dark:text-gray-600 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  (42 reviews)
                </span>
              </div>
            </div>
            <div className="text-3xl font-bold">₹1299.00</div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-primary p-0.5">
                <span className="block w-full h-full bg-white rounded"></span>
              </button>
              <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
                <span className="block w-full h-full bg-gray-200 rounded"></span>
              </button>
              <button className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5">
                <span className="block w-full h-full bg-black rounded"></span>
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Size</h3>
              <button className="text-primary text-sm">Size guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["40.5", "41", "42", "43", "43.5", "44", "44.5", "45"].map(
                (size) => (
                  <button
                    key={size}
                    className={`py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary ${
                      size === "41" ? "bg-primary text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4">
            <Link href="https://abhirajk.vercel.app/" passHref>
              <button className="flex-1 bg-primary text-white py-4 rounded-xl hover:bg-primary/90">
                Add to cart
              </button>
            </Link>
            <button className="w-14 h-14 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary">
              <svg
                className="w-6 h-6"
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
            <Link href="https://abhirajk.vercel.app/" passHref>
              <span>Free delivery on orders over rs: 300.0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-8">
            <button className="px-4 py-2 text-primary border-b-2 border-primary">
              Details
            </button>
            <button className="px-4 py-2 text-gray-500 dark:text-gray-400">
              Reviews
            </button>
            <button className="px-4 py-2 text-gray-500 dark:text-gray-400">
              Discussion
            </button>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Image
                src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1734628863/portfolio/mvsefulf9mimzumpbo0o.jpg"
                alt="Reviewer"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">ARK customer</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Yesterday
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Excellent running shoes. It turns very sharply on the foot.
                  good to buy from Zudioo.
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    42
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 11v-9m-7 10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    0
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-primary">4.8</div>
              <div className="flex-1">
                {[90, 70, 40, 20, 10].map((width, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${width}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {i === 0 ? 28 : i === 1 ? 9 : i === 2 ? 4 : 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}