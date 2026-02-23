"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatPreview } from "@shared-types/chatPreview";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { set } from "@/store/slices/chatsPreview";
import { AppDispatch } from "@/store";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Chat } from "@widgets/Chat";

import { SendIcon } from "./lib/SendIcon";
import { Message } from "./ui/Message";
import { EmptyStateNode } from "./ui/EmptyStateNode";

// TODO:
// - Добавить обработку выбора чата и отображение сообщений
// - Добавить меню чата

const HAS_PARENT_BACKGROUND = false;

const ChatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Список чатов из Redux
  const messages = useSelector(
    (state: RootState) => state.currentChat.messages,
  );
  // Превью чатов из Redux
  const chats = useSelector((state: RootState) => state.chatsPreview.chats);

  // Загрузка чатов при монтировании
  useEffect(() => {
    // Имитация запроса к backend
    setTimeout(() => {
      // Кладем данные из backend в Redux
      dispatch(
        set([
          {
            chatId: "59d25a54-904d-4fb5-b1a4-6d42c3f03671",
            user: {
              userId: "5cd2aa7d-5e0e-4ad6-8123-5ef2695ed4ab",
              name: "User 1",
              isOnline: false,
            },
            message: {
              messageId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
              text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              status: "idle",
              createdAt: "2026-02-21T13:53:08.744046+00:00",
            },
          },
          {
            chatId: "ba1e3bb7-7acf-42da-a3b0-fb2a7aaaf013",
            user: {
              userId: "528c6104-37f7-41a9-9740-5dc9a1e7f020",
              name: "User 2",
              isOnline: true,
            },
            message: {
              messageId: "98765432-10fe-dcba-9876-543210fedcba",
              text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
              status: "idle",
              createdAt: "2026-02-21T13:48:08.744202+00:00",
            },
          },
        ]),
      );
    }, 500);
  }, []);

  useEffect(() => {
    chats.length > 0 && setCurrentChatId(chats[0].chatId);
  }, [chats]);

  // Состояние поля поиска
  const [query, setQuery] = useState<string>("");
  // Состояние сообщения
  const [message, setMessage] = useState<string>("");
  // Текущий чат
  const [currentChatId, setCurrentChatId] = useState<string>("");

  const sortedChats = useMemo<ChatPreview[]>(() => {
    if (!query) return chats;

    return chats.filter((chat) =>
      chat.user.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [chats, query]);

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
          {sortedChats.length > 0 ? ( // Список чатов
            <div className="flex flex-col grow">
              {sortedChats.map((chat) => (
                <Chat
                  key={chat.chatId}
                  name={chat.user.name}
                  datetime={chat.message.createdAt}
                  message={chat.message.text}
                  isSelected={currentChatId === chat.chatId}
                />
              ))}
            </div>
          ) : (
            <EmptyStateNode query={query} length={chats.length} />
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
