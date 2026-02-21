export interface MessageInterface {
  messageId: string;
  text: string;
  createdAt: string;
  status: "idle" | "sending" | "unread" | "read";
}
