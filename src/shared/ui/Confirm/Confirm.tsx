import type { FormEvent, MouseEvent } from "react";

interface ConfirmProps {
  // Текстовое содержимое сообщения подтверждения
  content: string;
  // Функция, вызываемая при подтверждении (Yes)
  submit: () => void;
  // Функция, вызываемая при отказе (No), получает событие клика
  onDecline: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Confirm = ({ content, submit, onDecline }: ConfirmProps) => {
  // Обработчик отправки формы, предотвращает стандартное поведение и вызывает submit
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <form
      className="w-75 rounded-xl bg-white overflow-hidden"
      onSubmit={onSubmit}
    >
      {/* Сообщение подтверждения */}
      <p className="p-4">{content}</p>

      {/* Кнопки подтверждения и отказа */}
      <div className="flex">
        {/* Кнопка подтверждения: отправка формы */}
        <button
          type="submit"
          className="flex-1 p-3 px-4 border-0 text-center text-base text-red cursor-pointer"
        >
          Yes
        </button>

        {/* Кнопка отказа: вызывает onDecline */}
        <button
          type="button"
          className="flex-1 p-3 px-8 border-0 text-center text-base cursor-pointer"
          onClick={onDecline}
        >
          No
        </button>
      </div>
    </form>
  );
};
