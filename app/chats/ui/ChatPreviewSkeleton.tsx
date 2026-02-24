export const ChatPreviewSkeleton = () => {
  // Скелет превью чата
  return (
    <div className="px-8 py-3 flex items-center gap-2.5 bg-white">
      {/* Аватар */}
      <div className="shrink-0 w-13.5 h-13.5 rounded-full grid place-items-center bg-lightgrey">
        <div className="bg-white w-4.5 h-6"></div>
      </div>

      {/* Основной блок */}
      <div className="grow flex flex-col gap-4">
        {/* Верхняя строка */}
        <div className="flex items-center justify-between">
          <div className="bg-stroke w-12 h-4"></div>
          <div className="bg-stroke w-16 h-3"></div>
        </div>

        {/* Нижняя строка */}
        <div className="bg-stroke w-32 h-4"></div>
      </div>
    </div>
  );
};
