import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doPasswordReset } from '../../services/auth';
import { Header } from '../Shared/Header';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setErrorMessage('Informe seu email ou nome de usuário');
      return;
    }
    
    setIsSending(true);
    setErrorMessage('');
    
    try {
      await doPasswordReset(email);
      setMessage('Enviamos um email com instruções para redefinir sua senha');
    } catch (error) {
      setErrorMessage('Erro ao enviar email de redefinição. Verifique o email informado.');
      setIsSending(false);
    }
  };

  return (
    <div className="reset-password-container">
      <Header title="GPAC - Gerência de Prevenção e Articulação Comunitária" />
      
      <div className="auth-form">
        <h2>Redefinir senha</h2>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {message && <div className="success-message">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Informe seu email ou nome de usuário</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="@usuario1"
            />
          </div>
          
          <button type="submit" disabled={isSending}>
            {isSending ? 'Enviando...' : 'Redefinir senha'}
          </button>
        </form>
        
        <div className="auth-links">
          <Link to="/login">Voltar para login</Link>
        </div>
      </div>
    </div>
  );
}