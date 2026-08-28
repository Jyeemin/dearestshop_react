import { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import "./Products.css";
import { Link } from "react-router-dom";

const Products = () => {

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

                const response = await axios.get(
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


    return (

        <div className="products-container">

            <h1 className="products-title">
                SHOP ALL
            </h1>


            {/* --------------------------------
                ⑦ 상품 9개 출력
            -------------------------------- */}
            <div className="product-grid">

                {currentProducts.map((product) => (

                    <div
                        className="product-card"
                        key={product.productName}
                    >

                        {/* 하트 */}
                        <Link
                            to="/wishlist"
                            className="wishlist-button"
                        >
                            <FiHeart />
                        </Link>


                        {/* 상품 사진 */}
                        <Link to={`/products/${product.productid}`}>
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
                ⑧ 페이지 버튼
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