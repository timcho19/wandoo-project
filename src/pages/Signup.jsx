
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/Signup.css'

export default function Signup(){
  return(
    <>
      <div className="login-container">
    <div className="login-subtitle">회원가입</div>
    <form className="login-form">
      <div className="login-field">
        <label className="login-label" htmlFor="signup-id">아이디</label>
        <input className="login-input" id="signup-id" type="text" placeholder="아이디를 입력해주세요."/>
      </div>
      <div className="login-field">
        <label className="login-label" htmlFor="signup-pw">비밀번호</label>
        <input className="login-input" id="signup-pw" type="password" placeholder="비밀번호를 입력해주세요."/>
      </div>
      <div className="login-field">
        <label className="login-label" htmlFor="signup-pw2">비밀번호 확인</label>
        <input className="login-input" id="signup-pw2" type="password" placeholder="비밀번호를 다시 입력해주세요."/>
      </div>
      <div className="login-field">
        <label className="login-label" htmlFor="signup-nickname">닉네임</label>
        <input className="login-input" id="signup-nickname" type="text" placeholder="닉네임을 입력해주세요."/>
      </div>
      <div className="login-field">
        <label className="login-label" htmlFor="signup-email">이메일</label>
        <input className="login-input" id="signup-email" type="email" placeholder="이메일을 입력해주세요."/>
      </div>

      <div className="terms-title">필수/선택 항목 안내</div>
      <div className="terms-box">
        <label className="terms-all">
          <input type="checkbox" id="terms-all" className="terms-checkbox"/>
          <span className="terms-all-text">전체 동의</span>
        </label>
        <div className="terms-list">
          <label className="terms-item">
            <input type="checkbox" className="terms-checkbox"/>
            <span><span className="required">[필수]</span> 만 14세 이상입니다</span>
          </label>
          <label className="terms-item">
            <input type="checkbox" className="terms-checkbox"/>
            <span><span className="required">[필수]</span> 서비스 이용약관 동의</span>
            <Link to="/" className="terms-link">보기</Link>
          </label>
          <label className="terms-item">
            <input type="checkbox" className="terms-checkbox"/>
            <span><span className="required">[필수]</span> 개인정보 수집 및 이용 동의</span>
            <Link to="/" className="terms-link">보기</Link>
          </label>
          <label className="terms-item">
            <input type="checkbox" className="terms-checkbox"/>
            <span>[선택] 마케팅 정보 수신 동의</span>
            <Link to="/" className="terms-link">보기</Link>
          </label>
        </div>
      </div>
    <button type="submit" className="signup-btn">회원가입</button>
    </form>

    <Link  to="/login" className="login-back">로그인으로 돌아가기</Link>
    
  </div>
  <Nav/>
  </>
  )
}