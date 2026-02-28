import { Chat as ChatType } from "@/shared/types/chat";
import { formatDateTime } from "../utils/formatter";
import { Button } from "@/shared/ui/Button";

interface ChatsListProps {
  query: string;
  chatsListEmpty: boolean;
  sortedChats: ChatType[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ChatsList = ({
  query,
  chatsListEmpty,
  sortedChats,
  selectedId,
  onSelect,
}: ChatsListProps) => {
  if (sortedChats.length > 0) {
    return (
      <div className="flex flex-col grow">
        {sortedChats.map((chat) => (
          <div
            className={`px-8 py-3 flex items-center gap-2.5 ${selectedId === chat.chatId ? "bg-fill" : "bg-white"}`}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(chat.chatId)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(chat.chatId);
              }
            }}
          >
            {/* Аватар пользователя */}
            <div className="shrink-0 w-13.5 h-13.5 rounded-full grid place-items-center bg-lightgrey">
              <p className="text-2xl font-bold text-white">
                {chat.user.name[0].toUpperCase()}
              </p>
            </div>

            {/* Основной блок с именем, временем и последним сообщением */}
            <div className="grow flex flex-col gap-2">
              {/* Верхняя строка: имя и время */}
              <div className="flex items-center justify-between">
                <h6 className="font-bold">{chat.user.name}</h6>
                <p className="text-sm text-darkgrey">
                  {formatDateTime(chat.messages[0].createdAt)}
                </p>
              </div>

              {/* Текст сообщения */}
              <p className="line-clamp-1">
                {chat.messages[chat.messages.length].text}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sortedChats.length === 0) {
    if (!chatsListEmpty) {
      return (
        <p className="mx-8 mt-3">
          No chat with <span className="font-semibold">{query}</span>{" "}
          found
        </p>
      );
    }

    if (chatsListEmpty) {
      return (
        <div className="h-full px-8 pt-3 flex flex-col gap-8 items-center justify-center">
          <p className="text-3xl text-center">
            You don&rsquo;t
            <br />
            have chats yet
          </p>
          <Button content="Send your first message" />
        </div>
      );
    }
  }
};
