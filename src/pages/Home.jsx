import '../styles/Home.css'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Homeheader from '../components/Homeheader';
import { Link } from "react-router-dom";

export default function Home(){
  return(
    
    <div className="main-container">
      <Homeheader/>
      <div className="main-search">
      <div className="main-search-title">[동네이름]에서<br/>어떤 모임을 찾고 계신가요?</div>
      <div className="search-bar">
                <input type="text" className="search-input" placeholder="검색어를 입력해주세요" />
                <img src="/image/icon/arrow.svg" alt="검색" className="search-icon" />
      </div>
    </div>
    <div className="main-category">
      <div className="main-category-title">카테고리별 모임</div>
      <div className="category-list">
        <Link to="/" className="category-card"><span className="label">전체보기</span></Link>
        <Link to="/find" className="category-card sports"><span className="label">운동/스포츠</span></Link>
        <Link to="/find" className="category-card outdoor"><span className="label">아웃도어/여행</span></Link>
        <Link to="/find" className="category-card culture"><span className="label">문화/공연</span></Link>
        <Link to="/find" className="category-card social"><span className="label">사교</span></Link>
        <Link to="/find" className="category-card other"><span className="label">기타</span></Link>
      </div>
    </div>
     <section className="banner-section">
            <Link to="/talk" className="banner green">
                <p className="banner-subtitle">자유롭게 남기는 우리 동네 이야기</p>
                <h2 className="banner-title">우리 동네 완두톡</h2>
                <img src="/image/icon/arrow.svg" alt="" className="banner-icon" />
            </Link>
           
        </section>
    <div className="main-group">
      <div className="main-group-title">새로운 완두 모임</div>
      <div className="main-group-desc">완두에 새로 등록된 모임이에요!</div>
      <div className="group-list">
        <Link to="/findview" className="group-card">
            <div className="thumb">
                <span className="card-category">운동/스포츠</span>
            </div>
            <div className="card-content">
                <h3 className="card-title">[정기모임] 한강 공원 배드민턴 치실분 (1/4)</h3>
                <p className="card-schedule">[일정] 매주 토요일 오후 3시</p>
                <p className="card-location">서울특별시 마포구</p>
            </div>
        </Link>
       <Link to="/findview" className="group-card">
            <div className="thumb">
                <span className="card-category">운동/스포츠</span>
            </div>
            <div className="card-content">
                <h3 className="card-title">[정기모임] 한강 공원 배드민턴 치실분 (1/4)</h3>
                <p className="card-schedule">[일정] 매주 토요일 오후 3시</p>
                <p className="card-location">서울특별시 마포구</p>
            </div>
        </Link>
        <Link to="/findview" className="group-card">
            <div className="thumb">
                <span className="card-category">운동/스포츠</span>
            </div>
            <div className="card-content">
                <h3 className="card-title">[정기모임] 한강 공원 배드민턴 치실분 (1/4)</h3>
                <p className="card-schedule">[일정] 매주 토요일 오후 3시</p>
                <p className="card-location">서울특별시 마포구</p>
            </div>
        </Link>
      </div>
    </div>
    <Footer/>
    <Nav/>
    
    </div>
  
  )
}