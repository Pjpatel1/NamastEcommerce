// CategoryPage.js
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import SearchBar from '../ProductSearchBar/SearchBar';
import ProductCard from '../ProductCard';
import "./CategoryPage.css"
// import './CategoryPage.css';

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { categoryName } = useParams();
  useEffect(() => {
    console.log("Current Category:", categoryName);
    // ... rest of your code ...
  }, [categoryName]);
  useEffect(() => {
    console.log(`Fetching products from API for category: ${categoryName}...`);
    fetch(`https://urlnamastebackend.onrender.com/getProductsByCategory/${categoryName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Products fetched:', data);
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [categoryName]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredProducts = filterProducts(searchTerm);
    setFilteredProducts(filteredProducts);
  };

  const filterProducts = (searchTerm) => {
    if (!searchTerm) {
      return products;
    }
    return products.filter((product) => {
      const productNameMatch = product.Name && product.Name.toLowerCase().includes(searchTerm.toLowerCase());
    const productDescriptionMatch = product.Description && product.Description.toLowerCase().includes(searchTerm.toLowerCase());
      return productNameMatch || productDescriptionMatch;
    });
  };

  return (
    <div className="CategorisedProducts">
      <div className="categoryNameHeading">
      {categoryName}
      </div>
      <div className="SearchbarCategoryPage">
        <SearchBar handleSearch={handleSearch} />
      </div>

      <div className="ProductGrid">
      {Array.isArray(filteredProducts) ? (
        filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>No products available</p>
      )}
      </div>
    </div>
  );
}

export default CategoryPage;
