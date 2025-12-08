import { KeyboardEvent } from "react";
import type { ChangeEvent } from "react";

interface InputProps {
  id: string;
  name?: string;
  type?: "text" | "email" | "new-password" | "current-password";
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  autoComplete?: "email" | "new-password" | "current-password" | "off";
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({
  id,
  name = id,
  type = "text",
  placeholder = "",
  minLength = 1,
  maxLength = 255,
  autoComplete = "off",
  value,
  onChange,
  onKeyDown,
  className = "",
}: InputProps) => {
  return (
    <>
      <label htmlFor={id} className="hidden"></label>
      <input
        className={`px-4 py-3 border-1 border-fill rounded-2xl bg-fill caret-darkgrey text-black text-base transition-colors duration-200 focus-visible:outline-none focus-visible:border-lightgrey placeholder:text-darkgrey placeholder:text-base ${className}`}
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onKeyDown={onKeyDown}
        required
      />
    </>
  );
};
