import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/FindView.css";
import { supabase } from "../supabase";

export default function FindView() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeeting = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("meetings")
        .select("*")
        .eq("id", id) // URL의 id값과 같은 데이터만
        .single();

      if (error) {
        console.error("모임 불러오기 에러:", error);
      } else {
        setMeeting(data);
      }
      setLoading(false);
    };
      const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();


      if (data?.user?.email) {
        // user 테이블에서 nickname 조회
        const { data: userRow, error: userError } = await supabase
          .from('member')
          .select('*')
          .eq('email', data.user.email)
          .maybeSingle();

      }
      
 
     
    };

    if (id) fetchMeeting();
    fetchUser()
  }, [id]);

  // ✅ 로딩 처리
  if (loading) {
    return;
  }

  // ✅ 데이터가 없을 때
  if (!meeting) {
    return <p>모임 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="findview-container">
      <header className="header">
        <Link to="/find" className="back-button">
          <img src="/image/icon/arrow-left.svg" alt="뒤로가기" />
        </Link>
        <h1 className="page-title">{meeting.title}</h1>
        <div className="header-actions">
          <button type="button" className="icon-btn">
            <img src="/image/icon/sharing.svg" alt="공유" className="header-icon" />
          </button>
          <button type="button" className="icon-btn">
            <img src="/image/icon/heart.svg" alt="저장" className="header-icon" />
          </button>
          <button type="button" className="icon-btn">
            <img src="/image/icon/report.svg" alt="신고" className="header-icon" />
          </button>
        </div>
      </header>

      <main>
        {/* ✅ 이미지 */}
        {meeting.image_url ? (
          <img src={meeting.image_url} alt={meeting.title} className="main-image" />
        ) : (
          <img src="/image/default.jpg" alt="기본 이미지" className="main-image" />
        )}

        {/* ✅ 태그 정보 */}
        <section className="tags-section">
          <div className="tag">
            <img src="/image/icon/position.svg" alt="위치" />
            {meeting.location || "위치 미정"}
          </div>
          <div className="tag">
            <img src="/image/icon/group.svg" alt="인원" />
            {meeting.participants || 0} 명
          </div>
          <div className="tag">
            <img src="/image/icon/category-1.svg" alt="카테고리" />
            {meeting.category || "카테고리 없음"}
          </div>
          <div className="tag">
            <img src="/image/icon/date.svg" alt="날짜" />
            {meeting.date ? new Date(meeting.date).toLocaleDateString() : "날짜 미정"}
          </div>
          <div className="tag">
            <img src="/image/icon/clock.svg" alt="시간" />
            {meeting.date
              ? new Date(meeting.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "시간 미정"}
          </div>
        </section>

        {/* ✅ 모임 소개 */}
        <section className="info-section">
          <h2 className="members-title">모임 소개</h2>
          <div className="info-content">
            <pre>{meeting.description || "소개 글이 없습니다."}</pre>
          </div>
        </section>
        <section className="members-section">
                <h2 className="members-title">현재 참여 인원</h2>
                <div className="member-list">
                    <div className="member-item">
                        <div className="member-avatar">
                            <img src="/image/profile/person-3.jpg" alt="프로필 이미지" className="member-picture" />
                            <img src="/image/icon/crown.svg" alt="방장" className="host-badge" />
                        </div>
                        <span className="member-name">홍길동</span>
                        <Link to="/" className="chat-btn">1:1 문의</Link>
                    </div>
                    <div className="member-item">
                        <div className="member-avatar">
                            <img src="/image/profile/person-4.jpg" alt="프로필 이미지" className="member-picture"/>
                        </div>
                        <span className="member-name">길짱구</span>
                    </div>
                    <div className="member-item">
                        <div className="member-avatar">
                            <img src="/image/profile/person-5.jpg" alt="프로필 이미지" className="member-picture" />
                        </div>
                        <span className="member-name">박철수</span>
                    </div>
                </div>
            </section>

        {/* ✅ 참여 버튼 */}
        <section className="join-section">
     
          <button className="join-btn">참여하기</button>
        </section>
      </main>
    </div>
  );
}
