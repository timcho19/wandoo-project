import '../styles/Home.css'
import Footer from '../components/Footer';
import Homeheader from '../components/Homeheader';
import { Link } from "react-router-dom";
import GroupList from '../components/GroupList';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Helmet } from 'react-helmet';


export default function Home() {
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState(''); // 실제 검색에 사용되는 검색어
  const [isSearching, setIsSearching] = useState(false);
  const [count, setCount] = useState(0);
  

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data: userRow, error } = await supabase
          .from('member')
          .select('*')
          .eq('email', session.user.email)
          .single();

        if (userRow?.position) setPosition(userRow.position);
        if (userRow?.email) setEmail(userRow.email);
        
      }
    };
    fetchUserData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      setActiveSearchTerm(searchTerm.trim()); // 실제 검색어 업데이트
    } else {
      setIsSearching(false);
      setActiveSearchTerm(''); // 검색어 초기화
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleSearchIconClick = () => {
    handleSearch();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // 검색어가 비어있으면 즉시 검색 모드 해제
    if (e.target.value.trim() === '') {
      setIsSearching(false);
      setActiveSearchTerm('');
    }
  };
  
  const setResulCount = (num) => {
    setCount(num);
  }
  
  const resetSearch = () => {
    setIsSearching(false);
    setSearchTerm('');
    setActiveSearchTerm('');
  }

  return (
    <>
    <Helmet>
        <title>홈 | WANDOO</title>
      </Helmet>
    
    <div className="main-container" style={{ minHeight: '100vh' }}>
      <Homeheader/>
      <div className="main-search">
        <div className="main-search-title">
          {!isSearching && (
            <>
              <span>{email ? position : '완두'}</span> 에서<br/>
            </>
          )}
          {isSearching ? `"${activeSearchTerm}"의 검색 결과입니다` : '어떤 모임을 찾고 계신가요?'}
        </div>
        <div className="search-bar">
          <input 
            type="text" 
            className="search-input" 
            placeholder="검색어를 입력해주세요" 
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <img 
            src="/image/icon/arrow.svg" 
            alt="검색" 
            className="search-icon" 
            onClick={handleSearchIconClick}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      {/* 검색 중이 아닐 때만 카테고리와 배너 표시 */}
      {!isSearching && (
        <>
          <div className="main-category" >
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
        </>
      )}

      <div className="main-group" style={{ minHeight: isSearching ? '60vh' : '40vh' }}>
        <div className="main-group-title">
          {isSearching ? `검색 결과 ${count}개` : '새로운 완두 모임'}
          {isSearching ? (
            <>
              <br/><span style={{ cursor: 'pointer', color: '#007bff', fontSize: '14px' }} onClick={resetSearch} >돌아가기</span>
            </>
          ) : null}
        </div>
        <div className="main-group-desc">
          {isSearching ? '' : '완두에 새로 등록된 모임이에요!'}
        </div>
      
       
          <GroupList 
            limit={isSearching ? null : 4}
            searchTerm={activeSearchTerm} 
            onResultCountChange={setResulCount}
          />
     
        
      </div>
      <Footer/>
    </div>
    </>
  )
}