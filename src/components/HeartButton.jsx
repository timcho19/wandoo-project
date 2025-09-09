
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function HeartButton({ postId, currentUser, likeCount, onLike }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!currentUser?.id || !postId) return;
    const key = `liked_post_${currentUser.id}_${postId}`;
    setLiked(localStorage.getItem(key) === "true");
  }, [currentUser?.id, postId]);

  const handleLike = () => {
    if (!currentUser?.id) return;
    const key = `liked_post_${currentUser.id}_${postId}`;
    // 토글: 누르면 true, 다시 누르면 false
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem(key, newLiked ? "true" : "false");
    onLike(postId, liked); // liked: 현재 상태, onLike에서 반영
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      className="action-btn"
      disabled={!currentUser?.id}
      style={{ cursor: currentUser?.id ? "pointer" : "default" }}
    >
      <img
        src={liked ? "/image/icon/heart-fill.svg" : "/image/icon/heart-1.svg"}
        alt="좋아요"
        className="action-icon"
      />
      <span>{typeof likeCount === 'number' && likeCount >= 0 ? likeCount : 0}</span>
    </button>
  );
}
