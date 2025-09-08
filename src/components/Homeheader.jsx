import { Link } from "react-router-dom";

export default function Homeheader() {
  return (
     <header className="header">
        <Link to="/"className="logo"><img src="./image/logo/wandoologo.png" alt=""/><span>WANDOO TALK</span></Link>
        <Link to="/notification"><img src="/image/icon/bell.svg" alt="알림" className="bell-icon"/></Link>
        <span className="noti-badge">4</span>
    </header>
  );
}