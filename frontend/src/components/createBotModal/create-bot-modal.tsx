import { useState } from 'react';
import s from './create-bot-modal.module.css';
import useStore from '../../hooks/store';
import { createChatboots} from '../../services/api';

export function CreateBotModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const store = useStore();
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !context || !store?.token) return;

    setLoading(true);

    try {
      await createChatboots(store.token, { name, context });
      onSuccess();
      onClose();
    } catch (err) {
      alert('Erro ao criar bot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h2>Criar novo bot</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Bot"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Contexto do Bot"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            required
          />
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
