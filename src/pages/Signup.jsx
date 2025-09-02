import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import { supabase } from '../supabase';
import '../styles/Signup.css';

export default function Signup() {
  // 폼 입력 상태
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  // 필수/선택 체크박스 상태
  const [termsAge, setTermsAge] = useState(false);
  const [termsService, setTermsService] = useState(false);
  const [termsPrivacy, setTermsPrivacy] = useState(false);
  const [termsMarketing, setTermsMarketing] = useState(false); // 선택

  // 전체 동의 체크
  const handleTermsAll = (checked) => {
    setTermsAge(checked);
    setTermsService(checked);
    setTermsPrivacy(checked);
    setTermsMarketing(checked);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!termsAge || !termsService || !termsPrivacy) {
      alert("필수 항목에 모두 동의해주세요.");
      return;
    }

    // Supabase Auth 회원가입 (이메일 인증 필요)
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: password
    });

    if (error) {
      alert("회원가입 실패: " + error.message);
      return;
    }

    // user 테이블에 추가 정보 저장 (nickname 등)
    const { error: insertError } = await supabase.from('user').insert([{
      nickname: nickname.trim(),
      email: email.trim().toLowerCase(),
      is_over_14: termsAge,
      agree_terms: termsService,
      agree_privacy: termsPrivacy,
      agree_marketing: termsMarketing
    }]);

    if (insertError) {
      alert("추가 정보 저장 실패: " + insertError.message);
      return;
    }

    alert("회원가입 완료! 이메일 인증을 확인해주세요.");
    window.location.href = "/login";
  }

  return (
    <>
      <div className="login-container">
        <div className="login-subtitle">회원가입</div>
        <form className="login-form" onSubmit={handleSignup}>
          <div className="login-field">
            <label className="login-label" htmlFor="signup-email">이메일</label>
            <input
              className="login-input"
              id="signup-email"
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="signup-pw">비밀번호</label>
            <input
              className="login-input"
              id="signup-pw"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="signup-pw2">비밀번호 확인</label>
            <input
              className="login-input"
              id="signup-pw2"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="signup-nickname">닉네임</label>
            <input
              className="login-input"
              id="signup-nickname"
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
          </div>

          <div className="terms-title">필수/선택 항목 안내</div>
          <div className="terms-box">
            <label className="terms-all">
              <input
                type="checkbox"
                id="terms-all"
                className="terms-checkbox"
                checked={termsAge && termsService && termsPrivacy && termsMarketing}
                onChange={e => handleTermsAll(e.target.checked)}
              />
              <span className="terms-all-text">전체 동의</span>
            </label>

            <div className="terms-list">
              <label className="terms-item">
                <input
                  type="checkbox"
                  className="terms-checkbox"
                  checked={termsAge}
                  onChange={e => setTermsAge(e.target.checked)}
                />
                <span><span className="required">[필수]</span> 만 14세 이상입니다</span>
              </label>

              <label className="terms-item">
                <input
                  type="checkbox"
                  className="terms-checkbox"
                  checked={termsService}
                  onChange={e => setTermsService(e.target.checked)}
                />
                <span><span className="required">[필수]</span> 서비스 이용약관 동의</span>
                <Link to="/" className="terms-link">보기</Link>
              </label>

              <label className="terms-item">
                <input
                  type="checkbox"
                  className="terms-checkbox"
                  checked={termsPrivacy}
                  onChange={e => setTermsPrivacy(e.target.checked)}
                />
                <span><span className="required">[필수]</span> 개인정보 수집 및 이용 동의</span>
                <Link to="/" className="terms-link">보기</Link>
              </label>

              <label className="terms-item">
                <input
                  type="checkbox"
                  className="terms-checkbox"
                  checked={termsMarketing}
                  onChange={e => setTermsMarketing(e.target.checked)}
                />
                <span>[선택] 마케팅 정보 수신 동의</span>
                <Link to="/" className="terms-link">보기</Link>
              </label>
            </div>
          </div>

          <button type="submit" className="signup-btn">회원가입</button>
        </form>

        <Link to="/login" className="login-back">로그인으로 돌아가기</Link>
      </div>

      <Nav />
    </>
  );
}