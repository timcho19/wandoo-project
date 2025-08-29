import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/CreateFind.css'

export default function CreateFind(){
  /*
          // 토글 버튼 기능
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        const instantFields = document.querySelector('.instant-fields');
        const regularFields = document.querySelector('.regular-fields');

        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 버튼 스타일 토글
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // 필드 토글
                if (button.dataset.type === 'instant') {
                    instantFields.classList.add('show');
                    regularFields.classList.remove('show');
                } else {
                    instantFields.classList.remove('show');
                    regularFields.classList.add('show');
                }
            });
        });

        // 이미지 업로드 영역
        const uploadArea = document.querySelector('.upload-area');
        const imageUpload = document.getElementById('imageUpload');
        const imagePreview = document.getElementById('imagePreview');

        uploadArea.addEventListener('click', () => {
            imageUpload.click();
        });

        imageUpload.addEventListener('change', handleImageSelect);

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#40B440';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#ADB5BD';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#ADB5BD';

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                imageUpload.files = files;
                handleImageSelect({ target: imageUpload });
            }
        });

        function handleImageSelect(e) {
            const file = e.target.files[0];

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="미리보기">`;
                }

                reader.readAsDataURL(file);
            } else if (file) {
                alert('이미지 파일만 업로드 가능합니다.');
                imageUpload.value = '';
            }
        }
        */
  return(
    <>
    <div className="container">
        <header className="header">
            <div className="header-left">
                <Link to="/find" className="back-button"><img src="/image/icon/arrow-left.svg" alt=""/></Link>
                <h1 className="header-title">모임개설</h1>
            </div>
        </header>

        <main>
            <h2 className="section-title">당신의 완두 모임, 지금 시작해요</h2>

            <form className="form-container">
                <div className="toggle-buttons">
                    <button type="button" className="toggle-btn active" data-type="instant">번개모임</button>
                    <button type="button" className="toggle-btn" data-type="regular">정기모임</button>
                </div>

                <div className="instant-fields show">
                    <div className="form-group">
                        <label className="form-label" htmlFor='date'>날짜 및 시간</label>
                        <input type="datetime-local" className="form-input" id='date'/>
                    </div>
                </div>

                <div className="regular-fields">
                    <div className="form-group">
                        <label className="form-label" htmlFor='week'>주 선택</label>
                        <select className="form-select" id='week'>
                            <option value="" disabled selected>매주</option>
                            <option value="every">매주</option>
                            <option value="first">첫째 주</option>
                            <option value="second">둘째 주</option>
                            <option value="third">셋째 주</option>
                            <option value="fourth">넷째 주</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor='day'>요일 선택</label>
                        <select className="form-select" id='day'>
                            <option value="" disabled selected>요일을 선택해주세요</option>
                            <option value="mon">월요일</option>
                            <option value="tue">화요일</option>
                            <option value="wed">수요일</option>
                            <option value="thu">목요일</option>
                            <option value="fri">금요일</option>
                            <option value="sat">토요일</option>
                            <option value="sun">일요일</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor='category'>카테고리</label>
                    <select className="form-select" id='category'>
                        <option value="" disabled selected>카테고리를 선택해주세요</option>
                        <option value="sports">운동/스포츠</option>
                        <option value="culture">문화/예술</option>
                        <option value="hobby">취미</option>
                        <option value="study">스터디</option>
                        <option value="social">친목</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor='position'>위치</label>
                    <select className="form-select" id='position'>
                        <option value="" disabled selected>위치를 선택해주세요</option>
                        <option value="gangnam">강남구</option>
                        <option value="seocho">서초구</option>
                        <option value="mapo">마포구</option>
                        <option value="yongsan">용산구</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">참여 인원</label>
                    <input type="number" min="2" max="100" className="form-input" placeholder="참여 인원을 입력해주세요"/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor='imageUpload'>대표이미지</label>
                    <div className="upload-area">
                        <input type="file" id="imageUpload" accept="image/*" style={{display: 'none '}}/>
                        <img src="/image/icon/image_arrow_up.svg" alt="업로드" className="upload-icon"/>
                        <p className="upload-text">이미지 파일을 드래그 또는 클릭하여 업로드</p>
                        <p className="upload-preview">미리보기</p>
                        <div id="imagePreview"></div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor='title'>글 제목</label>
                    <input type="text" className="form-input" placeholder="제목을 입력해주세요" id='title'/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor='comment'>모임 설명</label>
                    <textarea className="form-textarea" placeholder="모임 설명을 해주세요" id='comment'></textarea>
                </div>

                <button type="submit" className="submit-btn">개설하기</button>
            </form>
        </main>
    </div>
    </>
  )
}