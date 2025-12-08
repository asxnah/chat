interface ChatData {
  id: string;
  user_id: string;
  msg: string;
  time: string;
  read: boolean;
}

interface Chat {
  id: string;
  backgroundImage: string;
  chat_data: ChatData[];
}
