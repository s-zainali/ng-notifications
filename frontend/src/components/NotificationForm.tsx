import {
    useState,
    useEffect,
    useRef,
    type ChangeEvent,
    type FormEvent,
  } from "react";
  import type { NavigateFunction } from "react-router-dom";
  import InputField from "./InputField";
  
  export interface NotificationFormData {
    category: string;
    header: string;
    body: string;
  }
  
  interface NotificationFormProps {
    formData: NotificationFormData;
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    errors: Record<string, string>;
    loading: boolean;
    navigate: NavigateFunction;
    type?: "create" | "edit";
  }
  
  const CATEGORIES = ["INFO", "WARNING", "ERROR"] as const;
  
  function NotificationForm({
    formData,
    handleChange,
    handleSubmit,
    errors,
    loading,
    navigate,
    type = "create",
  }: NotificationFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const currentCategory = formData.category || "INFO";
  
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    const handleSelect = (category: string) => {
      handleChange({
        target: { name: "category", value: category },
      } as ChangeEvent<HTMLSelectElement>);
      setIsOpen(false);
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
          <label className="text-xs font-bold uppercase tracking-wider text-ink-black-800">
            Category
          </label>
  
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-3 bg-alabaster-grey-200 border border-ink-black-700 rounded-xl font-bold text-sm text-ink-black-800 flex justify-between items-center cursor-pointer outline-none transition focus:bg-alabaster-grey-50 focus:border-ink-black-800 focus:ring-1 focus:ring-ink-black-700/70"
          >
            <span>{currentCategory}</span>
            <span
              className={`text-xs transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
  
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-alabaster-grey-100 border border-ink-black-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelect(cat)}
                  className={`p-3 text-left font-bold text-sm text-ink-black-800 hover:bg-alabaster-grey-200 transition cursor-pointer ${
                    currentCategory === cat ? "bg-alabaster-grey-200" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
  
        <InputField
          label="Header"
          id="header"
          type="text"
          name="header"
          value={formData.header}
          onChange={handleChange}
          placeholder="eg. Sample Header"
          error={errors.header}
        />
  
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wider text-ink-black-800">
            Body Message
          </label>
          <textarea
            name="body"
            rows={3}
            value={formData.body}
            onChange={handleChange}
            placeholder="Enter notification details..."
            className={`p-3 bg-alabaster-grey-200 focus:bg-alabaster-grey-50 border rounded-xl text-sm outline-none resize-none transition ${
              errors.body
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-ink-black-700 focus:border-ink-black-800 focus:ring-1 focus:ring-ink-black-700/70"
            }`}
          />
          {errors.body && (
            <span className="text-xs text-red-600 font-semibold">
              {errors.body}
            </span>
          )}
        </div>
  
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-1/2 py-3 cursor-pointer border border-ink-black-800 text-ink-black-800 font-bold uppercase rounded-xl text-xs hover:bg-alabaster-grey-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 py-3 cursor-pointer bg-ink-black-800 text-alabaster-grey-50 font-bold uppercase rounded-xl text-xs hover:bg-ink-black-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : type === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </form>
    );
  }
  
  export default NotificationForm;