import { Link } from 'react-router-dom';
import '../styles/TalkView.css';

export default function TalkView() {
  return (
    <>
      <div className="container">
        <header className="header">
          <Link to="/talk" className="back-button">
            <img src="/image/icon/arrow-left.svg" alt="뒤로가기" />
          </Link>
          <h1 className="page-title">오늘의 하늘</h1>
          <div className="header-actions">
            <button type="button" className="icon-btn">
              <img src="/image/icon/sharing.svg" alt="공유" className="header-icon" />
            </button>
            <button type="button" className="icon-btn">
              <img src="/image/icon/heart.svg" alt="저장" className="header-icon" />
            </button>
            <button type="button" className="icon-btn">
              <img src="/image/icon/report.svg" alt="신고" className="header-icon" />
            </button>
          </div>
        </header>

        <main>
          <article className="post">
            <div className="post-header">
              <div className="post-user">
                <button type="button" className="profile-btn">
                  <img src="/image/profile/person-8.jpg" alt="프로필" />
                </button>
                <div className="user-info">
                  <span className="username">감성좌</span>
                  <span className="post-meta">영화 · 인사동 · 1시간전</span>
                </div>
              </div>
              <button type="button" className="icon-btn">
                <img src="/image/icon/more-vert.svg" alt="더보기" className="more-options" />
              </button>
            </div>
            <img src="/image/start.jpg" alt="게시글 이미지" className="post-image" />
            <div className="post-content">
              <p>
                퇴근 하는길에 하늘을 봤더니, 별이 엄청 많아서 한장 찍어봤습니다
                <br />
                엄청 이쁘네요. 같이 가실분 댓글 주세요 ~
              </p>
            </div>
            <div className="post-actions">
              <div className="action-btn">
                <button type="button" className="icon-btn">
                  <img src="/image/icon/comment.svg" alt="댓글" className="action-icon" />
                </button>
                <span>5</span>
              </div>
              <div className="action-btn">
                <button type="button" className="icon-btn">
                  <img src="/image/icon/heart-1.svg" alt="좋아요" className="action-icon" />
                </button>
                <span>9</span>
              </div>
            </div>
          </article>
        </main>

        {/* 댓글 섹션 */}
        <section className="comments-section">
          <h2 className="comments-title">댓글</h2>

          <div className="comments-list">
            {/* 댓글 반복 */}
            <div className="comment">
              <div className="comment-header">
                <div className="comment-user">
                  <button type="button" className="profile-btn">
                    <img src="/image/profile/person-10.jpg" alt="프로필" />
                  </button>
                  <span className="username">홍길동</span>
                  <span style={{ color: '#777', fontSize: '12px' }}>· 30분전</span>
                </div>
                <button type="button" className="icon-btn">
                  <img src="/image/icon/more-vert.svg" alt="더보기" className="more-options" />
                </button>
              </div>
              <p className="comment-content">오늘 하늘 진짜 예술이었어요… 저도 잠깐 멍 때리고 봤네요.</p>
            </div>

            <div className="comment">
              <div className="comment-header">
                <div className="comment-user">
                  <button type="button" className="profile-btn">
                    <img src="/image/profile/person-9.jpg" alt="프로필" />
                  </button>
                  <span className="username">홍길동</span>
                  <span style={{ color: '#777', fontSize: '12px' }}>· 30분전</span>
                </div>
                <button type="button" className="icon-btn">
                  <img src="/image/icon/more-vert.svg" alt="더보기" className="more-options" />
                </button>
              </div>
              <p className="comment-content">오늘 하늘 진짜 예술이었어요… 저도 잠깐 멍 때리고 봤네요.</p>
            </div>
          </div>
        </section>

        {/* 댓글 입력창 */}
        <div className="comment-input-container">
          <div className="comment-input-wrapper">
            <button type="button" className="profile-btn">
              <img src="/image/profile/person-11.jpg" alt="프로필" />
            </button>
            <div className="comment-input-box">
              <input type="text" className="comment-input" placeholder="댓글을 입력해주세요." />
              <div className="comment-actions">
                <button type="button" className="comment-action-btn">
                  <img src="/image/icon/mood.svg" alt="이모티콘" />
                </button>
                <button type="button" className="comment-action-btn">
                  <img src="/image/icon/send.svg" alt="전송" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
