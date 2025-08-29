
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import '../styles/CreateTalk.css'

export default function CreateTalk(){
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
            <div className="form-container">
                <div className="form-group">
                    <label className="form-label" htmlFor='category'>카테고리</label>
                    <select className="form-select" id='category'>
                        <option value="" disabled selected>카테고리를 선택해주세요.</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor='position'>위치</label>
                    <select className="form-select" id='position'>
                        <option value="" disabled selected>위치를 선택해주세요.</option>
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
                    <input type="text" className="form-input" placeholder="제목을 입력해주세요." id='title'/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor='comment'>설명</label>
                    <textarea className="form-textarea" placeholder="내용을 입력해주세요" id='comment'></textarea>
                </div>

                <button className="submit-btn">개설하기</button>
            </div>
        </main>
    </div>
  </>
  )
}