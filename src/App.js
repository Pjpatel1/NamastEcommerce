import logo from './logo.svg';
import './App.css';
import Landing from './Components/Landing';
import Preloader from './Components/Preloader';
import Header from './Components/Header'
import { BrowserRouter, Route, Switch,Routes,Router } from 'react-router-dom';
import CategoryPage from "./Components/Categorized/CategoryPage";
import NotFoundPage from './Components/Notfoundpage';
import AllItems from "./Components/Categorized/All_Items"
import Drinks from "./Components/Categorized/Drinks";
import Flowers from "./Components/Categorized/Flowers";
import Flyers from "./Components/Categorized/Flyer";
import Frozen from "./Components/Categorized/Frozen";
import IndianSnacks from "./Components/Categorized/IndianSnacks";
import Lentils from "./Components/Categorized/lentils";
import Vegetables from "./Components/Categorized/Vegetables";
import ProductDetails from './Components/ProductDetails';
import LogIn from './Components/Auth/LogIn';
import Signup from './Components/Auth/Signup';
import Forgotpassword from './Components/Auth/Forgotpassword';
import UserCart from './Components/Cart/UserCart';
import { UserProvider } from '../src/Components/Auth/UserContext'; // Import the UserProvider
import Addproduct from '../src/Components/AdminPanel/AddProduct';
import CheckoutSuccess from './Components/PaymentGateway/CheckoutSuccess';
import SpecialDeals from './Components/SpecialDeals';
import ProductDetailsPage from './Components/ProductDetails'
function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/my-repo' : '/';
  return (
    <UserProvider>
    <BrowserRouter basename='/Namaste'>
      <Header/>
      <Routes>
        <Route path='/Landing' element={<Landing />} />
        <Route path="/"  exact element={<Preloader />}/>
        <Route path='/All_items' element={<AllItems/>} />
        <Route path="/category/:categoryName" element={<CategoryPage/>} /> 
        <Route path = "/SpecialDeals" element={<SpecialDeals/>}/>
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path = '/Drinks' element={<Drinks/>}/>
        <Route path = '/Flowers' element = {<Flowers/>}/>
        <Route path='/Flyers' element = {<Flyers/>} />
        <Route path='/Frozen' element = {<Frozen/>}/>
        <Route path ='/IndianSnacks' element={<IndianSnacks/>}/>
        <Route path='/Lentils' element={<Lentils/>}/>
        {/* <Route path="//category:categoryName" render={(props) => <Vegetables category={props.match.params.categoryName} />} /> */}
        <Route path="/Vegetables" element={<Vegetables />} />
        <Route path="/ProductDetail" element={<ProductDetails/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/ForgotPassword" element={<Forgotpassword/>}/>
        <Route path="/userCart" element={<UserCart/>}/>
        <Route path="/Addproduct" element={<Addproduct/>}/>
        <Route path="/Checkout-success" element={<CheckoutSuccess/>}/>
        <Route path="/*" element={<NotFoundPage />} />
        
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}
export default App;
