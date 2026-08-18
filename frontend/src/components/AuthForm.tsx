import InputField from "./InputField";

function AuthForm({
  handleSubmit,
  credentials,
  handleChange,
  errors,
  loading,
  type,
  apiError,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex gap-8 flex-col justify-between"
    >
      <div className="flex flex-col h-full gap-5 justify-between">
        {type === "register" && (
          <InputField
            label="Full Name"
            id="fullName"
            type="text"
            name="fullName"
            value={credentials.fullName}
            onChange={handleChange}
            placeholder="My Full Name"
            error={errors.fullName}
          />
        )}
        <InputField
          label="Username"
          id="username"
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="myusername"
          error={errors.username}
        />

        <InputField
          label="Password"
          id="password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
        />
      </div>
      <div>
        {apiError !== "" && (
          <div className="text-sm mb-2 transition duration-400 ease-in-out text-center tracking-wide text-red-600">
            {apiError}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-ink-black-800 hover:bg-ink-black-600 text-sm font-bold uppercase rounded-l-lg text-alabaster-grey-100 font-semibold rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-200 outline-none transition-colors duration-300 ease-in-out cursor-pointer"
        >
          {loading
            ? "Processing..."
            : type === "register"
            ? "Register"
            : "Sign In"}
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
