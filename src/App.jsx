import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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
import OrderComplete from "./pages/OrderComplete";
import OrderList from "./pages/Orderlist";
import OrderDetail from "./pages/OrderDetail";
import AdminOrderlist from "./pages/AdminOrderlist";



function App() {
 
  return (
    <>
    <ScrollToTop />
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
      <Route path ="/Order" element={<Order/>}/>
      <Route path="/order-complete/:orderId"element={<OrderComplete />}/>
      <Route path="/mypage/orders"
    element={
        localStorage.getItem("role") === "ADMIN"
            ? <AdminOrderlist />
            : <OrderList />
    }
/>
      <Route path="/mypage/orders/:orderId" element={<OrderDetail />}

/>

      </Routes>

        <Footer/>
      </div>
    

    </>
  )
}

export default App
