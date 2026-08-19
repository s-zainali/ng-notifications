function NotificationActionButton({ imgUrl, action, title, onClick }) {
  return (
    <button
      className="cursor-pointer opacity-70 hover:opacity-90 "
      title={title}
      onClick={onClick}
    >
      {action !== "dismiss" && <img src={imgUrl} alt={title} className="h-5" />}
      {action === "dismiss" && <span className="z-5 text-[8px] text-alabaster-grey-50 py-0.5 px-1.5 rounded-md bg-ink-black-800">Dismiss</span>}
    </button>
  );
}

export default NotificationActionButton;
