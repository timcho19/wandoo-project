
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { NavLink } from "react-router-dom";
import HomeIcon from '../assets/icon/home.svg?react';
import WandooIcon from '../assets/icon/wandoo.svg?react';
import CategoryIcon from '../assets/icon/category.svg?react';
import MypageIcon from '../assets/icon/mypage.svg?react';
import LoginIcon from '../assets/icon/lock.svg?react';

const MAIN_COLOR = '#40b440';
const INACTIVE_COLOR = '#777';

export default function Nav() {
    const [user, setUser] = useState(null);

useEffect(() => {
  let isMounted = true;

  const fetchSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) setUser(session?.user ?? null);
    } catch (err) {
      console.error(err);
    }
  };

  fetchSession();

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    if (isMounted) setUser(session?.user ?? null);
  });

  return () => {
    isMounted = false;
    listener?.subscription?.unsubscribe();
  };
}, []);
// console.log('Current user:', user);
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
      {/* 로그인 상태에 따라 마이페이지/로그인 링크 구분 */}
        {user ? (
          <NavLink to="/mypage" className="nav-item">
            {({ isActive }) => (
              <div style={{ color: isActive ? MAIN_COLOR : INACTIVE_COLOR }}>
                <MypageIcon />
                <span className={isActive ? "nav-label-active" : "nav-label-inactive"}>마이페이지</span>
              </div>
            )}
          </NavLink>
        ) : (
          <NavLink to="/login" className="nav-item">
            {({ isActive }) => (
              <div style={{ color: isActive ? MAIN_COLOR : INACTIVE_COLOR }}>
                <LoginIcon/>
                <span className={isActive ? "nav-label-active" : "nav-label-inactive"}>로그인</span>
              </div>
            )}
          </NavLink>
        )}
      </div>
    </nav>
  );
}