"use client";
import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import axios from "axios";
import ProductCard from "../components/card"
function Page() {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:1458/products")
  //     .then((response) => {
  //       setProducts(response.data); // Extract the `data` property
  //       console.log(response.data[0].id); // This works only when data is received
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching products:", error);
  //     });
  // }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1458/products");
      setProducts(response.data); // Extract the `data` property
      console.log(response.data[0]?.id); // Optional chaining to avoid errors
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  useEffect(() => {
    fetchData()
  }, []);



    // useEffect(() => {
    //   (async () => {
    //     try {
    //       const response = await axios.get("http://localhost:1458/products");
    //       setProducts(response.data); // Store fetched products
    //     } catch (error) {
    //       console.error("Error fetching products:", error);
    //     }
    //   })();
    // }, []);
  return (
    <>
      {/* <Carousel /> */}
        <p>
            { products[0]?.details}
        </p>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        { products.map((products)=>(
            
            <ProductCard key={products.id} {...products}/>
            ))}
  
        </div>
  
    </>
  );
}

export default Page;
