import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Home from "./pages/Home";

function App() {
 
  return (
    <>
       <div className="App Container">
        <Header/>
  
        

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/account" element={<Account/>}/>
      </Routes>

        <Footer/>
      </div>
    

    </>
  )
}

export default App
