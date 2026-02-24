"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatPreview } from "@/shared/types/chat";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { setChatsPreview } from "@/store/slices/chatsPreview";
import { AppDispatch } from "@/store";

import { Input } from "@ui/Input";
import { Chat } from "./ui/Chat";

import { SendIcon } from "./lib/SendIcon";
import { MessageNode } from "./ui/MessageNode";
import { EmptyStateNode } from "./ui/EmptyStateNode";
import { ChatPreviewSkeleton } from "./ui/ChatPreviewSkeleton";
import { setMessages } from "@/store/slices/currentChat";
import { formatDateTime, timeFormatter } from "./utils/formatter";

// TODO:
// - Добавить обработку выбора чата и отображение сообщений
// - Добавить меню чата
// - Добавить отправку сообщения (сохранение в Redux)

const HAS_PARENT_BACKGROUND = false;

const ChatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Список чатов из Redux
  const messages = useSelector(
    (state: RootState) => state.currentChat.messages,
  );
  // Превью чатов из Redux
  const chats = useSelector((state: RootState) => state.chatsPreview.chats);

  // Состояние поля поиска
  const [query, setQuery] = useState<string>("");
  // Состояние сообщения
  const [message, setMessage] = useState<string>("");
  // Текущий чат
  const [currentChatId, setCurrentChatId] = useState<string>("");
  // Состояние прогрузки чатов
  const [loading, setLoading] = useState<boolean>(false);

  // Загрузка превью чатов при монтировании
  useEffect(() => {
    // Открываем состояние loading
    setLoading(true);
    // Имитация запроса к backend
    const timer = setTimeout(() => {
      // Кладем данные из backend в Redux
      dispatch(
        setChatsPreview([
          {
            chatId: "59d25a54-904d-4fb5-b1a4-6d42c3f03671",
            user: {
              userId: "5cd2aa7d-5e0e-4ad6-8123-5ef2695ed4ab",
              name: "User 1",
              isOnline: false,
            },
            messages: [
              {
                messageId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                status: "idle",
                createdAt: "2026-02-21T13:53:08.744046+00:00",
              },
            ],
          },
          {
            chatId: "ba1e3bb7-7acf-42da-a3b0-fb2a7aaaf013",
            user: {
              userId: "528c6104-37f7-41a9-9740-5dc9a1e7f020",
              name: "User 2",
              isOnline: true,
            },
            messages: [
              {
                messageId: "98765432-10fe-dcba-9876-543210fedcba",
                text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
                status: "idle",
                createdAt: "2026-02-21T13:48:08.744202+00:00",
              },
            ],
          },
        ]),
      );
      // Закрываем состояние loading
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chats.length > 0 && setCurrentChatId(chats[0].chatId);
  }, [chats]);

  useEffect(() => {
    dispatch(
      setMessages({
        hasParentBackground: false,
        messages: [
          {
            messageId: "123e4567-e89b-12d3-a456-426614174000",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            createdAt: "2026-02-21T13:33:16+0000",
            status: "idle",
          },
          {
            messageId: "550e8400-e29b-41d4-a716-446655440000",
            text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            createdAt: "2026-02-21T13:33:16+0000",
            status: "read",
          },
          {
            messageId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            createdAt: "2026-02-21T13:33:16+0000",
            status: "unread",
          },
          {
            messageId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
            text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            createdAt: "2026-02-21T13:33:16+0000",
            status: "sending",
          },
        ],
      }),
    );
  }, [currentChatId]);

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

          {loading &&
            [...Array(3)].map((_, index) => (
              <ChatPreviewSkeleton key={index} />
            ))}

          {sortedChats.length > 0 ? ( // Список чатов
            <div className="flex flex-col grow">
              {sortedChats.map((chat) => (
                <Chat
                  key={chat.chatId}
                  id={chat.chatId}
                  name={chat.user.name}
                  datetime={formatDateTime(chat.messages[0].createdAt)}
                  message={chat.messages[0].text}
                  isSelected={currentChatId === chat.chatId}
                  onSelect={setCurrentChatId}
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
              <MessageNode
                key={message.messageId}
                messageId={message.messageId}
                hasParentBackground={HAS_PARENT_BACKGROUND}
                text={message.text}
                status={message.status}
                createdAt={timeFormatter.format(new Date(message.createdAt))}
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
