import React, { useState, useEffect } from "react";
import SearchBar from '../ProductSearchBar/SearchBar';
import ProductCard from '../ProductCard';
import './Vegetable.css';

function Vegetables() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Fetching products from API...");
    fetch('https://urlnamastebackend.onrender.com/getProductsByCategory/Vegetable')
      .then((response) => response.json())
      .then((data) => {
        console.log('Products fetched:', data);
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log('Search term changed to:', searchTerm);

    // Filter products based on the new search term
    const filteredProducts = filterProducts(searchTerm);
    setFilteredProducts(filteredProducts);
  };

  const filterProducts = (searchTerm) => {
    if (!searchTerm) {
      console.log('Search term is empty, returning all products');
      return products;
    }

    console.log('Filtering products with search term:', searchTerm);
    return products.filter((product) => {
      console.log('Checking product:', product);
      const productNameMatch = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const productDescriptionMatch = product.Description.toLowerCase().includes(searchTerm.toLowerCase());

      return productNameMatch || productDescriptionMatch;
    });
  };

  return (
    <div>
      <div>
        <SearchBar handleSearch={handleSearch} />
      </div>

      <div className="ProductGrid">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Vegetables;
