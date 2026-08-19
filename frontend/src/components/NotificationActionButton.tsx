function NotificationActionButton({imgUrl, action, title}){
    return (
        <button className="cursor-pointer opacity-70 hover:opacity-90" title={title}>
            {action !== 'dismiss' && <img src={imgUrl} alt={title} className="h-5" />}
            {action === 'dismiss' && <span>Dismiss</span>}
        </button>
    )
}

export default NotificationActionButton