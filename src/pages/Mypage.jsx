
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import '../styles/Mypage.css'


export default function Mypage(){
  return(
    <>
      <div className="mypage-container">
        <header className="header">
          <div className="logo">MY PAGE</div>
          <a href="notification.html">
            <img src="/image/icon/bell.svg" alt="알림" className="bell-icon"/>
          </a>
          <span className="noti-badge">4</span>
        </header>
        <div className="user-card">
          <img src="./image/profile/person-2.jpg" alt="프로필"/>
          <span className="username">홍길동</span><span className="greeting">님 반갑습니다!</span>
        </div>
        <div className="user-info">
          <div className="user-info-title">나의 활동 지역</div>
          <span className="user-info-badge">종로구</span>
          <div className="user-info-title" style={{marginTop:'16px'}}>나의 관심 카테고리</div>
          <span className="user-info-badge">운동/스포츠</span>
          <span className="user-info-badge">문화/공연</span>
          <span className="user-info-badge">사교</span>
        </div>
        <div className="mylists">
          <a href="#" className="mylists-card">나의 모임</a>
          <a href="#" className="mylists-card">내가 쓴 글</a>
          <a href="#" className="mylists-card">관심 모임</a>
          <a href="#" className="mylists-card">채팅</a>
        </div>
        <button className="myprofile">프로필 설정</button>
        <button className="logout">로그아웃</button>
        <Footer/>
      </div>
      <Nav/>
    </>
  )
}