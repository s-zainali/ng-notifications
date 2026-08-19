import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "../services/api";

export interface NotificationItem {
  _id: string;
  category: "INFO" | "WARNING" | "ERROR";
  header: string;
  body: string;
  isClosed: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  fetchNotifications: () => Promise<void>;
  dismissNotification: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get<NotificationItem[]>("/notifications");
      setNotifications(response.data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const dismissNotification = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isClosed: true } : n))
    );

    try {
      await api.put(`/notifications/${id}`, { isClosed: true });
    } catch (err) {
      console.error("Failed to close notification:", err);
      fetchNotifications();
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    try {
      await api.delete(`/notifications/${id}`);
    } catch (err) {
      console.error("Failed to delete notification:", err);
      fetchNotifications();
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const infoBanners = notifications.filter(
      (n) => !n.isClosed && n.category === "INFO"
    );

    const timers = infoBanners.map((banner) =>
      setTimeout(() => {
        dismissNotification(banner._id);
      }, 10000)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications]);

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
