import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/api";
import "./OrderDetail.css";

const OrderDetail = () => {

    // URL에서 orderId 가져오기
    const { orderId } = useParams();

    // 페이지 이동
    const navigate = useNavigate();

    // 주문 상세 정보
    const [order, setOrder] = useState(null);


    // 주문 상세 조회
    useEffect(() => {

        const getOrder = async () => {

            try {

                const response = await api.get(
                    `http://localhost:8080/api/order/${orderId}`
                );

                console.log(
                    "주문 상세 조회 결과:",
                    response.data
                );

                setOrder(response.data.data);

            } catch (error) {

                console.error(
                    "주문 정보를 불러오는 중 오류가 발생했습니다.",
                    error
                );

            }

        };

        getOrder();

    }, [orderId]);


    // 주문목록으로 이동
    const goToOrderList = () => {
        navigate("/mypage/orders");
    };


    // 아직 주문 정보를 받아오지 못한 경우
    if (!order) {
        return (
            <div className="order-detail-loading">
                주문 정보를 불러오는 중입니다.
            </div>
        );
    }


    return (
        <div className="order-detail">


            {/* =====================================
                1. 주문 정보
            ===================================== */}
            <div className="order-detail-section">

                <div className="order-detail-title">
                    <h2>주문 정보</h2>
                </div>


                <div className="order-detail-table">

                    {/* 주문번호 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            주문번호
                        </div>

                        <div className="order-detail-value">
                            {order.orderId}
                        </div>

                    </div>


                    {/* 주문일자 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            주문일자
                        </div>

                        <div className="order-detail-value">
                            {new Date(order.orderDate).toLocaleString("ko-KR")}
                        </div>

                    </div>


                    {/* 주문자 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            주문자
                        </div>

                        <div className="order-detail-value">
                            {order.memberName}
                        </div>

                    </div>


                    {/* 주문처리상태 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            주문처리상태
                        </div>

                        <div className="order-detail-value">
                            {order.status}
                        </div>

                    </div>

                </div>

            </div>



            {/* =====================================
                2. 결제 정보
            ===================================== */}
            <div className="order-detail-section">

                <div className="order-detail-title">
                    <h2>결제 정보</h2>
                </div>


                <div className="order-detail-table">

                    {/* 총 주문금액 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            총 주문금액
                        </div>

                        <div className="order-detail-value">
                            {order.totalPrice.toLocaleString()}원
                        </div>

                    </div>


                    {/* 총 배송비 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            총 배송비
                        </div>

                        <div className="order-detail-value">
                            3,000원
                        </div>

                    </div>


                    {/* 총 결제금액 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            총 결제금액
                        </div>

                        <div className="order-detail-value order-total-price">
                            {(order.totalPrice + 3000).toLocaleString()}원
                        </div>

                    </div>

                </div>

            </div>



            {/* =====================================
                3. 주문 상품
            ===================================== */}
            <div className="order-detail-section">

                <div className="order-detail-title">
                    <h2>주문 상품</h2>
                </div>


                <div className="order-product-list">

                    {order.orderItemDtos.map((item) => (

                        <div
                            className="order-product-item"
                            key={item.orderItemId}
                        >

                            {/* 상품 이미지 */}
                            <div className="order-product-image">

                                <img
                                    src={
                                        item.thumbnail?.startsWith("http")
                                            ? item.thumbnail
                                            : `http://localhost:8080${item.thumbnail || ""}`
                                    }
                                    alt={item.productName}
                                />

                            </div>


                            {/* 상품 정보 */}
                            <div className="order-product-info">

                                <h3>
                                    {item.productName}
                                </h3>

                                <p>
                                    SIZE : {item.size}
                                </p>

                                <p>
                                    상품금액 : {item.price.toLocaleString()}원
                                </p>

                                <p>
                                    수량 : {item.quantity}개
                                </p>

                                <p className="order-product-price">
                                    {(item.price * item.quantity).toLocaleString()}원
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>



            {/* =====================================
                4. 배송 정보
            ===================================== */}
            <div className="order-detail-section">

                <div className="order-detail-title">
                    <h2>배송 정보</h2>
                </div>


                <div className="order-detail-table">

                    {/* 받으시는 분 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            받으시는 분
                        </div>

                        <div className="order-detail-value">
                            {order.receiverName}
                        </div>

                    </div>


                    {/* 우편번호 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            우편번호
                        </div>

                        <div className="order-detail-value">
                            {order.newAddress?.zoneCode}
                        </div>

                    </div>


                    {/* 주소 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            주소
                        </div>

                        <div className="order-detail-value">
                            {order.newAddress?.roadAddress}
                            {" "}
                            {order.newAddress?.detailAddress}
                        </div>

                    </div>



                    {/* 배송메시지 */}
                    <div className="order-detail-row">

                        <div className="order-detail-label">
                            배송메시지
                        </div>

                        <div className="order-detail-value">
                            {order.deliveryMessage || "-"}
                        </div>

                    </div>

                </div>

            </div>



            {/* =====================================
                5. 주문 목록 버튼
            ===================================== */}
            <div className="order-detail-button">

                <button onClick={goToOrderList}>
                    주문목록보기
                </button>

            </div>


        </div>
    );
};

export default OrderDetail;