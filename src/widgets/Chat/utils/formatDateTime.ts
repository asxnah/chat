export const formatTime = (isoString: string) => {
  // Преобразуем ISO строку в объект Date
  const date = new Date(isoString);

  // Получаем часы и минуты, добавляя ведущий ноль при необходимости
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Возвращаем строку в формате HH:MM
  return `${hours}:${minutes}`;
};

export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();

  // Вспомогательная функция для форматирования даты MM/DD
  const formatDate = (d: Date) => {
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

  // Проверяем, является ли дата сегодняшним днем
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    // Если сегодня, возвращаем только время
    return formatTime(isoString);
  }

  // Проверяем, является ли дата вчерашним днем
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isYesterday) {
    return "Yesterday";
  }

  // Иначе возвращаем дату в формате MM/DD
  return formatDate(date);
};
