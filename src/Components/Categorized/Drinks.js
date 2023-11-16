import React, { useState, useEffect } from "react";
import SearchBar from '../ProductSearchBar/SearchBar'; 
import ProductCard from '../ProductCard';
import './All_Items.css';

function Drinks() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Fetching Drinks from API...");
    fetch('https://urlnamastebackend.onrender.com/getProductsByCategory/Drinks')
      .then((response) => response.json())
      .then((data) => {
        console.log('Drinks fetched:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [searchTerm]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log('Search term changed to:', searchTerm);

    // Filter Drinks based on the new search term
    if (searchTerm !== '') {
      const filteredDrinks = filterDrinks(searchTerm);
      setProducts(filteredDrinks);
    }
  };

  const filterDrinks = (searchTerm) => {
    if (!searchTerm) {
      console.log('Search term is empty, returning all Drinks');
      return products;
    }

    console.log('Filtering Drinks with search term:', searchTerm);
    const filteredDrinks = products.filter((product) => {
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

    return filteredDrinks;
  };

  const ShowDrinks = () => {
    if (searchTerm) {
      const filteredDrinks = filterDrinks(searchTerm);
      console.log('Rendering filtered Drinks:', filteredDrinks);
      return filteredDrinks.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    } else {
      console.log('Rendering all Drinks');
      return products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    }
  };

  return (
    <div>
      <div> <SearchBar handleSearch={handleSearch} /> </div>
      {/* Render Drinks */}
      <div className="ProductGrid">
      <ShowDrinks />
      </div>
    </div>
  );
}

export default Drinks;
