import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/CreateFind.css';
import { supabase } from '../supabase';

export default function CreateFind() {
  const navigate = useNavigate();
  const [meetingType, setMeetingType] = useState('번개모임'); //
  const [imagePreview, setImagePreview] = useState(null);
  const [user, setUser] = useState(null); // 로그인 사용자
  const [userEmail, setUserEmail] = useState(''); // 사용자 이메일
  const [formData, setFormData] = useState({
    date: '',
    week: '',
    day: '',
    category: '',
    position: '',
    participants: '',
    title: '',
    comment: ''
  });

  // 로그인 체크
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else {
        setUser(user);
        setUserEmail(user.email);
      }
    };
    checkUser();
  }, [navigate]);




  // 토글 버튼 클릭
  const handleToggle = (type) => setMeetingType(type);

  // 이미지 선택 핸들러
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else if (file) {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  // 드래그 앤 드롭
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageSelect({ target: { files } });
    }
  };

  // 폼 입력 변화
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 폼 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력값 검증 (필수)
    if (!formData.title || !formData.category || !formData.position || !formData.participants) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const insertData = {
      title: formData.title,
      description: formData.comment,
      category: formData.category,
      location: formData.position,
      participants: Number(formData.participants),
      image_url: imagePreview,
      type: meetingType,
      date: meetingType === '번개모임' ? formData.date : null,
      recurrence_type: meetingType === '정기모임' ? formData.week : null,
      recurrence_days: meetingType === '정기모임' ? formData.day : null,
      user_id: formData.user_id,
      email: userEmail
    };

    try {
      const { data, error } = await supabase
        .from('meetings')
        .insert([insertData]);

      if (error) throw error;

      alert('모임이 성공적으로 개설되었습니다!');
      navigate('/');
    } catch (err) {
      console.error('모임 개설 실패:', err.message);
      alert('모임 개설 중 오류가 발생했습니다.');
    }
    if (!userEmail) {
      alert('로그인 정보가 없습니다.');
      return;
    }
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="header-left">
            <Link to="/find" className="back-button">
              <img src="/image/icon/arrow-left.svg" alt="" />
            </Link>
            <h1 className="header-title">모임개설</h1>
          </div>
        </header>

        <main>
          <h2 className="section-title">당신의 완두 모임, 지금 시작해요</h2>

          <form className="form-container" onSubmit={handleSubmit}>
            {/* 토글 버튼 */}
            <div className="toggle-buttons">
              <button
                type="button"
                className={`toggle-btn ${meetingType === '번개모임' ? 'active' : ''}`}
                onClick={() => handleToggle('번개모임')}
              >
                번개모임
              </button>
              <button
                type="button"
                className={`toggle-btn ${meetingType === '정기모임' ? 'active' : ''}`}
                onClick={() => handleToggle('정기모임')}
              >
                정기모임
              </button>
            </div>

            {/* 번개모임 필드 */}
            {meetingType === '번개모임' && (
              <div className="instant-fields show">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">날짜 및 시간</label>
                  <input
                    type="datetime-local"
                    className="form-input"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* 정기모임 필드 */}
            {meetingType === '정기모임' && (
              <div className="regular-fields show">
                <div className="form-group">
                  <label className="form-label" htmlFor="week">주 선택</label>
                  <select
                    className="form-select"
                    id="week"
                    value={formData.week}
                    onChange={handleChange}
                  >
                    <option value="" disabled>매주</option>
                    <option value="매주">매주</option>
                    <option value="첫째 주">첫째 주</option>
                    <option value="둘째 주">둘째 주</option>
                    <option value="셋째 주">셋째 주</option>
                    <option value="넷째 주">넷째 주</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="day">요일 선택</label>
                  <select
                    className="form-select"
                    id="day"
                    value={formData.day}
                    onChange={handleChange}
                  >
                    <option value="" disabled>요일을 선택해주세요</option>
                    <option value="월요일">월요일</option>
                    <option value="화요일">화요일</option>
                    <option value="수요일">수요일</option>
                    <option value="목요일">목요일</option>
                    <option value="금요일">금요일</option>
                    <option value="토요일">토요일</option>
                    <option value="일요일">일요일</option>
                  </select>
                </div>
              </div>
            )}

            {/* 공통 필드 */}
            <div className="form-group">
              <label className="form-label" htmlFor="category">카테고리</label>
              <select
                className="form-select"
                id="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled>카테고리를 선택해주세요</option>
                <option value="운동/스포츠">운동/스포츠</option>
                <option value="문화/예술">문화/예술</option>
                <option value="취미">취미</option>
                <option value="스터디">스터디</option>
                <option value="친목">친목</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="position">위치</label>
              <select
                className="form-select"
                id="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="" disabled>위치를 선택해주세요</option>
                <option value="서울특별시 강남구">강남구</option>
                <option value="서울특별시 서초구">서초구</option>
                <option value="서울특별시 마포구">마포구</option>
                <option value="서울특별시 용산구">용산구</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">참여 인원</label>
              <input
                type="number"
                min="2"
                max="100"
                className="form-input"
                placeholder="참여 인원을 입력해주세요"
                id="participants"
                value={formData.participants}
                onChange={handleChange}
              />
            </div>

            {/* 이미지 업로드 */}
            <div className="form-group">
              <label className="form-label" htmlFor="imageUpload">대표이미지</label>
              <div
                className="upload-area"
                onClick={() => document.getElementById('imageUpload').click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageSelect}
                />
                <img src="/image/icon/image_arrow_up.svg" alt="업로드" className="upload-icon" />
                <p className="upload-text">이미지 파일을 드래그 또는 클릭하여 업로드</p>
                {imagePreview && (
                  <div className="upload-preview">
                    <img 
                    src={imagePreview} 
                    alt="미리보기" 
                    style={{ width: "100%", marginTop: "10px", borderRadius: "8px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="title">글 제목</label>
              <input
                type="text"
                className="form-input"
                placeholder="제목을 입력해주세요"
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="comment">모임 설명</label>
              <textarea
                className="form-textarea"
                placeholder="모임 설명을 해주세요"
                id="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">개설하기</button>
          </form>
        </main>
      </div>

    </>
  );
}