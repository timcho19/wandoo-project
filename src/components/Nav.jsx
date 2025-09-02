import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

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
        <Link to="/" className="nav-item">
          <img src="/image/icon/home.svg" alt="홈"/>
          <span className="nav-label-inactive">홈</span>
        </Link>
        <Link to="/talk" className="nav-item">
          <img src="/image/icon/wandoo.svg" alt="완두톡"/>
          <span className="nav-label-inactive">완두톡</span>
        </Link>
        <Link to="/find" className="nav-item">
          <img src="/image/icon/category.svg" alt="모임찾기"/>
          <span className="nav-label-inactive">모임찾기</span>
        </Link>
        {user ? (
          <Link to="/mypage">마이페이지</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </nav>
  );
}