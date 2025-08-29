import { Link } from 'react-router-dom';
import '../styles/FindView.css';

export default function FindView(){
  return(
    <>
      <div className="findview-container">
        <header className="header">
            <Link to="/find" className="back-button"><img src="./image/icon/arrow-left.svg" alt="" /></Link>
            <h1 className="page-title">[정기모임] 테니스 멤버 모집</h1>
            <div className="header-actions">
                <button type="button" className="icon-btn"><img src="/image/icon/sharing.svg" alt="공유" className="header-icon" /></button>
                <button type="button" className="icon-btn"><img src="/image/icon/heart.svg" alt="저장" className="header-icon" /></button>
                <button type="button" className="icon-btn"><img src="/image/icon/report.svg" alt="신고" className="header-icon" /></button>
            </div>
        </header>

        <main>
            <img src="./image/tennis.jpg" alt="테니스 모임 이미지" className="main-image" />

            <section className="tags-section">
                <div className="tag">
                    <img src="/image/icon/position.svg" alt="위치" />
                    부산 수영구
                </div>
                <div className="tag">
                    <img src="/image/icon/group.svg" alt="인원" />
                    3/10
                </div>
                <div className="tag">
                    <img src="/image/icon/category-1.svg" alt="카테고리" />
                    테니스
                </div>
                <div className="tag">
                    <img src="/image/icon/date.svg" alt="날짜" />
                    매월 첫째주 일요일
                </div>
                <div className="tag">
                    <img src="/image/icon/clock.svg" alt="시간" />
                    19:00
                </div>
            </section>

            <section className="info-section">
                <h2 className="section-title">모임 소개</h2>
                <div className="info-content">
                  <pre>{`
  🏊🏻‍♀️입수큐즈미🏊🏻‍♂️

  운동/스포츠

  모임 소개

  ⭐️부산 테니스 모임⭐️🏊‍♂️🏊‍♀️

  🕛Since 20240101 ⭐
  같이 재밌게 테니스 다니면서 건강도 챙기고 실력 향상도 해요~
  초보도 환영이구 고수도 환영입니다.

  ⭐️연령제한 : 80년생~00년생 (빠른 없음) ⭐

  ⭐️정기모임 *매월 첫째주 일요일 (해당달 1일 공지)
  *장소/시간 :
  공지사항 참고 수영 정기모임 있습니다 (모임 후 뒤풀이 참석 유/무 자유)
  정기모임 외 평일/주말, 오전/오후, 장소 가리지 않고 수시로 벙 있습니다 ⭐
  ️
  이런 사람❌

  -최초 모임 가입 후 한 시간 이내 가입 인사 미 작성 회원
  -최초 모임 가입 후 한 달 이내 테니스 벙 미 참석 회원
  -두 달 이상 장기간 미 참석 회원
  -수영 목적이 아닌 이성 목적 회원
  -모임의 분위기를 흐리는 회원
  -타모임 운영진 (확인 후 강퇴 조치 하겠습니다)

  ☺️오프라인 모임 1회 참석 후 오픈 톡방으로 초대됩니다☺️
                    `}</pre>
                    </div>
            </section>

            <section className="members-section">
                <h2 className="section-title">현재 참여 인원</h2>
                <div className="member-list">
                    <div className="member-item">
                        <div className="member-avatar">
                            <img src="/image/profile/person-3.jpg" alt="프로필 이미지" />
                            <img src="/image/icon/crown.svg" alt="방장" className="host-badge" />
                        </div>
                        <span className="member-name">홍길동</span>
                        <Link to="/" className="chat-btn">1:1 문의</Link>
                    </div>
                    <div className="member-item">
                        <div className="member-avatar">
                            <img src="/image/profile/person-4.jpg" alt="프로필 이미지" />
                        </div>
                        <span className="member-name">길짱구</span>
                    </div>
                    <div className="member-item">
                        <div className="member-avatar">
                            <img src="/image/profile/person-5.jpg" alt="프로필 이미지" />
                        </div>
                        <span className="member-name">박철수</span>
                    </div>
                </div>
            </section>

            <section className="join-section">
                <button className="join-btn">참여하기</button>
            </section>
        </main>
    </div>
    </>
  )
}