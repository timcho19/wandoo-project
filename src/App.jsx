
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { Helmet } from 'react-helmet';

// import './styles/reset.css';

import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Find from './pages/Find';
import Bubble from './components/Bubble';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateFind from './pages/CreateFind';
import ModifyFind from './pages/ModifyFind';
import FindView from './pages/FindView';
import CreateTalk from './pages/CreateTalk';
import Notification from './pages/Notification';
import Talk from './pages/Talk';
import TalkView from './pages/TalkView';
import LayoutWithNav from './layouts/LayoutWithNav';

function App() {
  return (
    <>
       <Helmet>
        <title>WANDOO</title>
        <link rel="icon" href="/image/character/wandoo2.png" />
        <meta name="robots" content="index, follow"/> 
        <meta name="description" content="당신의 취향을 한곳에"/>
        <meta name="keywords" content="소모임,커뮤니티,동네,친구,모임,취미"/>
        <meta name="author" content="미니콩즈"/>
        <meta property="og:url" content="https://wandoo-project.vercel.app/" />
        <meta property="og:type" content="website" /> 
        <meta property="og:title" content="Wandoo" /> 
        <meta property="og:description" content="당신의 취향을 한곳에" /> 
        <meta property="og:image" content="/image/logo/wandoologo.png" />
      </Helmet>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* Nav가 필요한 페이지 */}
          <Route element={<LayoutWithNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/find" element={<Find />} />
            <Route path="/talk" element={<Talk />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {/* Nav가 필요 없는 페이지 */}
          <Route path="/notification" element={<Notification />} />
          <Route path="/createfind" element={<CreateFind />} />
          <Route path="/modifyfind/:id" element={<ModifyFind />} />
          <Route path="/createtalk" element={<CreateTalk />} />
          <Route path="/findview/:id" element={<FindView />} /> 
          <Route path="/talkview/:id" element={<TalkView />} />
        </Routes>
      </BrowserRouter>
      <Bubble/>
 
    </>
  );
}

export default App;
