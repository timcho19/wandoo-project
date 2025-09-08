import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function HeartButton({ postId, currentUser, showCount = true }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 페이지 로드 시 좋아요 상태 & 개수
  useEffect(() => {
    const fetchLikes = async () => {
      if (!postId) return;

      try {
        // 전체 좋아요 수 가져오기
        const { count, error: countError } = await supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", postId);

        if (countError) {
          console.error("Like count error:", countError);
          setLikeCount(0);
        } else {
          setLikeCount(count || 0);
        }

        // 로그인한 경우 내 좋아요 상태 확인
        if (currentUser?.id) {
          const { data: userLike, error: rpcError } = await supabase.rpc(
            "get_user_like",
            {
              post_id: postId,
              user_id: currentUser.id,
            }
          );

          if (rpcError) console.error("RPC Error:", rpcError);
          else setLiked(userLike === true);
        } else {
          setLiked(false);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [postId, currentUser?.id]);

  const toggleLike = async () => {
    if (!currentUser?.id || !postId) return;

    try {
      // 내 좋아요 여부 다시 확인
      const { data: userLike } = await supabase.rpc("get_user_like", {
        post_id: postId,
        user_id: currentUser.id,
      });

      if (userLike === true) {
        // 좋아요 취소
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", currentUser.id);

        if (!error) {
          setLiked(false);
          setLikeCount((prev) => Math.max(prev - 1, 0));
        } else console.error("Unlike error:", error);
      } else {
        // 좋아요 추가
        const { error } = await supabase.from("likes").insert([
          { post_id: postId, user_id: currentUser.id },
        ]);

        if (!error) {
          setLiked(true);
          setLikeCount((prev) => prev + 1);
        } else console.error("Like insert error:", error);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      className="action-btn"
      disabled={!currentUser?.id}
      style={{ cursor: currentUser?.id ? "pointer" : "default" }}
    >
      <img
        src={liked ? "/image/icon/heart-fill.svg" : "/image/icon/heart-1.svg"}
        alt="좋아요"
        className="action-icon"
      />
      {showCount && <span>{likeCount}</span>}
    </button>
  );
}
