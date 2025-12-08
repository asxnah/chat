"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

import { Input } from "@ui/Input";
import { Button } from "@ui/Button";
import { Chat } from "@widgets/Chat";

const ChatsPage = () => {
  const dispatch = useDispatch();
  const chatsList = useSelector((state: RootState) => state.userInfo);

  const [query, setQuery] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {}, []);

  return (
    <main className="flex">
      <div className="w-120 border-r border-r-stroke">
        <div className="h-full flex flex-col">
          <Input
            className="mx-8 my-3"
            id="search"
            placeholder="Search "
            value={query}
            onChange={(value) => setQuery(value)}
          />
          <div className="flex flex-col grow">
            <Chat
              src="https://avatars.githubusercontent.com/u/105264974?v=4"
              name="Asuna"
              datetime="2025-08-27T11:30:00+05:00"
              msg="Are you there?"
              counter={2}
            />
          </div>
        </div>

        <div className="h-full px-8 py-3 flex flex-col gap-8 items-center justify-center">
          <p className="text-3xl text-center">
            You don&rsquo;t
            <br />
            have chats yet
          </p>
          <Button content="Send your first message" />
        </div>
      </div>
      <div className="grow flex flex-col h-screen">
        <p className="text-center text-darkgrey mt-auto mb-8">
          Select a chat or a contact to start messaging
        </p>
      </div>
    </main>
  );
};

export default ChatsPage;
