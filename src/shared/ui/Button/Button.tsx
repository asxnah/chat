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
      className={`px-4 py-3 bg-black rounded-2xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        typeof content === "string"
          ? "w-full text-white text-base font-bold text-center"
          : "w-fit"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
