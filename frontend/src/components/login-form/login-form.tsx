import React, { useState } from 'react';
import { authorization } from '../../services/api';
import s from './login-form.module.css';
import useStore from '../../hooks/store';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  onRegisterClick: () => void;
}

export const LoginForm = ({ onLoginSuccess, onRegisterClick }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className={s.whatsappContainer}>
      <div className={s.loginCard}>
        <div className={s.logoSection}>
          <div className={s.logoIcon}>🤖</div>
          <h1 className={s.appTitle}>High Capital Chat</h1>
          <p className={s.appSubtitle}>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className={s.loginForm}>
          <div className={s.inputGroup}>
            <label htmlFor="email" className={s.inputLabel}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={s.whatsappInput}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className={s.inputGroup}>
            <label htmlFor="password" className={s.inputLabel}>Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={s.whatsappInput}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {store?.error && (
            <div className={s.errorMessage}>
              <span>⚠️</span>
              <p>{store?.error}</p>
            </div>
          )}

          <button type="submit" className={s.loginButton}>
            Entrar
          </button>

          <div className={s.registerSection}>
            <p className={s.registerText}>
              Ainda não tem conta?
            </p>
            <button 
              type="button" 
              onClick={onRegisterClick} 
              className={s.registerButton}
            >
              Criar conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
