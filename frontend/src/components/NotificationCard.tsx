function NotificationBanner({category, header, body}) {
    return (
        <div className={``}>
            <h2>{header}</h2>
            <p>{body}</p>
        </div>
    )
}

export default NotificationBanner