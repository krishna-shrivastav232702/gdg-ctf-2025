import connectToDatabase from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const { userId } = body;
  if (!userId) {
    return NextResponse.json(
      { message: "User id is required" },
      { status: 400 }
    );
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User Not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        userId,
        username: user.username,
        totalPoints: user.TotalPoints,
        capturedFlags: user.capturedFlags,
        challenge3Attempts: user.challenge3Attempts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
