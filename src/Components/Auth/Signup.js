import React, { useState } from 'react'
import "./Auth.css"
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
    // const handleRedirect = () =>
    // {
    //     navigate('/');
    // };

    const [Fname, setFname] = useState();
    const [Lname, setLname] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [Password, setPassword] = useState();
    const [Email, setEmail] = useState();
    const [error, setError] = useState('Okay');

    const isEmailValid = (Email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      return emailRegex.test(Email);
    };
    const isPasswordValid = (Password) =>{
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return passwordRegex.test(Password);
    }
    const handleSignup = async (e) =>
    {
      e.preventDefault();
        if (!Fname || !Lname || !Email || !confirmPassword)
        {
          setError('Please fill in all fields');
          return;
        }
        if(!isEmailValid(Email))
        {
          setError("Please Enter a valid email address.");
          return;
        }
        if(!isPasswordValid(Password))
        {
          setError('Please Enter a Valid password with at least 8 character, including, number, and symbol.');
          return;
        }
      if(Password === confirmPassword)
      {
        
         try{
          //Hosted server
          const response =  await axios.post('https://sampleserver-96f7c60072ed.herokuapp.com/register',{
            FirstName: Fname,
            LastName: Lname,
            Email: Email,
            Password: Password,
          });
          const localresponse =  await axios.post('https://localhost3001:/register',{
            FirstName: Fname,
            LastName: Lname,
            Email: Email,
            Password: Password,
        });

        // This is for local server
        if(localresponse.status === 200)
          {
            alert('User created Successfully go ahead and sign in');
            navigate('/login');
          }
         
          else
          {
            alert('Signup failed. Please try again.');
          }
          //THis is for hosted  server
          if(response.status === 200)
          {
            alert('User created Successfully go ahead and sign in');
            navigate('/login');
          }
         
          else
          {
            alert('Signup failed. Please try again.');
          }
          
         } 
         catch(error)
         {
            if(error.message === "Request failed with status code 400")
            {
              setError("User already exist use different email");
            }
          console.error('Error', error);
          console.log(' An error occured while SigningUp.');
         }
      }
      else
      {
        console.log('Password do not match');
        setError('Passwords do not match.');
        return;
      }
    };
    
  return (
    <div className='LSpage'> 
      <div className='Logincover'>
              <span className="LoginLabel"> Register </span>
              <div className="FLInputs">
                <div className='FName'>
                  <div className='FN-Label'>
                    First Name
                  </div>
                  <input 
                    className="FLName_input" 
                    type="text"
                    placeholder="First-Name"
                    onChange={(e) => setFname(e.target.value)}
                    />
                </div>
                <div className='LName'>   
                  <div className='FN-Label'>
                    Last Name
                  </div>
                  <input
                   className="FLName_input" 
                   type="text"
                   placeholder="Last-Name"
                   onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
             
              <div className="LSInputs">
                  <div>Email</div>
                  <input 
                  type="text" 
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="LSInputs">
                  <div>Password</div>
                  <input type="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                  <div>Confirm Password</div>
                  <input type="Password" placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
              </div>
              <div>
                <Link a to ="/Login">
                  Already have an account
                </Link>
              </div>
              <button className="Registerbtn" onClick={handleSignup} >
                        Sign Up
              </button>
                  
              <p className='text'>
                  Or Signup Using
              </p>
              <div className='alt-login'>
                  <div className='facebook'>
                    Facebook
                  </div>
                  <div className='Google'>
                    Google 
                  </div>
              </div>
            </div>
            <div className='Alerts'>
            <Stack sx={{ width: '100%' }} spacing={3}>
            {(error ==="Please fill in all fields") ?<Alert severity="error">Please fill in all field.</Alert>: null }
            {(error ==="Please Enter a valid email address.") ?<Alert severity="error">Please enter calid email address.</Alert>: null }
            {(error ==="Please Enter a Valid password with at least 8 character, including, number, and symbol.") ?<Alert severity="error">Please Enter a Valid password with at least 8 character, including, number, and symbol.</Alert>: null }
            {(error ==="Passwords do not match.") ?<Alert severity="error">Passwords do not match.</Alert>: null }
            {(error ==="User already exist use different email")?<Alert severity='error'>User already exist use different Email</Alert>:null}
            </Stack>
            </div>
        </div>
  )
}

export default Signup