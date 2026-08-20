import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  notificationService,
  type Notification,
} from "../services/notificationService";

const AUTO_DISMISS_MS = 90000;

interface NotificationContextType {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  dismissNotification: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const infoTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const fetchNotifications = async () => {
    try {
      setNotifications(await notificationService.findAll());
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const dismissNotification = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isClosed: true } : n))
    );

    try {
      await notificationService.update(id, { isClosed: true });
    } catch (err) {
      console.error("Failed to close notification:", err);
      fetchNotifications();
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));

    try {
      await notificationService.remove(id);
    } catch (err) {
      console.error("Failed to delete notification:", err);
      fetchNotifications();
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const activeInfoIds = new Set(
      notifications
        .filter((n) => !n.isClosed && n.category === "INFO")
        .map((n) => n._id)
    );

    activeInfoIds.forEach((id) => {
      if (infoTimers.current[id]) return;
      infoTimers.current[id] = setTimeout(() => {
        delete infoTimers.current[id];
        dismissNotification(id);
      }, AUTO_DISMISS_MS);
    });

    Object.keys(infoTimers.current).forEach((id) => {
      if (!activeInfoIds.has(id)) {
        clearTimeout(infoTimers.current[id]);
        delete infoTimers.current[id];
      }
    });
  }, [notifications]);

  useEffect(() => {
    return () => {
      Object.values(infoTimers.current).forEach(clearTimeout);
      infoTimers.current = {};
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchNotifications,
        dismissNotification,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  return context;
};
