import React, { useState } from 'react';

const ProductForm = () => {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    productQuantity: '',
    productCategory: '',
    productStock: 0,
    productImage1: '',
    productImage2: '',
    productImage3: '',
    productBrand: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Here you can add logic to handle the form submission, e.g., send data to the server.
    console.log('Form submitted with data:', productDetails);
  };

  return (
    <div>
      <h2>Product Details Form</h2>
      <form>
        {/* Input fields for each product detail */}
        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" value={productDetails.productName} onChange={handleChange} required />

        <label htmlFor="productPrice">Product Price:</label>
        <input type="text" id="productPrice" name="productPrice" value={productDetails.productPrice} onChange={handleChange} required />

        <label htmlFor="productDescription">Product Description:</label>
        <textarea id="productDescription" name="productDescription" value={productDetails.productDescription} onChange={handleChange} rows="4" required></textarea>

        <label htmlFor="productQuantity">Product Quantity:</label>
        <input type="text" id="productQuantity" name="productQuantity" value={productDetails.productQuantity} onChange={handleChange} required />

        <label htmlFor="productCategory">Product Category:</label>
        <input type="text" id="productCategory" name="productCategory" value={productDetails.productCategory} onChange={handleChange} required />

        <label htmlFor="productStock">Product Stock:</label>
        <input type="number" id="productStock" name="productStock" value={productDetails.productStock} onChange={handleChange} required />

        <label htmlFor="productImage1">Product Image 1 URL:</label>
        <input type="text" id="productImage1" name="productImage1" value={productDetails.productImage1} onChange={handleChange} required />

        <label htmlFor="productImage2">Product Image 2 URL:</label>
        <input type="text" id="productImage2" name="productImage2" value={productDetails.productImage2} onChange={handleChange} />

        <label htmlFor="productImage3">Product Image 3 URL:</label>
        <input type="text" id="productImage3" name="productImage3" value={productDetails.productImage3} onChange={handleChange} />

        <label htmlFor="productBrand">Product Brand:</label>
        <input type="text" id="productBrand" name="productBrand" value={productDetails.productBrand} onChange={handleChange} required />

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
