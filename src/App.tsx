import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import your page components
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import PersonalPage from './pages/PersonalPage';
import SprintListPage from './pages/SprintListPage';
import SprintDetailPage from './pages/SprintDetailPage';
import SprintBoardPage from './pages/SprintBoardPage';
import InvitationPage from './pages/InvitationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const isAuthenticated = true; // Example: replace with actual auth check

  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignInPage />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />
            <Route path="/invite/:inviteId" element={<InvitationPage />} />

            {/* Protected routes */}
            <Route path="/" element={<HomePage /> } />
            <Route path="/personal" element={isAuthenticated ? <PersonalPage /> : <Navigate to="/signin" />} />
            <Route path="/sprints" element={isAuthenticated ? <SprintListPage /> : <Navigate to="/signin" />} />
            <Route path="/sprints/:sprintId" element={isAuthenticated ? <SprintDetailPage /> : <Navigate to="/signin" />} />
            <Route path="/sprints/:sprintId/board" element={isAuthenticated ? <SprintBoardPage /> : <Navigate to="/signin" />} />

            {/* 404 route - keep at the end */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
