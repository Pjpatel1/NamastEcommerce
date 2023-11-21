import axios from "axios";
import React from 'react'
import {useUser} from '../Auth/UserContext'
function PaymentGateway({cartItems}) {
    const {user} = useUser();
    const handleCheckout = () =>{
        console.log(cartItems);
        console.log(user.userId);
        const userId = user.userId;
        axios.post(`https://urlnamastebackend.onrender.com/api/stripe/create-checkout-session`,{
            cartItems,
            userId,
        }).then((res)=>{
            if(res.data.url)
            {
                window.location.href = res.data.url
            }

        }).catch((err)=> console.log(err.message))
    };
  return (
    <div>
        <button onClick={()=>handleCheckout()}>Pay Now</button>
    </div>
  )
}

export default PaymentGateway