import connectToDatabase from "@/db/db";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const rebody = await request.json();
    const { email, password } = rebody;
    console.log(rebody);

    const user = await User.findOne({ email });
    `         `;
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const validpassword = await bcrypt.compare(String(password), user.password);

    if (!validpassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // const tokendata = {
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    // };

    //   jwt.sign(tokendata,process.env.TOKEN_SECRET!, {expiresIn: 3600});

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user: {
        username: user.username,
        userId:user._id,
        totalPoints:user.TotalPoints,
        capturedFlags:user.capturedFlags,
      },
    });

    return response;
  } catch (error: any) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}
