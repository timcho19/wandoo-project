import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import '../styles/TalkView.css';

export default function TalkView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostWithMember = async () => {
      try {
        setLoading(true);

        // 1️⃣ 게시글 단일 조회
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('*')
          .eq('id', Number(id))
          .single();

        if (postError) throw postError;

        // 2️⃣ member 정보 조회
        const { data: memberData } = await supabase
          .from('member')
          .select('nickname, profile_img')
          .eq('email', postData.email)
          .single();

        // 3️⃣ 게시글에 member 붙이기
        setPost({ ...postData, member: memberData || null });
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostWithMember();
  }, [id]);

  if (loading) return <p>게시글을 불러오는 중...</p>;
  if (!post) return <p>게시글이 존재하지 않습니다.</p>;

  return (
    <div className="container">
      {/* 헤더 */}
      <header className="header">
        <Link to="/talk" className="back-button">
          <img src="/image/icon/arrow-left.svg" alt="뒤로가기" />
        </Link>
        <h1 className="page-title">{post.title}</h1>
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

      {/* 게시글 본문 */}
      <main>
        <article className="post">
          <div className="post-header">
            <div className="post-user">
              <button type="button" className="profile-btn">
                <img src={post.member?.profile_img} alt="프로필" />
              </button>
              <div className="user-info">
                <span className="username">{post.member?.nickname}</span>
                <span className="post-meta">
                  {post.location} · {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
            </div>
            <button type="button" className="icon-btn">
              <img src="/image/icon/more-vert.svg" alt="더보기" className="more-options" />
            </button>
          </div>

          <img src={post.image_url} alt="게시글 이미지" className="post-image" />
          <div className="post-content">
            <p className="post-text">{post.description}</p>
          </div>
        </article>
      </main>

      {/* 댓글 섹션 (하드코딩) */}
      <section className="comments-section">
        <h2 className="comments-title">댓글</h2>
        <div className="comments-list">
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
  );
}
