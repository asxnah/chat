import { Chat as ChatType } from "@/shared/types/chat";
import { formatDateTime } from "../utils/formatter";
import { Button } from "@/shared/ui/Button";

/**
 * Props for the ChatsList component.
 */
interface ChatsListProps {
  /** Search query */
  query: string;

  /** Chats sorted by query */
  sortedChats: ChatType[];

  /** Currently selected chat ID */
  selectedId: string;

  /** Callback triggered when a chat is selected */
  onSelect: (id: string) => void;
}

/**
 * ChatsList component
 *
 * Renders:
 * 1. A list of chats (if any exist),
 * 2. An empty state (if there are no chats passed).
 */
export const ChatsList = ({
  query,
  sortedChats,
  selectedId,
  onSelect,
}: ChatsListProps) => {
  // If there are chats to display
  if (sortedChats.length > 0) {
    return (
      <div className="flex flex-col grow">
        {sortedChats.map((chat) => (
          <div
            key={chat.chatId}
            className={`px-8 py-3 flex items-center gap-2.5 ${
              selectedId === chat.chatId ? "bg-fill" : "bg-white"
            }`}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(chat.chatId)}
            onKeyDown={(e) => {
              // Enable keyboard interaction (Enter or Space)
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(chat.chatId);
              }
            }}
          >
            {/* User avatar (first letter of user's name) */}
            <div className="shrink-0 w-13.5 h-13.5 rounded-full grid place-items-center bg-lightgrey">
              <p className="text-2xl font-bold text-white">
                {chat.user.name[0] ? chat.user.name[0].toUpperCase() : "U"}
              </p>
            </div>

            {/* Main content block: name, time, and last message */}
            <div className="grow flex flex-col gap-2">
              {/* Top row: user name and last message time */}
              <div className="flex items-center justify-between">
                <h6 className="font-bold">{chat.user.name}</h6>
                <p className="text-sm text-darkgrey">
                  {/* Format timestamp of the most recent message */}
                  {formatDateTime(chat.messages[0].createdAt)}
                </p>
              </div>

              {/* Last message preview (single line, truncated if too long) */}
              <p className="line-clamp-1">
                {chat.messages[chat.messages.length - 1].text}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no chats passed
  if (sortedChats.length === 0) {
    return query ? (
      <p className="mx-8 mt-3 text-center">
        No chat with <span className="font-semibold">{query}</span> found
      </p>
    ) : (
      <p className="mx-8 mt-3 text-center text-darkgrey">Nothing found</p>
    );
  }
};
