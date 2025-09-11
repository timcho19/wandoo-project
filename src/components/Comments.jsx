import { useRef, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Comments({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();
  const [editComment, setEditComment] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const editInputRef = useRef(null);




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

  const handlerDelete = async (commentId) => {
    const confirmDelete = window.confirm('정말로 이 댓글을 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.');
    if (!confirmDelete) return;

    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .select();

    console.log('삭제 결과:', data); // 삭제된 row 정보
    if (error) {
      console.error('댓글 삭제 실패:', error);
    } else {
      alert('댓글이 삭제되었습니다.');
      navigate(0);
    }
  }
  const commentHandler = () => {
    if (isEditing) {
      // 수정 모드에서 저장 버튼 클릭 시 
      const updateComment = async () => {
        const { data, error } = await supabase
          .from('comments')
          .update({ content: editComment })
          .eq('id', isEditing)
          .select();


        if (error) {
          console.error('댓글 수정 실패:', error);
        } else {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === isEditing ? { ...comment, content: editComment } : comment
            )
          );
          setIsEditing(null);
          setEditComment('');
          setMenuOpen(null);
        }
      };
      updateComment();
    } else {
      // 수정 모드로 전환
      const commentToEdit = comments.find((comment) => comment.id === menuOpen);
      if (commentToEdit) {
        setIsEditing(commentToEdit.id);
        setEditComment(commentToEdit.content);
        setMenuOpen(null);
      }
    }
  }
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  return (
    <section className="comments-section">
      <h2 className="comments-title">댓글</h2>

      <div className="comments-list">
        {comments.length === 0 && currentUser ? (
          <div className="no-comments" style={{ textAlign: 'center', color: '#888', padding: '1rem' }}>
            현재 입력된 댓글이 없습니다.
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header" style={{ position: 'relative' }}>
                <div className="comment-user">
                  <div className="comment-user-info">
                    <button type="button" className="profile-btn">
                      <img
                        src={comment.member?.profile_img || "/image/profile/person-11.jpg"}
                        alt="프로필"
                      />
                    </button>
                    <span className="username">{comment.member?.nickname || "익명"}</span>
                    <span style={{ color: "#777", fontSize: "12px" }}>
                      {comment.created_at ? `${new Date(comment.created_at).toLocaleDateString()} ${new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  ` : ""}
                    </span>
                  </div>
                </div>
                <div className="comment-btn">
                  {/* 내 댓글이면 더보기 버튼 보여주기 */}
                  {currentUser?.id === comment.member?.id && (

                    <button type="button" className="icon-btn">
                      <img
                        src="/image/icon/more-vert.svg"
                        alt="더보기"
                        className="more-options"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        onClick={() => {
                          console.log('더보기 버튼 클릭됨');
                          setMenuOpen(menuOpen === comment.id ? null : comment.id)
                        }}
                      />
                    </button>
                  )}
                  {menuOpen === comment.id && (
                    <div className="settings-btn" style={{
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
                    }}
                      onClick={() => {
                        setMenuOpen(null);
                      }}
                    >
                      <button
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
                        onClick={commentHandler}
                      >수정</button>
                      <button
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
                        onClick={() => {
                          setMenuOpen(null);
                          handlerDelete(comment.id);
                        }}
                      >삭제</button>
                    </div>
                  )}
                </div>
              </div>
              {isEditing === comment.id ? (
                <div className="comment-edit-container">
                  <input
                    ref={isEditing === comment.id ? editInputRef : null}
                    type="text"
                    className="editcomment-input"
                    placeholder={comment.content}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && commentHandler()}
                  />
                  <div className="comment-edit-actions">
                    <button
                      type="button"
                      className="comment-action-btn"
                      onClick={commentHandler}
                    > <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#40B440"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" /></svg>
                    </button>
                    <button
                      type="button"
                      className="comment-action-btn"
                      onClick={() => setIsEditing(null)}
                    > <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#ff4444"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" /></svg>
                    </button>
                  </div>
                </div>
              )
                : <p className="comment-content">{comment.content}</p>}
            </div>
          ))
        )}
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
