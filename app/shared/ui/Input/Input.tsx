import type { ChangeEvent } from "react";

interface InputProps {
  type?: "text" | "email" | "new-password" | "current-password";
  id: string;
  name?: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  autoComplete?: "email" | "new-password" | "current-password" | "off";
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder = "",
  name = id,
  type = "text",
  minLength = 1,
  maxLength = 255,
  autoComplete = "off",
}: InputProps) => {
  return (
    <input
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-4 py-3 border-1 border-fill rounded-2xl bg-fill caret-darkgrey text-black text-base transition-colors duration-200 focus-visible:outline-none focus-visible:border-lightgrey placeholder:text-darkgrey placeholder:text-base"
      minLength={minLength}
      maxLength={maxLength}
      autoComplete={autoComplete}
      required
    />
  );
};
