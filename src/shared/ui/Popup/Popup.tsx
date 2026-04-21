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
    // обертка с затемняющим фоном
    <section className="absolute top-0 left-0 z-10 w-full h-full grid place-content-center bg-screen-dim">
      {/* Контейнер окна */}
      <header className="relative p-8 w-128 flex flex-col gap-8 rounded-2xl bg-white">
        {/* Заголовок и кнопка закрытия */}
        <header className="flex items-center justify-between">
          <h3 className="text-black text-xl font-semibold">{heading}</h3>
          <button className="cursor-pointer" type="button" onClick={onClose}>
            <X className="stroke-lightgrey" />
          </button>
        </header>

        {/* Основное содержимое окна */}
        {children}
      </header>
    </section>
  );
};
