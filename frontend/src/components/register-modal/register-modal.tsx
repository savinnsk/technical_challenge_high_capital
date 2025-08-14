import React, { useState } from 'react';
import s from './register-modal.module.css';
import { authorization, createUser } from '../../services/api';
import useStore from '../../hooks/store';

interface RegisterFormProps {
  onRegisterSuccess?: (token: string) => void;
  onCancel?: () => void;
  onClose: () => void;
}

export const RegisterModal = ({ onClose, onRegisterSuccess, onCancel }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const store = useStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 5) {
      setError('A senha deve ter pelo menos 5 caracteres.');
      return;
    }

    setLoading(true);
    
    try {
      const data = await createUser({name, email, password});
      if(data.name){
        const token = await authorization({ email, password });
        localStorage.setItem('token', token);
        store?.setToken(token);
        onRegisterSuccess?.(token);
      }
      onClose();
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      store?.toSetError();
      store?.toSetNotification('Erro no Registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.whatsappOverlay}>
      <div className={s.whatsappModal}>
        <div className={s.modalHeader}>
          <div className={s.modalIcon}>📝</div>
          <h2 className={s.modalTitle}>Criar Conta</h2>
          <p className={s.modalSubtitle}>Preencha os dados para se registrar</p>
        </div>

        <form onSubmit={handleRegister} className={s.registerForm}>
          <div className={s.inputGroup}>
            <label htmlFor="name" className={s.inputLabel}>Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={e => setName(e.target.value)}
              className={s.whatsappInput}
              required
            />
          </div>

          <div className={s.inputGroup}>
            <label htmlFor="email" className={s.inputLabel}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={s.whatsappInput}
              required
            />
          </div>

          <div className={s.inputGroup}>
            <label htmlFor="password" className={s.inputLabel}>Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 5 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={s.whatsappInput}
              required
            />
          </div>

          {error && (
            <div className={s.errorMessage}>
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <div className={s.modalButtons}>
            <button 
              type="button" 
              onClick={onCancel || onClose} 
              className={s.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={s.registerButton}
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
