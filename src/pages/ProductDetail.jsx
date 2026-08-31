import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../axios/api";
import { FiHeart } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import "./ProductDetail.css";

const ProductDetail = () => {

    // =================================
    // URL에서 상품 id 가져오기
    // =================================

    const { id } = useParams();

    // 페이지 이동
    const navigate = useNavigate();

    // 로그인 상태 가져오기
    const { isLogin } = useContext(AuthContext);


    // =================================
    // 상태(state)
    // =================================

    // 장바구니 추가 완료 모달
    const [cartModalOpen, setCartModalOpen] = useState(false);

    // 상품 정보
    const [product, setProduct] = useState(null);

    // 선택한 사이즈
    const [selectedSize, setSelectedSize] = useState("");

    // 수량
    const [quantity, setQuantity] = useState(1);


    // =================================
    // 상품 상세 조회
    // =================================

    useEffect(() => {

        const getProduct = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:8080/api/products/${id}`
                );

                console.log("상품 상세:", response.data);

                setProduct(response.data.data);

            } catch (error) {

                console.error(
                    "상품 상세 조회 실패:",
                    error
                );

            }

        };

        getProduct();

    }, [id]);


    // =================================
    // 상품을 아직 불러오지 않았을 때
    // =================================

    if (!product) {

        return (
            <div className="product-detail-loading">
                상품을 불러오는 중...
            </div>
        );

    }


    // =================================
    // 수량 감소
    // =================================

    const decreaseQuantity = () => {

        // 수량이 1보다 클 때만 감소
        if (quantity > 1) {

            setQuantity(quantity - 1);

        }

    };


    // =================================
    // 수량 증가
    // =================================

    const increaseQuantity = () => {

        setQuantity(quantity + 1);

    };


    // =================================
    // 총 가격
    // =================================

    const totalPrice = product.price * quantity;


    // =================================
    // 장바구니 추가
    // =================================
// 장바구니 추가
const handleAddCart = async () => {

    // 로그인 확인
    if (!isLogin) {

        alert("로그인 이후 상품을 추가해주세요.");

        navigate("/login");

        return;
    }


    // 사이즈 선택 확인
    if (!selectedSize) {

        alert("사이즈를 선택해주세요.");

        return;
    }


    // Spring으로 보낼 데이터
    const cartData = {

        productId: product.productId,

        quantity: quantity,

        size: selectedSize

    };
    console.log(product.id);

    console.log("장바구니 전송 데이터:", cartData);


    try {

        const response = await api.post(
            "http://localhost:8080/api/products/cart",
            cartData
        );


        console.log(
            "장바구니 추가 성공:",
            response.data
        );


        // 장바구니 추가 완료 모달
        setCartModalOpen(true);


    } catch (error) {

        console.error(
            "장바구니 추가 실패:",
            error
        );


        // 로그인 인증 실패
        if (
            error.response?.status === 401 ||
            error.response?.status === 403
        ) {

            alert("로그인이 필요합니다.");

            navigate("/login");

            return;
        }


        alert("장바구니 추가에 실패했습니다.");

    }

};

    // =================================
    // 장바구니로 이동
    // =================================

    const goToCart = () => {

        setCartModalOpen(false);

        navigate("/cart");

    };


    // =================================
    // 계속 쇼핑하기
    // =================================

    const continueShopping = () => {

        setCartModalOpen(false);

        navigate("/products");

    };


    // =================================
    // 화면
    // =================================

    return (

        <div className="product-detail">


            {/* =================================
                왼쪽 : 상품 이미지
            ================================= */}

            <div className="product-detail-image">

                {product.urls.map((url, index) => (

                    <img
                        key={index}
                        src={`http://localhost:8080${url}`}
                        alt={product.productName}
                    />

                ))}

            </div>



            {/* =================================
                오른쪽 : 상품 정보
            ================================= */}

            <div className="product-detail-info">


                {/* =================================
                    상품명 + 찜
                ================================= */}

                <div className="product-detail-title">

                    <h1>
                        {product.productName}
                    </h1>

                    <button className="detail-wishlist">

                        <FiHeart />

                    </button>

                </div>



                {/* =================================
                    가격
                ================================= */}

                <p className="detail-price">

                    ₩{product.price.toLocaleString()}

                </p>



                {/* =================================
                    상품 설명
                ================================= */}

                <div className="detail-description">

                    <p>
                        {product.detailDescription}
                    </p>

                </div>



                {/* =================================
                    사이즈
                ================================= */}

                <div className="detail-option">

                    <p className="option-title">
                        size
                    </p>


                    <div className="size-options">

                        {product.size.map((size) => (

                            <button
                                type="button"
                                key={size}
                                className={
                                    selectedSize === size
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedSize(size)
                                }
                            >

                                {size}

                            </button>

                        ))}

                    </div>

                </div>



                {/* =================================
                    수량
                ================================= */}

                <div className="quantity-option">

                    <p className="option-title">
                        quantity
                    </p>


                    <div className="quantity-box">

                        <button
                            type="button"
                            onClick={decreaseQuantity}
                        >
                            -
                        </button>


                        <span>
                            {quantity}
                        </span>


                        <button
                            type="button"
                            onClick={increaseQuantity}
                        >
                            +
                        </button>

                    </div>

                </div>



                {/* =================================
                    총 가격
                ================================= */}

                <div className="total-price">

                    <span>
                        TOTAL
                    </span>

                    <strong>
                        ₩{totalPrice.toLocaleString()}
                    </strong>

                </div>



                {/* =================================
                    장바구니 / 바로구매 버튼
                ================================= */}

                <div className="detail-buttons">

                    <button
                        type="button"
                        onClick={handleAddCart}
                        className="add-cart-button"
                    >
                        ADD TO CART
                    </button>


                    <button
                        type="button"
                        className="buy-button"
                    >
                        BUY NOW
                    </button>

                </div>



                {/* =================================
                    상품 안내
                ================================= */}

                <div className="product-guide">


                    <div className="guide-item">

                        <span>
                            PRODUCT INFO
                        </span>

                        <span>
                            +
                        </span>

                    </div>


                    <div className="guide-item">

                        <span>
                            SHIPPING INFO
                        </span>

                        <span>
                            +
                        </span>

                    </div>


                    <div className="guide-item">

                        <span>
                            EXCHANGE & RETURN
                        </span>

                        <span>
                            +
                        </span>

                    </div>


                </div>


            </div>



            {/* =================================
                장바구니 추가 완료 모달
            ================================= */}

            {cartModalOpen && (

                <div className="cart-modal-overlay">

                    <div className="cart-modal">

                        <h2>
                            장바구니에 추가되었습니다.
                        </h2>

                        <p>
                            선택하신 상품을 장바구니에 담았습니다.
                        </p>


                        <div className="cart-modal-buttons">

                            <button
                                type="button"
                                onClick={goToCart}
                                className="cart-modal-cart"
                            >
                                장바구니 가기
                            </button>


                            <button
                                type="button"
                                onClick={continueShopping}
                                className="cart-modal-shopping"
                            >
                                계속 쇼핑하기
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default ProductDetail;