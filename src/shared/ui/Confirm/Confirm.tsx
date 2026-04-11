import type { FormEvent, MouseEvent } from "react";

interface ConfirmProps {
  // Текстовое содержимое сообщения подтверждения
  content: string;
  // Функция, вызываемая при подтверждении (Yes)
  onSubmit: () => void;
  // Функция, вызываемая при отказе (No), получает событие клика
  onDecline: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Confirm = ({ content, onSubmit, onDecline }: ConfirmProps) => {
  // Обработчик отправки формы, предотвращает стандартное поведение и вызывает onSubmit
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="h-full w-full bg-screen-dim fixed top-0 left-0 flex items-center justify-center">
      <form
        className="w-75 rounded-xl bg-white overflow-hidden"
        onSubmit={submit}
      >
        {/* Сообщение подтверждения */}
        <p className="p-4">{content}</p>
        {/* Кнопки подтверждения и отказа */}
        <div className="grid grid-cols-2">
          {/* Кнопка подтверждения: отправка формы */}
          <button
            type="submit"
            className="p-3 px-4 border-0 text-center text-base text-red cursor-pointer"
          >
            Yes
          </button>
          {/* Кнопка отказа: вызывает onDecline */}
          <button
            type="button"
            className="p-3 px-8 border-0 text-center text-base cursor-pointer"
            onClick={onDecline}
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
};
