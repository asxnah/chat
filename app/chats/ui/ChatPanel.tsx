import { useEffect, useRef } from "react";
import { Message } from "@/shared/types/chat";

import { timeFormatter } from "../utils/formatter";

import { ChatMessage } from "./ChatMessage";
import { Input } from "@/shared/ui/Input";
import { Send } from "@/shared/ui/icons";

interface ChatPanelProps {
  message: string;
  onMessageChange: (message: string) => void;
  onMessageSend: () => void;
  messages: Message[];
}

export const ChatPanel = ({
  message,
  onMessageChange,
  onMessageSend,
  messages,
}: ChatPanelProps) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onMessageSend();
    }
  };

  return (
    <div className="grow flex flex-col h-screen">
      {/* Сообщения */}
      {messages.length > 0 && (
        <div
          className="mt-auto p-8 grid gap-2 overflow-y-scroll"
          ref={messagesContainerRef}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.messageId}
              messageId={message.messageId}
              text={message.text}
              status={message.status}
              createdAt={timeFormatter.format(new Date(message.createdAt))}
            />
          ))}
        </div>
      )}

      {/* Пустое состояние списка сообщений */}
      {messages.length === 0 && (
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
          onValueChange={onMessageChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onMessageSend} disabled={message.trim().length === 0}>
          {Send}
        </button>
      </div>
    </div>
  );
};
