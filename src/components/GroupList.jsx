import { Link } from "react-router-dom";
import { supabase } from '../supabase';
import { useState, useEffect } from 'react';


// 날짜를 'YYYY.MM.DD 오후 HH:MM' 형식으로 변환
function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  let hour = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  const ampm = hour < 12 ? '오전' : '오후';
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${yyyy}.${mm}.${dd} ${ampm} ${hour}:${min}`;
}

export default function GroupList({ limit }) {

  const [meetings, setMeetings] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchMeetingsWithMembers = async () => {
      try {
        // 1️⃣ posts 테이블 조회
        const { data: meetingsData, error: meetingsError } = await supabase
          .from("meetings")
          .select("*")
          .order("created_at", { ascending: false });

        if (meetingsError) throw meetingsError;

        // 2️⃣ 각 게시글의 member 정보 조회
        const meetingsWithMembers = await Promise.all(
          meetingsData
          .filter(post => !!post.email) // email이 있는 경우만
          .map(async (post) => {
            const { data: memberData } = await supabase
              .from("member")
              .select("*")
              // .select("nickname, user_id")
              .eq("email", post.email)
              .maybeSingle();
            return { ...post, member: memberData || null };
          })
        );

        // 3️⃣ 상태에 세팅
        setMeetings(meetingsWithMembers);
      } catch (error) {
        console.error("Error fetching posts or members:", error);
      }
    };

    fetchMeetingsWithMembers();
  }, []);



  return (
     <div className="group-list">
  {(limit ? meetings.slice(0, limit) : meetings).map((m, idx) => (
      <Link to={`/findview/${m.id}`} className="group-card" key={m.id || idx}>
            <div
              className="thumb"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 70%,rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.6)), url(${m.image_url || '/image/default-group.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
          <span className="card-category">{m.category}</span>
        </div>
        <div className="card-content">
          <h3 className="card-title">
            {`[${m.type}]`} {m.title} {`(${count}/${m.participants})`}
          </h3>
          <p className="card-schedule">[일정] {m.type === '번개모임' ? formatDateTime(m.date) : `${m.recurrence_type} ${m.recurrence_days}`}</p>
          <p className="card-location">{m.location}</p>
        </div>
      </Link>
    ))}
  </div>
  );
}