
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
import FindView from './pages/FindView';
import CreateTalk from './pages/CreateTalk';
import Notification from './pages/Notification';
import Talk from './pages/Talk';
import TalkView from './pages/TalkView';
import { supabase } from './supabase';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 예시: <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/" element={<Home/>}/> 
          <Route path="/mypage" element={<Mypage/>}/> 
          <Route path="/login" element={<Login/>}/> 
          <Route path="/signup" element={<Signup/>}/> 
          <Route path="/find" element={<Find/>}/> 
          <Route path="/findview" element={<FindView/>}/> 
          <Route path="/createfind" element={<CreateFind/>}/> 
          <Route path="/createtalk" element={<CreateTalk/>}/>
          <Route path="/notification" element={<Notification/>}/>
          <Route path="/talk" element={<Talk/>}/>
          <Route path="/talkview/:id" element={<TalkView />} />
        </Routes>
      </BrowserRouter>
      <Bubble/>
    </>
  );
}

export default App;
