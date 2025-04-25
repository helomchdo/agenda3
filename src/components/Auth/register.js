import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../../services/auth';
import { Header } from '../Shared/Header';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const navigate = useNavigate();

  const checkUsernameAvailability = async () => {
    // Implementar verificação de username disponível
    setUsernameAvailable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !username || !password || !confirmPassword) {
      setErrorMessage('Preencha todos os campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return;
    }
    
    setIsRegistering(true);
    setErrorMessage('');
    
    try {
      await doCreateUserWithEmailAndPassword(email, password, name);
      navigate('/home');
    } catch (error) {
      setErrorMessage('Erro ao criar conta. Tente novamente.');
      setIsRegistering(false);
    }
  };

  return (
    <div className="register-container">
      <Header title="GPAC - Gerência de Prevenção e Articulação Comunitária" />
      
      <div className="auth-form">
        <h2>Cadastro</h2>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="USUARIO TESTE"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario1@gmail.com"
            />
          </div>
          
          <div className="form-group">
            <label>Nome de usuário</label>
            <div className="username-input">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={checkUsernameAvailability}
                placeholder="@usuario1"
              />
              {usernameAvailable !== null && (
                <span className={`availability ${usernameAvailable ? 'available' : 'unavailable'}`}>
                  {usernameAvailable ? 'disponível' : 'indisponível'}
                </span>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label>Criar senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
            />
            {password && confirmPassword && password === confirmPassword && (
              <span className="password-match">as senhas são iguais</span>
            )}
          </div>
          
          <button type="submit" disabled={isRegistering || usernameAvailable === false}>
            {isRegistering ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/login">Já possui cadastro?</Link>
        </div>
      </div>
    </div>
  );
}