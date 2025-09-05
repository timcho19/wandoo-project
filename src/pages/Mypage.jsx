
import Footer from '../components/Footer';
import '../styles/Mypage.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function Mypage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [position, setPosition] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [categories, setCategories] = useState([]);

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
  fetchUser();
  
}, []);



  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <>
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
          <Link to="/" className="mylists-card">나의 모임</Link>
          <Link to="/" className="mylists-card">내가 쓴 글</Link>
          <Link to="/" className="mylists-card">관심 모임</Link>
          <Link to="/" className="mylists-card">채팅</Link>
        </div>
        <button className="myprofile">프로필 설정</button>
        <button className="logout" onClick={handleLogout}>로그아웃</button>
        <Footer />
      </div>

    </>
  );
}