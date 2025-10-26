import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import registerLogo from '../assets/register.svg';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Email and password required.');
      return;
    }
    try {
      await api.post('/auth/register', { email, password });
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('This email is already registered. Please login or use a different email.');
      } else {
        setError(err.response?.data?.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="form-container glass-card">
      <div className="login-logo">
        <img src={registerLogo} alt="Register" height="80" />
      </div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
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
        <button type="submit">Register</button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <div className="register-link">
        <span>Already have an account?</span> <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
