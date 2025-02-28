import {React, useState, useEffect} from 'react'
import "./HeroSection.css"
import Vegitabel_circle from "../Images/Vegetables_cropped.png";
import Sweets from "../Images/Sweets_cropped.png";
import Spices from "../Images/Spices_cropped.png";
import IndianCurry from "../Images/IndianCurry.png";
import arrow from "../Images/Arrow.svg"
import { Link } from 'react-router-dom';
function HeroSection() {
    const [lines, setLines] = useState([]);
    const typedText = ["This Project is solely build", " to show my", " Development and Cybersecurity skills"];
  
    useEffect(() => {
        const animateText = (index, lineIndex, currentText) => {
          if (index < currentText.length) {
            setLines((prevLines) => {
              const newLines = [...prevLines];
              newLines[lineIndex] = currentText.substring(0, index + 1);
              return newLines;
            });
    
            setTimeout(() => {
              animateText(index + 1, lineIndex, currentText);
            }, 100); // Adjust the speed of typing (milliseconds)
          } else {
            // If the current line is completed, move to the next line
            if (lineIndex < typedText.length - 1) {
              setTimeout(() => {
                animateText(0, lineIndex + 1, typedText[lineIndex + 1]);
              }, 500); // Adjust the delay before starting the next line (milliseconds)
            }
          }
        };
    
        // Start the animation for the first line
        animateText(0, 0, typedText[0]);
    
        // Cleanup function to handle unmounting
        return () => {
          setLines([]); // Clear lines on unmount
        };
      }, []);
  return (
    <div className='HeroSection'>
        <div className='sub_section'>
          <div className='TypeWriter'>
            {lines.map((line, index) => (
              <div key={index} className='HeroText'>
                {line}
              </div>
            ))}
          </div>
        <div className='ViewProducts'>
            <Link to="/All_items">
              <button className='ViewProductsBtn'>
                View Products <img src={arrow} className='Arrow-Img'></img>
              </button>
              </Link>
        </div>
      </div>
        <div className='sub_section2'>
            <div className='circle'></div>
            <img src = {Vegitabel_circle} className='bubble1'></img>
            <img src = {Sweets} className='bubble2'></img>
            <img src = {Spices} className='bubble3'></img>
            <img src = {IndianCurry} className='bubble4'></img>
        </div>
    </div>
  )
}

export default HeroSection