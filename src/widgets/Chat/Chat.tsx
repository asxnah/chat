import { formatDateTime } from "./utils/formatDateTime";

interface ChatProps {
  // URL аватара пользователя
  src: string;
  // Имя пользователя или чата
  name: string;
  // Дата и время последнего сообщения в ISO формате
  datetime: string;
  // Текст последнего сообщения
  msg: string;
  // Количество непрочитанных сообщений
  counter: number;
}

export const Chat = ({ src, name, datetime, msg, counter }: ChatProps) => {
  return (
    // Контейнер чата с аватаркой и информацией
    <div className="px-8 py-3 flex gap-2.5">
      {/* Аватарка пользователя */}
      <img src={src} alt="avatar" className="w-13.5 h-13.5 rounded-full" />

      {/* Основной блок с именем, временем и последним сообщением */}
      <div className="grow flex flex-col gap-2">
        {/* Верхняя строка: имя и время */}
        <div className="flex items-center justify-between">
          <h6 className="font-bold">{name}</h6>
          <p className="text-sm text-darkgrey">{formatDateTime(datetime)}</p>
        </div>

        {/* Нижняя строка: текст сообщения и счетчик непрочитанных */}
        <div className="flex items-center justify-between">
          <p>{msg}</p>
          {/* Показать счетчик, если есть непрочитанные сообщения */}
          {counter > 0 && (
            <div className="rounded-full bg-black px-[5px] py-px">
              <p className="text-white text-xs font-bold">{counter}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
