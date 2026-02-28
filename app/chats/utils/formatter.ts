/**
 * Formats an ISO date string into a human-friendly label
 * depending on how recent the date is.
 *
 * Output rules:
 * - If today → returns time in HH:mm format
 * - If yesterday → returns "Yesterday"
 * - If within current week → returns weekday name
 * - Otherwise → returns full date in dd.mm.yyyy format
 */
export const formatDateTime = (isoString: string) => {
  // Parse incoming ISO string into Date object
  const date = new Date(isoString);

  // Current date/time reference
  const now = new Date();

  /**
   * Helper: format time as HH:mm using locale settings
   */
  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  /**
   * Helper: format full date as dd.mm.yyyy
   */
  const formatFullDate = (d: Date) => {
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    return `${day}.${month}.${year}`;
  };

  /**
   * Check if the given date is today
   */
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) return formatTime(date);

  /**
   * Check if the given date is yesterday
   */
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isYesterday) return "Yesterday";

  /**
   * Helper: calculate ISO week number (Monday = first day of week)
   *
   * Algorithm:
   * - Normalize date to midnight
   * - Shift date to nearest Thursday
   * - Calculate difference from first week of the year
   */
  const getWeekNumber = (d: Date) => {
    const temp = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    // Normalize to start of day
    temp.setHours(0, 0, 0, 0);

    // Shift to Thursday of current week (ISO standard)
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

  /**
   * If date belongs to current week (but is not today/yesterday),
   * return full weekday name (e.g., "Monday")
   */
  if (dateWeek === nowWeek && date < now) {
    return date.toLocaleDateString([], { weekday: "long" });
  }

  /**
   * For dates older than current week
   * return full date in dd.mm.yyyy format
   */
  return formatFullDate(date);
};

/**
 * Preconfigured formatter for time in "ru-RU" locale.
 * Can be reused for consistent HH:mm formatting.
 */
export const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});
