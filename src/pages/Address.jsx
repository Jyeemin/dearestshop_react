import { useState } from "react";

const AddressAdd = () => {

    const [zipcode, setZipcode] = useState("");
    const [baseAddress, setBaseAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

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

                setZipcode(data.zonecode);
                setBaseAddress(data.roadAddress);

            }

        }).open();
    };

    return (
        <div>

            <h2>배송지 추가</h2>

            <div>
                <input
                    value={zipcode}
                    readOnly
                    placeholder="우편번호"
                />

                <button onClick={searchAddress}>
                    주소검색
                </button>
            </div>

            <div>
                <input
                    value={baseAddress}
                    readOnly
                    placeholder="기본주소"
                />
            </div>

            <div>
                <input
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="상세주소"
                />
            </div>

        </div>
    );
};

export default AddressAdd;