import React, { useState, useEffect } from "react";
import SearchBar from '../ProductSearchBar/SearchBar'; 
import ProductCard from '../ProductCard';
import './All_Items.css';

function IndianSnacks() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Fetching Indian Snacks from API...");
    fetch('https://urlnamastebackend.onrender.com/getProductsByCategory/Indian_Snacks')
      .then((response) => response.json())
      .then((data) => {
        console.log('Indian Snacks fetched:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching Indian Snacks:', error));
  }, [searchTerm]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log('Search term changed to:', searchTerm);
    // Filter Indian Snacks based on the new search term
    if (searchTerm !== '') {
      const filteredProducts = filterProducts(searchTerm);
      setProducts(filteredProducts);
    }
  };

  const filterProducts = (searchTerm) => {
    if (!searchTerm) {
      console.log('Search term is empty, returning all Indian Snacks');
      return products;
    }

    console.log('Filtering Indian Snacks with search term:', searchTerm);
    const filteredProducts = products.filter((product) => {
      console.log('Checking Indian Snack:', product);
      const productNameMatch = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const productDescriptionMatch = product.Description.toLowerCase().includes(searchTerm.toLowerCase());

      if (productNameMatch || productDescriptionMatch) {
        console.log('Indian Snack matches search term, adding to filtered list');
        return true;
      } else {
        console.log('Indian Snack does not match search term, skipping');
        return false;
      }
    });

    return filteredProducts;
  };

  const ShowProducts = () => {
    if (searchTerm) {
      const filteredProducts = filterProducts(searchTerm);
      console.log('Rendering filtered Indian Snacks:', filteredProducts);
      return filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    } else {
      console.log('Rendering all Indian Snacks');
      return products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    }
  };

  return (
    <div>
      <div>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="ProductGrid">
        <ShowProducts />
      </div>
    </div>
  );
}

export default IndianSnacks;
