"use client";

import { useState, FormEvent } from "react";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { updateUser } from "@store/slices/user";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Получаем данные пользователя из Redux store
  const user = useSelector((state: RootState) => state.user.user);

  // Локальное состояние формы: email и password
  const [formData, setFormData] = useState<FormData>({
    email: user.email ?? "",
    password: "",
  });

  // Универсальный обработчик изменения полей формы
  const handleFormChange = (key: keyof FormData, value: string) => {
    setFormData({ ...formData, [key]: value });

    // При изменении email обновляем Redux store
    if (key === "email") dispatch(updateUser({ key, value }));
  };

  // Обработчик отправки формы
  // Здесь обычно выполняли бы валидацию и отправку на сервер.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("token", v4());

    // Сохраняем имя пользователя в Redux store, извлекая его из email
    // обычно достали бы из бэканда, но для дева используем часть email до "@"
    dispatch(
      updateUser({
        key: "name",
        value: formData.email.slice(0, formData.email.indexOf("@")),
      }),
    );
    router.push("/chats");
  };

  return (
    <main className="flex items-center justify-center">
      {/* Форма логина */}
      <form className="w-128 flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-4xl font-semibold text-center">Welcome back</h1>

        <div className="flex flex-col gap-4">
          {/* Поле email */}
          <Input
            id="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onValueChange={(value) => handleFormChange("email", value)}
            title="Enter your email here"
          />

          {/* Поле пароля */}
          <Input
            id="Password"
            placeholder="Password"
            type="current-password"
            autoComplete="current-password"
            value={formData.password}
            onValueChange={(value) => handleFormChange("password", value)}
            title="Enter your password here"
          />
        </div>

        {/* Кнопка отправки: выключена, если поля пустые */}
        <Button
          type="submit"
          content="Log in"
          disabled={formData.email === "" || formData.password === ""}
        />

        {/* Ссылка на страницу регистрации */}
        <Link className="text-center underline" href="/signup">
          Don&rsquo;t have an account yet?
        </Link>
      </form>
    </main>
  );
};

export default LoginPage;
