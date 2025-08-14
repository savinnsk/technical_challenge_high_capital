import s from "./header.module.css"

export function Header() {
  return (
    <header className={s.whatsappHeader}>
      <div className={s.headerContainer}>
        <div className={s.logoSection}>
          <div className={s.logoIcon}>🤖</div>
          <h1 className={s.logoText}>High Capital Chat</h1>
        </div>
        
        <div className={s.headerActions}>
          <button className={s.headerButton} title="Configurações">
            ⚙️
          </button>
          <button className={s.headerButton} title="Perfil">
            👤
          </button>
        </div>
      </div>
    </header>
  )
}
  