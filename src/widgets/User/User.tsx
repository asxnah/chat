import type { MouseEvent } from "react";
import { ChevronRight } from "lucide-react";

type UserProps = {
  // Тип пользователя: контакт или аккаунт
  type: "contact" | "account";
  // Имя пользователя
  name: string;
  // URL аватара
  avatar: string;
  // Email пользователя
  email: string;
  // Обработчик клика по пользователю
  onClick: (e: MouseEvent) => void;
};

export const User = ({ type, name, avatar, email, onClick }: UserProps) => {
  return (
    // Контейнер пользователя, кликабельный
    <div
      className="flex items-center justify-between p-3 cursor-pointer"
      onClick={onClick}
      tabIndex={0} // Чтобы элемент был фокусируемым
    >
      <div className="flex items-center gap-4">
        {/* Аватар пользователя */}
        {avatar && (
          <img
            src={avatar}
            alt="user avatar"
            className={`${
              type === "account" ? "w-16 h-16" : "w-13.5 h-13.5"
            } rounded-full object-cover`}
          />
        )}

        {/* Блок с именем и email */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center gap-4">
            <h4 className="font-normal">{name}</h4>
          </div>
          <p className="text-darkgrey">{email}</p>
        </div>
      </div>

      {/* Иконка стрелки вправо */}
      <ChevronRight className="width-2.5 height-4 stroke-lightgrey" />
    </div>
  );
};
