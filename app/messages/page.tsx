"use client";
import Link from "next/link";
import { useState, useRef, useEffect, FormEvent } from "react";
import Message from "../components/Message";
import { SlArrowLeft } from "react-icons/sl";
import { VscSend } from "react-icons/vsc";

export interface IMessage {
  _id: string;
  text: string;
  timestamp: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) {
        throw new Error("Fetching failed");
      }
      const data = (await res.json()) as IMessage[];
      if (data.length != messages.length) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    handleFetchMessages();
    const interval = setInterval(handleFetchMessages, 1000);
    return () => clearInterval(interval);
  });

  const handleAddMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputRef.current?.value;

    if (!message) {
      return;
    }

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });
    if (!res.ok) {
      throw new Error("Adding new message failed");
    }
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-50 bg-backgroundSecondary text-primary p-4">
        <Link href="/">
          <SlArrowLeft />
        </Link>
        <div className="flex gap-4">
          <Link href="/">Profile</Link>
          <Link href="/">Contact</Link>
        </div>
      </div>
      <div className="flex flex-col-reverse border-none text-xs overflow-y-auto m-4">
        <div className="flex flex-col justify-end">
          {messages &&
            messages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
        </div>
      </div>
      <form
        className="flex gap-4 justify-between w-full h-30 mb-4"
        onSubmit={handleAddMessage}
      >
        <input
          className="w-full border border-none rounded-full text-primary pl-4 pr-4 bg-backgroundSecondary ml-4 placeholder-primary focus:outline-none placeholder:text-xs"
          type="text"
          ref={inputRef}
          placeholder="Type your message here..."
        />
        <button
          className="flex w-30 h-30 bg-secondary border-none rounded-full justify-center items-center p-3 mr-4"
          type="submit"
        >
          <VscSend size="1.5rem" className="fill-primary" />
        </button>
      </form>
    </div>
  );
}
