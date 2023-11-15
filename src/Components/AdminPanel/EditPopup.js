import React, { useState, useEffect } from 'react';

const EditProduct = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    // Populate the form with existing product details
    setEditedProduct(product);
  }, [product]);

  const handleInputChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Call the onSave prop to update the product
    onSave(editedProduct);
  };

  return (
    <div className="edit-product-popup">
      <h2>Edit Product</h2>
      {/* Add input fields for each product property */}
      <label>Name: <input type="text" name="Name" value={editedProduct.Name} onChange={handleInputChange} /></label>
      {/* Repeat for other fields */}
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditProduct;