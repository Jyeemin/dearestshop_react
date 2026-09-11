import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios/api";
import "./Order.css";

const Order = () => {

    const location = useLocation();
    const navigate = useNavigate();


    // ==========================================
    // 주문 상품
    // ==========================================

    const [orderItems, setOrderItems] = useState(
        location.state?.cartItems || []
    );


    // ==========================================
    // 배송지
    // ==========================================

    // 회원이 저장한 배송지 전체
    const [addresses, setAddresses] = useState([]);

    // 현재 선택한 배송지 ID
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // 배송지 화면
    // recent = 최근 배송지
    // list = 배송지 목록
    // direct = 직접입력
    const [addressView, setAddressView] = useState("recent");


    // ==========================================
    // 직접 입력 배송지
    // ==========================================

    const [zoneCode, setZoneCode] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    // 기본 배송지로 저장할지
    const [isDefault, setIsDefault] = useState(false);


    // ==========================================
    // 주소 수정
    // ==========================================

    // 현재 수정 중인 주소 ID
    const [editingAddressId, setEditingAddressId] = useState(null);

    // 수정용 입력값
    const [editZoneCode, setEditZoneCode] = useState("");
    const [editRoadAddress, setEditRoadAddress] = useState("");
    const [editDetailAddress, setEditDetailAddress] = useState("");
    const [editIsDefault, setEditIsDefault] = useState(false);


    // ==========================================
    // 배송 메시지
    // ==========================================

    const [deliveryMessage, setDeliveryMessage] = useState("");


    // ==========================================
    // 받는 사람
    // ==========================================

    const [receiverName, setReceiverName] = useState("");


    // ==========================================
    // 결제수단
    // ==========================================

    const [paymentMethod, setPaymentMethod] = useState("card");


    // ==========================================
    // 주소 조회
    // ==========================================

const getAddresses = async () => {

    try {

        const response = await api.get("http://localhost:8080/api/address");

        const addressList = response.data.data || [];

        setAddresses(addressList);

    } catch (error) {

        console.error("주소 조회 실패:", error);

    }

};
    // ==========================================
    // 처음 페이지가 열렸을 때 주소 조회
    // ==========================================

useEffect(() => {

    getAddresses();

}, []);

    // ==========================================
    // 최근 배송지
    // ==========================================

    const recentAddress =
        addresses.length > 0
            ? addresses[0]
            : null;


    // ==========================================
    // 주소 검색
    // ==========================================

    const searchAddress = () => {

        console.log("주소검색 버튼 클릭!");
        console.log("window.daum:", window.daum);


        if (!window.daum) {

            alert("주소 검색 서비스를 불러오지 못했습니다.");

            return;

        }


        new window.daum.Postcode({

            oncomplete: function (data) {

                console.log("선택한 주소:", data);

                setZoneCode(data.zonecode);

                setRoadAddress(data.roadAddress);

            }

        }).open();

    };


    // ==========================================
    // 수정용 주소 검색
    // ==========================================

    const searchEditAddress = () => {

        if (!window.daum) {

            alert("주소 검색 서비스를 불러오지 못했습니다.");

            return;

        }


        new window.daum.Postcode({

            oncomplete: function (data) {

                setEditZoneCode(data.zonecode);

                setEditRoadAddress(data.roadAddress);

            }

        }).open();

    };


    // ==========================================
    // 배송지 선택
    // ==========================================

    const selectAddress = (addressId) => {

        setSelectedAddressId(addressId);

    };


    // ==========================================
    // 주소 수정 시작
    // ==========================================

    const startEditAddress = (address) => {

            console.log("전체 address 객체:", address);
    console.log("isDefault:", address.isDefault);
    console.log("default:", address.default);
    console.log("defaultAddress:", address.defaultAddress);
        // 현재 수정 중인 주소 ID
        setEditingAddressId(address.addressId);

        // 기존 주소 내용을 수정창에 넣기
        setEditZoneCode(address.zoneCode);
        setEditRoadAddress(address.roadAddress);
        setEditDetailAddress(address.detailAddress);
        setEditIsDefault(address.default);
        

    };


    // ==========================================
    // 주소 수정 취소
    // ==========================================

    const cancelEditAddress = () => {

        setEditingAddressId(null);

        setEditZoneCode("");
        setEditRoadAddress("");
        setEditDetailAddress("");
        setEditIsDefault(false);

    };


    // ==========================================
    // 주소 수정 저장
    // ==========================================

    const updateAddress = async () => {

        try {

            if (!editZoneCode || !editRoadAddress) {

                alert("주소를 입력해주세요.");

                return;

            }


            const response = await api.put(
                "http://localhost:8080/api/address/update",
                {
                    addressId: editingAddressId,
                    zoneCode: editZoneCode,
                    roadAddress: editRoadAddress,
                    detailAddress: editDetailAddress,
                    isDefault: editIsDefault
                }
            );


            console.log(
                "주소 수정 완료:",
                response.data.data
            );


            alert("배송지가 수정되었습니다.");


            // 수정창 닫기
            cancelEditAddress();


            // 주소 목록 다시 조회
            await getAddresses();


        } catch (error) {

            console.error("주소 수정 실패:", error);

            alert(
                error.response?.data?.message ||
                "배송지 수정에 실패했습니다."
            );

        }

    };


    // ==========================================
    // 주소 삭제
    // ==========================================

    const deleteAddress = async (addressId) => {

        const result = window.confirm(
            "정말 이 배송지를 삭제하시겠습니까?"
        );


        if (!result) {

            return;

        }


        try {

            const response = await api.delete(
                `http://localhost:8080/api/address/delete/${addressId}`
            );


            console.log(
                "주소 삭제 완료:",
                response.data.data
            );


            alert("배송지가 삭제되었습니다.");


            // 삭제한 주소가 현재 선택된 주소라면
            if (selectedAddressId === addressId) {

                setSelectedAddressId(null);

            }


            // 주소 목록 다시 조회
            await getAddresses();


        } catch (error) {

            console.error("주소 삭제 실패:", error);

            alert(
                error.response?.data?.message ||
                "배송지 삭제에 실패했습니다."
            );

        }

    };


    // ==========================================
    // 주문상품 삭제
    // ==========================================

    const deleteOrderItem = (index) => {

        const newOrderItems = orderItems.filter(
            (_, i) => i !== index
        );

        setOrderItems(newOrderItems);

    };


    // ==========================================
    // 상품 총 금액
    // ==========================================

    const productTotal = orderItems.reduce(
        (total, item) => {

            const price = Number(item.price || 0);

            const quantity = Number(item.quantity || 1);

            return total + price * quantity;

        },
        0
    );


    // ==========================================
    // 배송비
    // ==========================================

    const deliveryFee = 3000;


    // ==========================================
    // 할인
    // ==========================================

    const discount = 0;


    // ==========================================
    // 최종 결제 금액
    // ==========================================

    const finalPrice =
        productTotal + deliveryFee - discount;


    // ==========================================
    // 새 주소 저장
    // ==========================================

    const createNewAddress = async () => {

        try {

            const response = await api.post(
                "http://localhost:8080/api/address/add"
                ,
                {
                    zoneCode: zoneCode,
                    roadAddress: roadAddress,
                    detailAddress: detailAddress,
                    isDefault: isDefault
                }
            );


            // 서버에서 생성된 addressId
            const newAddressId = response.data.data;

            return newAddressId;

        } catch (error) {

            console.error("주소 추가 실패:", error);

            alert(
                error.response?.data?.message ||
                "주소 추가에 실패했습니다."
            );

            return null;

        }

    };


    // ==========================================
    // 주문하기
    // ==========================================

    const handleOrder = async () => {

        try {

            let addressId = selectedAddressId;


            // ----------------------------------
            // 직접입력 배송지
            // ----------------------------------

            if (addressView === "direct") {

                if (!zoneCode || !roadAddress) {

                    alert("주소를 입력해주세요.");

                    return;

                }


                if (!receiverName) {

                    alert("받는 사람을 입력해주세요.");

                    return;

                }


                // 직접 입력한 주소를 회원 주소로 저장
                addressId = await createNewAddress();


                if (!addressId) {

                    return;

                }

            }


            // ----------------------------------
            // 받는 사람 확인
            // ----------------------------------

            if (!receiverName) {

                alert("받는 사람을 입력해주세요.");

                return;

            }


            // ----------------------------------
            // 배송지 확인
            // ----------------------------------

            if (!addressId) {

                alert("배송지를 선택해주세요.");

                return;

            }


            // ----------------------------------
            // 주문상품 확인
            // ----------------------------------

            if (orderItems.length === 0) {

                alert("주문할 상품이 없습니다.");

                return;

            }


            // ----------------------------------
            // 주문상품 ID
            // ----------------------------------

            const orderItemIds = orderItems.map(
                (item) => item.cartItemId
            );


            // ----------------------------------
            // 주문 생성
            // ----------------------------------

            const response = await api.post(
                "http://localhost:8080/api/order"
                ,
                {
                    addressId: addressId,
                    receiverName: receiverName,
                    deliveryMessage: deliveryMessage,
                    orderItemIds: orderItemIds
                }
            );


            const orderId = response.data.data;


            console.log("주문 완료:", orderId);


            navigate(`/order-complete/${orderId}`);


        } catch (error) {

            console.error("주문 실패:", error);

            alert(
                error.response?.data?.message ||
                "주문에 실패했습니다."
            );

        }

    };


    // ==========================================
    // 가격 콤마
    // ==========================================

    const formatPrice = (price) => {

        return Number(price).toLocaleString("ko-KR");

    };


    // ==========================================
    // 화면
    // ==========================================

    return (

        <div className="order-page">

            <div className="order-container">


                {/* ==================================================
                    1. 배송지
                ================================================== */}

                <section className="order-section">

                    <div className="section-title">

                        <h2>배송지</h2>

                        <span className="section-arrow">
                            ⌃
                        </span>

                    </div>


                    {/* ==================================================
                        배송지 버튼
                    ================================================== */}

                    <div className="address-top">

                        <div className="address-buttons">

                            {/* 최근 배송지 */}

                            <button
                                type="button"
                                className={
                                    addressView === "recent"
                                        ? "address-tab active"
                                        : "address-tab"
                                }
                                onClick={() => {

                                    setAddressView("recent");

                                    if (recentAddress) {

                                        setSelectedAddressId(
                                            recentAddress.addressId
                                        );

                                    }

                                }}
                            >
                                최근 배송지
                            </button>


                            {/* 직접입력 */}

                            <button
                                type="button"
                                className={
                                    addressView === "direct"
                                        ? "address-tab active"
                                        : "address-tab"
                                }
                                onClick={() => {

                                    setAddressView("direct");

                                    setSelectedAddressId(null);

                                }}
                            >
                                직접입력
                            </button>

                        </div>


                        {/* 배송지 목록 */}

                        <button
                            type="button"
                            className="address-list-button"
                            onClick={() => {

                                setAddressView("list");

                            }}
                        >
                            배송지 목록
                        </button>

                    </div>


                    {/* ==================================================
                        최근 배송지
                    ================================================== */}

                    {addressView === "recent" && (

                        <div className="recent-address-area">

                            {recentAddress ? (

                                <div
                                    className={
                                        selectedAddressId ===
                                        recentAddress.addressId
                                            ? "recent-address selected"
                                            : "recent-address"
                                    }
                                    onClick={() =>
                                        selectAddress(
                                            recentAddress.addressId
                                        )
                                    }
                                >

                                    <input
                                        type="radio"
                                        name="recentAddress"
                                        checked={
                                            selectedAddressId ===
                                            recentAddress.addressId
                                        }
                                        onChange={() =>
                                            selectAddress(
                                                recentAddress.addressId
                                            )
                                        }
                                    />


                                    <div className="recent-address-info">

                                        <div className="recent-address-title">

                                            {recentAddress.isDefault && (
                                                <span className="default-label">
                                                    [기본]
                                                </span>
                                            )}

                                            {recentAddress.roadAddress}

                                        </div>


                                        <div className="recent-address-text">

                                            [
                                            {recentAddress.zoneCode}
                                            ]{" "}
                                            {recentAddress.detailAddress}

                                        </div>

                                    </div>

                                </div>

                            ) : (

                                <div className="no-address">

                                    최근 배송지가 없습니다.

                                </div>

                            )}

                        </div>

                    )}


                    {/* ==================================================
                        배송지 목록
                    ================================================== */}

                    {addressView === "list" && (

                        <div className="address-list-area">

                            {addresses.length === 0 ? (

                                <div className="no-address">

                                    등록된 배송지가 없습니다.

                                </div>

                            ) : (

                                addresses.map((address) => (

                                    <div
                                        className="saved-address-wrapper"
                                        key={address.addressId}
                                    >

                                        {/* ==============================
                                            수정 중이 아닐 때
                                        ============================== */}

                                        {editingAddressId !==
                                        address.addressId ? (

                                            <div
                                                className={
                                                    selectedAddressId ===
                                                    address.addressId
                                                        ? "saved-address selected"
                                                        : "saved-address"
                                                }
                                                onClick={() =>
                                                    selectAddress(
                                                        address.addressId
                                                    )
                                                }
                                            >

                                                <input
                                                    type="radio"
                                                    name="savedAddress"
                                                    checked={
                                                        selectedAddressId ===
                                                        address.addressId
                                                    }
                                                    onChange={() =>
                                                        selectAddress(
                                                            address.addressId
                                                        )
                                                    }
                                                />


                                                <div className="saved-address-info">

                                                    <div className="address-main">

                                                        {address.default && (
                                                            <span className="default-label">
                                                                [기본]
                                                            </span>
                                                        )}

                                                        {address.roadAddress}

                                                    </div>


                                                    <div className="address-detail">

                                                        [
                                                        {address.zoneCode}
                                                        ]{" "}
                                                        {address.detailAddress}

                                                    </div>

                                                </div>


                                                {/* 수정 / 삭제 버튼 */}

                                                <div className="address-action-buttons">

                                                    <button
                                                        type="button"
                                                        className="address-edit-button"
                                                        onClick={(e) => {

                                                            e.stopPropagation();

                                                            startEditAddress(
                                                                address
                                                            );

                                                        }}
                                                    >
                                                        수정
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="address-delete-button"
                                                        onClick={(e) => {

                                                            e.stopPropagation();

                                                            deleteAddress(
                                                                address.addressId
                                                            );

                                                        }}
                                                    >
                                                        삭제
                                                    </button>

                                                </div>

                                            </div>

                                        ) : (

                                            /* ==============================
                                               주소 수정창
                                            ============================== */

                                            <div className="address-edit-area">

                                                <div className="address-edit-title">
                                                    배송지 수정
                                                </div>


                                                {/* 우편번호 */}

                                                <div className="edit-zipcode-row">

                                                    <input
                                                        type="text"
                                                        value={editZoneCode}
                                                        readOnly
                                                        placeholder="우편번호"
                                                    />


                                                    <button
                                                        type="button"
                                                        onClick={
                                                            searchEditAddress
                                                        }
                                                    >
                                                        주소검색
                                                    </button>

                                                </div>


                                                {/* 도로명 주소 */}

                                                <input
                                                    type="text"
                                                    value={editRoadAddress}
                                                    readOnly
                                                    placeholder="기본주소"
                                                    className="edit-address-input"
                                                />


                                                {/* 상세주소 */}

                                                <input
                                                    type="text"
                                                    value={editDetailAddress}
                                                    onChange={(e) =>
                                                        setEditDetailAddress(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="상세주소"
                                                    className="edit-address-input"
                                                />


                                                {/* 기본 배송지 */}

                                                <label className="edit-default-check">

                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            editIsDefault
                                                        }
                                                        onChange={(e) =>
                                                            setEditIsDefault(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />

                                                    기본 배송지

                                                </label>


                                                {/* 저장 / 취소 */}

                                                <div className="edit-action-buttons">

                                                    <button
                                                        type="button"
                                                        className="edit-save-button"
                                                        onClick={
                                                            updateAddress
                                                        }
                                                    >
                                                        저장
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="edit-cancel-button"
                                                        onClick={
                                                            cancelEditAddress
                                                        }
                                                    >
                                                        취소
                                                    </button>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                ))

                            )}

                        </div>

                    )}


                    {/* ==================================================
                        직접 입력
                    ================================================== */}

                    {addressView === "direct" && (

                        <div className="new-address-area">


                            {/* 받는 사람 */}

                            <div className="form-row">

                                <label>
                                    받는사람 <span>*</span>
                                </label>


                                <input
                                    type="text"
                                    value={receiverName}
                                    onChange={(e) =>
                                        setReceiverName(
                                            e.target.value
                                        )
                                    }
                                    placeholder="받는 사람"
                                />

                            </div>


                            {/* 주소 */}

                            <div className="form-row">

                                <label>
                                    주소 <span>*</span>
                                </label>


                                <div className="address-input-area">


                                    {/* 우편번호 */}

                                    <div className="zipcode-row">

                                        <input
                                            type="text"
                                            value={zoneCode}
                                            readOnly
                                            placeholder="우편번호"
                                        />


                                        <button
                                            type="button"
                                            onClick={searchAddress}
                                        >
                                            주소검색
                                        </button>

                                    </div>


                                    {/* 도로명 주소 */}

                                    <input
                                        type="text"
                                        value={roadAddress}
                                        readOnly
                                        placeholder="기본주소"
                                    />


                                    {/* 상세주소 */}

                                    <input
                                        type="text"
                                        value={detailAddress}
                                        onChange={(e) =>
                                            setDetailAddress(
                                                e.target.value
                                            )
                                        }
                                        placeholder="나머지 주소(선택 입력 가능)"
                                    />

                                </div>

                            </div>


                            {/* 기본 배송지 */}

                            <label className="default-address-check">

                                <input
                                    type="checkbox"
                                    checked={isDefault}
                                    onChange={(e) =>
                                        setIsDefault(
                                            e.target.checked
                                        )
                                    }
                                />

                                기본 배송지로 저장

                            </label>

                        </div>

                    )}


                    {/* ==================================================
                        배송 메시지
                    ================================================== */}

                    <select
                        className="delivery-message"
                        value={deliveryMessage}
                        onChange={(e) =>
                            setDeliveryMessage(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            -- 메시지 선택 (선택사항) --
                        </option>

                        <option value="배송 전에 연락해주세요.">
                            배송 전에 연락해주세요.
                        </option>

                        <option value="문 앞에 놓아주세요.">
                            문 앞에 놓아주세요.
                        </option>

                        <option value="경비실에 맡겨주세요.">
                            경비실에 맡겨주세요.
                        </option>

                    </select>

                </section>



                {/* ==================================================
                    2. 주문상품
                ================================================== */}

                <section className="order-section">

                    <div className="section-title">

                        <h2>주문상품</h2>

                        <span className="section-arrow">
                            ⌃
                        </span>

                    </div>


                    <div className="order-items">

                        {orderItems.length === 0 ? (

                            <p className="empty-order">
                                주문할 상품이 없습니다.
                            </p>

                        ) : (

                            orderItems.map((item, index) => (

                                <div
                                    className="order-item"
                                    key={
                                        item.cartItemId ||
                                        item.productId ||
                                        index
                                    }
                                >

                                    {/* 상품 이미지 */}

                                    <div className="order-item-image">

                                        <img
                                            src={
                                                item.thumbnail?.startsWith(
                                                    "http"
                                                )
                                                    ? item.imgUrl
                                                    : `http://localhost:8080${
                                                        item.imgUrl || ""
                                                    }`
                                            }
                                            alt={item.productName}
                                        />

                                    </div>


                                    {/* 상품 정보 */}

                                    <div className="order-item-info">

                                        <p className="product-name">

                                            {item.productName}

                                        </p>


                                        <p className="product-quantity">

                                            수량:{" "}
                                            {item.quantity || 1}
                                            개

                                        </p>


                                        <strong>

                                            ₩
                                            {formatPrice(
                                                Number(
                                                    item.price || 0
                                                ) *
                                                Number(
                                                    item.quantity || 1
                                                )
                                            )}

                                        </strong>

                                    </div>


                                    {/* 삭제 */}

                                    <button
                                        type="button"
                                        className="delete-order-item"
                                        onClick={() =>
                                            deleteOrderItem(index)
                                        }
                                    >
                                        ×
                                    </button>

                                </div>

                            ))

                        )}

                    </div>


                    {/* 배송비 */}

                    <div className="delivery-price">

                        <span>
                            배송비
                        </span>

                        <strong>
                            ₩{formatPrice(deliveryFee)}
                        </strong>

                    </div>

                </section>



                {/* ==================================================
                    3. 결제정보
                ================================================== */}

                <section className="order-section payment-summary">

                    <div className="section-title">

                        <h2>결제정보</h2>

                        <span className="section-arrow">
                            ⌃
                        </span>

                    </div>


                    <div className="price-row">

                        <span>
                            주문상품
                        </span>

                        <strong>
                            ₩{formatPrice(productTotal)}
                        </strong>

                    </div>


                    <div className="price-row">

                        <span>
                            배송비
                        </span>

                        <strong>
                            +₩{formatPrice(deliveryFee)}
                        </strong>

                    </div>


                    <div className="price-row discount-row">

                        <span>
                            할인/부가결제
                        </span>

                        <strong>
                            -₩{formatPrice(discount)}
                        </strong>

                    </div>


                    <div className="final-price">

                        <span>
                            최종 결제 금액
                        </span>

                        <strong>
                            ₩{formatPrice(finalPrice)}
                        </strong>

                    </div>

                </section>



                {/* ==================================================
                    4. 결제수단
                ================================================== */}

                <section className="order-section payment-method-section">

                    <div className="section-title">

                        <h2>
                            결제수단
                        </h2>

                        <span className="section-arrow">
                            ⌃
                        </span>

                    </div>


                    {/* 최근 결제수단 */}

                    <div className="payment-option">

                        <label>

                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={
                                    paymentMethod === "card"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            최근 결제수단

                        </label>


                        {paymentMethod === "card" && (

                            <div className="selected-payment">

                                신용카드

                            </div>

                        )}

                    </div>


                    {/* 다른 결제수단 */}

                    <div className="payment-option">

                        <label>

                            <input
                                type="radio"
                                name="payment"
                                value="other"
                                checked={
                                    paymentMethod === "other"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            다른 결제수단 선택

                        </label>

                    </div>


                    <div className="payment-notice">

                        - 소액 결제의 경우 PG사 정책에 따라
                        결제 금액 제한이 있을 수 있습니다.

                    </div>


                    <label className="save-payment">

                        <input
                            type="checkbox"
                            defaultChecked
                        />

                        결제수단과 입력정보를 다음에도 사용

                    </label>

                </section>



                {/* ==================================================
                    5. 적립혜택
                ================================================== */}

                <section className="order-section point-section">

                    <div className="point-title">

                        <span>
                            적립 혜택
                        </span>

                        <span>
                            0원{" "}
                            ⌄
                        </span>

                    </div>

                </section>



                {/* ==================================================
                    6. 결제하기
                ================================================== */}

                <button
                    type="button"
                    className="order-submit-btn"
                    onClick={handleOrder}
                >

                    ₩{formatPrice(finalPrice)} 결제하기

                </button>



                {/* ==================================================
                    하단 안내
                ================================================== */}

                <div className="order-notice">

                    <p>
                        - 무이자할부가 적용되지 않은 상품과
                        무이자할부가 가능한 상품을 동시에 구매할 경우
                        전체 주문상품 금액에 대해 무이자할부가
                        적용되지 않습니다.
                    </p>

                    <p>
                        - 최소 결제 가능 금액은 결제금액에서
                        배송비를 제외한 금액입니다.
                    </p>

                </div>

            </div>

        </div>

    );

};

export default Order;