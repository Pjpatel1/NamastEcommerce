import  {React, useEffect, useState, useRef} from "react";
import "./FamousCategoriesPopup.css";
import { Link } from 'react-router-dom';
import Vegetables from "../Images/Raleway (1).png";
import Spices from "../Images/Raleway.png";
import Sweets from "../Images/Raleway2.png";
import Lentils from "../Images/Raleway1.png";
import Drinks from "../Images/Raleway (2).png";
import FrozenFood from "../Images/Raleway3.png"
const FamousCategoryPopup = ({onClose}) =>{
    const [categories, setCategories] = useState([]);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const additionalCategoriesRef = useRef(null);
    useEffect(() => {
        console.log(`Categories: ${categories}...`);
        fetch(`https://urlnamastebackend.onrender.com/categories`)
          .then((response) => response.json())
          .then((data) => {
            console.log('Products fetched:', data);
            setCategories(data);
          
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, []);
      const handleViewAllCategories = () => {
        setShowCategoryPopup((prev) => !prev);
      
      };
      const handleClosePopup = () => {
        setShowCategoryPopup(false);
        onClose();
      };
    return(
        <div className="category-dropdown-center">
            <div className="category-dropdown-grid">
                    <div className="category_cards">
                        <div className="category_card" >
                            <Link to = "/category/Vegetable">
                               <div onClick={handleClosePopup}> <img src={Vegetables} alt="Vegetable" className="CategoryImage_header"></img></div>
                                    <div className="CategoryImage_lebel">
                                            Vagetable
                                    </div>
                                </Link>
                        </div>
                        
                    </div>
                    <div className="category_cards">
                        <div className="category_card">
                            <Link to = "/category/Lentils">
                                    <div onClick={handleClosePopup}><img src={Lentils} alt="Vegetable" className="CategoryImage_header"></img></div>
                                        <div className="CategoryImage_lebel">
                                                Lentils
                                        </div>
                            </Link>
                        </div>
                        
                        
                    </div>
                    <div className="category_cards">
                        <div className="category_card">
                        <Link to = "/category/Drinks">
                                <div onClick={handleClosePopup}>
                                    <img src={Drinks} alt="Vegetable" className="CategoryImage_header"></img>
                                </div>
                                <div className="CategoryImage_lebel">
                                    Drinks
                                </div>
                        </Link>
                        </div>
                        
                    </div>
                 
                    <div className="category_cards">
                        <div className="category_card">
                        <Link to = "/category/Spices">
                            <div onClick={handleClosePopup}>
                                <img src={Spices} alt="Vegetable" className="CategoryImage_header"></img>
                            </div>
                                    <div className="CategoryImage_lebel">
                                        Spices
                                    </div>
                        </Link>
                            </div>
                        
                    </div>
                    <div className="category_cards">
                        <div className="category_card">
                                <div onClick={handleClosePopup}><img src={Sweets} alt="Vegetable" className="CategoryImage_header"></img></div>
                                <div className="CategoryImage_lebel">
                                    Sweets
                                </div>
                        </div>
                        
                    </div>
                    <div className="category_cards">
                        <div className="category_card">
                                <div onClick={handleClosePopup}><img src={FrozenFood} alt="Vegetable" className="CategoryImage_header"></img></div>
                                <div className="CategoryImage_lebel">
                                    Sweets
                                </div>
                        </div>
                        
                    </div>
                    <div className="viewllbtn">
                        <button className="ViewAllCtgBtn" onClick={handleViewAllCategories}>
                            {showCategoryPopup ? 'View Less' : 'View All Category'}
                        </button>
                    </div>
                    {showCategoryPopup && categories.map((category, index) => (
                        <div className="category_cards mapped" key={index}>
                            <Link to={`/category/${category}`}>
                            <div className="category_card" onClick={handleClosePopup}>
                                <div className="AllCategoryImage_lebel">{category}</div>
                            </div>
                            </Link>
                        </div>
                    ))}
                    
                </div>
                

            </div>
    )
};

export default FamousCategoryPopup;
