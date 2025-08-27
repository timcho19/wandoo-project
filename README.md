# 완두 소모임 사이트 (Wandoo Community)

## 프로젝트 소개
Wandoo는 관심사가 비슷한 사람들이 모여 소모임을 만들고 참여할 수 있는 커뮤니티 플랫폼입니다.
소규모 모임을 쉽게 찾고 참여하며, 자유롭게 소통할 수 있는 단순하고 필수적인 기능 중심 플랫폼입니다.

- **과정명**: 프론트엔드 개발자 양성과정
- **전체 과정 기간**: 2025.08.08 ~ 2025.09.09
- **개발 기간**: 2025.03.24 ~ 2025.09.23
- **개발 인원**: 3명

## 👥 팀원 구성
| 이름 | 역할 | 담당 업무 |
|------|------|-----------|
| 장원석 | 팀장 | - 초안 <br>- 초안<br>- 초안<br>- 초안 |
| 박경선 | 팀원 | - 초안<br>- 초안<br>-초안<br>- 초안 |
| 정진욱 | 팀원 | - 초안<br>- 초안<br>- 초안<br>- 초안 |

## 🔗 프로젝트 링크
- 📑 [기획서 (Figma)](https://www.figma.com/slides/JL1XPvmuO0NqHicAzzAlLq)
- 🎨 [디자인 (Figma)](https://www.figma.com/design/ZuUdTJYIuCk5PKx4xYV88Y)

## 1. 기술 스택

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Styled-components
- **Form Handling**: React Hook Form
- **Router**: React Router 6

### Backend
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### DevOps
- **Version Control**: Git, GitHub
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

### Tools
- **Design**: Figma
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Vitest, React Testing Library

## 2. 주요 기능

### 2.1 사용자 기능
- 🔎 소모임 탐색: 관심사/지역 기반으로 모임 찾기
- 📝 자유 게시판: 주제 제한 없는 게시글 작성
- 👥 소모임 생성: 누구나 주제를 정해 모임 개설
- 📌 마이페이지: 내가 참여한 모임과 글 관리
- 📱 반응형 UI: 모바일/데스크탑 최적화

## 3. 프로젝트 구조
```
wandoo-project/
├─ src/
│  ├─ assets/         # 정적 리소스 (이미지, 폰트 등)
│  ├─ components/     # 재사용 가능한 컴포넌트
│  │  ├─ common/     # 공통 컴포넌트
│  │  ├─ layout/     # 레이아웃 관련 컴포넌트
│  │  └─ meeting/    # 소모임 관련 컴포넌트
│  ├─ hooks/         # 커스텀 훅
│  ├─ pages/         # 페이지 컴포넌트
│  ├─ services/      # API 서비스 로직
│  ├─ stores/        # Zustand 스토어
│  ├─ styles/        # 전역 스타일
│  ├─ types/         # TypeScript 타입 정의
│  ├─ utils/         # 유틸리티 함수
│  ├─ App.tsx
│  └─ main.tsx
├─ public/           # 정적 파일
├─ .eslintrc.js      # ESLint 설정
├─ .prettierrc       # Prettier 설정
├─ index.html        # 진입점
├─ package.json      # 프로젝트 설정
├─ tsconfig.json     # TypeScript 설정
└─ vite.config.ts    # Vite 설정
```

## 4. 페이지별 기능

### 메인 페이지 (index.html)
- 인기 소모임 목록
- 추천 소모임 목록
- 최근 게시글 목록

### 소모임 찾기 (find.html)
- 카테고리별 필터링
- 지역별 필터링
- 검색 기능
- 정렬 기능

### 게시글 관련
- 목록 보기 
- 글 보기 
- 작성/수정 

### 사용자 관련
- 로그인/회원가입
- 마이페이지 관리
- 알림 확인
- 채팅 기능

## 5. 반응형 디자인
- 모바일 (~ 719px)
- 데스크톱 (720px ~)

## 6. 실행 방법
1. 저장소 클론 및 종속성 설치
```bash
git clone https://github.com/[username]/wandoo-project.git
cd wandoo-project
pnpm install
```

2. 환경 변수 설정
```bash
cp .env.example .env.local
# .env.local 파일에 Supabase 설정 추가
```

3. 개발 서버 실행
```bash
pnpm dev
```

4. 프로덕션 빌드
```bash
pnpm build
pnpm preview
```

## 7. 디자인 가이드
- 메인 컬러: #FF6B6C (코랄핑크)
- 서브 컬러: #FFE2E2 (라이트핑크)
- 폰트: Pretendard
- 반응형 브레이크포인트: 720px

## 8. 개선 사항
- [ ] 실시간 채팅 기능 Supabase Realtime 구현
- [ ] 이미지 최적화 및 프로그레시브 로딩
- [ ] 성능 최적화 (Code Splitting, Lazy Loading)
- [ ] PWA 지원
- [ ] 다국어 지원 (i18n)
- [ ] E2E 테스트 커버리지 향상

## 9. 제작 후기
이 프로젝트를 통해 React와 Supabase를 활용한 현대적인 웹 애플리케이션 개발 경험을 쌓았습니다. 특히 다음과 같은 부분에서 의미 있는 학습이 있었습니다:

- Vite를 통한 빠른 개발 환경 구축
- Supabase를 활용한 서버리스 아키텍처 구현
- TypeScript를 통한 타입 안정성 확보
- 상태 관리와 실시간 데이터 처리
- CI/CD 파이프라인 구축

이러한 경험은 모던 웹 개발의 전반적인 이해도를 높이는데 큰 도움이 되었습니다.





