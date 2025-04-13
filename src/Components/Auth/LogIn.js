import React, {useEffect,  useState} from "react";
// import GoogleLogin from "react-google-login";
import {Link, useNavigate } from 'react-router-dom';
import "./Auth.css"
import axios from "axios";
import {useUser} from "./UserContext";
import {useGoogleLogin} from '@react-oauth/google'
function LogIn() {
    // const {user, setUser } = useUser(); 
    // const [Email, setEmail] = useState('');
    // const [Password, setPassword] = useState('');
    // const [message, setMessage] = useState('');
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [FirstName, setFirstName] = useState('');
    const navigate = useNavigate();
    const responseGoogle = async (authResult)=>{
        try{
            console.log(authResult)
        }
        catch(err){
            console.log("Error while requesting google code", err);
        }
    }
    const googlelogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow:'auth-code'
    })
    // const handleSignIn = async (e) =>{
    //     e.preventDefault();
    //     try
    //     {
    //         const response =  await axios.post('https://urlnamastebackend.onrender.com/signin',{
    //             Email,
    //             Password
    //         });
    //         if(response.status === 200)
    //         {
    //             // alert('sign-in Suceessful')
                
    //             setMessage(response.data.message);
    //             if(response.data.userId)
    //             {
    //                 setUser({
    //                     loggedIn:true,
    //                     firstName: response.data.FirstName,
    //                     userId: response.data.userId,
    //                     email: response.data.Email
    //                 });
    //             }
    //             else{
    //                 console.log("user Id is not received")
    //             }
                
    //             navigate("/")

    //         }
    //         else if(response.status === 401)
    //         {
    //             alert('Ivalid email or password');
    //         }
    //         else
    //         {
    //             alert('sign in failed. Please try again');
    //         }
    //     }
    //     catch(error)
    //     {
    //         console.error("An error occured during sign in", error);
    //         alert('sign-in failed. Please try again.');
    //     }
    // }
    const handleRedirect = () =>
    {
        navigate('/Signup');
    };
    
    const [popupStyle, showPopup] = useState("hide")
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    const onSuccess = e => {
        alert("User signed in")
        console.log(e)
    }

    // const onFailure = e => {
    //     alert("User sign in Failed")
    //     console.log(e)
    // }
  return (
    <div className="LSpage">
        <div className='Logincover'>
            
               <span className="LoginLabel"> Login </span>
            
                
                <div className='Google'>
                    <button onClick={googlelogin}>Login With Google</button>
                </div>
            </div>
            
        </div>
    
  )
}

export default LogIn