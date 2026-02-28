import { Message } from "@/shared/types/chat";
import { Check, CheckCheck, Clock } from "lucide-react";

/**
 * ChatMessage component
 *
 * Renders a single chat message bubble with:
 * - Message text
 * - Creation timestamp
 * - Delivery/read status indicator
 *
 * The visual appearance depends on whether the message
 * was sent by the current user or received.
 */
export const ChatMessage = ({ text, createdAt, status }: Message) => {
  /**
   * Determines if the message was sent by the current user.
   * Convention: any status other than "idle" is treated as sent.
   */
  const isSent = status !== "idle";

  /**
   * Shared icon styles for message status indicators.
   */
  const iconClassName = "w-3.5 h-3.5 stroke-darkgrey ml-0.5";

  return (
    <div
      className={`
        px-4 py-3 rounded-2xl min-w-22 max-w-[60%]
        ${isSent ? "justify-self-end rounded-br-none" : "justify-self-start rounded-bl-none"}
        ${isSent ? "bg-white border border-lightgrey" : "bg-fill"}
      `}
    >
      {/* Message text */}
      <p className="mb-2">{text}</p>

      {/* Bottom row: timestamp and status icon */}
      <div className={`flex items-center ${isSent ? "justify-end" : ""}`}>
        {/* Semantic time element for message timestamp */}
        <time className="text-darkgrey text-sm">{createdAt}</time>

        {/* Status indicators:
            - read -> double check
            - unread -> single check
            - sending -> clock
        */}
        {status === "read" && <CheckCheck className={iconClassName} />}
        {status === "unread" && <Check className={iconClassName} />}
        {status === "sending" && <Clock className={iconClassName} />}
      </div>
    </div>
  );
};
