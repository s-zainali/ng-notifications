export default function InputField({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        className="text-xs uppercase font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3.5 py-2 border rounded-lg bg-alabaster-grey-100 focus:bg-alabaster-grey-50 text-sm text-ink-black-900 placeholder-ink-black-700 outline-none transition-all tracking-wide transition duration-300 ease-in-out 
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-ink-black-700 focus:border-ink-black-800 focus:ring-1 focus:ring-ink-black-700/70"
          }`}
      />

      <p className="text-xs h-1 font-medium text-red-600">{error}</p>
    </div>
  );
}
