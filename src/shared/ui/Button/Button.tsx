import type { ReactNode, MouseEvent } from "react";

type ButtonProps = {
  type?: "button" | "submit";
  content: string | ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLFormElement>) => void;
};

export const Button = ({
  type = "button",
  content,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full px-4 py-3 rounded-2xl bg-black text-white text-base font-bold text-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
