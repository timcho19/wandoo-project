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

export default function GroupList({ limit, searchTerm = '', onResultCountChange}) {
  const [meetings, setMeetings] = useState([]);
  const [allMeetings, setAllMeetings] = useState([]); // 전체 데이터 저장
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 서버에서 데이터를 가져오는 useEffect (한 번만 실행)
  useEffect(() => {
    const fetchMeetingsWithMembers = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch meetings...');
        
        // Supabase에서 meetings 데이터 조회
        let query = supabase
          .from("meetings")
          .select("*")
          .order("created_at", { ascending: false });

        // limit이 없으면 모든 데이터 가져오기 (검색을 위해)
        if (limit && !searchTerm) {
          query = query.limit(limit);
        }

        const { data: meetingsData, error: meetingsError } = await query;

        if (meetingsError) {
          console.error('Error fetching meetings:', meetingsError);
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
          return;
        }

        console.log('Query result:', meetingsData);
        setAllMeetings(meetingsData || []);
        console.log('Successfully fetched meetings:', meetingsData?.length, 'items');

      } catch (error) {
        console.error('Error in fetchMeetings:', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingsWithMembers();
  }, [limit]);
  console.log(allMeetings);
  // 검색어가 변경될 때마다 필터링 (로딩 없음)
  useEffect(() => {
    if (allMeetings.length === 0) return;

    let filteredData = allMeetings;
    
    // 검색어가 있는 경우 필터링
    if (searchTerm && searchTerm.trim() !== '' && searchTerm.trim() !== '전체보기') {
      filteredData = allMeetings.filter(meeting => 
        meeting.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (limit && !searchTerm) {
      // 검색어가 없고 limit이 있으면 제한
      filteredData = allMeetings.slice(0, limit);
    }else if(searchTerm && searchTerm.trim() === '전체보기'){
      filteredData = allMeetings;
    }

    setMeetings(filteredData);
    
    // 검색 결과 개수를 부모 컴포넌트로 전달
    if (onResultCountChange) {
      onResultCountChange(filteredData.length);
    }
    
    console.log('Filtered meetings:', filteredData.length, 'items for search term:', searchTerm);
  }, [searchTerm, allMeetings, limit, onResultCountChange]);

  console.log(meetings);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">오류: {error}</div>;
  }

  if (meetings.length === 0) {
    return (
      <div className="no-results">
        {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : '등록된 모임이 없습니다.'}
      </div>
    );
  }
      
  return (
    <div className="group-list">
      {meetings.map((m, idx) => (
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
            <p className="card-schedule">
              [일정] {m.type === '번개모임' ? formatDateTime(m.date) : `${m.recurrence_type} ${m.recurrence_days}`}
            </p>
            <p className="card-location">{m.location}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}