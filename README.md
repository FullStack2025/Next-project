"use client";
import React, { useState } from "react";
import axios from "axios";
function Page() {
  let [productName, setProductName] = useState("");
  let [price, setPrice] = useState("");
  let [image, setImage] = useState("");
  let [details, setDetails] = useState("");
  let [stars, setStars] = useState("");

async function handilesubmit(e){
 e.preventDefault();
 try{
    let data = await axios.post("http://localhost:5000/products",
        {
            productName,
            price,
            image,
            details,
            stars,
          }
    )
    console.log(data)
 }
 catch(err){
console.log(err)
 }
}

  return (
    <div style={{ padding: "5%", display: "flex", flexDirection: "column", gap: "10px" }}>
    <form  onSubmit={handilesubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        style={{ border: "1px solid black", padding: "8px" }}
      />
    <br />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ border: "1px solid black", padding: "8px" }}
      />
     <br />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ border: "1px solid black", padding: "8px" }}
      />
     <br />
      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        style={{ border: "1px solid black", padding: "8px", height: "100px" }}
      />
      <br />
      <input
        type="number"
        placeholder="Stars (Rating)"
        value={stars}
        onChange={(e) => setStars(e.target.value)}
        style={{ border: "1px solid black", padding: "8px" }}
      />
    <br />
      <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Page;
