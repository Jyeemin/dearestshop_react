import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Members from "./pages/Members";
import ProductCreate from "./pages/ProductCreate";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Address from "./pages/Address";
import Order from "./pages/Order";



function App() {
 
  return (
    <>
       <div className="App Container">
        <Header/>
  
        

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/mypage" element={<MyPage/>}/>
      <Route path="/admin/members" element={<Members/>}/>
      <Route path="/admin/product/new" element={<ProductCreate/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:id" element={<ProductDetail/>}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/Wishlist" element={<Wishlist />}/>
      <Route path ="/Address" element={<Address />}/>
      <Route path ="/Order" element={<Order/>}
/>

      </Routes>

        <Footer/>
      </div>
    

    </>
  )
}

export default App
