import { useState, type FormEvent } from "react";
import { Button } from "@ui/Button";
import { Input } from "@ui/Input";

interface UserInfo {
  // Имя пользователя
  name: string;
  // Email пользователя
  email: string;
}

interface FormProps {
  // Текст кнопки формы
  buttonText: string;
  // Функция, вызываемая при отправке формы, получает объект UserInfo
  onSubmit: (userInfo: UserInfo) => void;
}

export const Form = ({ buttonText, onSubmit }: FormProps) => {
  // Состояние формы с полями name и email
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
  });

  // Обработчик отправки формы: предотвращает стандартное поведение и вызывает onSubmit с userInfo
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <div className="flex flex-col gap-4">
        {/* Поле для ввода имени */}
        <Input
          id="name"
          name="name"
          placeholder="Name"
          value={userInfo.name}
          onChange={(value) => setUserInfo({ ...userInfo, name: value })}
        />

        {/* Поле для ввода email */}
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          value={userInfo.email}
          onChange={(value) => setUserInfo({ ...userInfo, email: value })}
        />
      </div>

      {/* Кнопка отправки формы */}
      <Button type="submit" content={buttonText} />
    </form>
  );
};
