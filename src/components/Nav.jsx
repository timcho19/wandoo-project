
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { NavLink } from "react-router-dom";
import HomeIcon from '../assets/icon/home.svg?react';
import WandooIcon from '../assets/icon/wandoo.svg?react';
import CategoryIcon from '../assets/icon/category.svg?react';
import MypageIcon from '../assets/icon/mypage.svg?react';

const MAIN_COLOR = '#40b440';
const INACTIVE_COLOR = '#777';

export default function Nav() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    // 초기 로드 시 로그인 상태 확인
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    // Auth 상태 변경 감지 (로그인/로그아웃)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);


  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-bg"></div>
      <div className="bottom-nav-items">
        <NavLink to="/" className="nav-item">
          {({ isActive }) => (
            <div style={{ color: isActive ? MAIN_COLOR : INACTIVE_COLOR }}>
              <HomeIcon />
              <span className={isActive ? "nav-label-active" : "nav-label-inactive"}>홈</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/talk" className="nav-item">
          {({ isActive }) => (
            <div style={{ color: isActive ? MAIN_COLOR : INACTIVE_COLOR }}>
              <WandooIcon />
              <span className={isActive ? "nav-label-active" : "nav-label-inactive"}>완두톡</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/find" className="nav-item">
          {({ isActive }) => (
            <div style={{ color: isActive ? MAIN_COLOR : INACTIVE_COLOR }}>
              <CategoryIcon />
              <span className={isActive ? "nav-label-active" : "nav-label-inactive"}>모임찾기</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/mypage" className="nav-item">
          {({ isActive }) => (
            <div style={{ color: isActive ? MAIN_COLOR : INACTIVE_COLOR }}>
              <MypageIcon />
              <span className={isActive ? "nav-label-active" : "nav-label-inactive"}>마이페이지</span>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
}