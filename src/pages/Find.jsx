import '../styles/Find.css'

import Footer from '../components/Footer';
import { Link } from "react-router-dom";

export default function Find(){
  return(
    <>
        <div className="find-container">
        <Link to="/createfind " className="floating-btn" aria-label="모임 만들기"><img src="/image/icon/add.svg" alt="" /></Link>
        <header className="header">
            <div className="logo">Find a Meetup</div>
            <Link to="/notification">
                <img src="/image/icon/bell.svg" alt="알림" className="bell-icon" />
            </Link>
            <span className="noti-badge">4</span>
        </header>

        <section className="search-section">
            <div className="filter-area">
                <div className="filter-item">
                    <select className="filter-select" defaultValue="지역선택">
                        <option value="지역선택" disabled>지역</option>
                        <option value="종로구">종로구</option>
                        <option value="강남구">강남구</option>
                        <option value="서초구">서초구</option>
                        <option value="마포구">마포구</option>
                        <option value="용산구">용산구</option>
                    </select>
                </div>
                <div className="filter-item">
                    <select className="filter-select" defaultValue="카테고리">
                        <option value="카테고리" disabled>카테고리</option>
                        <option value="all">전체</option>
                        <option value="sports">운동/스포츠</option>
                        <option value="culture">문화/예술</option>
                        <option value="hobby">취미</option>
                        <option value="study">스터디</option>
                        <option value="social">친목</option>
                    </select>
                </div>
            </div>
            <div className="search-bar">
                <input type="text" className="search-input" placeholder="검색어를 입력해주세요" />
                <img src="/image/icon/arrow.svg" alt="검색" className="search-icon" />
            </div>
        </section>

        <section className="banner-section">
            <Link to="/talk" className="banner green">
                <p className="banner-subtitle">자유롭게 남기는 우리 동네 이야기</p>
                <h2 className="banner-title">우리 동네 완두톡</h2>
                <img src="/image/icon/arrow.svg" alt="" className="banner-icon" />
            </Link>
            <Link to="/" className="banner yellow">
                <p className="banner-subtitle">우리 모임 자랑 좀 들어볼래 ?</p>
                <h2 className="banner-title">모임 후기 이벤트</h2>
                <img src="/image/icon/arrow.svg" alt="" className="banner-icon" />
            </Link>
        </section>

        <section className="group-section">
            <div className="section-header">
                <h2 className="members-title">추천 완두 모임</h2>
                <p className="section-subtitle">나의 관심사 모임을 알아보자</p>
            </div>
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
               
                
            </div>
            
        </section>

        <section className="group-section">
            <div className="section-header">
                <h2 className="members-title">내 위치 완두모임</h2>
                <p className="section-subtitle">내 근처에 등록된 모임이에요!</p>
            </div>
            <div className="group-list">
              
            </div>
        </section>

        <section className="group-section">
            <div className="section-header">
                <h2 className="members-title">신선한 완두모임</h2>
                <p className="section-subtitle">완두에 새로 등록된 모임이에요!</p>
            </div>
            <div className="group-list">
             
            </div>
        </section>
       <Footer/>
    </div>
    

    </>


  
  
  
  )
}