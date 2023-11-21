import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import {Link, useNavigate} from 'react-router-dom';
import PaymentGateway from '../PaymentGateway/PaymentGateway';



function CheckoutComponent({ cart, user, onClose, total }) {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  //Function to redirect the user on payment Gateway



  // const  checkoutMessage = user.email.endsWith('@gmail.com') ? 'Press Confirm Checkout' : 'Fill the registered email address below.';
  
  useEffect(() => {
    console.log(user);
    console.log(user.email);
    axios.get(`https://urlnamastebackend.onrender.com/cart/get-cart/${user.userId}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, []);

  

  return (
    <div>
      {/* Display a checkout form */}
      <h2>Checkout</h2>
      <div>
        <h2>Order Summary</h2>
        <p>Hi {user.firstName},</p>
        <p>Thank you for your order. Here is a summary of your purchase:</p>
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem._id}>
              <strong>{cartItem.productId.Name}</strong> - Quantity: {cartItem.quantity}, Total: ${cartItem.totalAmount}
            </li>
          ))}
        </ul>
        <p>Total Amount: ${total}</p>
        <p>We appreciate your business. Have a great day!</p>
      </div>
      <PaymentGateway   cartItems={cartItems}/>
      {checkoutSuccess && (
        <p>Checkout successful! An email has been sent with your order details.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default CheckoutComponent;
