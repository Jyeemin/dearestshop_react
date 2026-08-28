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

      </Routes>

        <Footer/>
      </div>
    

    </>
  )
}

export default App
