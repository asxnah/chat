import { MessageInterface } from "../../../src/shared/types/message";

const formatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});

export const Message = ({
  hasParentBackground,
  isSent,
  text,
  createdAt,
  quotedMessage,
}: MessageInterface) => {
  const date = new Date(createdAt);

  return (
    <div
      className={`px-4 py-3 rounded-2xl min-w-[20%] max-w-[60%] ${isSent ? "justify-self-end rounded-br-none" : "justify-self-start rounded-bl-none"} ${hasParentBackground ? "bg-white border-none" : isSent ? "bg-white border border-lightgrey" : "bg-fill"}`}
    >
      {quotedMessage && (
        <div
          className={`flex items-stretch bg-fill rounded-lg overflow-hidden pr-2.5 mb-2.5 ${hasParentBackground ? "bg-fill" : isSent ? "bg-fill" : "bg-white"}`}
        >
          <div className="mr-3 w-[4px] bg-lightgrey"></div>
          <div className="py-1.5">
            <p className="text-darkgrey mb-1">{quotedMessage.user}</p>
            <p className="line-clamp-1">{quotedMessage.message}</p>
          </div>
        </div>
      )}
      <p className="mb-2 5">{text}</p>
      <time className="text-darkgrey text-sm">{formatter.format(date)}</time>
    </div>
  );
};
