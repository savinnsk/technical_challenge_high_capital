import React, { useState } from 'react';
import './register-modal.module.css';
import s from './register-modal.module.css';
import { createUser } from '../../services/api';

interface RegisterFormProps {
  onRegisterSuccess?: (token: string) => void;
  onCancel?: () => void;
  onClose: () => void;
}


export const RegisterModal = ({ onClose, onRegisterSuccess,onCancel }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 5) {
    alert('A senha deve ter pelo menos 5 caracteres.');
    return;
  }
    const user = await createUser({name,email,password})
    console.log('Criando usuário:', user);
    onClose?.();

  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Criar Conta</h2>
        <form onSubmit={handleRegister}>
           <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            className={s.Text}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="buttons">
            <button className="cancel" type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Registrar</button>
          </div>

          
        </form>
      </div>
    </div>
  );
};
