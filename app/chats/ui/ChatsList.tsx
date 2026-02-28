import { Chat as ChatType } from "@/shared/types/chat";
import { formatDateTime } from "../utils/formatter";
import { Button } from "@/shared/ui/Button";

/**
 * Props for the ChatsList component.
 */
interface ChatsListProps {
  /** Search query */
  query: string;

  /** Indicates whether the chats list is completely empty */
  chatsListEmpty: boolean;

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
 * 2. A "not found" message (if search returns no results),
 * 3. An empty state (if there are no chats at all).
 */
export const ChatsList = ({
  query,
  chatsListEmpty,
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
                {chat.user.name[0].toUpperCase()}
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

  // If no chats match the search query
  if (sortedChats.length === 0) {
    if (!chatsListEmpty) {
      return (
        <p className="mx-8 mt-3">
          No chat with <span className="font-semibold">{query}</span> found
        </p>
      );
    }

    // If there are no chats at all (empty state)
    if (chatsListEmpty) {
      return (
        <div className="h-full px-8 pt-3 flex flex-col gap-8 items-center justify-center">
          <p className="text-3xl text-center">
            You don&rsquo;t
            <br />
            have chats yet
          </p>

          {/* CTA button to start first conversation */}
          <Button content="Send your first message" />
        </div>
      );
    }
  }
};
