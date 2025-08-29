import '../styles/Home.css'
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Homeheader from '../components/Homeheader';

export default function Home(){
  return(
    
    <div className="main-container">
      <Homeheader/>
      <div className="main-search">
      <div className="main-search-title">[동네이름]에서<br/>어떤 모임을 찾고 계신가요?</div>
      <div className="main-search-bar">
        <input type="text" placeholder="검색어를 입력해주세요" className="search-input"/>
      <img src="/image/icon/arrow.svg" alt="검색" style={{width:'38px',height:'38px',verticalAlign:'middle',cursor:'pointer'}}/>
      </div>
    </div>
    <div className="main-category">
      <div className="main-category-title">카테고리별 모임</div>
      <div className="category-list">
        <a href="" className="category-card"><span className="label">전체보기</span></a>
        <a href="" className="category-card sports"><span className="label">운동/스포츠</span></a>
        <a href="" className="category-card outdoor"><span className="label">아웃도어/여행</span></a>
        <a href="" className="category-card culture"><span className="label">문화/공연</span></a>
        <a href="" className="category-card social"><span className="label">사교</span></a>
        <a href="" className="category-card other"><span className="label">기타</span></a>
      </div>
    </div>
    <a href="" className="main-banner">
      <div>
        <div className="banner-title">자유롭게 남기는 우리 동네 이야기</div>
        <div className="banner-sub">우리 동네 완두톡</div>
      </div>
  <img src="/image/icon/arrow.svg" alt="배너 아이콘" className="banner-icon"/>
    </a>
    <div className="main-group">
      <div className="main-group-title">새로운 완두 모임</div>
      <div className="main-group-desc">완두에 새로 등록된 모임이에요!</div>
      <div className="group-list">
        <a href="" className="group-card">
          <div className="thumb"
            style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.0) 80%, rgba(0, 0, 0, 1)),url('/image/badminton.jpg')"}}>
            <span>운동/스포츠</span>
          </div>
          <div className="desc">
            <div className="title">[정기모임] 한강 공원 배드민턴 치실분 (1/4)</div>
            <div className="date">[일정] 매주 토요일 오후 3시</div>
            <div className="place">서울특별시 마포구</div>
          </div>
        </a>
        <a href="" className="group-card">
          <div className="thumb"
            style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.0) 80%, rgba(0, 0, 0, 1)),url('/image/ironman.jpg')"}}>
            <span>문학</span>
          </div>
          <div className="desc">
            <div className="title">[번개모임] 판타스틱4 보러 가실분 (3/4)</div>
            <div className="date">[일정] 2025.08.19 오후 18:00</div>
            <div className="place">서울특별시 종로구</div>
          </div>
        </a>
        <a href="" className="group-card">
          <div className="thumb"
            style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.0) 80%, rgba(0, 0, 0, 1)),url('/image/coffee.jpg')"}}>
            <span>사교</span>
          </div>
          <div className="desc">
            <div className="title">[정기모임] 주말 카페 수다모임 (1/4)</div>
            <div className="date">[일정] 매주 일요일 오후 3시</div>
            <div className="place">서울특별시 마포구</div>
          </div>
        </a>
        <a href="" className="group-card">
          <div className="thumb"
            style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.0) 80%, rgba(0, 0, 0, 1)),url('/image/health-club-1.jpg')"}}>
            <span>운동/스포츠</span>
          </div>
          <div className="desc">
            <div className="title">[정기모임] 주말 헬스 모임 (1/2)</div>
            <div className="date">[일정] 매주 일요일 오후 5시</div>
            <div className="place">서울특별시 은평구</div>
          </div>
        </a>
      </div>
    </div>
    <Footer/>
    <Nav/>
    
    </div>
  
  )
}