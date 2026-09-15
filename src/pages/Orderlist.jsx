import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import "./Orderlist.css";

const OrderList = () => {

    // =========================================
    // 주문 목록
    // =========================================

    const [orders, setOrders] = useState([]);


    // =========================================
    // 페이지 이동
    // =========================================

    const navigate = useNavigate();


    // =========================================
    // 주문 전체 조회
    // =========================================

    const getOrders = async () => {

        try {

            const response = await api.get(
                "http://localhost:8080/api/order"
            );

            console.log(
                "주문 전체 조회 결과:",
                response.data
            );


            // 주문 목록 저장
            setOrders(
                response.data.data || []
            );

        } catch (error) {

            console.error(
                "주문 조회 실패:",
                error
            );

        }

    };


    // =========================================
    // 페이지가 처음 열릴 때 주문 조회
    // =========================================

    useEffect(() => {

        getOrders();

    }, []);


    // =========================================
    // 주문 상세 페이지 이동
    // =========================================

    const handleOrderClick = (orderId) => {

        navigate(
            `/mypage/orders/${orderId}`
        );

    };


    // =========================================
    // 주문 상태 한글 표시
    // =========================================

    const getOrderStatusText = (status) => {

        if (status === "ORDER") {
            return "주문 접수";
        }

        if (status === "COMPLETE") {
            return "주문 완료";
        }

        if (status === "CANCEL") {
            return "주문 취소";
        }

        return status;

    };


    return (

        <div className="member-order-list-page">


            {/* =========================================
                페이지 제목
            ========================================= */}

            <div className="member-order-list-title">

                <h2>
                    ORDER HISTORY
                </h2>

                <p>
                    주문 내역
                </p>

            </div>


            {/* =========================================
                주문이 없는 경우
            ========================================= */}

            {orders.length === 0 ? (

                <div className="member-no-order">

                    <p>
                        주문 내역이 없습니다.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        쇼핑하러 가기
                    </button>

                </div>

            ) : (


                /* =========================================
                   주문 목록
                ========================================= */

                <div className="member-order-list">


                    {orders.map((order) => (

                        <div
                            className="member-order-card"
                            key={order.orderId}
                            onClick={() =>
                                handleOrderClick(
                                    order.orderId
                                )
                            }
                        >


                            {/* =========================================
                                주문 상단
                            ========================================= */}

                            <div className="member-order-header">


                                {/* 주문번호 + 날짜 */}

                                <div className="member-order-header-left">

                                    <span className="member-order-number">

                                        ORDER #
                                        {order.orderId}

                                    </span>


                                    <span className="member-order-date">

                                        {order.orderDate
                                            ? new Date(
                                                order.orderDate
                                            ).toLocaleDateString(
                                                "ko-KR"
                                            )
                                            : "-"
                                        }

                                    </span>

                                </div>


                                {/* =========================================
                                    주문 상태
                                ========================================= */}

                                <span
                                    className={`member-order-status ${
                                        order.status === "COMPLETE"
                                            ? "member-status-complete"
                                            : order.status === "CANCEL"
                                                ? "member-status-cancel"
                                                : "member-status-order"
                                    }`}
                                >

                                    {getOrderStatusText(
                                        order.status
                                    )}

                                </span>

                            </div>


                            {/* =========================================
                                주문 상품들
                            ========================================= */}

                            <div className="member-order-items">


                                {order.orderItemDtos &&
                                order.orderItemDtos.length > 0 ? (

                                    order.orderItemDtos.map(
                                        (item) => (

                                            <div
                                                className="member-order-item"
                                                key={
                                                    item.orderItemId
                                                }
                                            >


                                                {/* =========================================
                                                    상품 이미지
                                                ========================================= */}

                                                <div className="member-order-item-image">

                                                    <img
                                                        src={
                                                            item.thumbnail?.startsWith(
                                                                "http"
                                                            )
                                                                ? item.thumbnail
                                                                : `http://localhost:8080${
                                                                    item.thumbnail || ""
                                                                }`
                                                        }
                                                        alt={
                                                            item.productName
                                                        }
                                                    />

                                                </div>


                                                {/* =========================================
                                                    상품 정보
                                                ========================================= */}

                                                <div className="member-order-item-info">

                                                    <h3>
                                                        {
                                                            item.productName
                                                        }
                                                    </h3>


                                                    <p>
                                                        SIZE :{" "}
                                                        {item.size || "-"}
                                                    </p>


                                                    <p>

                                                        {(
                                                            item.price || 0
                                                        ).toLocaleString()}

                                                        원 ×{" "}

                                                        {item.quantity}

                                                    </p>

                                                </div>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <div className="member-order-no-items">

                                        주문 상품 정보가 없습니다.

                                    </div>

                                )}

                            </div>


                            {/* =========================================
                                주문 하단
                            ========================================= */}

                            <div className="member-order-footer">


                                {/* 총 주문금액 */}

                                <div className="member-order-total">

                                    <span>
                                        총 주문금액
                                    </span>

                                    <strong>

                                        {(
                                            order.totalPrice || 0
                                        ).toLocaleString()}

                                        원

                                    </strong>

                                </div>


                                {/* 주문 상세보기 */}

                                <span className="member-order-detail-link">

                                    주문 상세보기 →

                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default OrderList;