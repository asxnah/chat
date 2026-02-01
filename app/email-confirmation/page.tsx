"use client";

import { FormEvent, useState, KeyboardEvent, useEffect } from "react";
import Link from "next/link";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { redirect } from "next/navigation";

const emailConfirmation = () => {
  // Состояние для хранения кода подтверждения (4 отдельных символа)
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  // Состояние корректности введенного кода
  const [isCorrect, setIsCorrect] = useState(true);

  // Получаем email из localStorage или показываем заглушку
  const storageEmail = localStorage.getItem("email") || "your email";

  // Эффект проверки кода при изменении состояния code
  useEffect(() => {
    // Если все поля заполнены и код неверный, показываем ошибку
    if (code.every((c) => c !== "") && code.join("") !== "1111") {
      setIsCorrect(false);
    }

    // Если код верный, перенаправляем на /chats
    if (code.join("") === "1111") redirect("/chats");
  }, [code]);

  // Обработчик изменения одного из полей кода
  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Автопереход к следующему полю, если текущий символ введен и это не последний input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `#code-${index + 1}`,
      ) as HTMLInputElement | null;

      if (nextInput) nextInput.focus();
    }
  };

  // Обработчик нажатия Backspace для перемещения курсора назад
  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Если нажата Backspace и текущее поле пустое, переносим фокус на предыдущее
    if (e.key === "Backspace" && !code[index] && index > 0) {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }

      const prevInput = document.querySelector(
        `#code-${index - 1}`,
      ) as HTMLInputElement;

      if (prevInput) prevInput.focus();
    }
  };

  // Обработчик отправки формы
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь обычно выполняли бы валидацию и отправку на сервер
    console.log(JSON.stringify(code));
  };

  return (
    <main className="flex items-center justify-center">
      <form className="w-128 flex flex-col gap-8" onSubmit={onSubmit}>
        <header className="flex flex-col gap-2">
          {/* Заголовок и инструкция с email */}
          <h1 className="text-4xl font-semibold text-center">
            Confrirm your email
          </h1>
          <p className="text-darkgrey text-center">
            The code was sent to {storageEmail}.{" "}
            <Link className="underline" href="/signup">
              Change email
            </Link>
          </p>
        </header>

        {/* Поля для ввода кода */}
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
              onChange={(value) => handleChange(value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
            />
          ))}
        </div>

        {/* Сообщение об ошибке при неправильном коде */}
        {!isCorrect && <p className="text-red text-center">Incorrect code</p>}

        {/* Кнопка подтверждения: выключена, если есть пустые поля */}
        <Button
          type="submit"
          content="Sign up"
          disabled={code.some((c) => c === "")}
        />
      </form>
    </main>
  );
};

export default emailConfirmation;
