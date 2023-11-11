import {React,useEffect,useState } from 'react'
import "./ProductCard.css"
import Sweets from "../Images/Sweets.jpeg"
import { Link } from 'react-router-dom'
import AddToCart from '../Images/add-to-cart.png'
import axios from "axios"
import {useUser} from '../Components/Auth/UserContext';
function ProductCard({product}) {

    const [Quantity, setQuantity] = useState(1);
    const {user} = useUser();
    
    const addToCart = () => {
        if (!user.loggedIn) {
          alert('Please Login for utilizing add to cart feature');
          return;
        }
        // productId: productId,
       console.log(product._id);
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
  console.log(product);
  return (
    <div className='ProductCards'>
        <div className='ProductCard'>
            <div className='ProductImage'>
                <img className="ProImage"src={product.ProductImage1}/>
            </div>
            <div  className="ProductPrice">
                Price: {product.Price}
            </div>
            <div className='ProductName'>
                {product.Name}
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
        </div>
        
    </div>
  )
}

export default ProductCard