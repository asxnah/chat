import type { ReactNode, MouseEvent } from "react";

type ButtonProps = {
  // Тип кнопки: обычная кнопка или кнопка отправки формы
  type?: "button" | "submit";
  // Содержимое кнопки: текст или ReactNode
  content: string | ReactNode;
  // Флаг отключения кнопки
  disabled?: boolean;
  // Обработчик клика по кнопке
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
      // Классы Tailwind для стилизации кнопки, включая состояние disabled
      className={`px-4 py-3 bg-black rounded-2xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
        typeof content === "string"
          ? "w-full text-white text-base font-bold text-center"
          : "w-fit"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Рендерим содержимое кнопки */}
      {content}
    </button>
  );
};
