import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function HeartButton({ postId, currentUser, showCount = true }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // 페이지 로드 시 좋아요 상태 & 개수
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        // 전체 좋아요 수
        const { count } = await supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", postId);
        setLikeCount(count || 0);

        // 로그인한 경우에만 내 좋아요 상태 확인
        if (currentUser) {
          const { data: userLike, error } = await supabase.rpc("get_user_like", {
            post_id: postId,
            user_id: currentUser.id,
          });

          if (error) console.error("RPC Error:", error);
          else setLiked(userLike === true);
        } else {
          setLiked(false); // 비로그인일 때는 항상 빈 하트
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [postId, currentUser]);

  // 좋아요 토글 (로그인한 경우에만)
  const toggleLike = async () => {
    if (!currentUser) return; // 비로그인 시 클릭 무시

    try {
      const { data: userLike } = await supabase.rpc("get_user_like", {
        post_id: postId,
        user_id: currentUser.id,
      });

      if (userLike === true) {
        // 좋아요 취소
        await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", currentUser.id);

        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        // 좋아요 추가
        const { error } = await supabase.from("likes").insert([
          { post_id: postId, user_id: currentUser.id },
        ]);

        if (!error) {
          setLiked(true);
          setLikeCount((prev) => prev + 1);
        } else {
          console.error("Like insert error:", error);
        }
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
        disabled={!currentUser}
        style={{ cursor: currentUser ? "pointer" : "default" }}
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
