import React from 'react'
import "./ContactUS.css"
import Instalogo from "../Images/instagramLogo.svg"
import Whatsapp from "../Images/Whatsapp.svg";
import FacebookLogo from "../Images/FacebookLogo.svg"
function ConstactUS() {
  return (
    <div className='section3'>
        <div className='Location' id = "Location">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2953.103116038855!2d-82.96567892386165!3d42.25497044173439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b297553d22f39%3A0xebdd6c666b5fb339!2sNAMASTE%20INDIAN%20SUPERMARKET!5e0!3m2!1sen!2sca!4v1698182767268!5m2!1sen!2sca"  
          width="100%" 
          height="100%" 
          style={{border:"0"}} 
          allowfullscreen="" 
          loading="lazy" 
          className='Maps-Location'
          referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className='Details'>
            <div className='Hero_Text'>
                See You Soon !
            </div>
            <div className='Label-ContactUs'>
                Phone number
            </div>
            <div className="LabelInfo">
              +1 (647) 928-6479
            </div>
            <div className='Label-ContactUs'>
                Email
            </div>
            <div className='LabelInfo'>
                Mynamastewindsor@gmail.com
            </div>
            <div className='Label-ContactUs'>
                Address
            </div>
            <div className='LabelInfo'>
                4450 Walker Rd Unit 400, Windsor, ON N8W 3T5
            </div>
            <div className='SocialNetwork'>
              <div className='InstaLogo'>
                <img src={Instalogo} alt='Instagram' className='InstaLogoSvg'/>
              </div>
              <div className='WhatsappLogo'>
                <img src={Whatsapp}alt='Whatsapp' className='whatsappLogoSvg'/>
              </div>
              <div className='FacebookLogo'>
                <img src={FacebookLogo} alt='Facebook' className='FacebookLogoSvg'/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ConstactUS