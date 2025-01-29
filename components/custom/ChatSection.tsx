"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send } from "lucide-react";

interface Message {
  id: number;
  sender: {
    id: string;
    name: string;
    imageUrl: string;
  };
  content: string;
  timestamp: string;
}

interface CourseData {
  id: string;
  instructorId: string;
  title: string;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export default function CommonCourseChatPage({
  course,
  instructor,
  currentUser,
}: {
  course: CourseData;
  instructor: UserData;
  currentUser: UserData;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  console.log(course.id);
  const chatKey = `chat_${course.id}`;

  useEffect(() => {
    const loadMessages = () => {
      setIsLoading(true);
      try {
        // Ensure browser supports localStorage
        if (typeof window !== "undefined" && localStorage) {
          const storedMessages = localStorage.getItem(chatKey);
          console.log("Stored messages:", storedMessages); // Debugging
          if (storedMessages) {
            const parsedMessages = JSON.parse(storedMessages);
            console.log("Parsed messages:", parsedMessages); // Debugging
            setMessages(parsedMessages);
          } else {
            console.log("No stored messages found, creating initial message"); // Debugging
            const initialMessage: Message = {
              id: Date.now(),
              sender: {
                id: instructor.id,
                name: `${instructor.firstName} ${instructor.lastName}`,
                imageUrl: instructor.imageUrl,
              },
              content: `Welcome to the course chat for "${course.title}"! Feel free to ask questions and discuss course topics here.`,
              timestamp: new Date().toLocaleString(),
            };
            setMessages([initialMessage]);
          }
        } else {
          console.error("LocalStorage is not available or supported");
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [chatKey, course.title, instructor]);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(chatKey, JSON.stringify(messages));
        console.log("Messages saved to localStorage:", messages); // Debugging
      } catch (error) {
        console.error("Error saving messages to localStorage:", error);
      }
    }
  }, [messages, chatKey]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        sender: {
          id: currentUser.id,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          imageUrl: currentUser.imageUrl,
        },
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  const isInstructor = (userId: string) => userId === instructor.id;

  if (isLoading) {
    return (
      <Card className="flex flex-col h-[calc(100vh-5rem)] mx-4 my-2 border-none shadow-none">
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-2xl font-bold">Loading chat...</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-5rem)] mx-4 my-2 border-none shadow-none">
      <CardHeader className="px-6 py-4">
        <CardTitle className="text-2xl font-bold">
          Course Chat: {course.title}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full px-6" ref={scrollAreaRef}>
          <div className="space-y-6 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.sender.id === currentUser.id ? "justify-end" : ""
                }`}
              >
                {message.sender.id !== currentUser.id && (
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={message.sender.imageUrl} />
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`flex flex-col space-y-2 ${
                    message.sender.id === currentUser.id ? "items-end" : ""
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender.id === currentUser.id
                        ? "bg-primary text-primary-foreground"
                        : isInstructor(message.sender.id)
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {message.sender.name}{" "}
                    {isInstructor(message.sender.id) && (
                      <span className="ml-1 px-1 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                        Instructor
                      </span>
                    )}{" "}
                    • {message.timestamp}
                  </p>
                </div>
                {message.sender.id === currentUser.id && (
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={message.sender.imageUrl} />
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <div className="p-4">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </Card>
  );
}
