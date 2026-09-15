import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import "./AdminOrderlist.css";

const AdminOrderlist = () => {

    const navigate = useNavigate();

    // 주문 목록
    const [orders, setOrders] = useState([]);

    // 회원 목록
    const [members, setMembers] = useState([]);

    // 검색 조건
    const [memberId, setMemberId] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    // =========================
    // 회원 목록 가져오기
    // =========================
    const getMembers = async () => {

        try {

            const response = await api.get(
                "http://localhost:8080/api/admin/members"
            );

            console.log("회원 목록:", response.data);

            setMembers(response.data.data || []);

        } catch (error) {

            console.error("회원 목록 조회 실패:", error);

        }
    };


    // =========================
    // 주문 목록 가져오기
    // =========================
    const getOrders = async () => {

        try {

            const params = {};

            // 회원 선택했을 때만 전달
            if (memberId) {
                params.memberId = memberId;
            }

            // 주문 상태 선택했을 때만 전달
            if (orderStatus) {
                params.orderStatus = orderStatus;
            }

            // 시작 날짜
            if (startDate) {
                params.startDate = startDate;
            }

            // 종료 날짜
            if (endDate) {
                params.endDate = endDate;
            }


            const response = await api.get(
                "http://localhost:8080/api/order",
                {
                    params: params
                }
            );

            console.log("주문 목록:", response.data);

            setOrders(response.data.data || []);

        } catch (error) {

            console.error("주문 목록 조회 실패:", error);

        }
    };


    // =========================
    // 처음 페이지에 들어왔을 때
    // =========================
    useEffect(() => {

        getMembers();
        getOrders();

    }, []);


    // =========================
    // 검색 버튼
    // =========================
    const handleSearch = () => {

        getOrders();

    };


    // =========================
    // 주문 상세 페이지 이동
    // =========================
    const handleOrderClick = (orderId) => {

        navigate(`/mypage/orders/${orderId}`);

    };


    // =========================
    // 주문 취소
    // =========================
    const handleCancel = async (orderId) => {

        const result = window.confirm(
            `주문 #${orderId}을(를) 취소하시겠습니까?`
        );

        if (!result) {
            return;
        }


        try {

            const response = await api.patch(
                `http://localhost:8080/api/admin/order/${orderId}/cancel`
            );

            console.log("주문 취소 결과:", response.data);


            // 화면에 바로 반영
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === orderId
                        ? {
                            ...order,
                            status: "CANCEL"
                        }
                        : order
                )
            );


            alert("주문이 취소되었습니다.");

        } catch (error) {

            console.error("주문 취소 실패:", error);

            alert(
                error.response?.data?.message ||
                "주문 취소에 실패했습니다."
            );

        }

    };


    // =========================
    // 주문 완료
    // =========================
    const handleComplete = async (orderId) => {

        const result = window.confirm(
            `주문 #${orderId}을(를) 완료 처리하시겠습니까?`
        );

        if (!result) {
            return;
        }


        try {

            const response = await api.patch(
                `http://localhost:8080/api/admin/order/${orderId}/complete`
            );

            console.log("주문 완료 결과:", response.data);


            // 화면에 바로 반영
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.orderId === orderId
                        ? {
                            ...order,
                            status: "COMPLETE"
                        }
                        : order
                )
            );


            alert("주문이 완료 처리되었습니다.");

        } catch (error) {

            console.error("주문 완료 실패:", error);

            alert(
                error.response?.data?.message ||
                "주문 완료 처리에 실패했습니다."
            );

        }

    };


    // =========================
    // 주문 상태 한글 표시
    // =========================
    const getStatusText = (status) => {

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

        <div className="admin-order-page">


            {/* =========================
                페이지 제목
            ========================= */}
            <div className="admin-order-header">

                <div>

                    <h1>ORDER LIST</h1>

                    <p>
                        전체 주문을 확인하고 관리할 수 있습니다.
                    </p>

                </div>

            </div>


            {/* =========================
                검색 영역
            ========================= */}
            <div className="admin-order-search">


                {/* 회원 검색 */}
                <div className="search-item">

                    <label>회원</label>

                    <select
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                    >

                        <option value="">
                            전체 회원
                        </option>

                        {members.map((member) => (

                            <option
                                key={member.id || member.memberId}
                                value={member.id || member.memberId}
                            >
                                {member.name} ({member.email})
                            </option>

                        ))}

                    </select>

                </div>


                {/* 주문 상태 */}
                <div className="search-item">

                    <label>주문 상태</label>

                    <select
                        value={orderStatus}
                        onChange={(e) =>
                            setOrderStatus(e.target.value)
                        }
                    >

                        <option value="">
                            전체
                        </option>

                        <option value="ORDER">
                            주문 접수
                        </option>

                        <option value="COMPLETE">
                            주문 완료
                        </option>

                        <option value="CANCEL">
                            주문 취소
                        </option>

                    </select>

                </div>


                {/* 시작 날짜 */}
                <div className="search-item">

                    <label>시작일</label>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }
                    />

                </div>


                {/* 종료 날짜 */}
                <div className="search-item">

                    <label>종료일</label>

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(e.target.value)
                        }
                    />

                </div>


                {/* 검색 버튼 */}
                <button
                    className="admin-search-button"
                    onClick={handleSearch}
                >
                    SEARCH
                </button>

            </div>


            {/* =========================
                주문 개수
            ========================= */}
            <div className="admin-order-count">

                총 <strong>{orders.length}</strong>개의 주문

            </div>


            {/* =========================
                주문 목록
            ========================= */}
            <div className="admin-order-list">

                {orders.length === 0 ? (

                    <div className="admin-empty">

                        <p>
                            조회된 주문이 없습니다.
                        </p>

                    </div>

                ) : (

                    orders.map((order) => (

                        <div
                            className={`admin-order ${
                                order.status === "CANCEL"
                                    ? "admin-order-cancel"
                                    : order.status === "COMPLETE"
                                        ? "admin-order-complete"
                                        : ""
                            }`}
                            key={order.orderId}
                            onClick={() =>
                                handleOrderClick(order.orderId)
                            }
                        >


                            {/* =========================
                                주문 상단
                            ========================= */}
                            <div className="admin-order-top">

                                <div className="admin-order-info">

                                    <div className="admin-order-number">

                                        ORDER #

                                        {order.orderId}

                                    </div>

                                    <div className="admin-order-date">

                                        {order.orderDate
                                            ? new Date(
                                                order.orderDate
                                            ).toLocaleString()
                                            : "-"
                                        }

                                    </div>

                                </div>


                                {/* 상태 */}
                                <span
                                    className={`admin-order-status ${
                                        order.status === "CANCEL"
                                            ? "status-cancel"
                                            : order.status === "COMPLETE"
                                                ? "status-complete"
                                                : "status-order"
                                    }`}
                                >

                                    {getStatusText(
                                        order.status
                                    )}

                                </span>

                            </div>


                            {/* =========================
                                회원 정보
                            ========================= */}
                            <div className="admin-member-info">

                                <div>

                                    <span className="info-label">
                                        NAME
                                    </span>

                                    <span>
                                        {order.memberName}
                                    </span>

                                </div>


                                <div>

                                    <span className="info-label">
                                        EMAIL
                                    </span>

                                    <span>
                                        {order.email}
                                    </span>

                                </div>

                            </div>


                            {/* =========================
                                주문 상품
                            ========================= */}
                            <div className="admin-order-items">

                                {order.orderItemDtos &&
                                order.orderItemDtos.length > 0 ? (

                                    order.orderItemDtos.map(
                                        (item) => (

                                            <div
                                                className="admin-order-item"
                                                key={item.orderItemId}
                                            >


                                                {/* 상품 이미지 */}
                                                <div className="admin-item-image">

                                                    {item.thumbnail ? (

                                                        <img
                                                            src={
                                                                item.thumbnail?.startsWith(
                                                                    "http"
                                                                )
                                                                    ? item.thumbnail
                                                                    : `http://localhost:8080${item.thumbnail}`
                                                            }
                                                            alt={
                                                                item.productName
                                                            }
                                                        />

                                                    ) : (

                                                        <div className="no-image">
                                                            NO IMAGE
                                                        </div>

                                                    )}

                                                </div>


                                                {/* 상품 정보 */}
                                                <div className="admin-item-info">

                                                    <strong>
                                                        {
                                                            item.productName
                                                        }
                                                    </strong>

                                                    <span>
                                                        사이즈 :{" "}
                                                        {item.size || "-"}
                                                    </span>

                                                    <span>
                                                        수량 :{" "}
                                                        {item.quantity}
                                                        개
                                                    </span>

                                                </div>


                                                {/* 상품 금액 */}
                                                <div className="admin-item-price">

                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toLocaleString()}
                                                    원

                                                </div>

                                            </div>

                                        )
                                    )

                                ) : (

                                    <div className="admin-no-items">

                                        주문 상품 정보가 없습니다.

                                    </div>

                                )}

                            </div>


                            {/* =========================
                                주문 하단
                            ========================= */}
                            <div className="admin-order-footer">


                                {/* 총 금액 */}
                                <div className="admin-order-total">

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


                                {/* 버튼 영역 */}
                                <div className="admin-order-actions">


                                    {/* 취소 버튼 */}
                                    <button
                                        className="admin-cancel-button"
                                        disabled={
                                            order.status ===
                                                "CANCEL" ||
                                            order.status ===
                                                "COMPLETE"
                                        }
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleCancel(
                                                order.orderId
                                            );

                                        }}
                                    >

                                        {order.status ===
                                        "CANCEL"
                                            ? "주문 취소됨"
                                            : "주문 취소"}

                                    </button>


                                    {/* 완료 버튼 */}
                                    <button
                                        className="admin-complete-button"
                                        disabled={
                                            order.status ===
                                                "CANCEL" ||
                                            order.status ===
                                                "COMPLETE"
                                        }
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleComplete(
                                                order.orderId
                                            );

                                        }}
                                    >

                                        {order.status ===
                                        "COMPLETE"
                                            ? "주문 완료됨"
                                            : "주문 완료"}

                                    </button>


                                    {/* 상세보기 */}
                                    <span
                                        className="admin-detail"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            handleOrderClick(
                                                order.orderId
                                            );

                                        }}
                                    >

                                        주문 상세보기 →

                                    </span>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

};

export default AdminOrderlist;