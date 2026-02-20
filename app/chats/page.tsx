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

const SHOW_ITEM = false;

const ChatsPage = () => {
  // Получаем данные пользователя и список чатов из Redux store
  const messages = useSelector((state: RootState) => state.currentChat.data);

  // Состояние поля поиска
  const [query, setQuery] = useState<string>("");
  // Состояние сообщения
  const [message, setMessage] = useState<string>("");
  // Состояние превью-чатов

  const [chats] = useState<ChatPreview[]>([
    {
      chatId: "d9ab8b10-29a5-42a8-a610-aad3008759be",
      user: {
        userId: "2b2e4d88-cd38-41bd-ab7c-78b6f058e92e",
        name: "asuna",
        isOnline: false,
      },
      message: {
        messageId: "a11e9889-cb74-4fc5-bc96-d6a458f3f988",
        text: `"kitten" can refer to young rabbits, beavers, or rats, and "kitten" as a verb means to give birth to kittens`,
        isRead: false,
        createdAt: "2025-08-27T11:30:00+05:00",
      },
    },
    {
      chatId: "7e01d9bd-7864-4da5-b894-bfbe86bc4323",
      user: {
        userId: "d9ab8b10-29a5-42a8-a610-aad3008759be",
        name: "zegor",
        isOnline: false,
      },
      message: {
        messageId: "2b2e4d88-cd38-41bd-ab7c-78b6f058e92e",
        text: `idioms like "have kittens" mean extreme anxiety in British English`,
        isRead: false,
        createdAt: "2026-02-20T11:30:00+05:00",
      },
    },
  ]);

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

          {/* Список чатов */}
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
        </div>

        {/* Пустое состояние чатов */}
        {SHOW_ITEM && (
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

      {/* Правая панель с областью сообщений */}
      <div className="grow flex flex-col h-screen">
        {SHOW_ITEM && (
          <p className="text-center text-darkgrey mt-auto mb-8">
            Select a chat or a contact to start messaging
          </p>
        )}

        {/* Сообщения */}
        <div className="mt-auto p-8 grid gap-2 overflow-y-scroll">
          {messages.map((message, index) => (
            <Message
              key={index}
              hasParentBackground={message.hasParentBackground}
              isSent={message.isSent}
              text={message.text}
              createdAt={message.createdAt}
              {...(message.quotedMessage && {
                quotedMessage: message.quotedMessage,
              })}
            />
          ))}
        </div>

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
