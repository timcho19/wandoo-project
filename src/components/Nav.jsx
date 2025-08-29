import { Link } from "react-router-dom";

export default function Nav() {
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
        <Link to="/mypage" className="nav-item">
          <img src="/image/icon/mypage.svg" alt="마이페이지"/>
          <span className="nav-label-inactive">마이페이지</span>
        </Link>
      </div>
    </nav>
  );
}