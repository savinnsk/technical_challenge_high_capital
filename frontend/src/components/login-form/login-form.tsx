import React, { useState } from 'react';
import { authorization } from '../../services/api';
import './login-form.module.css';
import useStore from '../../hooks/store';
import { RegisterModal } from '../register-modal/register-modal';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  onRegisterClick: () => void;
}

export const LoginForm = ({ onLoginSuccess, onRegisterClick }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const store = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await authorization({ email, password });
      localStorage.setItem('token', token);
      store?.setToken(token);
      onLoginSuccess(token);
    } catch (err) {
      store?.toSetError();
      store?.toSetNotification('Erro no Login');
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {store?.error && <p style={{ color: 'red' }}>{store?.error}</p>}

        <button type="submit">Entrar</button>

        <p style={{ textAlign: 'center' }}>
          Ainda não tem conta?{' '}
          <button type="button" onClick={onRegisterClick} style={{ color: '#0077ff', background: 'none', border: 'none', cursor: 'pointer' }}>
            Criar conta
          </button>
        </p>
      </form>

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};
