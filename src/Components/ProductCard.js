import {React,useEffect,useState } from 'react'
import "./ProductCard.css"
import Sweets from "../Images/Sweets.jpeg"
import { Link } from 'react-router-dom'
import AddToCart from '../Images/add-to-cart.png'
import axios from "axios"
import {useUser} from '../Components/Auth/UserContext';
import { useNavigate } from 'react-router-dom';
function ProductCard({product}) {
    const navigate = useNavigate();
    const [Quantity, setQuantity] = useState(1);
    const {user} = useUser();

    const navigateToProductDetails = () => {
      // Use the navigate function to navigate to the product details page
      navigate(`/product/${product._id}`);
    };
    const addToCart = () => {
        if (!user.loggedIn) {
          alert('Please Login for utilizing add to cart feature');
          return;
        }
        // productId: productId,
       console.log(product);
        axios.post('https://urlnamastebackend.onrender.com/cart/add-to-cart', {
            userId: user.userId, 
            productId: product._id,
            quantity: Quantity
        })
          .then((response) => {
            console.log('Product added to cart:', response.data);
            alert("Product added to cart successfully");
          })
          .catch((error) => {
            console.error('Error adding to cart:', error);
          });
      }
      console.log(product.offer && product.offer.percentageOffer);

  return (
    <div className='ProductCards'>
      
        <div className='ProductCard'>
        
        {
              product.offer && product.offer.isActive && (

              <div id='triangle-topleft'>{product.offer.percentageOffer ? (
                <span>{product.offer.discountPercentage}% OFF</span>
              ) : (
                <span>${product.offer.discountPercentage} OFF</span>
              )}</div>
            )}
            <div className='ProductImage'>
            
            {
              product.ProductImage1.includes('http') ? 
              (
            // If ProductImage1 is a URL
                <img className='ProImage' src={product.ProductImage1} alt={product.Name} />
              ) 
              : 
              (
            // If ProductImage1 is a base64 string
                <img className='ProImage' src={`data:image/png;base64,${product.ProductImage1}`} alt={product.Name} />
              )}

            </div>
            <div  className="ProductPrice">
            {product.offer && product.offer.isActive ? (
            <>
              <div className='DiscountedPrice'>Dicounted Price: {product.DiscountedPrice}</div>
              <div className='OriginalPrice'>Original Price: {product.Price}</div>              
            </>
          ) : (
            <span>Price: ${product.Price}</span>
          )}
            </div>
            <div className='ProductName'>
                {product.Name.toUpperCase()}
            </div>
            <div className='ProductDetailsbtn'>
            <div className='QuantityLabel'>Quantity: </div>
            <input
                    type="number"
                    paceholder="Quantity"
                    value={Quantity}
                    className='Quantity'
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <div className='FreeSpace'>
                </div>
                
                <div className='AddToCart'>
                    <img src={AddToCart} alt="Add to cart" className='ImageAddToCart' onClick={addToCart} />
                </div>
            </div>
            <div className='ViewProduct'>
              <button onClick={navigateToProductDetails}>
                  View Product
              </button>
            </div>
        </div>
        
    </div>
  )
}

export default ProductCard