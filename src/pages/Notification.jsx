import { Link } from 'react-router-dom'
import '../styles/Notification.css'

export default function Notification(){
  return(
    <div className="noti-container">
        <header className="header">
            <Link to="/" className="back-button"><img src="./image/icon/arrow-left.svg" alt=""/></Link>
            <h1 className="header-title">알림</h1>

            <div className="header-right">
                <button type="button" className="icon-btn"><img src="./image/icon/delete.svg" alt="휴지통"/></button>
                <button type="button" className="icon-btn"><img src="./image/icon/settings.svg" alt="설정"/></button>
            </div>
        </header>

        <div className="notification-list">
            <div className="notification-item unread">
                <button type="button" className="profile-btn">
                    <img src="/image/profile/person-6.jpg" alt="프로필" className="notification-profile"/>
                </button>
                <Link href="#" className="notification-content">
                    <div className="notification-text">[닉네임]님이 내 게시물에 댓글을 남겼습니다.</div>
                    <div className="notification-date">2025.08.01 · <span>안읽음</span></div>
                </Link>
                <button className="noti-close"><img src="/image/icon/close_small.svg" alt="닫기버튼" /></button>
            </div>

            <div className="notification-item unread">
                <img src="./image/profile/person-7.jpg" alt="프로필" className="notification-profile"/>
                <div className="notification-content">
                    <div className="notification-text">[닉네임]님이 내 모임에 참여 신청을 했습니다.</div>
                    <div className="notification-date">2025.08.01 · <span>안읽음</span></div>
                </div>
                <button className="noti-close"><img src="/image/icon/close_small.svg" alt="닫기버튼" /></button>
            </div>

            <div className="notification-item ">
                <img src="./image/profile/person-11.jpg" alt="프로필" className="notification-profile"/>
                <div className="notification-content">
                    <div className="notification-text">[닉네임]님이 내 게시물에 공감했습니다.</div>
                    <div className="notification-date">2025.08.01 · <span>읽음</span></div>
                </div>
                <button className="noti-close"><img src="/image/icon/close_small.svg" alt="닫기버튼" /></button>
            </div>

            <div className="notification-item unread">
                <img src="./image/profile/person-8.jpg" alt="프로필" className="notification-profile"/>
                <div className="notification-content">
                    <div className="notification-text">[닉네임]님이 내 게시물에 댓글을 남겼습니다.</div>
                    <div className="notification-date">2025.08.01 · <span>안읽음</span></div>
                </div>
                <button className="noti-close"><img src="/image/icon/close_small.svg" alt="닫기버튼" /></button>
            </div>

            <div className="notification-item">
                <img src="./image/profile/person-9.jpg" alt="프로필" className="notification-profile"/>
                <div className="notification-content">
                    <div className="notification-text">[닉네임]님이 내 모임에 참여 신청을 했습니다.</div>
                    <div className="notification-date">2025.08.01 · <span>읽음</span></div>
                </div>
                <button className="noti-close"><img src="/image/icon/close_small.svg" alt="닫기버튼" /></button>
            </div>
        </div>
        
    </div>
  )
}