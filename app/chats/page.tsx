"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Chat } from "@widgets/Chat";

// TODO:
// - Подключить получение списка чатов пользователя из Redux
// - Реализовать фильтр поиска по chatsList
// - Отображать список чатов динамически вместо заглушки
// - Настроить отображение пустого состояния только если chats пуст
// - Добавить обработку выбора чата и отображение сообщений

const ChatsPage = () => {
  const dispatch = useDispatch();

  // Получаем данные пользователя и список чатов из Redux store
  const chatsList = useSelector((state: RootState) => state.userInfo);

  // Состояние поля поиска
  const [query, setQuery] = useState<string>("");
  // Локальное состояние списка чатов (пока пустое)
  const [chats, setChats] = useState<Chat[]>([]);

  // Эффект для загрузки чатов при монтировании страницы (пока пустой)
  useEffect(() => {}, []);

  return (
    <main className="flex">
      {/* Левая панель с поиском и списком чатов */}
      <div className="w-120 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          {/* Поле поиска */}
          <Input
            className="mx-8 my-3"
            id="search"
            placeholder="Search "
            value={query}
            onChange={(value) => setQuery(value)}
          />

          {/* Список чатов (пока заглушка) */}
          <div className="flex flex-col grow">
            <Chat
              src="https://avatars.githubusercontent.com/u/105264974?v=4"
              name="Asuna"
              datetime="2025-08-27T11:30:00+05:00"
              msg="Are you there?"
              counter={2}
            />
          </div>
        </div>

        {/* Пустое состояние чатов */}
        <div className="h-full px-8 py-3 flex flex-col gap-8 items-center justify-center">
          <p className="text-3xl text-center">
            You don&rsquo;t
            <br />
            have chats yet
          </p>
          <Button content="Send your first message" />
        </div>
      </div>

      {/* Правая панель с областью сообщений */}
      <div className="grow flex flex-col h-screen">
        <p className="text-center text-darkgrey mt-auto mb-8">
          Select a chat or a contact to start messaging
        </p>
      </div>
    </main>
  );
};

export default ChatsPage;
