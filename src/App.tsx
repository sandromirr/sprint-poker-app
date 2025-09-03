import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import your page components
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage /> } />
            
            {/* 404 route - keep at the end */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
