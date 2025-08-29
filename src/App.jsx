
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Home from './pages/Home';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 예시: <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/" element={<Home/>}/> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
