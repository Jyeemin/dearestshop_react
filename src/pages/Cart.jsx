import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { AuthContext } from "../context/AuthContext";
import "./Cart.css";

const Cart = () => {

    const navigate = useNavigate();

    const { isLogin } = useContext(AuthContext);

    // 장바구니 상품
    const [cartItems, setCartItems] = useState([]);

    // 로딩
    const [loading, setLoading] = useState(true);


    // ================================
    // 장바구니 조회
    // ================================

    useEffect(() => {

        // 로그인하지 않았다면 로그인 페이지로 이동
        if (!isLogin) {

            alert("로그인이 필요한 서비스입니다.");

            navigate("/login");

            return;
        }


        const getCart = async () => {

            try {

                const response = await api.get(
                    "http://localhost:8080/api/products/cart/cartlist"
                );

                console.log("장바구니:", response.data);

                setCartItems(response.data.data);

            } catch (error) {

                console.error(
                    "장바구니 조회 실패:",
                    error
                );


                // JWT 만료 또는 인증 실패
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {

                    alert("로그인이 필요합니다.");

                    navigate("/login");

                }

            } finally {

                setLoading(false);

            }

        };


        getCart();

    }, [isLogin, navigate]);


    // ================================
    // 전체 상품 금액
    // ================================

    const totalPrice = cartItems.reduce(
        (total, item) => {

            return total + (
                item.price * item.quantity
            );

        },
        0
    );


    // ================================
    // 상품 개별 금액
    // ================================

    const getItemPrice = (item) => {

        return item.price * item.quantity;

    };


    // ================================
    // 로딩
    // ================================

    if (loading) {

        return (
            <div className="cart-loading">
                장바구니를 불러오는 중...
            </div>
        )

    }

    //상품 변경 함수
    const updateQuantity = async (cartItemId, quantity) => {

        try{
            await api.patch(
                `http://localhost:8080/api/products/cart/${cartItemId}`,
                JSON.stringify(quantity),
                 {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            );

                   setCartItems((prevItems) =>
                    prevItems.map((item) =>
                    item.cartItemId === cartItemId
                    ? {
                        ...item,
                        quantity:quantity
                    } : item)
        );

        }catch(error){
            console.error("수량 변경 실패" + error);
        }

 
    }

    //상품 삭제 함수

    const deleteCartItem = async (cartItemId) => {
        try{
            await api.delete(
                `http://localhost:8080/api/products/cart/${cartItemId}`
            );

            setCartItems((prevItems) =>
                prevItems.filter(
                    (item) => item.cartItemId !== cartItemId)
                );
                console.log("장바구니 상품 삭제 성공");
        }catch(error){
            console.error("상품 삭제 실패" + error);
        }
        
    }


    // ================================
    // 장바구니 화면
    // ================================

    return (

        <div className="cart-page">


            {/* =================================
                제목
            ================================= */}

            <h1 className="cart-title">
                SHOPPING BAG
            </h1>


            {/* 상품 개수 */}

            <p className="cart-count">
                일반상품 ({cartItems.length})
            </p>


            {/* =================================
                장바구니 상품
            ================================= */}

            {cartItems.length === 0 ? (

                <div className="empty-cart">

                    <p>
                        장바구니가 비어있습니다.
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                    >
                        CONTINUE SHOPPING
                    </button>

                </div>

            ) : (

                <div className="cart-list">


                    {cartItems.map((item) => (

                        <div
                            className="cart-item"
                            key={`${item.productId}-${item.productSize}`}
                        >


                            {/* =================================
                                상품 이미지
                            ================================= */}

                            <div className="cart-item-image">

                                <img
                                    src={`http://localhost:8080${item.imgUrl}`}
                                    alt={item.productName}
                                />

                            </div>


                            {/* =================================
                                상품 정보
                            ================================= */}

                            <div className="cart-item-info">

                                <h2>
                                    {item.productName}
                                </h2>


                                <p className="cart-item-price">

                                    ₩{item.price.toLocaleString()}

                                </p>


                                <p className="cart-item-option">

                                    SIZE : {item.productSize}

                                </p>


                            </div>


                            {/* =================================
                                수량
                            ================================= */}

                            <div className="cart-item-quantity">

                                <button
                                onClick={() => {
                                    if(item.quantity > 1){
                                        updateQuantity(item.cartItemId, item.quantity - 1);
                                    }
                                }}>
                                    -
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                                    +
                                </button>

                            </div>


                            {/* =================================
                                상품 총 금액
                            ================================= */}

                            <div className="cart-item-total">

                                ₩{getItemPrice(item).toLocaleString()}
                                <button
                                className="delete-cart-button"
                                onClick={() => deleteCartItem(item.cartItemId)}>
                                    x
                                </button>

                            </div>


                        </div>

                    ))}


                </div>

            )}


            {/* =================================
                장바구니 금액
            ================================= */}

            {cartItems.length > 0 && (

                <div className="cart-summary">


                    <div className="summary-item">

                        <span>
                            총 상품금액
                        </span>

                        <strong>
                            ₩{totalPrice.toLocaleString()}
                        </strong>

                    </div>


                    <div className="summary-item">

                        <span>
                            총 배송비
                        </span>

                        <strong>
                            ₩3,000
                        </strong>

                    </div>


                    <div className="summary-item total">

                        <span>
                            결제 예정 금액
                        </span>

                        <strong>
                            ₩{(totalPrice + 3000).toLocaleString()}
                        </strong>

                    </div>


                </div>

            )}


            {/* =================================
                버튼
            ================================= */}

            {cartItems.length > 0 && (

                <div className="cart-buttons">


                    <button
                        className="continue-button"
                        onClick={() => navigate("/products")}
                    >
                        CONTINUE SHOPPING
                    </button>


                    <button
                        className="order-button"
                        onClick={() => {
                            navigate("/Order",
                                {
                                    state:{
                                        cartItems : cartItems
                                    }
                                }

                            );
                        }}
                    >
                        ORDER
                    </button>


                </div>

            )}

        </div>

    );

};

export default Cart;