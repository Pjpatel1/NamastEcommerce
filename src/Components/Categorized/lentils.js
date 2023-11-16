import React, { useState, useEffect } from "react";
import SearchBar from '../ProductSearchBar/SearchBar'; 
import ProductCard from '../ProductCard';
import './All_Items.css';

function Lentils() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Fetching Lentils from API...");
    fetch('https://urlnamastebackend.onrender.com/getProductsByCategory/Lentils')
      .then((response) => response.json())
      .then((data) => {
        console.log('Lentils fetched:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [searchTerm]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log('Search term changed to:', searchTerm);

    // Filter Lentils based on the new search term
    if (searchTerm !== '') {
      const filteredLentils = filterLentils(searchTerm);
      setProducts(filteredLentils);
    }
  };

  const filterLentils = (searchTerm) => {
    if (!searchTerm) {
      console.log('Search term is empty, returning all Lentils');
      return products;
    }

    console.log('Filtering Lentils with search term:', searchTerm);
    const filteredLentils = products.filter((product) => {
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

    return filteredLentils;
  };

  const ShowLentils = () => {
    if (searchTerm) {
      const filteredLentils = filterLentils(searchTerm);
      console.log('Rendering filtered Lentils:', filteredLentils);
      return filteredLentils.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    } else {
      console.log('Rendering all Lentils');
      return products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    }
  };

  return (
    <div>
      <div> <SearchBar handleSearch={handleSearch} /> </div>
      {/* Render Lentils */}
      <div className="ProductGrid">
      <ShowLentils />
      </div>
    </div>
  );
}

export default Lentils;
