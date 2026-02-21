import { MessageInterface } from "@shared-types/message";
import { Check, CheckCheck, Clock } from "lucide-react";

const formatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
});

interface Message extends MessageInterface {
  hasParentBackground: boolean;
}

export const Message = ({
  hasParentBackground,
  text,
  createdAt,
  status,
}: Message) => {
  const date = new Date(createdAt);
  const isSent = status !== "idle";
  const iconClassName = "w-3.5 h-3.5 stroke-darkgrey ml-0.5";

  return (
    <div
      className={`px-4 py-3 rounded-2xl min-w-[20%] max-w-[60%] ${isSent ? "justify-self-end rounded-br-none" : "justify-self-start rounded-bl-none"} ${hasParentBackground ? "bg-white border-none" : isSent ? "bg-white border border-lightgrey" : "bg-fill"}`}
    >
      <p className="mb-2 5">{text}</p>
      <div className={`flex items-center ${isSent ? "justify-end" : ""}`}>
        <time className="text-darkgrey text-sm">{formatter.format(date)}</time>
        {status === "read" && <CheckCheck className={iconClassName} />}
        {status === "unread" && <Check className={iconClassName} />}
        {status === "sending" && <Clock className={iconClassName} />}
      </div>
    </div>
  );
};
