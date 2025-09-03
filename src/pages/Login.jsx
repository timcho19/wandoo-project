import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Nav from '../components/Nav';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState(''); // 이메일만 사용
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Supabase Auth 로그인
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          alert('이메일 인증이 필요합니다. 회원가입 시 받은 이메일을 확인해주세요.');
        } else {
          alert('로그인 실패: ' + error.message);
        }
        return;
      }

      // 로그인 성공 후 user 테이블에서 추가 정보 가져오기
      const { data: extraData } = await supabase
        .from('member')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      console.log('추가 정보:', extraData);

      alert('로그인 성공!');
      navigate('/'); // 홈으로 이동
    } catch (err) {
      console.error('로그인 처리 중 오류:', err);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };
  const handleKakaoLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:5173/oauth', // 개발용 Redirect URI 나중에 배포주소 수정 및 카카오 리다이렉트 주소 수정해야함
      },
    });
    if (error) {
      console.error('카카오 로그인 실패:', error.message);
      alert('카카오 로그인 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('로그인 성공, 유저 정보:', session.user);
        navigate('/'); // 로그인 성공 시 홈으로 이동
      }
    });
  }, []);



  return (
    <>
      <div className="login-container">
        <Link to="/" className="login-title">
          <img src="./image/logo/wandoologo.png" alt="" />
          <span>WANDOO</span>
        </Link>
        <div className="login-subtitle">관심 모임부터 최신 소식까지</div>
        <div className="login-desc">당신의 취향을 한 곳에</div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-field">
            <label className="login-label" htmlFor="login-email">이메일</label>
            <input
              className="login-input"
              id="login-email"
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-pw">비밀번호</label>
            <input
              className="login-input"
              id="login-pw"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">로그인</button>
          <Link to="/signup" className="signup-btn">회원가입</Link>
        </form>

        <Link to="/" className="login-link">아이디/비밀번호를 잃어버리셨나요?</Link>
        <hr className="login-hr" />
        <div className="login-sns-title">간편 로그인</div>
        <div className="login-sns-list">
          <div className="sns-item" onClick={handleKakaoLogin}>
            <div className="login-sns-btn kakao"><img src="./image/icon/kakao.svg" alt="카카오" /></div>
            <span className="login-sns-label">카카오</span>
          </div>
          <div className="sns-item">
            <div className="login-sns-btn naver"><img src="./image/icon/naver.svg" alt="네이버" /></div>
            <span className="login-sns-label">네이버</span>
          </div>
          <div className="sns-item">
            <div className="login-sns-btn google"><img src="./image/icon/google.svg" alt="구글" /></div>
            <span className="login-sns-label">구글</span>
          </div>
        </div>
        <div className="login-sns-desc">소셜 계정으로 간편하게 로그인하세요</div>
      </div>
      <Nav />
    </>
  );
}