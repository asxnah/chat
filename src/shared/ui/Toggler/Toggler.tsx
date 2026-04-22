type TogglerProps = {
  // Текст рядом с переключателем
  content: string;
  // Состояние переключателя (вкл/выкл)
  checked: boolean;
  // Функция, вызываемая при клике для переключения состояния
  onToggle?: () => void;
  // Доп. классы
  className?: string;
  // состояние неактивности
  disabled?: boolean;
};

export const Toggler = ({
  content,
  checked,
  onToggle,
  className,
  disabled = false,
}: TogglerProps) => {
  return (
    // Контейнер переключателя с текстом и кнопкой
    <div className={`flex items-center justify-between ${className}`}>
      {/* Текст рядом с переключателем */}
      <p>{content}</p>

      {/* Кнопка для переключения состояния */}
      <button
        className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
        type="button"
        onClick={onToggle}
        disabled={disabled}
      >
        <svg
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
