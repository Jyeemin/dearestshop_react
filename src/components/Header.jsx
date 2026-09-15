import "./Header.css";
import { useState, useRef, useContext } from "react";
import { 
    FiSearch,
    FiUser,
    FiHeart,
    FiShoppingBag,
    FiX
} from "react-icons/fi";
import {AuthContext} from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";


const Header = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const {isLogin} = useContext(AuthContext);
    const nav = useNavigate();

const handleSearch = (e) => {

    if (e.key === "Enter") {

        if (searchKeyword.trim() === "") {
            return;
        }

        nav(`/products?keyword=${encodeURIComponent(searchKeyword)}`);
        setSearchKeyword(""); // 검색 후 검색창 비우기
        setIsSearchOpen(false);
    }
};

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
           <Link className="nav-link" to="/products">SHOP ALL</Link>
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
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleSearch}
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
    <FiHeart 
    className="header-wishlist"
    onClick={() => nav('/wishlist')} />
    <FiShoppingBag onClick={() => nav('/cart')} />
</div>

    
</header>
    );
};

export default Header;