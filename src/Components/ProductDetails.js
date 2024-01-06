// ProductDetailsPage.js
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  // Fetch product details using productId (you might need to implement this logic)
  useEffect(() => {
    // Fetch product details from the backend using the productId
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://urlnamastebackend.onrender.com/getProduct/${productId}`);
        setProductDetails(response.data); // Assuming your API returns the product details in the response.data
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div className="product-details-container">
    {productDetails ? (
      <div className="product-details">
        <img src={productDetails.ProductImage1} alt={productDetails.Name} className="product-image" />
        <div className="product-info">
          <h2 className="product-name">{productDetails.Name}</h2>
          <p className="product-price">Price: ${productDetails.Price}</p>
          <p className="product-description">Description: {productDetails.Description}</p>
          {/* Add other product details based on your data structure */}
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
};

export default ProductDetailsPage;
