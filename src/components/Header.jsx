import "./Header.css";
import { useState } from "react";
import { 
    FiSearch,
    FiUser,
    FiHeart,
    FiShoppingBag,
    FiX
} from "react-icons/fi";
import { useRef,useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";


const Header = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const {isLogin} = useContext(AuthContext);
    const nav = useNavigate();

    return (
        <header className="navbar navbar-expand-lg my-navbar header">

            <div className="logo">    
                <Link className="navbar-brand" to="/">˚₊‧꒰აDEAREST໒꒱ ‧₊˚</Link>
            </div>


            <nav className="menu">
    <ul className="navbar-nav ml-auto">

         <li className="nav-item active"><Link className="nav-link" to="/">HOME</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/new">NEW ARRIVALS</Link></li>
           <li className="nav-item"><Link className="nav-link" to="/best">BEST THINGS</Link></li>

         <li className="nav-item dropdown">
           <Link className="nav-link" to="/Products">SHOP ALL</Link>
                   <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/shop/tops">TOPS</Link></li>
                        <li><Link className="dropdown-item" to="/shop/bottoms">BOTTOMS</Link></li>
                        <li><Link className="dropdown-item" to="/shop/dresses">DRESSES</Link></li>
                     </ul>
         </li>
                       
                        <li className="nav-item"><Link className="nav-link" to="/contact">CONTACT</Link></li>
                    </ul>
            </nav>

 {isSearchOpen && (<div className="search-bar">
        <span className="search-icon"><FiSearch /></span>
        <span></span>
        <input
            autoFocus
            ref={inputRef}
            type="text"
            placeholder="Search..."
        />
        <FiX
            className="close-icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
    </div>
)}

           
<div className="icons">
    <FiSearch onClick={() => setIsSearchOpen(!isSearchOpen)} />
    <FiUser onClick={() => nav(isLogin ? "/mypage" : "/login")}/>
    <FiHeart onClick={() => nav('/wishlist')} />
    <FiShoppingBag onClick={() => nav('/cart')} />
</div>

    
</header>
    );
};

export default Header;