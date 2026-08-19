import NotificationActionButton from "./NotificationActionButton";

function NotificationCard({ category, header, body, isLive }) {
  return (
    <div
      className={`flex justify-between p-2 border-2 rounded-xl 
        ${
          category === "INFO"
            ? "border-blue-600 bg-blue-500/70 text-black-70"
            : category === "WARNING"
            ? "border-amber-400 bg-amber-300/70 text-black-70"
            : category === "ERROR"
            ? "border-red-600 bg-red-500/70 text-black-70"
            : ""
        }`}
    >
      <div className="flex flex-col">
        <h2 className="text-sm uppercase font-bold">{header}</h2>
        <p className="text-sm">{body}</p>
      </div>
      {!isLive && (
        <div className="flex items-center justify-between gap-4">
            <NotificationActionButton
            imgUrl={'/bell.png'}
            title={'Notify'}
            action={'notify'}
            />
            <NotificationActionButton
            imgUrl={'/edit.png'}
            title={'Edit'}
            action={'edit'}
            />
            <NotificationActionButton
            imgUrl={'/delete.png'}
            title={'Delete'}
            action={'delete'}
            />
        </div>
      )}
    </div>
  );
}

export default NotificationCard;
