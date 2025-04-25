import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../services/auth';
import { Header } from '../Shared/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Preencha todos os campos');
      return;
    }
    
    setIsSigningIn(true);
    setErrorMessage('');
    
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate('/home');
    } catch (error) {
      setErrorMessage('Email ou senha inválidos');
      setIsSigningIn(false);
    }
  };

  return (
    <div className="login-container">
      <Header title="GPAC - Gerência de Prevenção e Articulação Comunitária" />
      
      <div className="auth-form">
        <h2>Login</h2>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email ou nome de usuário</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="@usuario1"
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          
          <button type="submit" disabled={isSigningIn}>
            {isSigningIn ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/forgot-password">Esqueceu a senha?</Link>
          <Link to="/register">Primeiro acesso</Link>
        </div>
      </div>
    </div>
  );
}