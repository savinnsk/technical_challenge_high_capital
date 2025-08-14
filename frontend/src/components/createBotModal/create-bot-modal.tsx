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
    <div className={s.whatsappOverlay}>
      <div className={s.whatsappModal}>
        <div className={s.modalHeader}>
          <div className={s.modalIcon}>🤖</div>
          <h2 className={s.modalTitle}>Criar Novo Bot</h2>
          <p className={s.modalSubtitle}>Configure seu assistente virtual</p>
        </div>

        <form onSubmit={handleSubmit} className={s.createForm}>
          <div className={s.inputGroup}>
            <label htmlFor="botName" className={s.inputLabel}>Nome do Bot</label>
            <input
              id="botName"
              type="text"
              placeholder="Ex: Assistente Virtual"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={s.whatsappInput}
              required
            />
          </div>

          <div className={s.inputGroup}>
            <label htmlFor="botContext" className={s.inputLabel}>Contexto do Bot</label>
            <textarea
              id="botContext"
              placeholder="Ex: Ajuda com agendamentos médicos, informações sobre produtos, suporte ao cliente..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className={s.whatsappTextarea}
              required
              rows={4}
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
              onClick={onClose} 
              className={s.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className={s.createButton}
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Bot'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
