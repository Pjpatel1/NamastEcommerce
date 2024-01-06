import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import "../Components/CardSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextButtonImage from "../Images/next.png";
import PrevButtonImage from "../Images/previous.png";
import ProductCard from "./ProductCard"; // Import the ProductCard component

function CardSlider() {
  const [products, setProducts] = useState([]);

  const NextArrow = (props) => (
    <div
      {...props}
      style={{
        backgroundImage: `url(${NextButtonImage})`,
        backgroundSize: "cover",
        width: "20px",
        height: "20px",
        padding: "10px",
      }}
    />
  );

  const PrevArrow = (props) => (
    <div
      {...props}
      style={{
        backgroundImage: `url(${PrevButtonImage})`,
        backgroundSize: "cover",
        width: "20px",
        height: "20px",
        padding: "10px",
      }}
    />
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // Fetch data from your server
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://urlnamastebackend.onrender.com/products/active-offers"
        ); // Update the URL accordingly
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Card-Slider-constraints">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="card1">
            {/* Render the ProductCard component with the product as a prop */}
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CardSlider;
