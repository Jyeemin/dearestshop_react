import { useNavigate, useParams } from "react-router-dom";
import "./OrderComplete.css";

const OrderComplete = () => {

    const navigate = useNavigate();

    // URL에서 주문번호 가져오기
    const { orderId } = useParams();

    const handleOrderConfirm = () => {
        navigate("/mypage/orders");
    };

    const handleContinueShopping = () => {
        navigate("/");
    };

    return (
        <div className="order-complete">

            <div className="order-complete-box">

                <h1>주문이 완료되었습니다!</h1>

                <div className="order-heart">
                    ♡
                </div>

                <div className="order-number-title">
                    주문번호
                </div>

                <div className="order-number">
                    {orderId}
                </div>

                <p className="order-thanks">
                    주문해주셔서 감사합니다.
                </p>

                <div className="order-complete-buttons">

                    <button
                        className="order-confirm-btn"
                        onClick={handleOrderConfirm}
                    >
                        주문 확인하기
                    </button>

                    <button
                        className="continue-shopping-btn"
                        onClick={handleContinueShopping}
                    >
                        쇼핑 계속하기
                    </button>

                </div>

            </div>

        </div>
    );
};

export default OrderComplete;