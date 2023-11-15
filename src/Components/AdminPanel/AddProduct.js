import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';
const AddProductForm = () => {
  const [productList, setProductList] = useState([]);
  const [productData, setProductData] = useState({
    Name: '',
    Price: '',
    Description: '',
    Quantity: '',
    Category: '',
    Stock: 0,
    Brand: '',
    ProductImage1: null,
    ProductImage2: null,
    ProductImage3: null,
    ProductImage1Url: '',
    ProductImage2Url: '',
    ProductImage3Url: '',
  });
  
  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const imageFile = e.target.files[0];
    setProductData({ ...productData, [`ProductImage${index}`]: imageFile });
  };

  const handleImageUrlChange = (e, index) => {
    setProductData({ ...productData, [`ProductImage${index}Url`]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      for (const key in productData) {
        if (productData[key]) {
          formData.append(key, productData[key]);
        }
      }

      await axios.post('https://urlnamastebackend.onrender.com/add/product', formData);
      fetchProducts();
      // Handle success or redirect as needed
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
const fetchProducts = async () =>
{
  try{
    const response = await axios.get("https://urlnamastebackend.onrender.com/getProducts");
    setProductList(response.data);
  }
  catch(error)
  {
    console.error('Error fetching Products', error);
  }
};
useEffect(()=>{
  fetchProducts();
},[productData]);
const handleEdit = (product) => {
  // Implement your edit logic here
  console.log('Edit product:', product);
};

const handleRemove = async (product) => {
  // Implement your remove logic here

  // Implement your remove logic here
  console.log('Remove product:', product);

  // Log the value of product._id
  console.log('Product ID:', product._id);
  try{
    await axios.delete(`https://urlnamastebackend.onrender.com/remove/product/${product._id}`);
    fetchProducts();
  }
  catch(error)
  {
    console.log('Error removing product:',error);
  }
};
  return (
    <>
    <form onSubmit={handleSubmit}>
      {/* Your input fields for other data */}
      <div>
      <label>
        Name:
        <input type="text" name="Name" value={productData.Name} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Price:
        <input type="text" name="Price" value={productData.Price} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Description:
        <textarea name="Description" value={productData.Description} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Quantity:
        <input type="text" name="Quantity" value={productData.Quantity} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Category:
        <input type="text" name="Category" value={productData.Category} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Stock:
        <input type="number" name="Stock" value={productData.Stock} onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label>
        Brand:
        <input type="text" name="Brand" value={productData.Brand} onChange={handleInputChange} />
      </label>
      </div>
      {/* Your file input fields */}
      <div>
      <label>
        Product Image 1:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 1)}
        />
        URL
        <input
          type="text"
          name="ProductImage1Url"
          value={productData.ProductImage1Url}
          onChange={(e) => handleImageUrlChange(e, 1)}
        />
      </label>
      </div>
      <div>
      <label>
        Product Image 2:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 2)}
        />
        URL
        <input
          type="text"
          name="ProductImage2Url"
          value={productData.ProductImage2Url}
          onChange={(e) => handleImageUrlChange(e, 2)}
        />
      </label>
      </div>
      <div>
      <label>
        Product Image 3:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 3)}
        />
        URL
        <input
          type="text"
          name="ProductImage3Url"
          value={productData.ProductImage3Url}
          onChange={(e) => handleImageUrlChange(e, 3)}
        />
      </label>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div className='displayDatabase'> 
      <ProductTable data={productList}  onRemove={handleRemove} />
    </div>
    </>
  );
};

export default AddProductForm;
