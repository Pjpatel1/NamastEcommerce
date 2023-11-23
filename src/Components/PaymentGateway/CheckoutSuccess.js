import { React, useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios';

function CheckoutSuccess() {
  const [cartItems, setCartItems] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchDataAndSendEmail = async () => {
      try {
        const userEmail = sessionStorage.getItem('userEmail');
        const userName = sessionStorage.getItem('UserName');
        console.log('User Email:', userEmail);
        console.log('User ID:', userId);

        // Fetch cart data
        const response = await axios.get(`https://urlnamastebackend.onrender.com/cart/get-cart/${userId}`);
        setCartItems(response.data);

        const YOUR_PUBLIC_KEY = 'zN3BEdbJO4r82HoOC';
        const serviceId = 'service_ti205t8';
        const templateId = 'template_pdd0ssd';
        emailjs.init(YOUR_PUBLIC_KEY);

        // Format the product
        const formattedProducts = cartItems.map((cartItem) => (
          `- ${cartItem.productId.Name} x${cartItem.quantity}: $${cartItem.totalAmount}`
        )).join('\n');
        // Calculate total
        const calculateTotalAmount = () => {
          let total = 0;
          cartItems.forEach((cartItem) => {
            total += cartItem.totalAmount;
          });
          return total.toFixed(2);
        };
        const total = calculateTotalAmount();
        const recipientEmail = userEmail;
        // Template to send email
        const templateParams = {
          user_name: userName,
          order_id: userId,
          products: formattedProducts,
          total_price: total,
          to_email: recipientEmail,
        };

        // Send email
        console.log(recipientEmail, templateParams);
        console.log('Public Key:', YOUR_PUBLIC_KEY);
        console.log('Recipient Email:', recipientEmail);
        console.log("I am looking for deleting the code");

        const deleteResponse = await axios.delete(`/cart/remove-checked-out/${userId}`);
        console.log('Delete Cart Response:', deleteResponse.data);
        if (deleteResponse.status === 200) {
          // Additional logic after successful deletion
          // ...
        } else {
          console.error('Failed to delete cart items. Status Code:', deleteResponse.status);
        }
        const emailResponse = await emailjs.send(serviceId, templateId, templateParams, YOUR_PUBLIC_KEY, recipientEmail);
        console.log('Email sent successfully:', emailResponse);
        // Additional actions after successful checkout...
        //Removeing cart Items from the database after completion of checkout.
        // await.axios.delete(``);
      
        //I want to remove the session.
      

      } catch (error) {
        console.error('Error in fetchDataAndSendEmail:', error);
        // alert("Please enter the Correct email registered with gmail.com to receive the bill.");

        // Check if error.response is defined and has status information
        if (error.response && error.response.status) {
          console.error('Status Code:', error.response.status);
        } else {
          console.error('Unknown error occurred:', error);
        }
      }
    };

    fetchDataAndSendEmail();
  }, []);

  return (

    <>
    <h2>Checkout Success</h2>
    <h5> If you have logged in with gmail Registered email you will recive Mail</h5>
    </>
  );
}

export default CheckoutSuccess;
