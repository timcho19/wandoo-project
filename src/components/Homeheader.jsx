import { Link } from "react-router-dom";

export default function Homeheader() {
  return (
     <header class="header">
        <Link href="/"class="logo"><img src="./image/logo/wandoologo.png" alt=""/><span>WANDOO TALK</span></Link>
        <Link href="/notification"><img src="/image/icon/bell.svg" alt="알림" class="bell-icon"/></Link>
        <span class="noti-badge">4</span>
    </header>
  );
}