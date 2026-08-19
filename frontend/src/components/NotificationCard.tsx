import NotificationActionButton from "./NotificationActionButton";

interface NotificationCardProps {
    category: "INFO" | "WARNING" | "ERROR" | string;
    header: string;
    body: string;
    isLive: boolean;
    onClose?: () => void;  
    onEdit?: () => void;  
    onDelete?: () => void;
  }

function NotificationCard({
  category,
  header,
  body,
  isLive,
  onClose,
  onEdit,
  onDelete,
}:NotificationCardProps) {
  return (
    <div
      className={`flex justify-between p-2 border-2 rounded-xl 
        ${
          category === "INFO"
            ? `border-blue-600 bg-blue-500/70 text-black/70 ${
                isLive ? "shadow-md shadow-blue-500/50" : ""
              }`
            : category === "WARNING"
            ? `border-amber-400 bg-amber-300/70 text-black/70 ${
                isLive ? "shadow-md shadow-amber-300/50" : ""
              }`
            : category === "ERROR"
            ? `border-red-600 bg-red-500/70 text-black/70 ${
                isLive ? "shadow-md shadow-red-500/50" : ""
              }`
            : ""
        }`}
    >
      <div className="flex flex-col">
        <h2 className="text-sm uppercase font-bold">{header}</h2>
        <div className="flex items-end justify-between">
          <p className={`text-sm`}>{body}</p>
          {isLive && (
            <NotificationActionButton
              imgUrl={""}
              title={"Dismiss"}
              action={"dismiss"}
              onClick={onClose}
            />
          )}
        </div>
      </div>
      {!isLive && (
        <div className="flex  items-center justify-center gap-2">
          <NotificationActionButton
            imgUrl={"/edit.png"}
            title={"Edit"}
            action={"edit"}
            onClick={onEdit}
          />
          <NotificationActionButton
            imgUrl={"/delete.png"}
            title={"Delete"}
            action={"delete"}
            onClick={onDelete}
          />
        </div>
      )}
    </div>
  );
}

export default NotificationCard;
