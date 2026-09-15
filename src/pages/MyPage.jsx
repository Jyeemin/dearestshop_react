import { NavLink } from "react-router-dom";
import "./MyPage.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const MyPage = () => {
    const {setIsLogin, setMember} = useContext(AuthContext);
    const navigate = useNavigate();

  return (
    <div className="mypage">
    

      {/* 왼쪽 메뉴 */}
      <aside className="mypage-sidebar">

        <NavLink
          to="/mypage"
          className={({ isActive }) =>
            isActive ? "sidebar-title active" : "sidebar-title"
          }
        >
          ACCOUNT
        </NavLink>


        <div className="sidebar-menu">

          <NavLink
            to="/mypage/orders"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            ORDER HISTORY
          </NavLink>


          <NavLink
            to="/address"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            VIEW ADDRESSES
          </NavLink>


          <NavLink
            to="/mypage/wishlist"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            WISHLIST
          </NavLink>


          <NavLink
            to="/mypage/contact"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            CONTACT
          </NavLink>

            <NavLink
            to="/admin/members"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            MEMBERS
          </NavLink>

            <NavLink
            to="/admin/product/new"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            NEW PRODUCT
          </NavLink>


          <div className="logout"
            onClick={() => {
                localStorage.removeItem("accesstoken");
                localStorage.removeItem("role");
                setIsLogin(false);
                setMember(null);
                navigate("/");
            }} 
            >
            LOG OUT
          </div>

        </div>

      </aside>


      {/* 오른쪽 내용 */}
      <main className="mypage-content">

        <section className="mypage-header">

          <h1>MY PAGE</h1>

          <div className="member-info">

            <p>
              김지민 님은 <strong>[Baby Jade]</strong> 회원이십니다.
            </p>

            <p>
              <strong>KRW 10,000</strong> 이상 구매시 1%를
              추가적립 받으실 수 있습니다.
            </p>

            <p>
              <strong>[Soft Jade]</strong> 까지 남은 구매금액은{" "}
              <strong>KRW 1,000,000</strong> 입니다.
            </p>

            <p>
              승급 기준에 따른 예상 금액이므로
              주문금액과 다를 수 있습니다.
            </p>

          </div>

        </section>


        {/* ORDER */}
        <section className="order-summary">

          <div className="order-box">

            <h2>ORDER</h2>

            <p>159,000 / 3</p>

          </div>

        </section>


        {/* 배송 상태 */}
        <section className="order-status">

          <div className="status-item">
            <strong>배송준비중</strong>
            <span>0</span>
          </div>


          <div className="status-item">
            <strong>배송중</strong>
            <span>0</span>
          </div>


          <div className="status-item">
            <strong>배송완료</strong>
            <span>0</span>
          </div>


          <div className="status-item last">

            <div>
              <strong>취소</strong>
              <span>0</span>
            </div>

            <div>
              <strong>교환</strong>
              <span>0</span>
            </div>

            <div>
              <strong>반품</strong>
              <span>0</span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default MyPage;