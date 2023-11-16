import React, { useState, useEffect } from "react";
import SearchBar from '../ProductSearchBar/SearchBar';
import ProductCard from '../ProductCard';
import './All_Items.css';

function Flowers() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("Fetching flowers from API...");
    fetch('https://urlnamastebackend.onrender.com/getProductsByCategory/Flowers')
      .then((response) => response.json())
      .then((data) => {
        console.log('Flowers fetched:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [searchTerm]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log('Search term changed to:', searchTerm);

    // Filter flowers based on the new search term
    if (searchTerm !== '') {
      const filteredProducts = filterProducts(searchTerm);
      setProducts(filteredProducts);
    }
  };

  const filterProducts = (searchTerm) => {
    if (!searchTerm) {
      console.log('Search term is empty, returning all flowers');
      return products;
    }

    console.log('Filtering flowers with search term:', searchTerm);
    const filteredProducts = products.filter((product) => {
      console.log('Checking flower:', product);
      const productNameMatch = product.Name.toLowerCase().includes(searchTerm.toLowerCase());
      const productDescriptionMatch = product.Description.toLowerCase().includes(searchTerm.toLowerCase());

      if (productNameMatch || productDescriptionMatch) {
        console.log('Flower matches search term, adding to filtered list');
        return true;
      } else {
        console.log('Flower does not match search term, skipping');
        return false;
      }
    });

    return filteredProducts;
  };

  const ShowFlowers = () => {
    if (searchTerm) {
      const filteredProducts = filterProducts(searchTerm);
      console.log('Rendering filtered flowers:', filteredProducts);
      return filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    } else {
      console.log('Rendering all flowers');
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
      <div className='ProductGrid'>
        <ShowFlowers />
      </div>
    </div>
  );
}

export default Flowers;
