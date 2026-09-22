import { useEffect, useState } from "react";
import api from "../axios/api";
import "./Address.css";


const Address = () => {

    // ==========================================
    // 배송지 목록
    // ==========================================

    const [addresses, setAddresses] = useState([]);


    // ==========================================
    // 배송지 등록
    // ==========================================

    const [isAdding, setIsAdding] = useState(false);

    const [newZoneCode, setNewZoneCode] = useState("");
    const [newRoadAddress, setNewRoadAddress] = useState("");
    const [newDetailAddress, setNewDetailAddress] = useState("");

    // ⭐ 기본 배송지 선택
    const [newIsDefault, setNewIsDefault] = useState(false);


    // ==========================================
    // 배송지 수정
    // ==========================================

    const [editingAddressId, setEditingAddressId] = useState(null);

    const [editZoneCode, setEditZoneCode] = useState("");
    const [editRoadAddress, setEditRoadAddress] = useState("");
    const [editDetailAddress, setEditDetailAddress] = useState("");

    // ⭐ 수정할 때 기본 배송지 여부
    const [editIsDefault, setEditIsDefault] = useState(false);


    // ==========================================
    // 삭제할 배송지 선택
    // ==========================================

    const [selectedAddressIds, setSelectedAddressIds] = useState([]);


    // ==========================================
    // 배송지 조회
    // ==========================================

    const getAddresses = async () => {

        try {

            const response = await api.get(
                "http://localhost:8080/api/address"
            );

            const addressList = response.data.data || [];

            setAddresses(addressList);

            console.log("주소 조회 성공:", addressList);

        } catch (error) {

            console.error("주소 조회 실패:", error);

        }

    };


    // ==========================================
    // 페이지 처음 열렸을 때
    // ==========================================

    useEffect(() => {

        getAddresses();

    }, []);


    // ==========================================
    // 주소 검색
    // ==========================================

    const searchAddress = (
        setZoneCode,
        setRoadAddress
    ) => {

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
    // 배송지 등록창 열기
    // ==========================================

    const openAddForm = () => {

        setIsAdding(true);

        setNewZoneCode("");
        setNewRoadAddress("");
        setNewDetailAddress("");

        // ⭐ 기본 배송지 여부 초기화
        setNewIsDefault(false);

    };


    // ==========================================
    // 배송지 등록 취소
    // ==========================================

    const cancelAdd = () => {

        setIsAdding(false);

        setNewZoneCode("");
        setNewRoadAddress("");
        setNewDetailAddress("");
        setNewIsDefault(false);

    };


    // ==========================================
    // 배송지 등록
    // ==========================================

    const createAddress = async () => {

        try {

            // 주소 필수값 검사
            if (!newZoneCode || !newRoadAddress) {

                alert("주소를 입력해주세요.");

                return;

            }


            // ⭐ AddressCreateDto와 동일한 이름으로 전송
            const response = await api.post(
                "http://localhost:8080/api/address/add",
                {
                    zoneCode: newZoneCode,
                    roadAddress: newRoadAddress,
                    detailAddress: newDetailAddress,

                    // ⭐ 체크박스 값
                    isDefault: newIsDefault
                }
            );


            console.log(
                "주소 생성 성공:",
                response.data
            );


            alert("배송지가 등록되었습니다.");


            // 등록창 닫기
            cancelAdd();


            // 주소 목록 다시 조회
            await getAddresses();


        } catch (error) {

            console.error("주소 생성 실패:", error);

            alert(
                error.response?.data?.message ||
                "배송지 등록에 실패했습니다."
            );

        }

    };


    // ==========================================
    // 배송지 수정 시작
    // ==========================================

    const startEditAddress = (address) => {

        console.log("수정할 주소:", address);


        setEditingAddressId(address.addressId);

        setEditZoneCode(address.zoneCode);

        setEditRoadAddress(address.roadAddress);

        setEditDetailAddress(address.detailAddress);


        // ⭐ 백엔드의 isDefault 값을 가져옴
        setEditIsDefault(
            address.isDefault ?? false
        );

    };


    // ==========================================
    // 배송지 수정 취소
    // ==========================================

    const cancelEdit = () => {

        setEditingAddressId(null);

        setEditZoneCode("");
        setEditRoadAddress("");
        setEditDetailAddress("");

        setEditIsDefault(false);

    };


    // ==========================================
    // 배송지 수정 저장
    // ==========================================

    const updateAddress = async () => {

        try {

            if (!editZoneCode || !editRoadAddress) {

                alert("주소를 입력해주세요.");

                return;

            }


            // ⭐ 수정 DTO에도 isDefault 전달
            const response = await api.put(
                "http://localhost:8080/api/address/update",
                {
                    addressId: editingAddressId,
                    zoneCode: editZoneCode,
                    roadAddress: editRoadAddress,
                    detailAddress: editDetailAddress,

                    // ⭐ 기본 배송지 여부
                    isDefault: editIsDefault
                }
            );


            console.log(
                "주소 수정 성공:",
                response.data
            );


            alert("배송지가 수정되었습니다.");


            cancelEdit();

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
    // 체크박스 선택
    // ==========================================

    const handleCheckAddress = (addressId) => {

        setSelectedAddressIds((prevIds) => {

            // 이미 선택되어 있으면 제거
            if (prevIds.includes(addressId)) {

                return prevIds.filter(
                    (id) => id !== addressId
                );

            }


            // 선택되어 있지 않으면 추가
            return [
                ...prevIds,
                addressId
            ];

        });

    };


    // ==========================================
    // 선택한 배송지 삭제
    // ==========================================

    const deleteSelectedAddresses = async () => {

        if (selectedAddressIds.length === 0) {

            alert("삭제할 배송지를 선택해주세요.");

            return;

        }


        const result = window.confirm(
            "선택한 배송지를 삭제하시겠습니까?"
        );


        if (!result) {

            return;

        }


        try {

            // 선택한 주소 하나씩 삭제
            for (const addressId of selectedAddressIds) {

                await api.delete(
                    `http://localhost:8080/api/address/delete/${addressId}`
                );

            }


            alert("배송지가 삭제되었습니다.");


            setSelectedAddressIds([]);


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
    // 화면
    // ==========================================

    return (

        <div className="address-container">


            {/* ==========================================
                제목
            ========================================== */}

            <h2 className="address-title">
                배송 주소록 관리
            </h2>


            {/* ==========================================
                배송지 등록 영역
            ========================================== */}

            {isAdding && (

                <div className="address-add-area">

                    <h3>
                        배송지 등록
                    </h3>


                    {/* 우편번호 + 주소검색 */}

                    <div className="address-input-row">

                        <input
                            type="text"
                            value={newZoneCode}
                            readOnly
                            placeholder="우편번호"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                searchAddress(
                                    setNewZoneCode,
                                    setNewRoadAddress
                                )
                            }
                        >
                            주소검색
                        </button>

                    </div>


                    {/* 도로명 주소 */}

                    <input
                        type="text"
                        value={newRoadAddress}
                        readOnly
                        placeholder="기본주소"
                        className="address-input"
                    />


                    {/* 상세주소 */}

                    <input
                        type="text"
                        value={newDetailAddress}
                        onChange={(e) =>
                            setNewDetailAddress(
                                e.target.value
                            )
                        }
                        placeholder="상세주소"
                        className="address-input"
                    />


                    {/* ⭐ 기본 배송지 선택 */}

                    <label className="default-address-check">

                        <input
                            type="checkbox"
                            checked={newIsDefault}
                            onChange={(e) =>
                                setNewIsDefault(
                                    e.target.checked
                                )
                            }
                        />

                        <span>
                            기본 배송지로 설정
                        </span>

                    </label>


                    {/* 등록 / 취소 */}

                    <div className="add-action-buttons">

                        <button
                            type="button"
                            className="save-button"
                            onClick={createAddress}
                        >
                            등록
                        </button>

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={cancelAdd}
                        >
                            취소
                        </button>

                    </div>

                </div>

            )}


            {/* ==========================================
                배송지 목록
            ========================================== */}

            <div className="address-list">

                {addresses.length === 0 ? (

                    <div className="no-address">

                        등록된 배송지가 없습니다.

                    </div>

                ) : (

                    addresses.map((address) => (

                        <div
                            className="address-item"
                            key={address.addressId}
                        >

                            {/* ==================================
                                왼쪽 : 체크박스 + 주소
                            ================================== */}

                            <div className="address-info">

                                <input
                                    type="checkbox"
                                    className="address-checkbox"
                                    checked={
                                        selectedAddressIds.includes(
                                            address.addressId
                                        )
                                    }
                                    onChange={() =>
                                        handleCheckAddress(
                                            address.addressId
                                        )
                                    }
                                />


                                {/* ==================================
                                    일반 주소 화면
                                ================================== */}

                                {editingAddressId !==
                                address.addressId ? (

                                    <div className="address-text">


                                        {/* 주소 이름 */}

                                        <div className="address-name">

                                            {/* ⭐ isDefault가 true이면 기본 표시 */}

                                            {address.isDefault && (

                                                <span className="default-badge">
                                                    기본
                                                </span>

                                            )}

                                            <span>
                                                미지정
                                            </span>

                                        </div>


                                        {/* 주소 */}

                                        <div className="address-main">

                                            <span>
                                                [{address.zoneCode}]
                                            </span>

                                            {" "}

                                            <span>
                                                {address.roadAddress}
                                            </span>

                                            {" "}

                                            <span>
                                                {address.detailAddress}
                                            </span>

                                        </div>


                
                                    </div>


                                ) : (


                                    /* ==================================
                                       배송지 수정 화면
                                    ================================== */

                                    <div className="address-edit-area">

                                        <div className="address-edit-title">

                                            배송지 수정

                                        </div>


                                        {/* 우편번호 */}

                                        <div className="address-input-row">

                                            <input
                                                type="text"
                                                value={editZoneCode}
                                                readOnly
                                                placeholder="우편번호"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    searchAddress(
                                                        setEditZoneCode,
                                                        setEditRoadAddress
                                                    )
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
                                            className="address-input"
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
                                            className="address-input"
                                        />


                                        {/* ⭐ 기본 배송지 수정 */}

                                        <label className="default-address-check">

                                            <input
                                                type="checkbox"
                                                checked={editIsDefault}
                                                onChange={(e) =>
                                                    setEditIsDefault(
                                                        e.target.checked
                                                    )
                                                }
                                            />

                                            <span>
                                                기본 배송지로 설정
                                            </span>

                                        </label>


                                        {/* 저장 / 취소 */}

                                        <div className="edit-action-buttons">

                                            <button
                                                type="button"
                                                className="save-button"
                                                onClick={
                                                    updateAddress
                                                }
                                            >
                                                저장
                                            </button>

                                            <button
                                                type="button"
                                                className="cancel-button"
                                                onClick={
                                                    cancelEdit
                                                }
                                            >
                                                취소
                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>


                            {/* ==================================
                                수정 버튼
                            ================================== */}

                            {editingAddressId !==
                            address.addressId && (

                                <button
                                    type="button"
                                    className="address-edit-button"
                                    onClick={() =>
                                        startEditAddress(
                                            address
                                        )
                                    }
                                >
                                    수정
                                </button>

                            )}

                        </div>

                    ))

                )}

            </div>


            {/* ==========================================
                하단 버튼
            ========================================== */}

            <div className="address-button-area">

                <button
                    type="button"
                    className="address-delete-button"
                    onClick={
                        deleteSelectedAddresses
                    }
                >
                    선택 주소록 삭제
                </button>


                <button
                    type="button"
                    className="address-add-button"
                    onClick={openAddForm}
                >
                    배송지등록
                </button>

            </div>


        </div>

    );

};


export default Address;