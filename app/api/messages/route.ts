import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/dbConnect";
import { Message } from "../_db/models/Messages";

const getMessages = async () => {
  const client = await connectToDatabase();
  const db = client.db("messages");
  return db.collection("messages").find().toArray();
};

const addMessage = async (message: string) => {
  const client = await connectToDatabase();
  const newMessage = await new Message({
    text: message,
    timestamp: Date.now(),
  });
  const db = client.db("messages");
  await db.collection("messages").insertOne(newMessage);
};

export async function GET() {
  const messages = await getMessages();
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    await addMessage(text);
    return NextResponse.json(
      { status: 201 },
      { statusText: "Message successfully created" }
    );
  } catch (error) {
    console.error("Failed to add message to MongoDB:", error);
    return NextResponse.json(
      { status: 500 },
      { statusText: "Failed to add message" }
    );
  }
}
