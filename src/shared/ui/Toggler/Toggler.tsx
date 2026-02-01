type TogglerProps = {
  // Текст рядом с переключателем
  content: string;
  // Состояние переключателя (вкл/выкл)
  checked: boolean;
  // Функция, вызываемая при клике для переключения состояния
  onToggle: () => void;
};

export const Toggler = ({ content, checked, onToggle }: TogglerProps) => {
  return (
    // Контейнер переключателя с текстом и кнопкой
    <div className="flex items-center justify-between px-8 py-3">
      {/* Текст рядом с переключателем */}
      <p>{content}</p>

      {/* Кнопка для переключения состояния */}
      <button type="button" onClick={onToggle}>
        <svg
          className="cursor-pointer"
          width="32"
          height="16"
          viewBox="0 0 32 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Фон переключателя */}
          <rect
            className="pointer-events-none fill-stroke"
            width="32"
            height="16"
            rx="8"
          />

          {/* Круглый ползунок, смещается при включении/выключении */}
          <circle
            className={`${
              checked
                ? "translate-x-4 fill-black"
                : "translate-x-0 fill-lightgrey"
            } pointer-events-none duration-200`}
            cx="8"
            cy="8"
            r="8"
          />
        </svg>
      </button>
    </div>
  );
};
