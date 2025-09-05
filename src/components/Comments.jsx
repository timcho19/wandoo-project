import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Comments({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*, member(id, nickname, profile_img)")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("댓글 불러오기 실패:", error);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSendComment = async () => {
    if (!newComment.trim() || !currentUser?.id) return;

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: postId,
          member_id: currentUser.id,
          content: newComment.trim(),
        },
      ])
      .select("*, member(id, nickname, profile_img)");

    if (error) {
      console.error("댓글 작성 실패:", error);
    } else {
      setComments((prev) => [data[0], ...prev]);
      setNewComment("");
    }
  };

  return (
    <section className="comments-section">
      <h2 className="comments-title">댓글</h2>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <div className="comment-user">
                <button type="button" className="profile-btn">
                  <img
                    src={comment.member?.profile_img || "/image/profile/person-11.jpg"}
                    alt="프로필"
                  />
                </button>
                <span className="username">{comment.member?.nickname || "익명"}</span>
                <span style={{ color: "#777", fontSize: "12px" }}>
                  · {comment.created_at ? new Date(comment.created_at).toLocaleString() : ""}
                </span>

                {/* 내 댓글이면 더보기 버튼 보여주기 */}
                {currentUser?.id === comment.member?.id && (
                  <button type="button" className="icon-btn">
                    <img
                      src="/image/icon/more-vert.svg"
                      alt="더보기"
                      className="more-options"
                    />
                  </button>
                )}
              </div>
            </div>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
      </div>

      {currentUser && (
        <div className="comment-input-container">
          <div className="comment-input-wrapper">
            <button type="button" className="profile-btn">
              <img
                src={currentUser.profile_img || "/image/profile/person-11.jpg"}
                alt="프로필"
              />
            </button>
            <div className="comment-input-box">
              <input
                type="text"
                className="comment-input"
                placeholder="댓글을 입력해주세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
              />
              <div className="comment-actions">
                <button
                  type="button"
                  className="comment-action-btn"
                  onClick={handleSendComment}
                >
                  <img src="/image/icon/send.svg" alt="전송" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
