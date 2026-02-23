import type { MouseEvent } from "react";
import { ChevronRight } from "lucide-react";

type UserProps = {
  // Тип ссылки: контакт или аккаунт
  isAccount: boolean;
  // Имя пользователя
  name: string;
  // Email пользователя
  email: string;
  // Обработчик клика по пользователю
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
};

export const User = ({ isAccount, name, email, onClick }: UserProps) => {
  return (
    // Контейнер пользователя, кликабельный
    <div
      className="flex items-center justify-between p-3 cursor-pointer"
      onClick={onClick}
      tabIndex={0} // Чтобы элемент был фокусируемым
    >
      <div className="flex items-center gap-4">
        {/* Аватар пользователя */}
        <div
          className={`shrink-0 rounded-full grid place-items-center bg-lightgrey ${
            isAccount ? "w-16 h-16" : "w-13.5 h-13.5"
          }`}
        >
          <p className="text-2xl font-bold text-white">
            {name[0].toUpperCase()}
          </p>
        </div>

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
