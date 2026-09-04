import { useEffect, useState, useContext } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import "./Products.css";
import { Link } from "react-router-dom";
import api from "../axios/api";
import { AuthContext } from "../context/AuthContext";


const Products = () => {

    const { isLogin } = useContext(AuthContext);

    // --------------------------------
    // ① 상품 전체 저장
    // --------------------------------
    const [products, setProducts] = useState([]);

    // --------------------------------
    // ② 현재 페이지
    // --------------------------------
    const [currentPage, setCurrentPage] = useState(1);

    // 한 페이지에 9개
    const productsPerPage = 9;


    // --------------------------------
    // ③ 현재 페이지의 시작 위치
    // --------------------------------
    const startIndex =
        (currentPage - 1) * productsPerPage;


    // --------------------------------
    // ④ 현재 페이지에서 보여줄 상품
    // --------------------------------
    const currentProducts = products.slice(
        startIndex,
        startIndex + productsPerPage
    );


    // --------------------------------
    // ⑤ 전체 페이지 개수
    // --------------------------------
    const totalPages = Math.ceil(
        products.length / productsPerPage
    );


    // --------------------------------
    // ⑥ Spring에서 상품 가져오기
    // --------------------------------
    useEffect(() => {

        const getProducts = async () => {

            try {

                const response = await api.get(
                    "http://localhost:8080/api/products"
                );

                console.log("상품 목록:", response.data);

                setProducts(response.data.data);

            } catch (error) {

                console.error(
                    "상품 목록 조회 실패:",
                    error
                );

            }

        };

        getProducts();

    }, []);


    // --------------------------------
    // ⑦ 위시리스트 추가 / 삭제
    // --------------------------------
    const handleWishlist = async (product) => {

        //로그인하지않은경우
        if(!isLogin){
            alert("로그인 후 이용해주세요.");
            return;
        }

        try {


            // 아직 찜하지 않은 상품 → 추가
            await api.post(
                `http://localhost:8080/api/wishlist/${product.productId}`
            );

        



         // 화면의 isWishlist 변경
        setProducts((prevProducts) =>
            prevProducts.map((item) =>
                item.productId === product.productId
                    ? {
                        ...item,
                        isWishlist: !item.isWishlist
                    }
                    : item
            )
        );

        } catch (error) {

            console.error(
                "위시리스트 처리 실패:",
                error
            );
                if (error.response) {

        alert(error.response.data.message);

    }

        }

    };


    return (

        <div className="products-container">

            <h1 className="products-title">
                SHOP ALL
            </h1>


            {/* --------------------------------
                ⑧ 상품 9개 출력
            -------------------------------- */}
            <div className="product-grid">

                {currentProducts.map((product) => (

                    <div
                        className="product-card"
                        key={product.productId}
                    >

                        {/* 하트 */}
                        <button
                            className="wishlist-button"
                            onClick={() =>
                                handleWishlist(product)
                            }
                        >
                            <FiHeart
                                fill={
                                    product.isWishlist
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        </button>


                        {/* 상품 사진 */}
                        <Link
                            to={`/products/${product.productId}`}
                        >
                            <img
                                className="product-image"
                                src={`http://localhost:8080${product.thumbnail}`}
                                alt={product.productName}
                            />
                        </Link>


                        {/* 상품 정보 */}
                        <div className="product-info">

                            <p className="product-name">
                                {product.productName}
                            </p>

                            <p className="product-price">
                                ₩{product.price.toLocaleString()}
                            </p>


                            {/* 장바구니 */}
                            <Link
                                to="/cart"
                                className="cart-button"
                            >
                                <FiShoppingBag />
                            </Link>

                        </div>

                    </div>

                ))}

            </div>


            {/* --------------------------------
                ⑨ 페이지 버튼
            -------------------------------- */}
            <div className="pagination">

                {Array.from(
                    { length: totalPages },
                    (_, index) => (

                        <button
                            key={index}
                            onClick={() =>
                                setCurrentPage(index + 1)
                            }
                        >
                            {index + 1}
                        </button>

                    )
                )}

            </div>

        </div>
    );
};

export default Products;