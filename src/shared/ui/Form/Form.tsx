import { useState, type FormEvent } from "react";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";
import { User } from "@/shared/types/user";

interface FormProps {
  // Текст кнопки формы
  buttonText: string;
  // Функция, вызываемая при отправке формы, получает объект User
  onSubmit: (userData: Omit<User, "password">) => void;
}

export const Form = ({ buttonText, onSubmit }: FormProps) => {
  // Состояние формы с полями name и email
  const [userData, setUserData] = useState<Omit<User, "password">>({
    name: "",
    email: "",
  });

  // Обработчик отправки формы: предотвращает стандартное поведение и вызывает onSubmit с userData
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <div className="flex flex-col gap-4">
        {/* Поле для ввода имени */}
        <Input
          id="name"
          name="name"
          placeholder="Name"
          value={userData.name}
          onValueChange={(value) => setUserData({ ...userData, name: value })}
        />

        {/* Поле для ввода email */}
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          value={userData.email}
          onValueChange={(value) => setUserData({ ...userData, email: value })}
        />
      </div>

      {/* Кнопка отправки формы */}
      <Button type="submit" content={buttonText} />
    </form>
  );
};
