
export default function Footer() {
  return (
    <div className="main-footer">
      <div className="footer-logo">WANDOO</div>
      <div>(주)완두 사업자정보</div>
  <div style={{fontSize:'16px',lineHeight:'24px'}}>
        대표 : 미니콩즈<br/>
        사업자등록번호 : 111-11-11111<br/>
        제휴문의 : abc1234@gmail.com<br/>
        고객센터 : 1544-0000
      </div>
      <div className="footer-links">
        <a href="">이용약관</a>
        <a href="">개인정보처리방침</a>
        <a href="">위치기반서비스</a>
        <a href="">이용약관 법적고지</a>
      </div>
    </div>
  );
}