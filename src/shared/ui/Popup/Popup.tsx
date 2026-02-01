import type { ReactNode } from "react";
import { X } from "lucide-react";

interface PopupProps {
  // Заголовок всплывающего окна
  heading: string;
  // Содержимое окна, может быть любым ReactNode
  children: ReactNode;
  // Функция закрытия окна
  onClose: () => void;
}

export const Popup = ({ heading, children, onClose }: PopupProps) => {
  return (
    // Основной контейнер, центрирующий контент и затемняющий фон
    <section className="absolute top-0 left-0 z-10 w-full h-full grid place-content-center bg-screen-dim">
      {/* Контейнер окна */}
      <div className="relative p-8 w-128 flex flex-col gap-8 rounded-2xl bg-white">
        {/* Заголовок и кнопка закрытия */}
        <div className="flex items-center justify-between">
          {/* Заголовок */}
          <h3 className="text-black text-xl font-semibold">{heading}</h3>

          {/* Кнопка закрытия с иконкой X */}
          <button className="cursor-pointer" type="button" onClick={onClose}>
            <X className="stroke-lightgrey" />
          </button>
        </div>

        {/* Основное содержимое окна */}
        {children}
      </div>
    </section>
  );
};
