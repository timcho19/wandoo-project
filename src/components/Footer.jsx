import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="main-footer">
      <div className="footer-logo">WANDOO</div>
      <div className="footer-title">(주)완두 사업자정보</div>
  <div style={{fontSize:'12px',lineHeight:'18px'}}>
        대표 : 미니콩즈<br/>
        사업자등록번호 : 111-11-11111<br/>
        제휴문의 : abc1234@gmail.com<br/>
        고객센터 : 1544-0000
      </div>
      <div className="footer-links">
        <Link to="/">이용약관</Link>
        <Link to="/">개인정보처리방침</Link>
        <Link to="/">위치기반서비스</Link>
        <Link to="/">이용약관 법적고지</Link>
      </div>
    </div>
  );
}