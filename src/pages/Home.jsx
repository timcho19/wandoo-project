import '../styles/Home.css'
import Footer from '../components/Footer';
import Homeheader from '../components/Homeheader';
import { Link } from "react-router-dom";
import GroupList from '../components/GroupList';
import { useState, useEffect, useRef } from 'react';
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
  const categorySearch = (e) => {
    const category = e.currentTarget;
    if (!category) return;

    setSearchTerm(category.textContent);
    setIsSearching(true);
    setActiveSearchTerm(category.textContent);
  }
  const allGrouptLists = () => {
    const all = document.querySelector('.category-list .label').innerText;
    console.log(all)
    setSearchTerm(all);
    setIsSearching(true);
    setActiveSearchTerm(all);

  }
  const bannerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const scrollY = window.scrollY;
        // 배경 위치를 스크롤에 따라 조정
    
        bannerRef.current.style.backgroundPosition = `center ${scrollY + 200}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <Helmet>
        <title>홈 | WANDOO</title>
      </Helmet>

      <div className="main-container" style={{ minHeight: '100vh' }}>
        <Homeheader />
        <div className="main-search">
          <div className="main-search-title">
            {!isSearching && (
              <>
                <span>{email ? position : '완두'}</span> 에서<br />
              </>
            )}
            <div className='search-phrase'>
              {isSearching ? `"${activeSearchTerm}"의 검색 결과입니다` : '어떤 모임을 찾고 계신가요?'}
              {isSearching ? (
                <>
                  <span style={{ cursor: 'pointer', color: '#007bff', fontSize: '14px' }} onClick={resetSearch} >뒤로가기</span>
                </>
              ) : null}
            </div>
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
                <button className="category-card" onClick={allGrouptLists}><span className="label">전체보기</span></button>
                <button className="category-card sports" onClick={categorySearch}><span className="label">운동/스포츠</span></button>
                <button className="category-card outdoor" onClick={categorySearch}><span className="label">스터디</span></button>
                <button className="category-card culture" onClick={categorySearch}><span className="label">문화/예술</span></button>
                <button className="category-card social" onClick={categorySearch}><span className="label">친목</span></button>
                <button className="category-card other" onClick={categorySearch}><span className="label">취미</span></button>
              </div>
            </div>
            <section className="banner-section">
              <div
               ref={bannerRef}
               className="banner green"
              >
                <p className="banner-subtitle">자유롭게 남기는 우리 동네 이야기</p>
                <h2 className="banner-title">우리 동네 완두톡</h2>
                <img src="/image/icon/arrow.svg" alt="" className="banner-icon" />
              </div>
            </section>
          </>
        )}

        <div className="main-group" style={{ minHeight: isSearching ? '60vh' : '40vh' }}>
          <div className="main-group-title">
            {isSearching ? `검색 결과 ${count}개` : '새로운 완두 모임'}
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
        <Footer />
      </div>
    </>
  )
}