import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Message } from "@shared-types/chat";
import { User } from "@shared-types/user";

import { timeFormatter } from "../utils/formatter";

import { ChatMenu } from "./ChatMenu";
import { ChatMessage } from "./ChatMessage";
import { Input } from "@ui/Input";
import { Send } from "@ui/icons";

import { user as userData } from "../../mocks.json";

const USER = userData as Omit<User, "password">;

/**
 * Props for the ChatPanel component.
 */
interface ChatPanelProps {
  /** Current message input value */
  message: string;

  /** Handler for updating message input value */
  onMessageChange: (message: string) => void;

  /** Handler for sending a message */
  onMessageSend: () => void;

  /** List of messages in the current chat */
  messages: Message[];

  /** Current user info, without password and email */
  user: Omit<User, "password" | "email">;
}

/**
 * ChatPanel component
 *
 * Responsible for:
 * - Rendering the list of chat messages
 * - Handling automatic scroll to the latest message
 * - Displaying empty state when no messages exist
 * - Providing input and send controls
 */
export const ChatPanel = ({
  message,
  onMessageChange,
  onMessageSend,
  messages,
  user,
}: ChatPanelProps) => {
  const router = useRouter();

  /** State for showing the bug report modal */
  const [isBugRepShown, setBugRepShown] = useState(false);

  /** State for showing background control modal */
  const [isBgCtrlShown, setBgCtrlShown] = useState(false);

  /** State for showing the chat menu */
  const [menuShown, setMenuShown] = useState(false);

  /**
   * Reference to the scrollable messages container.
   * Used to automatically scroll to the bottom when new messages arrive or overflow container.
   */
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Automatically scroll to the bottom whenever the messages array changes.
   * Ensures the latest message is visible.
   */
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  /**
   * Handles keyboard interaction inside the input field.
   * Sends message when Enter key is pressed.
   *
   * @param e - Keyboard event from the input field
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onMessageSend();
    }
  };

  /**
   * Handles clicks on menu actions.
   *
   * @param action - Type of action triggered: 'user', 'bg', 'bug', or 'menu'
   */
  const handleClick = (action: "user" | "bg" | "bug" | "menu") => {
    switch (action) {
      case "user":
        router.push(`/contacts?userId=${user.id}`);
        break;
      case "bg":
        setBgCtrlShown(true);
        break;
      case "bug":
        setBugRepShown(true);
        break;
      case "menu":
        setMenuShown((prev) => !prev);
      default:
        break;
    }
  };

  return (
    <div className="relative grow flex flex-col h-screen">
      {/* Menu */}
      {user.name.trim() !== "" && (
        <ChatMenu
          name={user.name}
          menuShown={menuShown}
          onClick={handleClick}
        />
      )}

      {/* Messages list */}
      {messages.length > 0 && (
        <div
          className="mt-auto p-8 grid gap-2 overflow-y-scroll"
          ref={messagesContainerRef}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.messageId} // Unique key for list rendering
              text={message.text}
              status={message.userId === USER.id ? "read" : "idle"}
              createdAt={
                // Format message timestamp before passing to child component
                timeFormatter.format(new Date(message.createdAt))
              }
            />
          ))}
        </div>
      )}
      {/* Empty state when there are no messages */}
      {messages.length === 0 && (
        <p className="text-center text-darkgrey mt-auto mb-8">
          Select a chat or a contact to start messaging
        </p>
      )}
      {/* Message input and send button */}
      <div className="px-4 py-3 bg-white border-t border-t-stroke flex gap-4 items-center h-fit w-full">
        <Input
          className="flex-auto"
          id="message"
          placeholder="Message"
          value={message}
          onValueChange={onMessageChange}
          onKeyDown={handleKeyDown}
        />

        {/* 
          Send button is disabled when message is empty 
          (after trimming whitespace).
        */}
        <button onClick={onMessageSend} disabled={message.trim().length === 0}>
          {Send}
        </button>
      </div>
    </div>
  );
};
