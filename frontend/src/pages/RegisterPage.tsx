import AuthForm from "../components/AuthForm";
import { useState } from "react";
import AuthTypeSwitch from "../components/AuthTypeSwitch";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

    if (!credentials.fullName) localErrors.fullName = "Full Name is required";
    if (!credentials.username) localErrors.username = "Username is required";
    if (!credentials.password) localErrors.password = "Password is required";

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await authService.register(credentials);
    //   navigate("/login");
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Registration failed. Please try again."
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
            Enter your details to register for an account
          </p>
        </div>
        <div className="px-12 py-10 bg-alabaster-grey-50 rounded-3xl border-2 border-ink-black-800 flex flex-col gap-6 min-w-sm min-h-[60dvh] flex justify-between">
          <AuthTypeSwitch currentPage={"register"} />
          <AuthForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            credentials={credentials}
            errors={errors}
            type="register"
            loading={loading}
            apiError={apiError}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
