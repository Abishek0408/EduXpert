"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: string;
  createdAt: string;
}

export default function Chat({
  initialMessages,
}: {
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const response = await fetch("/api/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newMessage, sender: "User" }),
    });

    if (response.ok) {
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto border rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <p className="font-bold">{message.sender}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}
