import React, { useState } from 'react';
import { authorization } from '../../services/api';
import "./login-form.module.css"
import useStore from '../../hooks/store';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const store = useStore()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await authorization({email, password});
      localStorage.setItem('token',token)
      store?.setToken(token)
      onLoginSuccess(token);
    } catch (err) {
      store?.toSetError();
      store?.toSetNotification("Error no Login");
      console.error(err);
    }
  };

  return (
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
    </form>
  );
};
