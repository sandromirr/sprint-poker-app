import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';

import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <main>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/join/:roomId" element={<JoinRoomPage />} />
              <Route path="/room/:roomId/:userId" element={<RoomPage />} />
              
              {/* 404 route - keep at the end */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
