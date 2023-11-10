
import React from "react";
import Slider from "react-slick";
import "../Components/CardSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextButtonImage from "../Images/next.png"; // Import your custom "next" button image
import PrevButtonImage from "../Images/previous.png";
import Sweets from "../Images/Sweets.JPG"
function CardSlider() {
    const NextArrow = (props) => (
        <div
          {...props}
          style={{
            backgroundImage: `url(${NextButtonImage})`, // Set the "next" button image
            backgroundSize: "cover",
            width: "20px",
            height: "20px",
            padding:"10px",
          }}
        />
      );
      
      const PrevArrow = (props) => (
        <div
          {...props}
          style={{
            backgroundImage: `url(${PrevButtonImage})`, // Set the "previous" button image
            backgroundSize: "cover",
            width: "20px",
            height: "20px",
            padding:"10px",
          }}
        />
      );
      
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (

    <div className="Card-Slider-constraints">
    <Slider {...settings}>
            <div className='card1'>
                <div className='SweetImage'>
                 <img src={Sweets} className="Slider-Sweet-img" alt="Sweets Image"></img> 
                </div>
                <div className='Button'>
                    <button className='Purchase-btn'>Puchase Now</button>
                </div>
            </div>
            <div className='card1'>
                <div className='SweetImage'>
                   {/* <img></img> */}
                   Image here
                </div>
                <div className='Button'>
                    <button className='Purchase-btn'>Puchase Now</button>
                </div>
            </div>
            <div className='card1'>
                <div className='SweetImage'>
                   {/* <img></img> */}
                   Image here
                </div>
                <div className='Button'>
                    <button className='Purchase-btn'>Puchase Now</button>
                </div>
            </div>
            <div className='card1'>
                <div className='SweetImage'>
                   {/* <img></img> */}
                   Image here
                </div>
                <div className='Button'>
                    <button className='Purchase-btn'>Puchase Now</button>
                </div>
            </div>
            <div className='card1'>
                <div className='SweetImage'>
                   {/* <img></img> */}
                   Image here
                </div>
                <div className='Button'>
                    <button className='Purchase-btn'>Puchase Now</button>
                </div>
            </div>
            <div className='card1'>
                <div className='SweetImage'>
                   {/* <img></img> */}
                   Image here
                </div>
                <div className='Button'>
                    <button className='Purchase-btn'>Puchase Now</button>
                </div>
            </div>
            <div className='card1'>
                <div className='SweetImage'>
                   {/* <img></img> */}
                   Image here
                </div>
                <div className='Button'>
                    <button className='Purchase-btn'>Puchase Now</button>
                </div>
            </div>
    </Slider>
  </div>
  );
}

export default CardSlider;



// {/* <div className='Sweets-cards'>
//         <div className='Cards'>
//             <div className='card1'>
//                 <div className='SweetImage'>
//                    {/* <img></img> */}
//                    Image here
//                 </div>
//                 <div className='Button'>
//                     <button className='Purchase-btn'>Puchase Now</button>
//                 </div>
//             </div>
//         </div>
// </div>     */}