import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartComponent from './UserCart';

const CartContainer = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('/cart/get-cart/:userId'); // Replace with the actual API endpoint
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/remove-from-cart/:userId/${productId}`);
      setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return <CartComponent cart={cart} removeFromCart={removeFromCart} />;
};

export default CartContainer;