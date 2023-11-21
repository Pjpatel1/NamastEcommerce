import  {React, useEffect, useState } from 'react';
import axios from 'axios';
import {useUser} from '../Auth/UserContext';
import "../Cart/Cart.css"
import {Link, useNavigate } from 'react-router-dom';
import Deep from '../../Images/Drinks.jpeg'
import QuantityInput from '../mui/mui';
import Bin from "../../Images/bin.png";
import CheckoutComponent from './CheckoutComponent';
function UserCart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const {user} = useUser();
    
    if (!user) {
       <navigate to="/login" />;
    }
    useEffect(() => {
        // Make a GET request to fetch the user's cart items
        axios.get(`https://urlnamastebackend.onrender.com/cart/get-cart/${user.userId}`)
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
      }, [user.userId,setCartItems]);
      const calculateTotalAmount = () => {
        let total = 0;
        cartItems.forEach((cartItem) => {
          total += cartItem.totalAmount;
        });
        return total.toFixed(2);
      };
      const removeProduct = async (cartItemId) => {
        console.log("funtion called")
        try {
          // Send a DELETE request to remove the product from the cart
          await axios.delete(`https://urlnamastebackend.onrender.com/cart/remove-from-cart/${user.userId}/${cartItemId}`);
          // Fetch the updated cart items after removal
          const updatedCart = await axios.get(`https://urlnamastebackend.onrender.com/cart/get-cart/${user.userId}`);
          setCartItems(updatedCart.data);
        } catch (error) {
          console.error('Error removing product from cart:', error);
        }
      };

//Below everything is for checkout.
const [isCheckoutOpen, setCheckoutOpen] = useState(false);
const handleOpenCheckout = () => {
  setCheckoutOpen(true);

  const userEmail = user.email;
  const userID = user.userId;
  const UserName = user.firstName;
  sessionStorage.setItem('userEmail', userEmail);
  sessionStorage.setItem('userId', userID);
  sessionStorage.setItem('UserName', UserName);
};

  return (
    <div>
        <div className='CartPage'>
            Cart
            {cartItems.map((cartItem)=>(
              <div key = {cartItem._id} className='CartProduct'>
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
                  <div>
                    <div className='PayableAmount'>
                      Total of Item: ${cartItem.totalAmount}
                    </div>
                    <div className='deleteImageCover'>
                      <img className='deleteImg' src={Bin} onClick={() => removeProduct(cartItem._id)}></img>
                      {/* onClick={() => removeProduct(cartItem._id)} */}
                    </div>
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
            <div className='Checkoutbtn_cover'>
              <button onClick={handleOpenCheckout} className='CheckoutBtn'>Generate Bill</button>
            </div>
            {isCheckoutOpen && (
              <div className='overlay'>
                  <div className='popup'>
                    <CheckoutComponent cartItems={cartItems} user={user} total={calculateTotalAmount()} onClose={() => setCheckoutOpen(false)} />
                  </div>
              </div>
            )}    
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