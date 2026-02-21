import { formatDateTime } from "./utils/formatDateTime";

interface ChatProps {
  // Имя пользователя или чата
  name: string;
  // Дата и время последнего сообщения в ISO формате
  datetime: string;
  // Текст последнего сообщения
  msg: string;
}

export const Chat = ({ name, datetime, msg }: ChatProps) => {
  return (
    // Контейнер чата с аватаркой и информацией
    <div className="px-8 py-3 flex gap-2.5">
      {/* Аватар пользователя */}
      <div className="shrink-0 w-13.5 h-13.5 rounded-full grid place-items-center bg-lightgrey">
        <p className="text-2xl font-bold text-white">
          {name[0].toUpperCase()}
        </p>
      </div>

      {/* Основной блок с именем, временем и последним сообщением */}
      <div className="grow flex flex-col gap-2">
        {/* Верхняя строка: имя и время */}
        <div className="flex items-center justify-between">
          <h6 className="font-bold">{name}</h6>
          <p className="text-sm text-darkgrey">{formatDateTime(datetime)}</p>
        </div>

        {/* Текст сообщения */}
        <p className="line-clamp-1">{msg}</p>
      </div>
    </div>
  );
};
