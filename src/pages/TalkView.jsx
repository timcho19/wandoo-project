import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Comments from "../components/Comments";
import { Helmet } from 'react-helmet';
import "../styles/TalkView.css";

export default function TalkView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const TogleOptions = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const fetchPostWithMember = async () => {
      try {
        setLoading(true);

        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (postError) throw postError;

        const { data: memberData } = await supabase
          .from("member")
          .select("id, nickname, profile_img")
          .eq("email", postData.email)
          .single();

        setPost({ ...postData, member: memberData || null });
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data: memberData } = await supabase
        .from("member")
        .select("id, nickname, profile_img,email")
        .eq("email", session.user.email)
        .single();

      setCurrentUser(memberData || null);
    };

    fetchPostWithMember();
    fetchCurrentUser();
  }, [id]);

  // 🔥 수정: 로딩 중일 때 적절한 JSX 반환
  if (loading) return <div style={{height:'100vh'}}>로딩 중...</div>;

  // 🔥 수정: post가 없을 때 처리
  if (!post) {
    return (
      <div className="container">
        <p>게시글을 찾을 수 없습니다.</p>
        <Link to="/talk">목록으로 돌아가기</Link>
      </div>
    );
  }

  const handlerDelete = async () => {
    const confirmDelete = window.confirm('정말로 이 글을 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.');
    if (!confirmDelete) return;

    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('email', currentUser.email);

    console.log('삭제 결과:', data);

    if (error) {
      console.error('글 삭제 실패:', error);
    } else {
      alert('글이 삭제되었습니다.');
      window.location.href = '/talk';
    }
  }

  // 🔥 수정: 권한 체크를 더 안전하게
  const isOwner = post && currentUser &&
    post.email?.trim().toLowerCase() === currentUser.email?.trim().toLowerCase();

  return (
    <>
      <Helmet>
        <title>완두톡 글보기 | WANDOO</title>
      </Helmet>

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
                    {post.location} · {new Date(post.created_at).toLocaleDateString()} {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* 🔥 수정: 인라인 스타일로 CSS 문제 우회 */}
              {isOwner && (
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('더보기 버튼 클릭됨');
                      setMenuOpen(prev => !prev);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <img src="/image/icon/more-vert.svg" alt="더보기" />
                  </button>

                  {menuOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      zIndex: 9999,
                      backgroundColor: 'white',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      minWidth: '80px',
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('수정 버튼 클릭됨!');
                          setMenuOpen(false);
                          navigate(`/modifytalk/${post.id}`);
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 15px',
                          border: 'none',
                          background: 'white',
                          cursor: 'pointer',
                          textAlign: 'left',
                          borderBottom: '1px solid #eee'
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('삭제 버튼 클릭됨!');
                          setMenuOpen(false);
                          handlerDelete();
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 15px',
                          border: 'none',
                          background: 'white',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: '#ff4444'
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {post.image_url && <img src={post.image_url} alt="게시글 이미지" className="post-image" />}
            <div className="postview-content">
              <pre className="post-text description-pre">{post.description}</pre>
            </div>
          </article>
        </main>

        {/* 댓글 */}
        <Comments postId={post.id} currentUser={currentUser} />

        {!currentUser && (
          <p style={{ padding: "1rem", color: "#777", textAlign: "center" }}>
            로그인해야 댓글을 작성할 수 있습니다.
          </p>
        )}
      </div>
    </>
  );
}