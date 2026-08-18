import AuthForm from "../components/AuthForm";
import { useState } from "react";
import AuthTypeSwitch from "../components/AuthTypeSwitch";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let localErrors: Record<string, string> = {};

    if (!credentials.username) localErrors.username = "Username is required";
    if (!credentials.password) localErrors.password = "Password is required";

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = await authService.login(credentials);
      localStorage.setItem("token", data.auth_token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[100dvw] h-[100dvh] flex justify-center items-center bg-alabaster-grey-200">
      <div className="flex flex-col items-center justity-center gap-8">
        <div className="flex flex-col text-center">
          <h1 className="text-5xl mb-2 text-ink-black-800 font-bold tracking-wide ">
            NG-Notifications
          </h1>
          <p className="text-sm tracking-wide">
            Enter your username and password to log in
          </p>
        </div>
        <div className="px-12 py-10 bg-alabaster-grey-50 rounded-3xl border-2 border-ink-black-800 flex flex-col gap-6 min-w-sm min-h-[60dvh] flex justify-between">
          <AuthTypeSwitch currentPage={"login"} />
          <AuthForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            credentials={credentials}
            errors={errors}
            type="login"
            loading={loading}
            apiError={apiError}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
