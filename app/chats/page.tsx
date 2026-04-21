"use client";

import { useEffect, useMemo, useState } from "react";
import { Chat as ChatType } from "@shared-types/chat";
import { User } from "@shared-types/user";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@store";
import { RootState } from "@store/rootReducer";
import { setChats } from "@store/slices/chats";
import { addMessage, setMessages } from "@store/slices/messages";

import { v4 } from "uuid";

import { Input } from "@ui/Input";
import { ChatsList } from "./ui/ChatsList";
import { ChatPanel } from "./ui/ChatPanel";

import { chatsPreview as chatsPreviewData } from "./mocks.json";
const CHATS_PREVIEW: ChatType[] = chatsPreviewData as ChatType[];

import { chats as chatsData } from "./mocks.json";
const CHATS: ChatType[] = chatsData as ChatType[];

import { user as userData } from "../mocks.json";
const USER = userData as Omit<User, "password">;

const ChatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Messages of the currently selected chat (Redux state)
   */
  const messages = useSelector((state: RootState) => state.messages.messages);

  /**
   * Chat previews list (Redux state)
   */
  const chats = useSelector((state: RootState) => state.chats.chats);

  /**
   * Local state: search query
   */
  const [query, setQuery] = useState<string>("");

  /**
   * Local state: message input value
   */
  const [message, setMessage] = useState<string>("");

  /**
   * Local state: currently selected chat ID
   */
  const [currentChatId, setCurrentChatId] = useState<string>("");

  /**
   * Local state: basic info of currently selected chat user
   */
  const [currentUser, setCurrentUser] = useState<
    Omit<User, "password" | "email">
  >({
    id: "",
    name: "",
  });

  /**
   * Updates currentUser whenever currentChatId changes
   */
  useEffect(() => {
    const currentChat = CHATS.find((chat) => chat.chatId === currentChatId);
    if (currentChat) {
      const user = currentChat.user;
      setCurrentUser({
        id: user.userId,
        name: user.name,
      });
    }
  }, [currentChatId]);

  /**
   * Loads chats preview into Redux on mount
   * Simulates API request with a timeout
   */
  useEffect(() => {
    if (messages.length === 0) {
      const timer = setTimeout(() => {
        dispatch(setChats(CHATS_PREVIEW));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  /**
   * Returns chats filtered by search query
   * Memoized for performance
   */
  const sortedChats = useMemo<ChatType[]>(() => {
    if (!query) return chats;

    return chats.filter((chat) =>
      chat.user.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [chats, query]);

  /**
   * Handles chat selection:
   * - Updates current chat ID
   * - Clears message input
   * - Loads messages of selected chat into Redux
   */
  const selectChat = (id: string) => {
    setCurrentChatId(id);
    setMessage("");

    const currentChat = CHATS.find((chat) => chat.chatId === id);

    if (currentChat) {
      dispatch(setMessages(currentChat.messages));
    }
  };

  /**
   * Sends a new message:
   * - Trims input
   * - Generates unique ID
   * - Dispatches Redux action to add message
   * - Clears input
   */
  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    dispatch(
      addMessage({
        messageId: v4(),
        chatId: currentChatId,
        userId: USER.id,
        text: trimmed,
        isRead: true,
        createdAt: new Date().toISOString(),
      }),
    );

    setMessage("");
  };

  /**
   * Render:
   * - Left panel: search input + chats list
   * - Right panel: current chat messages + message input
   */
  return (
    <main className="flex">
      {/* Left panel: search + chats list */}
      <div className="w-120 shrink-0 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          {/* Search input */}
          <Input
            className="mx-8 my-3"
            id="search"
            placeholder="Search"
            value={query}
            onValueChange={setQuery}
          />

          {/* Chats list */}
          <ChatsList
            query={query}
            sortedChats={sortedChats}
            selectedId={currentChatId}
            onSelect={selectChat}
          />
        </div>
      </div>

      {/* Right panel: current chat messages */}
      <ChatPanel
        message={message}
        onMessageChange={setMessage}
        onMessageSend={sendMessage}
        messages={messages}
        user={currentUser}
      />
    </main>
  );
};

export default ChatsPage;
