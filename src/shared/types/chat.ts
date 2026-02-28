export interface Message {
  messageId: string;
  text: string;
  createdAt: string;
  status: "idle" | "sending" | "unread" | "read";
}

export interface Chat {
  chatId: string;
  user: {
    userId: string;
    name: string;
    isOnline: boolean;
  };
  messages: Message[];
}
