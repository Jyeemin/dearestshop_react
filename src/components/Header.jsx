import "./Header.css";
import { useState, useRef, useContext, useEffect } from "react";
import { 
    FiSearch,
    FiUser,
    FiHeart,
    FiShoppingBag,
    FiX
} from "react-icons/fi";
import {AuthContext} from "../context/AuthContext";
import {useNavigate, Link, useLocation} from "react-router-dom";
import api from "../axios/api";


const Header = () => {
    const [categories, setCategories] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const {isLogin} = useContext(AuthContext);
    const nav = useNavigate();
    const location = useLocation();


    const getCategories = async() => {
        try{
            const response = await api.get(
                "http://localhost:8080/api/products/category"
            )

            setCategories(response.data.data);
        }catch(error){
            console.error("카테고리 조회 실패", error);
        }
    }

    useEffect(() => {
        getCategories();
    },[]);

const handleSearch = (e) => {

    if (e.key === "Enter") {

        if (searchKeyword.trim() === "") {
            return;
        }
        const params = new URLSearchParams(location.search);
        const categoryId = params.get("categoryId");
        const sort = params.get("sort");
        
        let url = "/products?";

        if (categoryId) {
            url += `categoryId=${categoryId}&`;
        }

        url += `keyword=${encodeURIComponent(searchKeyword)}`;

        if (sort) {
            url += `&sort=${sort}`;
        }

        nav(url);
        
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
          <li className="nav-item"><Link className="nav-link" to="/products?sort=latest">NEW ARRIVALS</Link></li>
           <li className="nav-item"><Link className="nav-link" to="/products?sort=sales">BEST THINGS</Link></li>

         <li className="nav-item dropdown">
           <Link className="nav-link" to="/products">SHOP ALL</Link>
                   <ul className="dropdown-menu">
                    {categories.map(category => (
                        <li key={category.categoryId}>
                            <Link
                                className="dropdown-item"
                                to={`/products?categoryId=${category.categoryId}`}
                            >
                                {category.categoryName}
                            </Link>
                        </li>
                    ))}

                     </ul>
         </li>
                       
                        
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