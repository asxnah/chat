export const ChatPreviewSkeleton = () => {
  // Скелет превью чата (возвращает трижды)
  return (
    <div className="px-8 py-3 flex gap-2.5 bg-white">
      {/* Аватар пользователя */}
      <div className="shrink-0 w-13.5 h-13.5 rounded-full grid place-items-center bg-lightgrey">
        <p className="font-redacted text-2xl font-bold text-white">S</p>
      </div>

      {/* Основной блок с именем, временем и последним сообщением */}
      <div className="grow flex flex-col gap-2">
        {/* Верхняя строка: имя и время */}
        <div className="flex items-center justify-between">
          <h6 className="font-redacted font-bold text-lightgrey">Someone</h6>
          <p className="font-redacted text-sm text-lightgrey">00:00</p>
        </div>

        {/* Текст сообщения */}
        <p className="font-redacted line-clamp-1 text-lightgrey">
          Some important text
        </p>
      </div>
    </div>
  );
};
