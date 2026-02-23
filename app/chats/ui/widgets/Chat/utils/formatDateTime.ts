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

  // Вспомогательная функция для форматирования времени hh:mm
  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Вспомогательная функция для форматирования даты dd.mm.yyyy
  const formatFullDate = (d: Date) => {
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Проверяем, является ли дата сегодняшним днем
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) return formatTime(date);

  // Проверяем, является ли дата вчерашним днем
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isYesterday) return "Yesterday";

  // Получаем номер недели (понедельник = 1)
  const getWeekNumber = (d: Date) => {
    const temp = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    temp.setHours(0, 0, 0, 0);
    // День недели этой недели
    temp.setDate(temp.getDate() + 3 - ((temp.getDay() + 6) % 7));
    const week1 = new Date(temp.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((temp.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7,
      )
    );
  };

  const dateWeek = getWeekNumber(date);
  const nowWeek = getWeekNumber(now);

  // Если дата на этой неделе (но не вчера)
  if (dateWeek === nowWeek && date < now) {
    return date.toLocaleDateString([], { weekday: "long" });
  }

  // Для прошлой недели и ранее
  return formatFullDate(date);
};
