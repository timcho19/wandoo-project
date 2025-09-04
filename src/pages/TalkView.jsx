import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Comments from "../components/Comments";
import "../styles/TalkView.css";

export default function TalkView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchPostWithMember = async () => {
      try {
        setLoading(true);

        // 게시글 단일 조회
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", Number(id))
          .single();

        if (postError) throw postError;

        // member 정보 조회
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

      // 현재 로그인 유저의 member 테이블 id 조회
      const { data: memberData } = await supabase
        .from("member")
        .select("id, nickname, profile_img")
        .eq("email", session.user.email)
        .single();

      setCurrentUser(memberData || null);
    };

    fetchPostWithMember();
    fetchCurrentUser();
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

      {/* 댓글 */}
      {currentUser ? (
        <Comments postId={post.id} currentUser={currentUser} />
      ) : (
        <p style={{ padding: "1rem", color: "#777" }}>
          로그인해야 댓글을 작성할 수 있습니다.
        </p>
      )}
    </div>
  );
}
