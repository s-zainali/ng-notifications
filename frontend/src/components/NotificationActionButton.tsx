function NotificationActionButton({ imgUrl, action, title ,onClick}) {
  return (
    <button
      className="cursor-pointer opacity-70 hover:opacity-90 "
      title={title}
      onClick={onClick}
    >
      {action !== "dismiss" && <img src={imgUrl} alt={title} className="h-5" />}
      {action === "dismiss" && (
        <div className="text-xs bg-ink-black-900/50 py-1 px-2 rounded-lg text-alabaster-grey-50 opacity-80 hover:opacity-100 transition duration-300 ease-in-out relative overflow-hidden">
          <div className="w-full h-full bg-alabaster-grey-400 absolute top-0 left-0 z-5"></div>
          <span className="z-5">Dismiss</span>
        </div>
      )}
    </button>
  );
}

export default NotificationActionButton;
