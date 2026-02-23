"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { update } from "@/store/slices/userData";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { User } from "@/shared/types/user";

const SignupPage = () => {
  const dispatch = useDispatch();

  // Получаем из Redux уже сохраненные имя/почту (если есть)
  const { name, email } = useSelector(
    (state: RootState) => state.userData.data,
  );

  // Локальный state формы
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  // Синхронизируем локальное состояние формы с данными из Redux при их изменении
  // Это позволяет подставить уже введенные ранее имя/почту в форму.
  useEffect(() => {
    setFormData((data) => ({
      ...data,
      name,
      email,
    }));
  }, [name, email]);

  // Универсальный обработчик изменения полей формы
  // key — одно из полей User, value — новое значение поля.
  // При изменении name/email также диспатчим обновление в Redux (чтобы сохранять прогресс ввода).
  const handleFormChange = (key: keyof User, value: string) => {
    setFormData({ ...formData, [key]: value });

    // Не сохраняем пароль в глобальный стор — только локально
    if (key !== "password") dispatch(update({ key, value }));
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
      {/* Форма регистрации: контролы управляются через formData */}
      <form className="w-128 flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-4xl font-semibold text-center">Welcome</h1>

        <div className="flex flex-col gap-4">
          {/* Поле для имени */}
          <Input
            id="Name"
            placeholder="Name"
            value={formData.name}
            onChange={(value) => handleFormChange("name", value)}
          />

          {/* Поле для email: тип email + автозаполнение */}
          <Input
            id="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(value) => handleFormChange("email", value)}
          />

          {/* Поле для пароля: тип new-password для подсказок автозаполнения */}
          <Input
            id="Password"
            placeholder="Password"
            type="new-password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(value) => handleFormChange("password", value)}
          />
        </div>

        {/* Кнопка отправки: выключена, если какое-либо поле пустое */}
        <Button
          type="submit"
          content="Continue"
          disabled={
            formData.name === "" ||
            formData.email === "" ||
            formData.password === ""
          }
        />

        {/* Ссылка на страницу логина */}
        <Link className="text-center underline" href="/login">
          Already have an account?
        </Link>
      </form>
    </main>
  );
};

export default SignupPage;
