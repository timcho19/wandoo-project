
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 예시: <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
