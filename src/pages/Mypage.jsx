
import Footer from '../components/Footer';
import '../styles/Mypage.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Helmet } from 'react-helmet';


export default function Mypage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [position, setPosition] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLogin, setIsLogin] = useState(null);

// 로그인 상태 확인 
useEffect(() => {
  const checkLoginStatus = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };


  checkLoginStatus();
}, []);

// 로그인 상태에 따른 리다이렉트
useEffect(() => {
  if (isLogin === false) {
    alert('로그인이 필요한 서비스입니다.');
    navigate('/login');
  }
}, [isLogin, navigate]);


 useEffect(() => {
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

  

    
    if (data?.user?.email) {
      // user 테이블에서 nickname 조회
      const { data: userRow, error: userError } = await supabase
        .from('member')
        .select('*')
        .eq('email', data.user.email)
        .single();
      if (userRow?.nickname) setNickname(userRow.nickname);
      if (userRow?.position) setPosition(userRow.position);
      if (userRow?.profile_img) setProfileImg(userRow.profile_img);
      
      if (userRow?.categories) {
        let arr = userRow.categories;
        if (typeof arr === 'string') {
          try {
            arr = JSON.parse(arr);
          } catch {
            arr = arr.split(',').map(s => s.trim()).filter(Boolean);
          }
        }
        setCategories(arr);
      } else {
        setCategories([]);
      }
    }
    
  };

 // 로그인된 상태에서만 사용자 정보 가져오기
    if (isLogin === true) {
      fetchUser();
    }
  
}, [isLogin]);



  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

    if (isLogin === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px' 
      }}>
        로딩 중...
      </div>
    );
  }

  if (isLogin === false) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px' 
      }}>
        로그인 페이지로 이동 중...
      </div>
    );
  }



  return (
    <>
      <Helmet>
        <title>마이페이지 | WANDOO</title>
      </Helmet>
  
      <div className="mypage-container">
        <header className="header">
          <div className="logo">MY PAGE</div>
          <Link to="/">
            <img src="/image/icon/bell.svg" alt="알림" className="bell-icon" />
          </Link>
          <span className="noti-badge">4</span>
        </header>
        <div className="user-card">
          
          <img src={profileImg ? profileImg : '/default-profile.png'} alt="프로필" />
          <span className="username">{nickname}</span><span className="greeting">님 반갑습니다!</span>
        </div>
        <div className="myuser-info">
          <div className="user-info-title">나의 활동 지역</div>
          <span className="user-info-badge">{position}</span>
          <div className="user-info-title" style={{ marginTop: '16px' }}>나의 관심 카테고리</div>
          {categories.map(i => (
            <span className="user-info-badge"key={typeof i === 'string' ? i : i.id}>{typeof i === 'string' ? i.replace(/^"|"$/g, '') : i}</span>
          ))}
        
        </div>
        <div className="mylists">
          <Link to="/" className="mylists-card"><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#1b1b1b"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg><span>나의 모임</span></Link>
          <Link to="/" className="mylists-card"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="1b1b1b"><path d="M200-200v-560 179-19 400Zm80-240h221q2-22 10-42t20-38H280v80Zm0 160h157q17-20 39-32.5t46-20.5q-4-6-7-13t-5-14H280v80Zm0-320h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v258q-14-26-34-46t-46-33v-179H200v560h202q-1 6-1.5 12t-.5 12v56H200Zm480-200q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM480-120v-56q0-24 12.5-44.5T528-250q36-15 74.5-22.5T680-280q39 0 77.5 7.5T832-250q23 9 35.5 29.5T880-176v56H480Z"/></svg><span>내가 쓴 글</span></Link>
          <Link to="/" className="mylists-card"><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="1b1b1b"><path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z"/></svg><span>관심 모임</span></Link>
          <Link to="/" className="mylists-card"><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="1b1b1b"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg><span>채팅</span></Link>
        </div>
        <button className="myprofile"><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="1b1b1b"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg> 프로필 설정</button>
        <button className="logout" onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="1b1b1b"><path d="M200-120q-33 0-56.5-23.5T120-200v-160h80v160h560v-560H200v160h-80v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm220-160-56-58 102-102H120v-80h346L364-622l56-58 200 200-200 200Z"/></svg>로그아웃</button>
        <Footer />
      </div>  
      

    </>
  );
}