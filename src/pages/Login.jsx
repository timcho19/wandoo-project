
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/Login.css'

export default function Login(){
  return(
    <>
    <div className="login-container">
    <Link to="/login" className="login-title">
      <img src="./image/logo/wandoologo.png" alt=""/>
      <span>WANDOO</span>
    </Link>
    <div className="login-subtitle">관심 모임부터 최신 소식까지</div>
    <div className="login-desc">당신의 취향을 한 곳에</div>

    <form className="login-form">
      <div className="login-field">
        <label className="login-label" htmlFor="login-id">아이디</label>
        <input className="login-input" id="login-id" type="text" placeholder="아이디를 입력해주세요."/>
      </div>

      <div className="login-field">
        <label className="login-label" htmlFor="login-pw">비밀번호</label>
        <input className="login-input" id="login-pw" type="password" placeholder="비밀번호를 입력해주세요."/>
      </div>

      <button type="submit" className="login-btn">로그인</button>
      <Link to="/signup" className="signup-btn">회원가입</Link>
    </form>

    <Link to="/" className="login-link">아이디/비밀번호를 잃어버리셨나요?</Link>
    <hr className="login-hr"/>

    <div className="login-sns-title">간편 로그인</div>
    <div className="login-sns-list">
      <div className="sns-item">
        <div className="login-sns-btn kakao"><img src="./image/icon/kakao.svg" alt="카카오"/></div>
        <span className="login-sns-label">카카오</span>
      </div>
      <div className="sns-item">
        <div className="login-sns-btn naver"><img src="./image/icon/naver.svg" alt="네이버"/></div>
        <span className="login-sns-label">네이버</span>
      </div>
      <div className="sns-item">
        <div className="login-sns-btn google"><img src="./image/icon/google.svg" alt="구글"/></div>
        <span className="login-sns-label">구글</span>
      </div>
    </div>
    <div className="login-sns-desc">소셜 계정으로 간편하게 로그인하세요</div>
  </div>
  <Nav/>
  </>
  )
}