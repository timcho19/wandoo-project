import { Link } from 'react-router-dom';
import { useState } from 'react';
import Nav from '../components/Nav';
import '../styles/CreateTalk.css'
import { supabase } from '../supabase';

export default function CreateTalk(){
    
    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        image_url: ''
    });

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 폼 제출 시
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 필수값 체크
        if (!formData.title || !formData.description) {
            alert('제목과 설명은 필수입니다.');
            return;
        }
        
        const { data, error } = await supabase
            .from('posts')
            .insert({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                location: formData.location,
                image_url: formData.image_url
            });
            
        console.log('결과:', data, error);
        
        if (error) {
            alert('오류가 발생했습니다: ' + error.message);
        } else {
            alert('게시글이 등록되었습니다!');
            // 폼 초기화
            setFormData({
                title: '',
                description: '',
                category: '',
                location: '',
                image_url: ''
            });
        }
    };

    return(
        <>
        <div className="container">
            <header className="header">
                <div className="header-left">
                    <Link to="/talk" className="back-button"><img src="./image/icon/arrow-left.svg" alt=""/></Link>
                    <h1 className="header-title">완두톡</h1>
                </div>
            </header>

            <main>
                <h2 className="section-title">당신의 소식, 지금 들려주세요</h2>
                <form className="form-container" onSubmit={handleSubmit}>
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

                    <div className="form-group">
                        <label className="form-label" htmlFor='imageUpload'>이미지</label>
                        <div className="upload-area">
                            <input type="file" id="imageUpload" accept="image/*" style={{display: 'none'}}/>
                            <img src="./image/icon/image_arrow_up.svg" alt="업로드" className="upload-icon"/>
                            <p className="upload-text">이미지 파일을 드래그 또는 클릭하여 업로드</p>
                            <p className="upload-preview">미리보기</p>
                            <div id="imagePreview"></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor='title'>글 제목</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="제목을 입력해주세요." 
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
        </>
    )
}