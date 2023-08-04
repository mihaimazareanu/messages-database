import connectToDatabase from "@/dbConnect";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const KEY = process.env.JWT_SECRET_KEY;
export const protectedRoutes = ["/messages"];
export const authRoutes = ["/login"];
export const publicRoutes = ["/", "/register"];

export const checkUsername = async (username: string) => {
  const client = await connectToDatabase();
  const db = client.db("users");
  const user = await db.collection("users").findOne({ username });
  return user;
};

export const createToken = async (username: string, password: string) => {
  const payload = {
    username: username,
    password: password,
  };

  if (!KEY) {
    return NextResponse.json(
      { message: "JWT Key must be set" },
      { status: 500 }
    );
  }
  const token = jwt.sign(
    payload,
    KEY,
    { expiresIn: 31556926 } //1 year
  );
  return token;
};

export const verifyToken = async (req: NextRequest) => {
  try {
    const { body } = await req.json();

    const token = body!.token || req.headers.get("x-access-token");
    if (!token) {
      return NextResponse.json({
        message: "A token is required for authentication",
      });
    }

    if (!KEY) {
      return NextResponse.json(
        { message: "JWT Key must be set" },
        { status: 500 }
      );
    }
    const verifiedToken = jwt.verify(token, KEY);
    return verifiedToken;
  } catch {
    console.error("Failed to verify token");
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
};
