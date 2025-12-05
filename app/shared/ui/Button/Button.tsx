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
      className="px-4 py-3 rounded-full bg-black text-white text-base font-bold text-center transition-colors duration-200 active:cursor-pointer active:bg-(--mainColor-active) disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black hover:cursor-pointer hover:bg-(--mainColor-hover) [@media(hover:hover):hover:bg-(--mainColor-hover)]"
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
