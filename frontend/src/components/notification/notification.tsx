
import useStore from "../../hooks/store"
import s from "./notification.module.css"

export function Notification(){
    const store = useStore()

    return (
        <div 
        className={store?.error ? s.whatsappNotificationError : s.whatsappNotification} 
        style={store?.notificationMessage ? {top : 20} : {top : -100} }
        >
            <div className={s.notificationIcon}>
                {store?.error ? '⚠️' : '✅'}
            </div>
            <span className={s.notificationText}>
                {store?.notificationMessage}
            </span>
        </div>
    )
}