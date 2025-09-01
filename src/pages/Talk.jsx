import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/Talk.css';

export default function Talk() {
  return (
    <>
    <div className="container">
      <header className="header">
        <div className="logo">WANDOO TALK</div>
        <Link to="/notification">
          <img src="/image/icon/bell.svg" alt="알림" className="bell-icon" />
        </Link>
        <span className="noti-badge">4</span>
      </header>

      <div className="filters">
        <div className="filter">
          <select name="location">
            <option value="종로구">종로구</option>
            <option value="중구">중구</option>
            <option value="용산구">용산구</option>
            <option value="성동구">성동구</option>
            <option value="광진구">광진구</option>
          </select>
        </div>
        <div className="filter">
          <select name="category">
            <option value="all">카테고리</option>
            <option value="culture">문화/예술</option>
            <option value="sports">운동/스포츠</option>
            <option value="study">스터디</option>
            <option value="hobby">취미</option>
          </select>
        </div>
      </div>

      <main>
        <Link to="/talkview" className="post">
          <div className="post-header">
            <div className="post-user">
              <button type="button" style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
                <img src="/image/profile/person-10.jpg" alt="프로필" className="profile-img" />
              </button>
              <span className="username">홍길동</span>
              <span className="post-meta">인사동 · 1시간전</span>
            </div>
          </div>
          <img src="/image/others.jpg" alt="게시글 이미지" className="post-image" />
          <div className="post-content">
            <p className="post-text">
              퇴근 하는길에 하늘을 봤더니, 별이 엄청 많아서 한장 찍어봤습니다
              <br />엄청 이쁘네요. 같이 가실분....
            </p>
            <div className="more-btn">더보기</div>
          </div>
          <div className="post-actions">
            <Link to ="/TalkView" className="action-btn">
              <img src="/image/icon/comment.svg" alt="댓글" className="action-icon" />
              <span>1</span>
            </Link>
            <button type="button" className="action-btn">
              <img src="/image/icon/heart-1.svg" alt="좋아요" className="action-icon" />
              <span>2</span>
            </button>
          </div>
        </Link>
        {/* 추가 게시글들 */}
      </main>

      <Link to="/create-post" className="floating-btn" aria-label="모임 만들기">
        <img src="/image/icon/add.svg" alt="추가 버튼" />
      </Link>

      <div className="main-footer">
        <div className="footer-logo">WANDOO</div>
        <div>(주)완두 사업자정보</div>
        <div style={{ fontSize: '16px', lineHeight: '24px' }}>
          대표 : 미니콩즈<br />
          사업자등록번호 : 111-11-11111<br />
          제휴문의 : abc1234@gmail.com<br />
          고객센터 : 1544-0000
        </div>
        <div className="footer-links">
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">위치기반서비스</a>
          <a href="#">이용약관 법적고지</a>
        </div>
      </div>
    </div>
    <Nav/>
    </>
  );
}
