"use client";

/**
 * ChatsPage
 *
 * Main page component that:
 * - Loads chat previews into Redux
 * - Handles chat selection
 * - Manages current chat messages
 * - Provides search functionality
 * - Handles sending new messages
 */

import { useEffect, useMemo, useState } from "react";
import { Chat as ChatType } from "@/shared/types/chat";
import { User } from "@/shared/types/user";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { RootState } from "@/store/rootReducer";
import { setChatsPreview } from "@/store/slices/chatsPreview";
import { addMessage, setMessages } from "@/store/slices/messages";

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
  const messages = useSelector((state: RootState) => state.messages.data);

  /**
   * Chat previews list (Redux state)
   */
  const chats = useSelector((state: RootState) => state.chatsPreview.chats);

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
   * On mount:
   * - Simulates API request
   * - Stores messages in Redux
   */
  useEffect(() => {
    if (messages.length === 0) {
      const timer = setTimeout(() => {
        dispatch(setChatsPreview(CHATS_PREVIEW));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  /**
   * Memoized filtered chats based on search query
   */
  const sortedChats = useMemo<ChatType[]>(() => {
    if (!query) return chats;

    return chats.filter((chat) =>
      chat.user.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [chats, query]);

  /**
   * Handles chat selection
   * Loads messages when current chat selected
   * (Currently mocked with static data)
   */
  const selectChat = (id: string) => {
    setCurrentChatId(id);
    setMessage(""); // Clear input when switching chats

    const currentChat = CHATS.find((chat) => chat.chatId === id);

    if (currentChat) {
      dispatch(setMessages(currentChat.messages));
    }
  };

  /**
   * Sends a new message:
   * - Trims input
   * - Generates unique ID
   * - Dispatches Redux action
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

  return (
    <main className="flex">
      {/* Left panel: search + chats list */}
      <div className="w-120 shrink-0 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          {/* Search input */}
          <Input
            classExtension="mx-8 my-3"
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
      />
    </main>
  );
};

export default ChatsPage;
