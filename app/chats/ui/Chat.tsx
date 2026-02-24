interface ChatProps {
  // ID чата
  id: string;
  // Имя пользователя
  name: string;
  // Дата и время последнего сообщения в ISO формате
  datetime: string;
  // Текст последнего сообщения
  message: string;
  // Состояние выбранного чата
  isSelected: boolean;
  // Обработчик для выбора чата
  onSelect: (id: string) => void;
}

export const Chat = ({
  id,
  name,
  datetime,
  message,
  isSelected,
  onSelect,
}: ChatProps) => {
  return (
    // Контейнер чата с аватаркой и информацией
    <div
      className={`px-8 py-3 flex items-center gap-2.5 ${isSelected ? "bg-fill" : "bg-white"}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(id);
        }
      }}
    >
      {/* Аватар пользователя */}
      <div className="shrink-0 w-13.5 h-13.5 rounded-full grid place-items-center bg-lightgrey">
        <p className="text-2xl font-bold text-white">{name[0].toUpperCase()}</p>
      </div>

      {/* Основной блок с именем, временем и последним сообщением */}
      <div className="grow flex flex-col gap-2">
        {/* Верхняя строка: имя и время */}
        <div className="flex items-center justify-between">
          <h6 className="font-bold">{name}</h6>
          <p className="text-sm text-darkgrey">{datetime}</p>
        </div>

        {/* Текст сообщения */}
        <p className="line-clamp-1">{message}</p>
      </div>
    </div>
  );
};
