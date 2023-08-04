import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/dbConnect";
import { checkUsername, createToken } from "@/utils/utils";
import { User } from "../_db/models/User";

const addUser = async (username: string, password: string) => {
  const newUser = await new User({
    username: username,
    password: password,
  });
  const client = await connectToDatabase();
  const db = client.db("users");
  await db.collection("users").insertOne(newUser);
  return newUser;
};

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = await checkUsername(username);

    if (!user) {
      const token = await createToken(username, password);
      const newUser: any = await addUser(username, password);

      if (!token) {
        return NextResponse.json(
          { message: "Failed to create token" },
          { status: 500 }
        );
      }
      newUser.token = token;
      return NextResponse.json(newUser);
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
