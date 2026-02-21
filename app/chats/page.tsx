"use client";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Chat } from "@widgets/Chat";
import { SendIcon } from "./lib/SendIcon";
import { Message } from "./ui/Message";
import { ChatPreview } from "./model";

// TODO:
// - Подключить получение списка чатов пользователя из Redux
// - Реализовать фильтр поиска по chats
// - Отображать список чатов динамически вместо заглушки
// - Настроить отображение пустого состояния только если chats пуст
// - Добавить обработку выбора чата и отображение сообщений

const HAS_PARENT_BACKGROUND = false;

const ChatsPage = () => {
  // Получаем данные пользователя и список чатов из Redux store
  const messages = useSelector(
    (state: RootState) => state.currentChat.messages,
  );
  const chats = useSelector((state: RootState) => state.chatsPreview.chats);

  // Состояние поля поиска
  const [query, setQuery] = useState<string>("");
  // Состояние сообщения
  const [message, setMessage] = useState<string>("");
  // Состояние превью-чатов

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
            placeholder="Search"
            value={query}
            onChange={setQuery}
          />

          {chats.length > 0 ? (
            // Список чатов
            <div className="flex flex-col grow">
              {chats.map((chat) => (
                <Chat
                  key={chat.chatId}
                  name={chat.user.name}
                  datetime={chat.message.createdAt}
                  msg={chat.message.text}
                />
              ))}
            </div>
          ) : (
            // Пустое состояние чатов
            <div className="h-full px-8 py-3 flex flex-col gap-8 items-center justify-center">
              <p className="text-3xl text-center">
                You don&rsquo;t
                <br />
                have chats yet
              </p>
              <Button content="Send your first message" />
            </div>
          )}
        </div>
      </div>

      {/* Правая панель с областью сообщений */}
      <div className="grow flex flex-col h-screen">
        {messages.length > 0 ? (
          // Сообщения
          <div className="mt-auto p-8 grid gap-2 overflow-y-scroll">
            {messages.map((message) => (
              <Message
                key={message.messageId}
                messageId={message.messageId}
                hasParentBackground={HAS_PARENT_BACKGROUND}
                text={message.text}
                status={message.status}
                createdAt={message.createdAt}
              />
            ))}
          </div>
        ) : (
          // Пустое состояние списка сообщений
          <p className="text-center text-darkgrey mt-auto mb-8">
            Select a chat or a contact to start messaging
          </p>
        )}

        {/* Поле ввода и отправки сообщения */}
        <div className="px-4 py-3 bg-white border-t border-t-stroke flex gap-4 items-center h-fit w-full">
          <Input
            className="flex-auto"
            id="message"
            placeholder="Message"
            value={message}
            onChange={setMessage}
          />
          <button onClick={() => {}} disabled={true}>
            {SendIcon}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChatsPage;
