import { useState } from "react";
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
}: NotificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex flex-col justify-between p-3 border-2 rounded-xl transition-all duration-200 text-black/80 ${
        category === "INFO"
          ? `border-blue-600 bg-blue-500/70 ${
              isLive ? "shadow-md shadow-blue-500/50" : ""
            }`
          : category === "WARNING"
          ? `border-amber-400 bg-amber-300/70 ${
              isLive ? "shadow-md shadow-amber-300/50" : ""
            }`
          : category === "ERROR"
          ? `border-red-600 bg-red-500/70 ${
              isLive ? "shadow-md shadow-red-500/50" : ""
            }`
          : ""
      } ${isExpanded ? "h-auto" : isLive? "min-h-25" :"min-h-21 max-h-21"}`}
    >
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className={`flex flex-1 items-start justify-start gap-2 min-w-0 ${isLive? 'flex-col' : ''}`}>
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold tracking-widest text-center min-w-[4rem] shrink-0 border-1 text-alabaster-grey-100 ${
                category === "INFO"
                  ? `border-blue-800 bg-blue-700 ${
                      isLive ? "w-full" : ""
                    }`
                  : category === "WARNING"
                  ? `border-amber-700 bg-amber-600 ${
                      isLive ? "w-full" : ""
                    }`
                  : category === "ERROR"
                  ? `border-red-800 bg-red-700 ${
                      isLive ? "w-full" : ""
                    }`
                  : ""
              }`}
          >
            {category}
          </span>
          <h2
            className={`text-sm uppercase font-bold text-ink-black-800  ${
              !isExpanded ? "truncate" : ""
            } ${
                isLive ? 'max-w-full' : ''
            }`}
          >
            {header}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="cursor-pointer text-xs font-bold opacity-70 hover:opacity-100 transition-opacity p-0.5"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <span
              className={`inline-block transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {!isLive && (
            <>
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
            </>
          )}
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 min-w-0">
        <p
          className={`text-xs text-ink-black-800 font-medium break-words flex-1 ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {body}
        </p>

        {isLive && (
          <div className="shrink-0">
            <NotificationActionButton
              imgUrl={""}
              title={"Dismiss"}
              action={"dismiss"}
              onClick={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationCard;
