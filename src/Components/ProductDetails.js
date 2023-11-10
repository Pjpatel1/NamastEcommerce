import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetails.css"
const images = [
    "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345767/demo_image2.jpg",
    "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652366604/demo_image5.jpg",
    "https://res.cloudinary.com/ifeomaimoh/image/upload/v1652345874/demo_image1.jpg",
  ];
function ProductDetails() {
  return (
    <div className='all-details'>
     <div className='box'>   
      <Carousel useKeyboardArrows={true}>
        {images.map((URL, index) => (
          <div className="slide">
            <img alt="sample_file" src={URL} key={index} loading="lazy"/>
          </div>
        ))}
      </Carousel>
      </div>
      <div className='box1'>
        <div className='Brand'>
            Brand
        </div>
        <div className='ProductName'>
            ProductName
        </div>
        <div className='Price'>
            $10000
        </div>
        <div className='Avialabltiy'>
            <span className='Label'>Avialablity: </span><span className='Avail-Decision'>Yes</span>
        </div>
        <div className='Product_Discription'>
            <div className="Label">Desciritpion</div>
            It might be description or Ingrediants or both of them.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur tempore ex culpa repudiandae modi beatae nesciunt esse, distinctio saepe id, laudantium cumque aspernatur itaque molestias! Quis quas voluptas officiis adipisci?
        </div>
        <div className='Chkout'>
            <button className='Chkout-Btn'>
                Checkout
            </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails