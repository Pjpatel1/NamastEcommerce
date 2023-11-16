import React, { useState, useEffect } from 'react';
import SearchBar from '../ProductSearchBar/SearchBar'; 
import ProductCard from '../ProductCard';
import './All_Items.css';

function FrozenFood() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Fetching Frozen Food products from API...");
    fetch('https://urlnamastebackend.onrender.com/getProductsByCategory/Frozen_Food')
      .then((response) => response.json())
      .then((data) => {
        console.log('Frozen Food products fetched:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [searchTerm]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log('Search term changed to:', searchTerm);
    
    if (searchTerm !== '') {
      const filteredProducts = filterProducts(searchTerm);
      setProducts(filteredProducts);
    }
  };

  const filterProducts = (searchTerm) => {
    if (!searchTerm) {
      console.log('Search term is empty, returning all Frozen Food products');
      return products;
    }

    console.log('Filtering Frozen Food products with search term:', searchTerm);
    const filteredProducts = products.filter((product) => {
      console.log('Checking product:', product);
      const productNameMatch = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const productDescriptionMatch = product.Description.toLowerCase().includes(searchTerm.toLowerCase());

      if (productNameMatch || productDescriptionMatch) {
        console.log('Product matches search term, adding to filtered list');
        return true;
      } else {
        console.log('Product does not match search term, skipping');
        return false;
      }
    });

    return filteredProducts;
  };

  const ShowFrozenFood = () => {
    if (searchTerm) {
      const filteredProducts = filterProducts(searchTerm);
      console.log('Rendering filtered Frozen Food products:', filteredProducts);
      return filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    } else {
      console.log('Rendering all Frozen Food products');
      console.log(products);
      return products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    }
  };

  return (
    <div>
      <div> <SearchBar handleSearch={handleSearch} /> </div>
      <ShowFrozenFood />
    </div>
  );
}

export default FrozenFood;
