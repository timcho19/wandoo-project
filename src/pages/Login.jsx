import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 일반 로그인
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          alert('이메일 인증이 필요합니다. 회원가입 시 받은 이메일을 확인해주세요.');
        } else {
          alert('로그인 실패: ' + error.message);
        }
        return;
      }

      // 로그인 성공 후 member 테이블 정보 조회
      const { data: extraData, error: extraError } = await supabase
        .from('member')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (extraError) console.error('추가 정보 조회 오류:', extraError);
      else console.log('추가 정보:', extraData);

      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      console.error('로그인 처리 중 오류:', err);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  // 소셜 로그인 (provider: kakao, naver, google)
  const handleSocialLogin = async (provider) => {


    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: 'https://wandoo-project.vercel.app/login' },
    });

    if (error) {
      console.error(`${provider} 로그인 실패:`, error.message);
      alert(`${provider} 로그인 중 오류가 발생했습니다.`);
    }
  };

  // 소셜 로그인 후 세션 확인 및 회원가입/홈 이동
  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session || !session.user) return;

        // URL 해시(#access_token=...) 제거
        if (window.location.hash) {
          window.history.replaceState(null, '', '/login');
        }

        const email = session.user.email;
        if (!email) {
          console.log('소셜 계정 이메일 없음. 신규 가입 페이지로 이동 불가.');
          return;
        }

        // member 테이블에서 기존 회원 확인
        const { data: existingUser, error: userError } = await supabase
          .from('member')
          .select('id')
          .eq('email', email)
          .maybeSingle();

        if (userError) {
          console.error('회원 확인 오류:', userError);
          return;
        }

        if (!existingUser?.id) {
          // 신규 회원 → 회원가입 페이지 이동
          navigate(`/signup?email=${encodeURIComponent(email)}`);
        } else {
          // 기존 회원 → 홈 이동
          navigate('/');
        }
      } catch (err) {
        console.error('세션 확인 중 오류:', err);
      }
    };

    // OAuth redirect 직후 세션 안정화를 위해 약간 지연 후 실행
    const timer = setTimeout(() => checkSessionAndRedirect(), 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
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
        <div className="sns-item" onClick={() => handleSocialLogin('kakao')}>
          <div className="login-sns-btn kakao"><img src="./image/icon/kakao.svg" alt="카카오" /></div>
          <span className="login-sns-label">카카오</span>
        </div>
        <div className="sns-item" onClick={() => handleSocialLogin('naver')}>
          <div className="login-sns-btn naver"><img src="./image/icon/naver.svg" alt="네이버" /></div>
          <span className="login-sns-label">네이버</span>
        </div>
        <div className="sns-item" onClick={() => handleSocialLogin('google')}>
          <div className="login-sns-btn google"><img src="./image/icon/google.svg" alt="구글" /></div>
          <span className="login-sns-label">구글</span>
        </div>
      </div>
      <div className="login-sns-desc">소셜 계정으로 간편하게 로그인하세요</div>
    </div>
  );
}
