import logo from './logo.svg';
import './App.css';
import Landing from './Components/Landing';
import Preloader from './Components/Preloader';
import Header from './Components/Header'
import { BrowserRouter, Route, Switch,Routes } from 'react-router-dom';
import NotFoundPage from './Components/Notfoundpage';
import AllItems from "./Components/Categorized/All_Items"
import Drinks from "./Components/Categorized/Drinks";
import Flowers from "./Components/Categorized/Flowers";
import Flyers from "./Components/Categorized/Flyer";
import Frozen from "./Components/Categorized/Frozen";
import IndianSnacks from "./Components/Categorized/IndianSnacks";
import Lentils from "./Components/Categorized/lentils";
import Vegetables from "./Components/Categorized/Vegitables";
import ProductDetails from './Components/ProductDetails';
import LogIn from './Components/Auth/LogIn';
import Signup from './Components/Auth/Signup';
import Forgotpassword from './Components/Auth/Forgotpassword';
import UserCart from './Components/Cart/UserCart';
import { UserProvider } from '../src/Components/Auth/UserContext'; // Import the UserProvider
function App() {
  return (
    <UserProvider>
    <BrowserRouter >
      <Header/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="/"  exact element={<Preloader />}/>
        <Route path='/All_items' element={<AllItems/>} />
        <Route path = '/Drinks' element={<Drinks/>}/>
        <Route path = '/Flowers' element = {<Flowers/>}/>
        <Route path='/Flyers' element = {<Flyers/>} />
        <Route path='/Frozen' element = {<Frozen/>}/>
        <Route path = '/IndianSnacks' element={<IndianSnacks/>}/>
        <Route path='/Lentils' element={<Lentils/>}/>
        <Route path='/Vegetable' element={<Vegetables/>}/>
        <Route path="/ProductDetail" element={<ProductDetails/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/ForgotPassword" element={<Forgotpassword/>}/>
        <Route path="/userCart" element={<UserCart/>}/>
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}
export default App;
