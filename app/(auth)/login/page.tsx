"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { User } from "@shared-types/user";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { update } from "@/store/slices/userData";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";

const LoginPage = () => {
  const dispatch = useDispatch();

  // Получаем данные пользователя из Redux store
  const userData = useSelector((state: RootState) => state.userData);

  // Локальное состояние формы: email и password
  // Не включаем name, так как это страница логина
  const [formData, setFormData] = useState<Omit<User, "name">>({
    email: "",
    password: "",
  });

  // При монтировании компонента подставляем email из Redux (если есть)
  useEffect(() => {
    setFormData({
      ...formData,
      email: userData.data.email,
    });
  }, []);

  // Универсальный обработчик изменения полей формы
  // При изменении email обновляем Redux store, пароль оставляем только локально
  const handleFormChange = (key: keyof User, value: string) => {
    setFormData({ ...formData, [key]: value });

    if (key === "email") dispatch(update({ key, value }));
  };

  // Обработчик отправки формы
  // Отменяем стандартное поведение (перезагрузку) и выводим данные в консоль.
  // Здесь обычно выполняли бы валидацию и отправку на сервер.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
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
            onChange={(value) => handleFormChange("email", value)}
          />

          {/* Поле пароля */}
          <Input
            id="Password"
            placeholder="Password"
            type="current-password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(value) => handleFormChange("password", value)}
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
