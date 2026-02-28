import type { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  // Уникальный идентификатор input
  id: string;
  // Имя input, по умолчанию совпадает с id
  name?: string;
  // Placeholder для поля
  placeholder: string;
  // Значение поля (управляемый компонент)
  value: string;
  // Callback при изменении значения input
  onValueChange: (value: string) => void;
  // Дополнительные классы
  classExtension?: string;
}

export const Input = ({
  id,
  name = id,
  placeholder = "",
  value,
  onValueChange,
  classExtension = "",
  ...rest
}: InputProps) => {
  return (
    <>
      {/* Скрытая метка для доступности */}
      <label htmlFor={id} className="hidden"></label>

      {/* Управляемый input */}
      <input
        className={`px-4 py-3 border-1 border-fill rounded-2xl bg-fill caret-darkgrey text-black text-base transition-colors duration-200 focus-visible:outline-none focus-visible:border-lightgrey placeholder:text-darkgrey placeholder:text-base ${classExtension}`}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onValueChange(e.target.value)
        }
        {...rest}
        required
      />
    </>
  );
};
