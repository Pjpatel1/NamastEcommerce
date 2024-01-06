import React, { useState, useEffect } from 'react';
import "./SpecialDeals.css";
import ProductCard from '../Components/ProductCard';
import SearchBar from '../Components/ProductSearchBar/SearchBar';

function SpecialDeals() {
    const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        console.log("Fetching products from API...");
        fetch('https://urlnamastebackend.onrender.com/products/active-offers')
          .then((response) => response.json())
          .then((data) => {
            console.log('Products fetched:', data);
            setProducts(data);
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, [searchTerm]);
      const filterProducts = (searchTerm) => {
        if (!searchTerm) {
          console.log('Search term is empty, returning all products');
          return products;
        }
    
        console.log('Filtering products with search term:', searchTerm);
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
    
        console.log('Filtered products:', filteredProducts);
        return filteredProducts;
      };
    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        console.log('Search term changed to:', searchTerm);
        // Filter products based on the new search term
        if (searchTerm !== '') {
          const filteredProducts = filterProducts(searchTerm);
          setProducts(filteredProducts);
        }
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
  )
}

export default SpecialDeals