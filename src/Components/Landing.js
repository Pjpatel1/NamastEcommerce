import SimpleSlider from "./SimpleSlider"
import "../Components/Landing.css"
import CardSlider from "./CardSlider"
import Producttypes from "./Producttypes"
import ContactUS from "./ContactUS"
import HeroSection from "./HeroSection"

function Landing ()
{
    return(
        <div className="Cover-sizing">
            <HeroSection/>
            {/* <h2>Featured Products</h2> */}
            {/* <CardSlider/> */}
            <Producttypes/>
            <ContactUS/>
        </div>
    )
}
export default Landing