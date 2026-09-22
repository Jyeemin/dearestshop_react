import { NavLink, useNavigate } from "react-router-dom";
import "./MyPage.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../axios/api";

const MyPage = () => {
    
    const {member, setIsLogin, setMember } = useContext(AuthContext);
    const[orders, setOrders] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const getOrders = async() => {
            try{
                const response = await api.get(
                    "http://localhost:8080/api/order/my"
                );

                setOrders(response.data.data);
                console.log("member:", member);
            }catch(error){
                console.error("주문 조회 실패:", error);
            }

        };

        getOrders();

    },[]);


    const totalPrice = orders.filter(order => order.status !== "CANCEL")
    .reduce(
        (sum, order) => sum + order.totalPrice,0
    );

    const totalOrderCount = orders.length;

    const readyCount = orders.filter(order => order.status === "ORDER").length;

    const completeCount = orders.filter(order => order.status === "COMPLETE").length;

    const cancelCount = orders.filter(order => order.status ==="CANCEL").length;
    // --------------------------------
    // 현재 로그인한 회원의 권한 가져오기
    // --------------------------------
    const role = localStorage.getItem("role");

    return (

        <div className="mypage">

            {/* ================================
                왼쪽 메뉴
            ================================= */}

            <aside className="mypage-sidebar">

                {/* ACCOUNT */}

                <NavLink
                    to="/mypage"
                    className={({ isActive }) =>
                        isActive
                            ? "sidebar-title active"
                            : "sidebar-title"
                    }
                >
                    ACCOUNT
                </NavLink>


                <div className="sidebar-menu">

                    {/* ORDER HISTORY */}

                    <NavLink
                        to="/mypage/orders"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        ORDER HISTORY
                    </NavLink>


                    {/* VIEW ADDRESSES */}

                    <NavLink
                        to="/Address"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        VIEW ADDRESSES
                    </NavLink>


                    {/* WISHLIST */}

                    <NavLink
                        to="/Wishlist"
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        WISHLIST
                    </NavLink>




                    {/* =================================
                        관리자 메뉴

                        role이 ADMIN인 경우에만 표시
                    ================================= */}

                    {role === "ADMIN" && (
                        <>

                            {/* 회원 관리 */}

                            <NavLink
                                to="/admin/members"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                MEMBERS
                            </NavLink>


                            {/* 상품 등록 */}

                            <NavLink
                                to="/admin/product/new"
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                NEW PRODUCT
                            </NavLink>

                        </>
                    )}


                    {/* LOG OUT */}

                    <div
                        className="logout"
                        onClick={() => {

                            // JWT 삭제
                            localStorage.removeItem("accesstoken");

                            // 권한 삭제
                            localStorage.removeItem("role");

                            localStorage.removeItem("memberName");

                            // React 로그인 상태 변경
                            setIsLogin(false);

                            // 회원 정보 삭제
                            setMember(null);

                            // 메인 페이지로 이동
                            navigate("/");
                        }}
                    >
                        LOG OUT
                    </div>

                </div>

            </aside>


            {/* ================================
                오른쪽 내용
            ================================= */}

            <main className="mypage-content">

                {/* ================================
                    회원 정보
                ================================= */}

                <section className="mypage-header">

                    <h1>MY PAGE</h1>


<div className="member-info">

    <p>
        <strong>Welcome to DEAREST.</strong>
    </p>

    <p>
        {member?.memberName} 고객님, DEAREST에 오신 것을 환영합니다.
    </p>

    <p>
        DEAREST는 <strong>React + Spring Boot</strong>로 제작한
        개인 토이 프로젝트입니다.
    </p>

    <p>
        쇼핑몰의 기본적인 상품 조회, 회원, 주문, 주소 관리,
        위시리스트 등의 기능을 직접 구현하고 있습니다.
    </p>

</div>

                </section>


                {/* ================================
                    ORDER
                ================================= */}

                <section className="order-summary">

                    <div className="order-box">

                        <h2>ORDER</h2>

                        <p> 총주문가격: {totalPrice.toLocaleString()} / 총주문횟수: {totalOrderCount}</p>

                    </div>

                </section>


                {/* ================================
                    배송 상태
                ================================= */}

                <section className="order-status">

                    {/* 배송준비중 */}

                    <div className="status-item">

                        <strong>
                            배송준비중
                        </strong>

                        <span>
                            {readyCount}
                        </span>

                    </div>


                    {/* 배송중 */}

                    <div className="status-item">

                        <strong>
                            배송중
                        </strong>

                        <span>
                            0
                        </span>

                    </div>


                    {/* 배송완료 */}

                    <div className="status-item">

                        <strong>
                            배송완료
                        </strong>

                        <span>
                            {completeCount}
                        </span>

                    </div>


                    {/* 취소 / 교환 / 반품 */}

                    <div className="status-item last">

                        <div>

                            <strong>
                                취소
                            </strong>

                            <span>
                                {cancelCount}
                            </span>

                        </div>
       

                    </div>

                </section>

            </main>

        </div>
    );
};

export default MyPage;