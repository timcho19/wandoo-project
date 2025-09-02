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
  const [categories, setCategories] = useState([]);
  const [position, setPosition] = useState('');
  const [isLoading, setIsLoading] = useState(false);


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

    if (isLoading) return; // 이미 요청 중이면 무시

    setIsLoading(true);

    try {
      if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      if (!termsAge || !termsService || !termsPrivacy) {
        alert("필수 항목에 모두 동의해주세요.");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password
      });

      if (error) {
        alert("회원가입 실패: " + error.message);
        return;
      }

      const { error: insertError } = await supabase.from('user').insert([{
        nickname: nickname.trim(),
        email: email.trim().toLowerCase(),
        is_over_14: termsAge,
        agree_terms: termsService,
        agree_privacy: termsPrivacy,
        agree_marketing: termsMarketing,
        categories,
        position
      }]);

      if (insertError) {
        if (insertError.code === '23505') {
          alert("이미 등록된 이메일입니다.");
        } else {
          alert("추가 정보 저장 실패: " + insertError.message);
        }
        return;
      }

      alert("회원가입 완료! 이메일 인증을 확인해주세요.");
      window.location.href = "/login";
    } finally {
      setIsLoading(false); // 무조건 false로 복구
    }
  };

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

          <div className="login-field">
            <label className="login-label">관심사</label>
            <div className="category-options">
              {['전체', '운동/스포츠', '문화/예술', '취미', '스터디', '친목'].map(cat => (
                <label key={cat} className="category-checkbox" htmlFor={`category-${cat}`}>
                  <input
                    id={`category-${cat}`}
                    type="checkbox"
                    value={cat}
                    checked={cat === '전체'
                      ? categories.length === 5 // 전체 카테고스 선택 시 전체 체크
                      : categories.includes(cat)}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (value === '전체') {
                        // 전체 클릭 시: 이미 모든 카테고리가 선택되어 있으면 해제, 아니면 모두 선택
                        if (categories.length === 5) {
                          setCategories([]);
                        } else {
                          setCategories(['운동/스포츠', '문화/예술', '취미', '스터디', '친목']);
                        }
                      } else {
                        // 개별 카테고리 선택/해제
                        if (categories.includes(value)) {
                          setCategories(categories.filter(c => c !== value));
                        } else {
                          setCategories([...categories, value]);
                        }
                      }
                    }}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="category-content">
            <div className="category-box" >
              {categories && categories.length > 0 ? (
                categories.map(cat => (
                  <div key={cat} className="category-tag">{cat}</div>
                ))
              ) : (
                <div>관심사를 선택해주세요</div>
              )}
            </div>
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="positions" defaultValue="지역선택">위치</label>
            <select className="login-input"
              id="positions"
              value={position}
              onChange={e => setPosition(e.target.value)}>
              <option value="지역선택" disabled>지역</option>
              <option value="종로구">종로구</option>
              <option value="강남구">강남구</option>
              <option value="서초구">서초구</option>
              <option value="마포구">마포구</option>
              <option value="용산구">용산구</option>
            </select>
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

          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <Link to="/login" className="login-back">로그인으로 돌아가기</Link>
      </div>

      <Nav />
    </>
  );
}