import React from 'react'
import "./Producttype.css"
import Masonry from 'react-masonry-css';
import Vagetables from"../Images/Vegetables.jpeg";
import Lentils from "../Images/Lentils.jpeg";
import Drinks from "../Images/Drinks.jpeg";
import Flowers from "../Images/Flowers.JPG";
import IndianSnacks from "../Images/IndianSnacks.jpeg";
import Sweets from "../Images/Sweets.jpeg";
const imageData = [
  { url: Vagetables, text:'Vegetable' },
  { url: Lentils, text:"Lentils"},
  { url: Drinks, text:"Drinks"},
  { url: Flowers, text:"Flowers"},
  { url: IndianSnacks, text:"Indian-Snacks"},
  { url: Sweets, text:"Sweets"}, // Add more image objects here...
  ];
  imageData.forEach(image => {
    image.aspectRatio = image.width / image.height;
  });
function Producttypes() {
    const breakpointColumnsObj = {
        default: 3,
        1200: 2,
        768: 1,
      };
  return (
    <div className='Section2'>
        <div className='Writing'>
            <div className='Writing-heading'>
                Types of Products
            </div>
            <div className='Writing_desciption'>
            Explore a delightful array of authentic Indian products at our Canadian superstore. From aromatic spices and flavorful ready-to-eat meals to colorful attire and traditional handicrafts, we bring India's rich culture and taste to your doorstep. Shop with us today!
            </div>
        </div>
        <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {imageData.map((image, index) => (
          <div key={index} className="my-masonry-grid_item">
            <img src={image.url} alt={`Image ${index + 1}`} style={{ width: '100%' }} />
            <div className="image-text">{image.text}</div>
          </div>
        ))}
      </Masonry>
    </div>
  )
}
export default Producttypes