import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your page components
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import JoinRoomPage from './pages/JoinRoomPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/join/:roomId" element={<JoinRoomPage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            
            {/* 404 route - keep at the end */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
