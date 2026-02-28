import { Message } from "@/shared/types/chat";
import { Check, CheckCheck, Clock } from "lucide-react";

export const ChatMessage = ({ text, createdAt, status }: Message) => {
  const isSent = status !== "idle";
  const iconClassName = "w-3.5 h-3.5 stroke-darkgrey ml-0.5";

  return (
    <div
      className={`px-4 py-3 rounded-2xl min-w-22 max-w-[60%] ${isSent ? "justify-self-end rounded-br-none" : "justify-self-start rounded-bl-none"} ${isSent ? "bg-white border border-lightgrey" : "bg-fill"}`}
    >
      <p className="mb-2 5">{text}</p>
      <div className={`flex items-center ${isSent ? "justify-end" : ""}`}>
        <time className="text-darkgrey text-sm">{createdAt}</time>
        {status === "read" && <CheckCheck className={iconClassName} />}
        {status === "unread" && <Check className={iconClassName} />}
        {status === "sending" && <Clock className={iconClassName} />}
      </div>
    </div>
  );
};
