import AuthForm from "../components/AuthForm";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthTypeSwitch from "../components/AuthTypeSwitch";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let localErrors: Record<string, string> = {};

    if (!credentials.username) localErrors.email = "Username is required";
    if (!credentials.password) localErrors.password = "Password is required";

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
    } else {
      setErrors({});
      console.log("Logging in with:", credentials);
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
        <div className="px-12 py-10 bg-alabaster-grey-50 rounded-3xl border-2 border-ink-black-800 flex flex-col gap-6 min-w-sm  flex justify-between">
          <AuthTypeSwitch currentPage={'login'}/>
          <AuthForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            credentials={credentials}
            errors={errors}
            type="login"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
