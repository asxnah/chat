import type { ChangeEvent } from "react";

interface InputProps {
  type?: "text" | "email";
  id: string;
  name?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  autoComplete?: "email" | "off";
  value: string;
  change: (value: string) => void;
}

export const Input = ({
  id,
  value,
  change,
  placeholder = "",
  name = id,
  type = "text",
  minLength = 1,
  maxLength = 255,
}: InputProps) => {
  return (
    <input
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => change(e.target.value)}
      placeholder={placeholder}
      className="px-3 py-3 border-[0.0625rem] border-(--fill) rounded-[1rem] bg-(--fill) caret-(--darkgrey) text-(--black) text-base font-normal transition-colors duration-200 focus-visible:outline-none focus-visible:border-(--lightgrey) placeholder:text-(--darkgrey) placeholder:text-base"
      minLength={minLength}
      maxLength={maxLength}
      required
    />
  );
};
