
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
// import './styles/reset.css';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Find from './pages/Find';
import Bubble from './components/Bubble';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 예시: <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/" element={<Home/>}/> 
          <Route path="/mypage" element={<Mypage/>}/> 
          <Route path="/find" element={<Find/>}/> 
        </Routes>
      </BrowserRouter>
      <Bubble/>
    </>
  );
}

export default App;
