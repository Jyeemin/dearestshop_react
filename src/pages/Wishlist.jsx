import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import api from "../axios/api";
import "./Wishlist.css";


const Wishlist = () => {

    // ========================================
    // ① 위시리스트 상품
    // ========================================
    const [wishlistItems, setWishlistItems] = useState([]);


    // ========================================
    // ② 로딩 상태
    // ========================================
    const [loading, setLoading] = useState(true);


    // ========================================
    // ③ 페이지 이동
    // ========================================
    const navigate = useNavigate();


    // ========================================
    // ④ 위시리스트 조회
    // ========================================
    useEffect(() => {

        const getWishlist = async () => {

            try {

                const response = await api.get("/api/wishlist");

                console.log(
                    "위시리스트 조회 결과:",
                    response.data
                );

                setWishlistItems(response.data.data);

            } catch (error) {

                console.error(
                    "위시리스트 조회 실패:",
                    error
                );


                // 서버에서 에러가 발생한 경우
                if (error.response) {

                    alert(
                        error.response.data.message ||
                        "위시리스트를 불러오지 못했습니다."
                    );


                    // 로그인하지 않은 경우
                    if (error.response.status === 400) {

                        navigate("/login");

                    }

                } else {

                    // 서버 자체와 연결되지 않은 경우
                    alert("서버와 연결할 수 없습니다.");

                }

            } finally {

                setLoading(false);

            }

        };


        // 위시리스트 조회 실행
        getWishlist();

    }, [navigate]);


    // ========================================
    // ⑤ 위시리스트에서 상품 삭제
    // ========================================
    const removeWishlist = async (productId) => {

        try {

            // toggleWishlist 실행
            //
            // 현재 위시리스트에 있는 상품이므로
            // Spring에서는 "삭제"가 실행됨
            await api.post(`api/wishlist/${productId}`);


            // 서버에서 삭제가 성공했으므로
            // React 화면에서도 해당 상품을 제거
            setWishlistItems((prevItems) =>
                prevItems.filter(
                    (item) => item.productId !== productId
                )
            );


        } catch (error) {

            console.error(
                "위시리스트 삭제 실패:",
                error
            );


            if (error.response) {

                alert(
                    error.response.data.message ||
                    "위시리스트 삭제에 실패했습니다."
                );

            }

        }

    };


    // ========================================
    // ⑥ 상품 상세페이지 이동
    // ========================================
    const goProductDetail = (productId) => {

        navigate(`/products/${productId}`);

    };


    // ========================================
    // ⑦ 로딩 중
    // ========================================
    if (loading) {

        return (

            <div className="wishlist-loading">
                Loading...
            </div>

        );

    }


    // ========================================
    // ⑧ 화면
    // ========================================
    return (

        <div className="wishlist-page">


            {/* ==================================
                상단 제목
            ================================== */}

            <div className="wishlist-header">

                <h1>
                    WISHLIST
                </h1>


                <p className="wishlist-count">
                    {wishlistItems.length} items
                </p>


                <p className="wishlist-login-text">

                    To save your wishlist please{" "}

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        login
                    </span>

                    {" "}or{" "}

                    <span
                        onClick={() =>
                            navigate("/join")
                        }
                    >
                        sign up
                    </span>.

                </p>

            </div>


            {/* ==================================
                위시리스트 상품
            ================================== */}

            {wishlistItems.length === 0 ? (

                // ==================================
                // 위시리스트가 비어있을 때
                // ==================================

                <div className="wishlist-empty">

                    <p>
                        Your wishlist is empty.
                    </p>


                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        SHOP ALL
                    </button>

                </div>


            ) : (

                // ==================================
                // 위시리스트 상품이 있을 때
                // ==================================

                <div className="wishlist-container">

                    {wishlistItems.map((item) => (

                        <div
                            className="wishlist-item"
                            key={item.productId}
                        >


                            {/* ==========================
                                상품 이미지
                            ========================== */}

                            <div className="wishlist-image-wrapper">

                                <img
                                    src={`http://localhost:8080${item.thumbnail}`}
                                    alt={item.productName}
                                    onClick={() =>
                                        goProductDetail(
                                            item.productId
                                        )
                                    }
                                />


                                {/* ======================
                                    위시리스트 하트
                                ====================== */}

                                <button
                                    className="wishlist-heart"
                                    onClick={() =>
                                        removeWishlist(
                                            item.productId
                                        )
                                    }
                                >

                                    <FaHeart />

                                </button>

                            </div>


                            {/* ==========================
                                상품 정보
                            ========================== */}

                            <div className="wishlist-info">

                                <p
                                    className="wishlist-product-name"
                                    onClick={() =>
                                        goProductDetail(
                                            item.productId
                                        )
                                    }
                                >
                                    {item.productName}
                                </p>


                                <p className="wishlist-price">
                                    ₩
                                    {item.price.toLocaleString()}
                                </p>

                            </div>


                            {/* ==========================
                                장바구니 버튼
                            ========================== */}

                            <button
                                className="wishlist-cart-button"
                                onClick={() =>
                                    goProductDetail(
                                        item.productId
                                    )
                                }
                            >
                                add to cart
                            </button>


                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};


export default Wishlist;