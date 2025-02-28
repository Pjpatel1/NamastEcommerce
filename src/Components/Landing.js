import SimpleSlider from "./SimpleSlider"
import "../Components/Landing.css"
import CardSlider from "./CardSlider"
import Producttypes from "./Producttypes"
import ContactUS from "./ContactUS"
import HeroSection from "./HeroSection"
import { useEffect } from "react"

function Landing ()
{
    useEffect(() => {
        alert('Welcome! This project may run slow as it is hosted on free server. It is regorusly tested on local environment. It runs perfect!');
      }, []);
    
    return(
        <div className="Cover-sizing">
            <showAlert/>
            <HeroSection/>
            {/* <h2>Featured Products</h2> */}
            {/* <CardSlider/> */}
            <Producttypes/>
            {/* <ContactUS/> */}
        </div>
    )
}
export default Landing