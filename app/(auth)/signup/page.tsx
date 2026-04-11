"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { useRouter } from "next/navigation";
import { updateUser } from "@store/slices/user";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Получаем из Redux уже сохраненные имя/почту (если есть)
  const { name, email } = useSelector((state: RootState) => state.user.user);

  // Локальный state формы
  const [formData, setFormData] = useState<FormData>({
    name: name ?? "",
    email: email ?? "",
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
  // При изменении name/email также диспатчим обновление в Redux (чтобы сохранять прогресс ввода).
  const handleFormChange = (key: keyof FormData, value: string) => {
    // key — одно из полей User, value — новое значение поля.
    setFormData({ ...formData, [key]: value });

    // Не сохраняем пароль в глобальный стор — только локально
    if (key === "password") return;
    dispatch(updateUser({ key, value }));
  };

  // Обработчик отправки формы
  // Здесь обычно выполняли бы валидацию и отправку на сервер.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/email-confirmation");
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
            onValueChange={(value) => handleFormChange("name", value)}
            title="Enter your name here"
          />

          {/* Поле для email: тип email + автозаполнение */}
          <Input
            id="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onValueChange={(value) => handleFormChange("email", value)}
            title="Enter your email here"
          />

          {/* Поле для пароля: тип new-password для подсказок автозаполнения */}
          <Input
            id="Password"
            placeholder="Password"
            type="new-password"
            autoComplete="new-password"
            value={formData.password}
            onValueChange={(value) => handleFormChange("password", value)}
            title="Enter a new password here"
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
