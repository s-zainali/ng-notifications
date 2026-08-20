import { useEffect, useState } from "react";

interface NotificationActionButtonProps {
  action: "edit" | "delete" | "dismiss";
  title: string;
  imgUrl?: string;
  onClick?: () => void;
  countdownMs?: number;
}

function CountdownFill({ durationMs }: { durationMs: number }) {
  const [depleted, setDepleted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDepleted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span
      className="absolute inset-0 origin-left bg-alabaster-grey-50/25"
      style={{
        transform: depleted ? "scaleX(0)" : "scaleX(1)",
        transitionProperty: "transform",
        transitionTimingFunction: "linear",
        transitionDuration: `${durationMs}ms`,
      }}
    />
  );
}

function NotificationActionButton({
  action,
  title,
  imgUrl,
  onClick,
  countdownMs,
}: NotificationActionButtonProps) {
  if (action === "dismiss") {
    return (
      <button
        type="button"
        title={title}
        onClick={onClick}
        className="relative overflow-hidden cursor-pointer text-[9px] text-alabaster-grey-50 py-0.5 px-1.5 rounded-md bg-ink-black-800 opacity-90 hover:opacity-100 transition"
      >
        {countdownMs ? <CountdownFill durationMs={countdownMs} /> : null}
        <span className="relative">Dismiss</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="cursor-pointer opacity-70 hover:opacity-90"
    >
      <img src={imgUrl} alt={title} className="h-5" />
    </button>
  );
}

export default NotificationActionButton;
