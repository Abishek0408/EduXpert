import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { content, sender } = await request.json();

  try {
    const message = await prisma.message.create({
      data: { content, sender },
    });

    await pusher.trigger("chat", "message", message);

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending message" },
      { status: 500 }
    );
  }
}
