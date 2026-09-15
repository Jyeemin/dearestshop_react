import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/api";

const AddressAdd = () => {

    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);


    useEffect(() => {

    const getOrder = async () => {

        try{
            const response = await api.get(
                `http://localhost:8080/api/order/${orderId}`
            );

            console.log("주문 정보 조회 결과:", response.data);
            setOrder(response.data.data);

        }catch(error){
            console.error("주문 정보를 불러오는 중 오류가 발생했습니다.", error);
        }
    }
    getOrder();

    }, [orderId]);

    if (!order) {
    return <div>주문 정보를 불러오는 중...</div>;
}
    
    const goToOrderlist = () => {
        navigate("/mypage/orders");
    }
    



    return (
        <div className="order-detail">

        <div className="order-info">
        <h2>주문 정보</h2>
        </div>
        <div className="order-info-table">
            <div className="order-info-row">
                <div className="order-info-label">주문번호</div>
            </div>
            <div className="order-info-value">
                        order ? (
                <div>
                    <p>주문번호</p>
                    <p>{order.orderId}</p>
                </div>
            ) : (
                <p>주문 정보를 불러오는 중입니다.</p>
            )
            </div>
            </div>

            <div className="order-info-row">
                <div className="order-info-label">주문일자</div>
                <div className="order-info-value">
                new Date({ order.orderDate }).toLocaleString()
                </div>
            </div>

            <div className="order-info-row">
                <div className="order-info-label">주문자
                </div>
                <div className="order-info-value">
                    {order.memberName}
                </div>
            </div>

            <div className="order-info-row">
            <div className="order-info-label"> 주문처리상태            </div>
            <div className="order-info-value"> {order.status}
            </div>
            </div>




            <div className="payment-info">
                <h2>결제 정보</h2>
                <div className="payment-info-table">

                </div>
            </div>




            <div className="order-product">
                <h2>주문 상품</h2>
                <div className="order-product-list"></div>
            </div>




            <div className="delivery-info">
                <h2>배송 정보</h2>
                <div className="delivery-info-table"></div>
            </div>





            <div className="order-detail-button">
                <button onClick={goToOrderlist}>
                    주문목록보기
                </button>
            </div>



        </div>






        
    );
};

export default AddressAdd;