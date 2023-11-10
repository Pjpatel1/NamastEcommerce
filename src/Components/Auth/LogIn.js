import React, {useEffect,  useState} from "react";
// import GoogleLogin from "react-google-login";
import {Link, useNavigate } from 'react-router-dom';
import "./Auth.css"
import axios from "axios";
import {useUser} from "./UserContext";
function LogIn() {
    const {user, setUser } = useUser(); 
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const navigate = useNavigate();
    const handleSignIn = async (e) =>{
        e.preventDefault();
        try
        {
            const response =  await axios.post('http://ecommerceserver-riu7.onrender.com:10000/signin',{
                Email,
                Password
            });
            if(response.status === 200)
            {
                alert('sign-in Suceessful')
                
                setMessage(response.data.message);
                if(response.data.userId)
                {
                    setUser({
                        loggedIn:true,
                        firstName: response.data.FirstName,
                        userId: response.data.userId,
                    });
                }
                else{
                    console.log("user Id is not received")
                }
                
                navigate("/")

            }
            else if(response.status === 401)
            {
                alert('Ivalid email or password');
            }
            else
            {
                alert('sign in failed. Please try again');
            }
        }
        catch(error)
        {
            console.error("An error occured during sign in", error);
            alert('sign-in failed. Please try again.');
        }
    }
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
            <div className="LSInputs">
                <div>Email</div>
                <input type="text" placeholder="Email" value={Email} onChange = {(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="LSInputs">
                <div>Password</div>
                <input type="Password" placeholder="Password" vlaue={Password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
                <button className='login-btn' onClick={handleSignIn}>
                    Login
                </button>
                <div className="forgotPassowrd">
                   <Link to="/ForgotPassword"> Forgot Password </Link>
                </div>
                <div>
                    <button className="Registerbtn"onClick={handleRedirect}>
                        Create New Account
                    </button>
                </div>
            <div className='alt-login'>
                <div className='facebook'>
                </div>
                <div className='Google'>
                {/* <GoogleLogin className="blue"
                            clientId="79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com"
                            buttonText=""
                            onSuccess={onSuccess}
                            // onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false} // alternative is true, which keeps the user signed in
                            icon={false}    // alt is true, and this puts the google logo on your button, but I don't like it
                            theme="dark"  // alternative is light, which is white
                        /> */}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default LogIn