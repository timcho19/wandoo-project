import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabase';
import '../styles/Signup.css';
import { v4 as uuidv4 } from 'uuid';
export default function Signup() {
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState([]);
  const [position, setPosition] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLocked, setIsEmailLocked] = useState(false);
  const [isSocialSignup, setIsSocialSignup] = useState(false);
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const [termsAge, setTermsAge] = useState(false);
  const [termsService, setTermsService] = useState(false);
  const [termsPrivacy, setTermsPrivacy] = useState(false);
  const [termsMarketing, setTermsMarketing] = useState(false);

  const handleTermsAll = (checked) => {
    setTermsAge(checked);
    setTermsService(checked);
    setTermsPrivacy(checked);
    setTermsMarketing(checked);
  };

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      setProfileImg(file);
    } else {
      setPreviewUrl('');
      setProfileImg('');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    let missingFields = [];

    if (!nickname.trim()) missingFields.push("닉네임");
    if (!position || position === "지역선택") missingFields.push("위치");
    if (categories.length === 0) missingFields.push("관심사");
    if (!termsAge) missingFields.push("만 14세 이상 동의");
    if (!termsService) missingFields.push("서비스 이용약관 동의");
    if (!termsPrivacy) missingFields.push("개인정보 수집 및 이용 동의");

    if (missingFields.length > 0) {
      alert(`다음 항목을 입력/동의해주세요: ${missingFields.join(", ")}`);
      setIsLoading(false); 
      return;
    }
    try {
      if (!isSocialSignup && password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        setIsLoading(false);
        return;
      }

      if (!nickname.trim() || !position || !termsAge || !termsService || !termsPrivacy) {
        alert("필수 항목을 모두 입력하고 동의해주세요.");
        return;
      }

      const passwordToUse = isSocialSignup ? crypto.randomUUID() : password;

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: passwordToUse
      });

      if (error && error.message.includes('already registered')) {
        // 이미 등록된 이메일이면 비밀번호는 업데이트하지 않고 회원가입 정보만 저장
      } else if (error) {
        alert("회원가입 실패: " + error.message);
        return;
      }

      let imageUrl = '';
      if (profileImg) {
        const sanitizedFileName = profileImg.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const filePath = `test/${Date.now()}-${uuidv4()}-${sanitizedFileName}`;
        const { error: uploadError } = await supabase.storage.from('posts').upload(filePath, profileImg);

        if (uploadError) {
          alert(`이미지 업로드 실패: ${uploadError.message}`);
          return;
        }

        const { data: publicUrlData } = supabase.storage.from('posts').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from('member').upsert([{
        nickname: nickname.trim(),
        email: email.trim().toLowerCase(),
        is_over_14: termsAge,
        agree_terms: termsService,
        agree_privacy: termsPrivacy,
        agree_marketing: termsMarketing,
        categories,
        position,
        profile_img: imageUrl
      }], { onConflict: ['email'] });

      if (insertError) {
        alert("회원정보 저장 실패: " + insertError.message);
        return;
      }

      alert("회원가입 완료!");
      navigate("/login");

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
      setIsEmailLocked(true);
      setIsSocialSignup(true);
    }
  }, [location]);

  return (
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
            readOnly={isEmailLocked}
          />
        </div>

        {!isSocialSignup && (
          <>
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
          </>
        )}

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
          <label className="login-label" htmlFor="signup-profile-img">프로필 이미지 업로드</label>
          <input
            className="login-input"
            id="signup-profile-img"
            type="file"
            accept="image/*"
            onChange={handleProfileImgChange}
          />
          {previewUrl && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <img src={previewUrl} alt="미리보기" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee' }} />
              <div style={{ fontSize: '12px', color: '#888' }}>미리보기</div>
            </div>
          )}
        </div>

        <div className="login-field">
          <label className="login-label">관심사</label>
          <div className="category-options">
            {['전체', '운동/스포츠', '문화/예술', '취미', '스터디', '친목'].map(cat => (
              <label key={cat} className="category-checkbox">
                <input
                  type="checkbox"
                  value={cat}
                  checked={cat === '전체' ? categories.length === 5 : categories.includes(cat)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '전체') {
                      if (categories.length === 5) setCategories([]);
                      else setCategories(['운동/스포츠', '문화/예술', '취미', '스터디', '친목']);
                    } else {
                      if (categories.includes(value)) setCategories(categories.filter(c => c !== value));
                      else setCategories([...categories, value]);
                    }
                  }}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="category-content">
          <div className="category-box">
            {categories.length > 0 ? categories.map(cat => <div key={cat} className="category-tag">{cat}</div>) : <div>관심사를 선택해주세요</div>}
          </div>
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="positions">위치</label>
          <select className="login-input" id="positions" value={position} onChange={e => setPosition(e.target.value)}>
            <option value="" disabled>지역 선택</option>
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
            <input type="checkbox" checked={termsAge && termsService && termsPrivacy && termsMarketing} onChange={e => handleTermsAll(e.target.checked)} />
            <span className="terms-all-text">전체 동의</span>
          </label>

          <div className="terms-list">
            <label className="terms-item">
              <input type="checkbox" checked={termsAge} onChange={e => setTermsAge(e.target.checked)} />
              <span><span className="required">[필수]</span> 만 14세 이상입니다</span>
            </label>

            <label className="terms-item">
              <input type="checkbox" checked={termsService} onChange={e => setTermsService(e.target.checked)} />
              <span><span className="required">[필수]</span> 서비스 이용약관 동의</span>
              <Link to="/" className="terms-link">보기</Link>
            </label>

            <label className="terms-item">
              <input type="checkbox" checked={termsPrivacy} onChange={e => setTermsPrivacy(e.target.checked)} />
              <span><span className="required">[필수]</span> 개인정보 수집 및 이용 동의</span>
              <Link to="/" className="terms-link">보기</Link>
            </label>

            <label className="terms-item">
              <input type="checkbox" checked={termsMarketing} onChange={e => setTermsMarketing(e.target.checked)} />
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
  );
}