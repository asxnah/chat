import { KeyboardEvent } from "react";
import type { ChangeEvent } from "react";

interface InputProps {
  // Уникальный идентификатор input
  id: string;
  // Имя input, по умолчанию совпадает с id
  name?: string;
  // Тип input (text, email, password и др.)
  type?: "text" | "email" | "new-password" | "current-password";
  // Placeholder для поля
  placeholder: string;
  // Минимальная длина значения
  minLength?: number;
  // Максимальная длина значения
  maxLength?: number;
  // Атрибут автозаполнения
  autoComplete?: "email" | "new-password" | "current-password" | "off";
  // Значение поля (управляемый компонент)
  value: string;
  // Callback при изменении значения input
  onChange: (value: string) => void;
  // Обработчик нажатий клавиш
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  // Дополнительные классы для стилизации
  className?: string;
}

export const Input = ({
  id,
  name = id,
  type = "text",
  placeholder = "",
  minLength = 1,
  maxLength = 255,
  autoComplete = "off",
  value,
  onChange,
  onKeyDown,
  className = "",
}: InputProps) => {
  return (
    <>
      {/* Скрытая метка для доступности */}
      <label htmlFor={id} className="hidden"></label>

      {/* Управляемый input */}
      <input
        className={`px-4 py-3 border-1 border-fill rounded-2xl bg-fill caret-darkgrey text-black text-base transition-colors duration-200 focus-visible:outline-none focus-visible:border-lightgrey placeholder:text-darkgrey placeholder:text-base ${className}`}
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        onKeyDown={onKeyDown}
        required
      />
    </>
  );
};
