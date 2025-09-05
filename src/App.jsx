
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
// import './styles/reset.css';

import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Find from './pages/Find';
import Bubble from './components/Bubble';
import Login from './pages/login';
import Signup from './pages/Signup';
import CreateFind from './pages/CreateFind';
import ModifyFind from './pages/ModifyFind';
import FindView from './pages/FindView';
import CreateTalk from './pages/CreateTalk';
import Notification from './pages/Notification';
import Talk from './pages/Talk';
import TalkView from './pages/TalkView';
import { supabase } from './supabase';
import LayoutWithNav from './layouts/LayoutWithNav';

function App() {
  return (
    <>
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
