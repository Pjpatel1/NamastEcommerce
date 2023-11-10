import  {React, useEffect, useState } from 'react';
import axios from 'axios';
import {useUser} from '../Auth/UserContext';
import "../Cart/Cart.css"
import Deep from '../../Images/Drinks.jpeg'
import QuantityInput from '../mui/mui';

function UserCart() {
    const [cartItems, setCartItems] = useState([]);
    const {user} = useUser();
    useEffect(() => {
        // Make a GET request to fetch the user's cart items
        axios.get(`https://sampleserver-96f7c60072ed.herokuapp.com/cart/get-cart/${user.userId}`)
          .then((response) => {
            setCartItems(response.data);
            cartItems.map((cartItems)=>{
                console.log(cartItems._id);
                console.log(cartItems.productId.Brand)
                console.log(cartItems.productId.Quantity)
                console.log(cartItems.totalAmount)
                console.log(cartItems.quantity)
                
            })
          })
          .catch((error) => {
            console.error('Error fetching cart:', error);
          });
      }, [user.userId]);
      const calculateTotalAmount = () => {
        let total = 0;
        cartItems.forEach((cartItem) => {
          total += cartItem.totalAmount;
        });
        return total;
      };
     
  return (
    <div>
        <div className='CartPage'>
            Cart
            {cartItems.map((cartItem)=>(
              <div key = {cartItem.Id} className='CartProduct'>
                  <div className='ProductImageCover'>
                    <img className="ProductImage"src={cartItem.productId.ProductImage1}/>
                  </div>
                  <div className='CartProductDetails'>
                      <div className='CartProductName'>
                        <span className="cartMainText">{cartItem.productId.Name}</span>
                      </div>
                      <div className='CartProductName'>
                      <span className="cartMainText"> Price:</span> <span className="CartValues">{cartItem.productId.Price}</span>
                      </div>
                      <div className="CartProductName">
                      <span className="cartMainText"> Quantity:</span> <span className="CartValues">{cartItem.quantity}</span>
                      </div>
                    <div>

                    </div>
                  </div>
                  <div className='FreeSpace'>
                  </div>
                  <div className='PayableAmount'>
                      {cartItem.totalAmount}
                  </div>
                  
              </div>
            ))}
            <div className="billing">
              <div className="cartMainText">
              Total:
              </div>
              <div className="FreeSpace"></div>
              <div className="billAmount">
                {calculateTotalAmount()}
              </div>
            </div>
            </div>
            <div className="cartValues Greeting">
                Approved Thank You
            </div>      
    </div>
  )
}

export default UserCart;
// {cartItems.map((cartItem)=>(
//   <div key = {cartItem.Id} className='CartProduct'>
//       <div className='ProductImageCover'>
//           <img className='ProductImage' src={Deep}></img>
//       </div>
//   </div>
// ))}