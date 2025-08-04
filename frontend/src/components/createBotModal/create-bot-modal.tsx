import { useState } from 'react';
import s from './create-bot-modal.module.css';
import useStore from '../../hooks/store';
import { createChatboots } from '../../services/api';

interface CreateBotModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateBotModal({ onClose, onSuccess }: CreateBotModalProps) {
  const store = useStore();
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !context) {
      setError('Preencha todos os campos.');
      return;
    }


    setLoading(true);

    try {
      await createChatboots(store?.token || localStorage.getItem('token') as string, { name, context });
      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError('Erro ao criar o bot. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h2 className={s.title}>Criar Novo Bot</h2>

        <form onSubmit={handleSubmit} className={s.form}>
          <label htmlFor="botName">Nome do Bot</label>
          <input
            id="botName"
            type="text"
            placeholder="Ex: Assistente Virtual"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="botContext">Contexto do Bot</label>
          <textarea
            id="botContext"
            placeholder="Ex: Ajuda com agendamentos médicos"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            required
            rows={4}
          />

          {error && <p className={s.error}>{error}</p>}

          <div className={s.buttons}>
            <button type="button" onClick={onClose} className={s.cancel}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
