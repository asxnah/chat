"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessagesSquare, Settings, Users } from "lucide-react";

export const TabBar = () => {
  // Получаем текущий путь из Next.js navigation
  const pathname = usePathname();

  // Скрываем TabBar на страницах регистрации, логина и подтверждения email
  if (
    pathname.includes("/signup") ||
    pathname.includes("/login") ||
    pathname.includes("/email-confirmation")
  )
    return null;

  return (
    // Контейнер боковой панели
    <aside className="h-full flex flex-col justify-between bg-black">
      {/* Навигация с чатами и контактами */}
      <nav>
        <ul className="list-none">
          {/* Ссылка на чат */}
          <li
            className={`${
              pathname === "/chats" ? "opacity-100" : "opacity-50"
            } p-4 transition-opacity duration-200`}
          >
            <Link
              href="/chats"
              className="w-full flex items-center flex-col gap-1"
            >
              <MessagesSquare className="stroke-white h-5" />
              <span className="text-white text-sm">Chats</span>
            </Link>
          </li>

          {/* Ссылка на контакты */}
          <li
            className={`${
              pathname === "/contacts" ? "opacity-100" : "opacity-50"
            } p-4 transition-opacity duration-200`}
          >
            <Link
              href="/contacts"
              className="w-full flex items-center flex-col gap-1"
            >
              <Users className="stroke-white h-5" />
              <span className="text-white text-sm">Contacts</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Ссылка на настройки, расположена внизу панели */}
      <div
        className={`${
          pathname === "/settings" ? "opacity-100" : "opacity-50"
        } p-4 transition-opacity duration-200`}
      >
        <Link
          href="/settings"
          className="w-full flex items-center flex-col gap-1"
        >
          <Settings className="stroke-white h-5" />
          <span className="text-white text-sm">Settings</span>
        </Link>
      </div>
    </aside>
  );
};
