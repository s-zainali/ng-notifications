import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";
import { api } from "../services/api";
import NotificationForm, {
  type NotificationFormData,
} from "../components/NotificationForm";

const getErrorMessage = (err: unknown): string => {
  if (typeof err === "object" && err !== null && "response" in err) {
    const response = (err as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return "Failed to create notification. Please try again.";
};

function NewNotificationPage() {
  const navigate = useNavigate();
  const { fetchNotifications } = useNotifications();

  const [formData, setFormData] = useState<NotificationFormData>({
    category: "INFO",
    header: "",
    body: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      await api.post("/notifications", formData);
      await fetchNotifications();
      navigate("/dashboard");
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center bg-alabaster-grey-200 p-6">
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg">
        <div className="flex flex-col text-center">
          <h1 className="text-4xl text-ink-black-800 font-bold tracking-wide mb-1">
            Create Notification
          </h1>
          <p className="text-sm tracking-wide text-ink-black-700">
            Add a new notification banner to your dashboard
          </p>
        </div>

        <div className="w-full px-8 py-8 bg-alabaster-grey-100 rounded-3xl border-2 border-ink-black-800 flex flex-col gap-6 shadow-sm">
          {apiError && (
            <div className="bg-red-500/20 border border-red-600 text-red-700 p-3 rounded-xl text-sm font-semibold text-center">
              {apiError}
            </div>
          )}

          <NotificationForm
            type="create"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
            loading={loading}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
}

export default NewNotificationPage;