import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "../styles/Talk.css";
import HeartButton from "../components/HeartButton";

export default function Talk() {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  // ...기존 코드...

  // 1️⃣ 현재 로그인한 사용자 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: memberData } = await supabase
          .from("member")
          .select("id, nickname, profile_img")
          .eq("email", session.user.email)
          .single();
        setCurrentUser(memberData || null);
      }
    };
    fetchUser();
  }, []);
  // 2️⃣ posts와 member, 댓글 수 가져오기
  useEffect(() => {
    const fetchPostsWithMembers = async () => {
      try {
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (postsError) throw postsError;

        // 실제 받아온 postsData의 id와 key 값을 모두 출력
        console.log("postsData id/key:", postsData.map(post => ({ id: post.id, key: post.key })));

        const postsWithMembers = await Promise.all(
          postsData.map(async (post) => {
            const { data: memberData } = await supabase
              .from("member")
              .select("nickname, profile_img")
              .eq("email", post.email)
              .single();

            const { count: commentCount } = await supabase
              .from("comments")
              .select("id", { count: "exact", head: true })
              .eq("post_id", post.id);

            return { ...post, member: memberData || null, commentCount: commentCount || 0 };
          })
        );

        setPosts(postsWithMembers);
      } catch (error) {
        console.error("Error fetching posts or members:", error);
      }
    };

    fetchPostsWithMembers();
  }, []);

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  console.log(posts);

  // 좋아요 클릭 시 posts 테이블 like 컬럼 +1
  // 좋아요 토글: 누르면 증가, 다시 누르면 감소
  const handleLike = async (postId, liked) => {
    try {
      // 현재 like 값 가져오기
      const { data: postData, error: getError } = await supabase
        .from("posts")
        .select("like")
        .eq("id", postId)
        .single();
      if (getError) throw getError;
      const currentLike = postData?.like ?? 0;
      const newLike = liked ? Math.max(currentLike - 1, 0) : currentLike + 1;
      const { error } = await supabase
        .from("posts")
        .update({ like: newLike })
        .eq("id", postId);
      if (error) throw error;
      // 최신 posts 데이터 다시 fetch
      const { data: postsData } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      // member/commentCount 정보 다시 매핑
      const postsWithMembers = await Promise.all(
        postsData.map(async (post) => {
          const { data: memberData } = await supabase
            .from("member")
            .select("nickname, profile_img")
            .eq("email", post.email)
            .single();
          const { count: commentCount } = await supabase
            .from("comments")
            .select("id", { count: "exact", head: true })
            .eq("post_id", post.id);
          return { ...post, member: memberData || null, commentCount: commentCount || 0 };
        })
      );
      setPosts(postsWithMembers);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  return (
    <>
      <div className="talk-container">
        <header className="header">
          <div className="logo">WANDOO TALK</div>
          <Link to="/notification">
            <img src="/image/icon/bell.svg" alt="알림" className="bell-icon" />
          </Link>
          <span className="noti-badge">4</span>
        </header>

        <section className="search-section">
          <div className="filter-area">
            <div className="filter-item">
              <select className="filter-select" defaultValue="지역선택">
                <option value="지역선택" disabled>지역</option>
                <option value="종로구">종로구</option>
                <option value="강남구">강남구</option>
                <option value="서초구">서초구</option>
                <option value="마포구">마포구</option>
                <option value="용산구">용산구</option>
              </select>
            </div>
            <div className="filter-item">
              <select className="filter-select" defaultValue="카테고리">
                <option value="카테고리" disabled>카테고리</option>
                <option value="all">전체</option>
                <option value="sports">운동/스포츠</option>
                <option value="culture">문화/예술</option>
                <option value="hobby">취미</option>
                <option value="study">스터디</option>
                <option value="social">친목</option>
              </select>
            </div>
          </div>
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="검색어를 입력해주세요" />
            <img src="/image/icon/arrow.svg" alt="검색" className="search-icon" />
          </div>
        </section>

        <main>
          {posts.length === 0 ? (
            <p>게시글이 없습니다.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post">
                {/* 상단 프로필 영역 */}
                <div className="post-header">
                  <div className="post-user">
                    <img
                      src={post.member?.profile_img || "/default-profile.png"}
                      alt="프로필"
                      className="profile-img"
                    />
                    <span className="username">{post.member?.nickname || "익명"}</span>
                  </div>
                  <span className="post-meta">
                    {post.location} · {new Date(post.created_at).toLocaleString()}
                  </span>
                </div>

                {/* 이미지 클릭 시 talkview로 이동 */}
                {post.image_url && (
                  <Link to={`/talkview/${post.id}`}>
                    <img src={post.image_url} alt="게시글 이미지" className="post-image" />
                  </Link>
                )}

                {/* 게시글 내용 */}
                <div className="post-content">
                  <Link to={`/talkview/${post.id}`} className="post-text">
                    {expandedPosts[post.id]
                      ? post.description
                      : `${post.description.slice(0, 100)}`}
                  </Link>
                  {post.description.length > 100 && (
                    <div
                      className="more-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(post.id);
                      }}
                    >
                      {expandedPosts[post.id] ? "접기" : "더보기"}
                    </div>
                  )}
                </div>

                {/* 액션 영역: 댓글/좋아요 */}
                <div className="post-actions">
                  <Link to={`/talkview/${post.id}`} className="action-btn">
                    <img src="/image/icon/comment.svg" alt="댓글" className="action-icon" />
                    <span>{post.commentCount}</span>
                  </Link>

                  <HeartButton
                    postId={post.id}
                    currentUser={currentUser}
                    likeCount={post.like}
                    onLike={handleLike}
                  />
                </div>
              </div>
            ))
          )}
        </main>

        {/* 모임 만들기 버튼 */}
        <Link to="/createtalk" className="floating-btn" aria-label="모임 만들기">
          <img src="/image/icon/add.svg" alt="추가 버튼" />
        </Link>

        <Footer />
      </div>
      <Nav />
    </>
  );
}
