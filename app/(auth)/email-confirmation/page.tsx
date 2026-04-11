"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@ui/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { v4 } from "uuid";

import { CodeInput } from "@features/code-input";

const CODE = "1111";

const EmailConfirmation = () => {
  const router = useRouter();

  // Состояние для хранения кода подтверждения (4 отдельных символа)
  const [code, setCode] = useState<string[]>(["", "", "", ""]);

  // Состояние корректности введенного кода
  const [isCorrect, setIsCorrect] = useState(true);

  // Получаем email из Redux
  const storageEmail = useSelector((state: RootState) => state.user.user.email);

  // Обработчик отправки формы (проверка только по кнопке)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Если код неверный — показываем ошибку
    if (code.join("") !== CODE) {
      setIsCorrect(false);
      return;
    }

    // Если код верный — создаём токен и редиректим
    setIsCorrect(true);
    localStorage.setItem("token", v4());
    router.push("/chats");
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

        {/* Блок ввода кода */}
        <CodeInput
          code={code}
          setCode={setCode}
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
        />

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

export default EmailConfirmation;
