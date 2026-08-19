import { useState, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";
import { api } from "../services/api";
import NotificationForm, {
  type NotificationFormData,
} from "../components/NotificationForm";

const getErrorMessage = (err: unknown, fallback: string): string => {
  if (typeof err === "object" && err !== null && "response" in err) {
    const response = (err as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return fallback;
};

function EditNotificationPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchNotifications } = useNotifications();

  const [formData, setFormData] = useState<NotificationFormData>({
    category: "INFO",
    header: "",
    body: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadNotification = async () => {
      if (!id) {
        setApiError("Notification not found.");
        setInitialLoading(false);
        return;
      }

      try {
        const { data } = await api.get(`/notifications/${id}`);
        if (!active) return;
        setFormData({
          category: data.category ?? "INFO",
          header: data.header ?? "",
          body: data.body ?? "",
        });
      } catch (err) {
        if (active) setApiError(getErrorMessage(err, "Failed to load notification."));
      } finally {
        if (active) setInitialLoading(false);
      }
    };

    loadNotification();
    return () => {
      active = false;
    };
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localErrors: Record<string, string> = {};
    if (!formData.header.trim()) localErrors.header = "Header is required";
    if (!formData.body.trim()) localErrors.body = "Body is required";

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setErrors({});
    setApiError("");
    setLoading(true);

    try {
      await api.put(`/notifications/${id}`, formData);
      await fetchNotifications();
      navigate("/dashboard");
    } catch (err) {
      setApiError(getErrorMessage(err, "Failed to update notification. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center bg-alabaster-grey-200 p-6">
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl text-ink-black-800 font-bold tracking-wide mb-1">
            Edit Notification
          </h1>
          <p className="text-sm tracking-wide text-ink-black-700">
            Update an existing notification banner
          </p>
        </div>

        <div className="w-full px-8 py-8 bg-alabaster-grey-100 rounded-3xl border-2 border-ink-black-800 flex flex-col gap-6 shadow-sm">
          {apiError && (
            <div className="bg-red-500/20 border border-red-600 text-red-700 p-3 rounded-xl text-sm font-semibold text-center">
              {apiError}
            </div>
          )}

          {initialLoading ? (
            <p className="text-sm text-center font-semibold text-ink-black-700 py-6">
              Loading notification...
            </p>
          ) : (
            <NotificationForm
              type="edit"
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              errors={errors}
              loading={loading}
              navigate={navigate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditNotificationPage;