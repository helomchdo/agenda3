import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import ResetPassword from './components/Auth/resetpassword';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;