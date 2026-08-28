import { useEffect, useState } from "react";
import api from "../axios/api";
import "./Members.css";

const Members = () => {

    console.log("🔥 Members 컴포넌트 실행됨");

    const [members, setMembers] = useState([]);

    useEffect(() => {

        const getMembers = async () => {

            try {
                const token = localStorage.getItem("accesstoken");
                console.log("현재 토큰:", token);

                const response = await api.get("/api/admin/members");
                 console.log("🔥 회원목록 API 응답 받음");
                console.log("회원목록:", response.data);

                setMembers(response.data.data);

            } catch (error) {
                console.error("회원목록 조회 실패:", error);

                if (error.response) {
                    console.log("서버 응답:", error.response.data);
                }
            }
        };

        getMembers();

    }, []);


    return (
        <div className="members-page">

            {/* 페이지 제목 */}
            <div className="members-header">
                <div>
                    <p className="members-small-title">ADMIN</p>
                    <h1>MEMBERS</h1>
                    <p className="members-description">
                        회원 정보를 관리할 수 있습니다.
                    </p>
                </div>

                <div className="member-count">
                    TOTAL <strong>{members.length}</strong>
                </div>
            </div>


            {/* 회원 목록 */}
            <div className="members-table-wrap">

                <table className="members-table">

                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>ROLE</th>
                        </tr>
                    </thead>

                    <tbody>

                        {members.map((member, index) => (

                            <tr key={member.id}>

                                <td className="member-number">
                                    {index + 1}
                                </td>

                                <td className="member-name">
                                    {member.name}
                                </td>

                                <td>
                                    {member.email}
                                </td>

                                <td>
                                    {member.phoneNumber}
                                </td>

                                <td>

                                    <span
                                        className={
                                            member.role === "ADMIN"
                                                ? "role-badge admin"
                                                : "role-badge user"
                                        }
                                    >
                                        {member.role}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Members;