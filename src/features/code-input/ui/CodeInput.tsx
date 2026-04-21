"use client";

import { KeyboardEvent } from "react";
import { Input } from "@ui/Input";

interface Props {
  code: string[];
  setCode: (code: string[]) => void;
  isCorrect: boolean;
  setIsCorrect: (value: boolean) => void;
}

export const CodeInput = ({
  code,
  setCode,
  isCorrect,
  setIsCorrect,
}: Props) => {
  // Обработчик изменения одного из полей кода
  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Сбрасываем ошибку при вводе
    setIsCorrect(true);

    // Автопереход к следующему input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `#code-${index + 1}`,
      ) as HTMLInputElement | null;

      nextInput?.focus();
    }
  };

  // Обработчик Backspace (переход назад)
  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.querySelector(
        `#code-${index - 1}`,
      ) as HTMLInputElement;

      prevInput?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Инпуты кода */}
      <div className="flex justify-center gap-4">
        {code.map((c, index) => (
          <Input
            key={index}
            className="w-11.5 h-11.5 text-center"
            id={`code-${index}`}
            placeholder="_"
            autoComplete="email"
            maxLength={1}
            value={c}
            onValueChange={(value) => handleChange(value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
          />
        ))}
      </div>

      {/* Ошибка (только если код полностью введён) */}
      {!isCorrect && code.every((c) => c !== "") && (
        <p className="text-red text-center">Incorrect code</p>
      )}
    </div>
  );
};
