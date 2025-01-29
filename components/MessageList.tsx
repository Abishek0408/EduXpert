import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getMessages() {
  return await prisma.message.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export default async function MessageList() {
  const messages = await getMessages();

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="mb-4">
          <p className="font-bold">{message.sender}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}
