import { createGlobalStyle } from 'styled-components';
import '../styles/Reset.css';

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Pretendard', sans-serif;
    }

    /* body start */
    /* body 에니메이션 */
    body {
      background-image: linear-gradient(to bottom,
          #fffdf8 0%,
          /* 아침: 아주 연한 크림 베이지 */
          #f4f4f4 45%,
          /* 낮 중간: 컨테이너 배경과 동일 톤 */
          #dce3e8 80%,
          /* 저녁: 부드러운 블루 그레이 */
          #c4cbd4 100%
          /* 밤: 은은한 차가운 그레이 블루 */
        );
    }

    .pea-bubble {
      position: fixed;
      width: 40px;
      height: 40px;
      bottom: 0;
      background-size: contain;
      background-repeat: no-repeat;
      pointer-events: none;
      animation-name: bubble-rise;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      z-index:-1;
    }

    /* 좌/우 위치, 각기 다른 이미지 */
    .bubble-1 {
      animation-duration: 8s;
      animation-delay: 0s;
      left: 50px;
      background-image: url('../image/character/wandoo1.png');
      opacity: 0;
    }

    .bubble-2 {
      animation-duration: 10s;
      animation-delay: 2s;
      left: 120px;
      background-image: url('../image/character/wandoo2.png');
      opacity: 0;
    }

    .bubble-3 {
      animation-duration: 7s;
      animation-delay: 1s;
      right: 50px;
      background-image: url('../image/character/wandoo3.png');
      opacity: 0;
    }

    .bubble-4 {
      animation-duration: 9s;
      animation-delay: 3s;
      right: 120px;
      background-image: url('../image/character/wandoo1.png');
      opacity: 0;
    }

    .bubble-5 {
      animation-duration: 11s;
      animation-delay: 1.5s;
      left: 250px;
      background-image: url('../image/character/wandoo2.png');
      opacity: 0;
    }

    /* 공통 애니메이션 */
    @keyframes bubble-rise {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      50% { transform: translateY(-400px) translateX(50px); opacity: 1; }
      100% { transform: translateY(-800px) translateX(-50px); opacity: 0; }
    }
    /* body 에니메이션 end */
    /* body end */
    /* header */
    .header {
      max-width: 720px;
      width: 100%;
      height: 73px;
      background-color: white;
      /*background:linear-gradient(rgba(248,255,252),rgba(255,254,247));*/
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
    }

    .header .alarm {
      width: 24px;
      height: 24px;
    }

    .logo {
      font-size: 32px;
      font-weight: 700;
      color: #40B440;
    }

    .title {
      font-size: 18px;
      font-weight: 400;
      color: #000;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .header-title {
      font-size: 24px;
      font-weight: 700;
      color: #1B1B1B;
      line-height: 48px;
    }

    .header-actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-btn img {
      width: 24px;
      height: 24px;
    }

    .header .noti-badge {
      position: absolute;
      right: 10px;
      top: 25px;
      background: #ff0000;
      color: #fff;
      font-size: 12px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Pretendard', sans-serif;
      font-weight: 400;
    }

    .logo span {
      text-indent: -9999px;
      display: none
    }

    .logo img {
      width: 160px;
    }

    /* header end */

    /* serch bar*/
    .search-bar {
    position: relative;
    margin: 0 auto;
    }

    .search-input {
        width: 100%;
        height: 48px;
        background: #D9D9D9;
        border: none;
        border-radius: 25px;
        padding: 0 60px 0 28px;
        font-size: 16px;
        color: #777777;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    }

    .search-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 36px;
        height: 38px;
    }

        /* serch bar end*/
        /*배너*/
        /* 배너 영역 */
    .banner-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 60px;
    }

    .banner {
        position: relative;
        height: 168px;
        border-radius: 20px;
        padding: 46px 28px;
        color: #1B1B1B;
        overflow: hidden;
    }

    .banner.green {
        background: #5BC35B;
    }

    .banner.yellow {
        background: #F5EA83;
    }

    .banner-subtitle {
        font-size: 24px;
        font-weight: 700;
        line-height: 34px;
        margin-bottom: 12px;
    }

    .banner-title {
        font-size: 32px;
        font-weight: 700;
        line-height: 48px;
    }

    .banner-icon {
        position: absolute;
        right: 28px;
        bottom: 28px;
        width: 54px;
        height: 54px;
    }
    /*배너 end*/

    /* footer start */
    .main-footer {
      
      padding: 60px 0 24px 0;
      color: #777;
      font-size: 18px;
      text-align: left;
      width: 100%;
      box-sizing: border-box;

    }

    .main-footer .footer-logo {
      border-top: 1px solid #e0e0e0;
      color: #40B440;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 24px;
      padding-top: 16px;
    }

    .main-footer div {
      margin-bottom: 12px;
    }
    .footer-title{
    font-size: 14px;
    }

    .main-footer .footer-links {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      color: #333;
      margin-top: 16px;
      gap:16px;
    }

    /* footer end */
    /* 하단 nav start */
    .bottom-nav {
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      max-width: 720px;
      width: 100%;
      z-index: 1000;
      pointer-events: none;
      height: 70px;
      display: flex;
      justify-content: center;
      background: none;
    }

    .bottom-nav-bg {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 70px;
      background: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.04);
      z-index: 1;
      pointer-events: auto;
    }

    .bottom-nav-items {
      position: relative;
      display: flex;
      gap: 40px;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 70px;
      z-index: 2;
      pointer-events: auto;
      padding: 0 36px 0 36px;
      box-sizing: border-box;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      color: #c9c9c9;
      cursor: pointer;
      pointer-events: auto;
    
  
    }
      .nav-item > div{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      }


    



    .nav-item {
 
      font-size: 14px;
    }



    .nav-item svg {
      width: 30px;
      height: 30px;
      margin-bottom: 2px;
      display: block;
    }

 

    .nav-chat-label {
      position: absolute;
      left: 50%;
      top: 70%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 8px;
      background: none;
      white-space: nowrap;
      pointer-events: none;
    }

    .nav-label-inactive {
      color: #c9c9c9;
      white-space: nowrap;
      line-height: 14px;
      text-align: center;
      display: block;
    }

    @media (max-width: 720px) {
      .bottom-nav {
        max-width: 100vw;
      }
    }

    @media (max-width: 480px) {
    .bottom-nav-items {
      gap: 16px;
      padding: 0 18px 0 18px;
    }

    .nav-item{
      font-size: 12px;}

    .nav-item svg {
      width: 24px;
      height: 24px;
    }
  
    /*배너*/
      .banner {
      height: 140px;
      padding: 32px 20px;
    }

    .banner-subtitle {
        font-size: 20px;
        margin-bottom: 8px;
    }

    .banner-title {
        font-size: 28px;
    }

    .banner-icon {
        width: 40px;
        height: 40px;
    }
        .banner {
        height: 120px;
        padding: 24px 16px;
    }

    .banner-subtitle {
        font-size: 18px;
    }

    .banner-title {
        font-size: 24px;
    }


    /*배너 end*/  
    .group-list {
        grid-template-columns: 1fr 1fr;
    }

    }

    /*하단 nav end */



    /*플로팅 버튼 */
    .floating-btn {
      position: fixed;
      right: calc(50% - 360px + 16px);
      /* 720px 컨테이너 기준 */
      bottom: 120px;
      width: 50px;
      height: 50px;
      z-index: 10;
    }

    /* 720px 이하에서는 컨테이너가 화면 크기만큼 변하므로 right값을 조정 */
    @media (max-width: 720px) {
      .floating-btn {
        right: 16px;
        /* 화면 오른쪽 여백만 남기고 붙임 */
        bottom: 120px;

      }
    }

    /*플로팅 버튼 end */

    /*input 스타일 */
      .form-select,
      .form-input,
      .form-textarea {
          width: 100%;
          padding: 7px 13px;
          border: 1px solid #CED4DA;
          border-radius: 4px;
          font-size: 14px;
          color: #6C757D;
          background: #ffffff;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      }


    /*input 스타일 end*/
    /*이미지 업로드 영역*/
      .upload-area {
          border: 1px solid #CED4DA;
          padding: 16px;
          text-align: center;
          margin-bottom: 8px;
          background: #ffffff;
          border-radius: 4px;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      }

      .upload-icon {
          width: 24px;
          height: 24px;
          margin-bottom: 20px;
      }

      .upload-text {
          font-size: 14px;
          color: #212529;
          margin-bottom: 4px;
      }

      .upload-preview {
          font-size: 14px;
          color: #6C757D;
      }

      #imagePreview {
          margin-top: 10px;
      }

      #imagePreview img {
          max-width: 100%;
          max-height: 200px;
          border-radius: 4px;
      }

    /*이미지 업로드 end*/

    /*로그인 회원가입 */
 
    .login-container {
      max-width: 720px;
      margin: 0 auto;
      padding: 24px 16px 60px 16px;
      box-sizing: border-box;
      background: #f4f4f4;
      min-height: 100vh;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* 타이틀 영역 */
    .login-title {
      color: #40b440;
      font-size: 32px;
      font-weight: 700;
      font-family: 'Pretendard', sans-serif;
      margin-bottom: 24px;
      letter-spacing: 2px;
      position: relative;
    }

    .login-subtitle {
      color: #1b1b1b;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    .login-desc {
      color: #1b1b1b;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 32px;
      text-align: center;
    }

    .login-title span {
      position: absolute;
      /* 화면에서 위치 이동 */
      width: 1px;
      /* 거의 안 보이는 크기 */
      height: 1px;
      padding: 0;
      margin: -1px;
      /* 레이아웃 공간 제거 */
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      /* 화면에서 잘림 */
      white-space: nowrap;
      border: 0;
    }

    .login-title img {
      width: 200px;
    }

    /* 로그인 폼 */
    .login-form {
      width: 100%;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      /* 필드 간격 */
    }

    .login-field {
      display: flex;
      flex-direction: column;
      gap: 8px;
      /* 라벨-인풋 간격 */
    }

    .login-label {
      color: #212529;
      font-size: 14px;
      font-weight: 400;
      margin: 0;
    }

    .login-input {
      width: 100%;
      height: 36px;
      box-sizing: border-box;
      padding: 6px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 14px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      background: #fff;
      outline: none;
      margin: 0;
    }

    .login-input:focus {
      border: #0D6EFD solid 1px;
    }

    /* 버튼 */
    .login-btn,
    .signup-btn {
      width: 100%;
      max-width: 500px;
      height: 36px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      padding: 16px 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      background: #40b440;
    }




    .signup-btn {
      margin-bottom: 12px;
      background: #66cc66;
    }

    /* 링크 */
    .login-link {
      color: #000;
      font-size: 12px;
      text-align: center;
      margin-bottom: 24px;
      display: block;
    }

    /* 구분선 */
    .login-hr {
      width: 100%;
      max-width: 500px;
      margin-bottom: 24px;
      border: none;
      border-top: 1px solid #e0e0e0;
      height: 1px;
    }
    /*로그인 회원가입 end */

    /*카드리스트 썸네일 thumb*/
    .thumb {

    }
    .group-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    }

    .group-card {
      flex: 1 1 45%;
      min-width: 160px;
      max-width: 336px;
      border-radius: 20px;
      background: #fff;
      margin-bottom: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: width 0.2s, min-width 0.2s, box-shadow 0.4s;
    }

    .group-card:hover {
      box-shadow: 0 16px 40px rgba(122, 144, 176, 0.2);
    }

    .group-card .thumb {
      width: 100%;
      aspect-ratio: 336/192;
      background-size: cover;
      border-radius: 20px 20px 0 0;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      color: #fff;
      font-size: 18px;
      font-weight: 700;

      min-height: 100px;
    }

    .card-category {
        position: absolute;
        bottom: 12px;
        right: 12px;
        color: white;
        font-size: 18px;
        font-weight: 700;
        line-height: 25.2px;
        z-index: 1;
    }

    .card-content {
        padding: 12px;
    }

    .card-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 25.2px;
        color: #1B1B1B;
        margin-bottom: 7px;
    }

    .card-schedule {
        font-size: 16px;
        line-height: 24px;
        color: #1B1B1B;
        margin-bottom: 7px;
    }

    .card-location {
        font-size: 12px;
        line-height: 16.8px;
        color: #777777;
    }

    @media (max-width: 480px) {
        

        .card-title {
            font-size: 16px;
        }

        .card-schedule {
            font-size: 14px;
        }
    }

    /*카드리스트 썸네일 thumb end*/


    /*완두톡 게시글 */
    /* 게시글 */
    .post {
        display: block;
        background: #fff;
        border-radius: 20px;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
        margin-bottom: 30px;
    }

    .post-header {
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;

    }

    .post-user {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .profile-img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .username {
        font-size: 18px;
        font-weight: 700;
        color: #1B1B1B;
    }

    .post-meta {
        font-size: 12px;
        color: #777;
        padding: 5px 12px;
        background: #E3E3E3;
        border-radius: 50px;
    }

    .more-options {
        width: 24px;
        height: 24px;
    }

    .post-image {
        display: inline-block;
        width: 100%;
        aspect-ratio: 336/192;
        /* object-fit: cover; */
    }

    .post-content {
        padding: 16px;
        border-bottom: 0.5px solid #D9D9D9;
    }
    .post-text {
        font-size: 16px;
        line-height: 24px;
        color: #1B1B1B;
        margin-bottom: 8px;
        width: 100%;
    }

    .post-actions {
        padding: 16px;
        display: flex;
        gap: 12px;
    }

    .action-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #777777;
        font-size: 16px;
    }

    .action-icon {
        width: 24px;
        height: 24px;
    }
    /*완두톡 게시글 end */
`;

export default GlobalStyle;
