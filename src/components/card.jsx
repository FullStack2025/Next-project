import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

const ProductCard = ({productName,price,details,id,star,images}) => {
    const router = useRouter(); // Initialize router
  console.log(images[0])
    const handleBuyNow = () => {
        router.push(`/products/${id}`); // Redirect to product details page
      };
      
  return (
    <div className="flex ">
      <div className="w-80 border border-blue-200 rounded-lg shadow-md p-4">
        {/* Discount Badge */}
        <div className="relative">
          <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -20%
          </span>
          {/* Wishlist Icon */}
          <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
          </button>
          {/* Product Image */}
          <div>
            <Image
              src={images[0]}
              alt="Product Image"
              className="object-contain w-full h-[270px]"
              width={320}
              height={270}
            />
          </div>
        </div>

        {/* Product Details */}
          <p className="uppercase text-green-600 text-xs font-medium">{productName}</p>
        <div className="mt-4">
          <h3 className="text-gray-800 font-medium text-base">
            {details}
          </h3>

          {/* Ratings */}
          <div className="flex space-x-1 text-orange-500 text-sm mt-1">
            {[...Array(star)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
            ))}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
            </svg>
          </div>

          {/* Pricing */}
          <div className="flex items-end justify-between">
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-blue-600 text-xl font-semibold">
                ${price}
              </span>
              <span className="text-gray-400 text-sm line-through">$1500.00</span>
            </div>
            <button 
                          onClick={handleBuyNow} // Add onClick event for redirection

            className="  flex items-center justify-center shadow text-black" style={{border:"1px solid black",borderRadius:"10px",padding:"5px"}}>
               buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
