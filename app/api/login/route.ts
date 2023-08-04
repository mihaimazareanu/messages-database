import { checkUsername, createToken, verifyToken } from "@/middleware/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const verifiedToken = await verifyToken(req);
    if (!verifiedToken) {
      return NextResponse.json(
        { message: "Invalid or missing token" },
        { status: 401 }
      );
    }
    const user = await checkUsername(username);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: "Wrong password" }, { status: 409 });
    }
    const token = await createToken(username, password);
    user.token = token;
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to login:", error);
  }
}
