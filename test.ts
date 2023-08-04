import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/dbConnect";

const addUser = async (username: string, password: string) => {
  const client = await connectToDatabase();
  const db = client.db("users");
  await db
    .collection("users")
    .insertOne({ username: username, password: password });
};

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const client = await connectToDatabase();
    const db = client.db("users");
    const users = await db.collection("users").find().toArray();
    const user = users.find((user) => user.username === username);

    if (!user) {
      await addUser(username, password);
      return NextResponse.json(
        { message: "User successfully created" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Username already exists" },
      { status: 409 }
    );
  } catch (error) {
    console.error("Failed to add user to MongoDB:", error);
    return NextResponse.json(
      { message: "Failed to add user" },
      { status: 500 }
    );
  }
}
