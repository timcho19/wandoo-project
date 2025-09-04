import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/CreateTalk.css';
import { supabase } from "../supabase";

// Supabase 클라이언트 생성 (중복 제거)
// const supabase = createClient(URL, KEY)

export default function CreateTalk() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true); // 로그인 체크 로딩
const [formData, setFormData] = useState({
  description: '',
  category: '',
  location: '',
  image_url: '',
});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(''); // 이미지 미리보기

  // 1️⃣ 로그인한 유저 이메일 가져오기 + 로그인 안되면 이동
  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user?.email) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else {
        setUserEmail(userData.user.email);
      }

      setLoading(false); // 로그인 체크 완료
    };
    fetchUser();
  }, [navigate]);

  // 2️⃣ 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3️⃣ 파일 선택 + 미리보기
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && typeof window !== "undefined") {
      setSelectedFile(file);
      const url = window.URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // 4️⃣ 폼 제출
const handleSubmit = async (e) => {
  e.preventDefault();


  if (!formData.title || !formData.description) {
    alert('제목과 설명은 필수입니다.');
    return;
  }

  let imageUrl = formData.image_url;

  if (selectedFile) {
    const filePath = `posts/${Date.now()}-${selectedFile.name}`;
    const { data, error } = await supabase.storage
      .from('posts')
      .upload(filePath, selectedFile);

    if (error) {
      alert(`이미지 업로드 실패: ${error.message}`);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('posts')
      .getPublicUrl(filePath);

    imageUrl = publicUrlData.publicUrl;
  }

  const { error } = await supabase
    .from('posts')
    .insert({

      description: formData.description,
      category: formData.category,
      location: formData.location,
      image_url: imageUrl || null,
      email: userEmail,
      title: formData.title,
    });

  if (error) {
    alert('오류가 발생했습니다: ' + error.message);
  } else {
    alert('게시글이 등록되었습니다!');
    navigate('/talk');
  }
};


  // 5️⃣ 로그인 체크 중이면 아무것도 렌더링하지 않음
  if (loading) return null;

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <Link to="/talk" className="back-button">
            <img src="./image/icon/arrow-left.svg" alt="" />
          </Link>
          <h1 className="header-title">완두톡</h1>
        </div>
      </header>

      <main>
        <h2 className="section-title">당신의 소식, 지금 들려주세요</h2>
        <form className="form-container" onSubmit={handleSubmit}>

          {/* 카테고리 */}
          <div className="form-group">
            <label className="form-label" htmlFor='category'>카테고리</label>
            <select
              className="form-select"
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>카테고리를 선택해주세요.</option>
              <option value="일상">일상</option>
              <option value="취미">취미</option>
              <option value="운동">운동</option>
              <option value="스터디">스터디</option>
            </select>
          </div>

          {/* 위치 */}
          <div className="form-group">
            <label className="form-label" htmlFor='location'>위치</label>
            <select
              className="form-select"
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
            >
              <option value="" disabled>위치를 선택해주세요.</option>
              <option value="강남구">강남구</option>
              <option value="홍대">홍대</option>
              <option value="신촌">신촌</option>
              <option value="여의도">여의도</option>
            </select>
          </div>

          {/* 이미지 업로드 */}
          <div className="form-group">
            <label className="form-label" htmlFor='imageUpload'>이미지</label>
            <div className="upload-area">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                name="image_url"
                onChange={handleFileChange}
              />
              <img src="./image/icon/image_arrow_up.svg" alt="업로드" className="upload-icon" />
              <p className="upload-text">이미지 파일을 드래그 또는 클릭하여 업로드</p>

              {/* 미리보기 */}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="미리보기"
                  style={{ width: "100%", marginTop: "10px", borderRadius: "8px", objectFit: "cover" }}
                />
              )}

              {selectedFile && (
                <p className="upload-preview">{selectedFile.name} 선택됨</p>
              )}
            </div>
          </div>

          {/* 제목 */}
<div className="form-group">
  <label className="form-label" htmlFor='title'>제목</label>
  <input
    type="text"
    className="form-input"
    id="title"
    name="title"
    placeholder="제목을 입력해주세요"
    value={formData.title || ""}
    onChange={handleChange}
    required
  />
</div>

          {/* 설명 */}
          <div className="form-group">
            <label className="form-label" htmlFor='description'>설명</label>
            <textarea
              className="form-textarea"
              placeholder="내용을 입력해주세요"
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">개설하기</button>
        </form>
      </main>
    </div>
  );
}
