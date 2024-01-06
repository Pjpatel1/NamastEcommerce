import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import SearchBar from '../ProductSearchBar/SearchBar';
import './All_Items.css';

function All_Items() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log("Fetching products from API...");
    fetch('https://urlnamastebackend.onrender.com/getProducts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Products fetched:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [searchTerm]);

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

  
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredProducts = filterProducts(searchTerm);
    setFilteredProducts(filteredProducts);
  };


  const ShowProducts = () => {
    if (searchTerm) {
      const filteredProducts = filterProducts(searchTerm);
      console.log('Rendering filtered products:', filteredProducts);
      return filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    } else {
      console.log('Rendering all products');
  //     useEffect(() => {
  //     (async () => {
  //       try{
  //       const response = await fetch('https://sampleserver-96f7c60072ed.herokuapp.com/getProducts');
  //       const data = await response.json();
  //       console.log('Products fetched:', data);
  //       setProducts(data);
  //     }
  //     catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   })();
  // }, [searchTerm])
      console.log(products);
      return products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    }
  };
  

  return (
    <div className='MainContent'>
      <div> <SearchBar handleSearch={handleSearch} /> </div>
      <div className='ProductGrid'>
        {ShowProducts()}
      </div>
    </div>
  );
}

export default All_Items;
