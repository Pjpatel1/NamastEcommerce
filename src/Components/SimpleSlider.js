import React from 'react';
import Slider from 'react-slick';
import "../Components/SimpleSlider.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from  "../Images/Home1.png";
import image2 from  "../Images/Home2.png";
import image3 from "../Images/Home3.png";
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
  
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="carousel-container1">
      <Slider {...settings}>
        <div>
          <img className="HeroImage" src={image1} alt="Slide 1" />
        </div>
        <div>
          <img className="HeroImage" src={image2} alt="Slide 2" />
        </div>
        <div>
          <img className="HeroImage" src={image3} alt="Slide 3" />
        </div>
      
      </Slider>
      <div className="text-overlay">
        <p>Namaste <br></br>Indian Supermarket</p>
        <div>
          <button className='StoreLocator' onClick={()=>scrollToSection('Location')}>
            Locate the Store
          </button>
        </div>
        {/* <p>Additional information or description that remains the same for all slides.</p> */}
  </div>
    </div>
  );
};

export default Carousel;