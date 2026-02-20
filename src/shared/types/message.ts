interface QuotedMessage {
  user: string;
  message: string;
}

export interface MessageInterface {
  hasParentBackground: boolean;
  isSent: boolean;
  text: string;
  createdAt: string;

  quotedMessage?: QuotedMessage; // заглушка до доработки backend
}
