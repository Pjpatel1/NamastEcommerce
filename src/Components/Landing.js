import SimpleSlider from "./SimpleSlider"
import "../Components/Landing.css"
import CardSlider from "./CardSlider"
import Producttypes from "./Producttypes"
import ContactUS from "./ContactUS"
function Landing ()
{
    return(
        <div className="Cover-sizing">
            <SimpleSlider></SimpleSlider>
            <Producttypes/>
            <CardSlider/>
            <ContactUS/>
        </div>
    )
}
export default Landing