"use client";

import { useEffect, useMemo, useState } from "react";
import { Chat as ChatType, Message } from "@/shared/types/chat";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";
import { setChatsPreview } from "@/store/slices/chatsPreview";
import { addMessage, setMessages } from "@/store/slices/currentChat";

import { v4 } from "uuid";

import { Input } from "@ui/Input";
import { ChatSkeleton } from "./ui/ChatSkeleton";
import { ChatsList } from "./ui/ChatsList";
import { ChatPanel } from "./ui/ChatPanel";

// TODO:
// - Добавить меню чата

const CHATS_PREVIEW: ChatType[] = [
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
];
const MESSAGES: Message[] = [
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
];

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
  const [chatsLoading, setChatsLoading] = useState<boolean>(false);

  // Загрузка превью чатов при монтировании
  useEffect(() => {
    // Открываем состояние chatsLoading
    setChatsLoading(true);
    // Имитация запроса к backend
    const timer = setTimeout(() => {
      // Кладем данные из backend в Redux
      dispatch(setChatsPreview(CHATS_PREVIEW));
      // Закрываем состояние chatsLoading
      setChatsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chats.length > 0 && setCurrentChatId(chats[0].chatId);
  }, [chats]);

  useEffect(() => {
    dispatch(setMessages(MESSAGES));
  }, [currentChatId]);

  const sortedChats = useMemo<ChatType[]>(() => {
    if (!query) return chats;

    return chats.filter((chat) =>
      chat.user.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [chats, query]);

  const selectChat = (id: string) => {
    setCurrentChatId(id);
    setMessage("");
  };

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    dispatch(
      addMessage({
        messageId: v4(),
        text: trimmed,
        createdAt: new Date().toISOString(),
        status: "read",
      }),
    );

    setMessage("");
  };

  return (
    <main className="flex">
      {/* Левая панель с поиском и списком чатов */}
      <div className="w-120 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          {/* Поле поиска по чатам */}
          <Input
            classExtension="mx-8 my-3"
            id="search"
            placeholder="Search"
            value={query}
            onValueChange={setQuery}
          />

          {chatsLoading &&
            [...Array(3)].map((_, index) => <ChatSkeleton key={index} />)}

          {/* Список чатов */}
          <ChatsList
            query={query}
            chatsListEmpty={chats.length === 0}
            sortedChats={sortedChats}
            selectedId={currentChatId}
            onSelect={selectChat}
          />
        </div>
      </div>

      {/* Правая панель с областью сообщений */}
      <ChatPanel
        message={message}
        onMessageChange={setMessage}
        onMessageSend={sendMessage}
        messages={messages}
      />
    </main>
  );
};

export default ChatsPage;
