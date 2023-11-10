import React from 'react'
import "./Auth.css"
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
  const navigate = useNavigate();

    const handleRedirect = () =>
    {
        navigate('/');
    };
  return (
    <div className='LSpage'>
      <div className='Logincover'>
              <span className="LoginLabel"> Forgot Password </span>
              
             
              <div className="LSInputs">
                  <div>Email</div>
                  <input type="text" placeholder="Email"/>
              </div>
              <div className="LSInputs">
                  <div>Password</div>
                  <input type="Password" placeholder="Password"/>
                  <div>Confirm Password</div>
                  <input type="Password" placeholder="Password"/>
              </div>
                
              <button className="Registerbtn"onClick={handleRedirect}>
                        Verify
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
        </div>
  )
}

export default ForgotPassword