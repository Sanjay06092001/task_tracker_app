import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import loginLogo from '../assets/login.svg';

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const response = (err as { response?: { data?: { message?: string } } }).response;
        setError(response?.data?.message || 'Login failed.');
      } else {
        setError('Login failed.');
      }
    }
  };

  return (
    <div className="form-container login-form glass-card">
      <div className="login-logo">
        <img src={loginLogo} alt="Login" height="80" />
      </div>
      <h2 className="login-title">Welcome Back!</h2>
      <p className="login-tagline">Sign in to track your tasks and boost your productivity.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(v => !v)}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "30%",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>
        <button type="submit" className="login-btn">
          <span role="img" aria-label="login">🔑</span> Login
        </button>
      </form>
      <div className="register-link">
        <span>Don't have an account?</span> <Link to="/register">Register</Link>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
