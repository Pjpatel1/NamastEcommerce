// ProductSlider.js

import React from 'react';
import Slider from 'react-slick';
import "./FamousProductSlider.css"; // You can create a separate CSS file for styling

// Sample product data
const products = [
  { id: 1, name: 'Product 1', image: 'product1.jpg' },
  { id: 2, name: 'Product 2', image: 'product2.jpg' },
  // Add more product entries as needed
];

const ProductSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides to show in one view
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoints for different screen sizes
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map(product => (
        <div key={product.id} className="product-slide">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
        </div>
      ))}
    </Slider>
  );
};

export default ProductSlider;
