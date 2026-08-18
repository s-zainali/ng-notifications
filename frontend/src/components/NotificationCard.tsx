function NotificationCard({category, header, body}) {
    return (
        <div className={`flex flex-col justify-start p-2 border-1 rounded-xl`}>
            <h2>{header}</h2>
            <p>{body}</p>
        </div>
    )
}

export default NotificationCard