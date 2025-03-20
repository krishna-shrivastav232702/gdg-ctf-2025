import connectToDatabase from "@/db/db";
import { generateChallengeForUser } from "@/lib/encryption";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectToDatabase();
    const body = await req.json();
    const { userId } = body;
    if (!userId) {
        return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const encryptedFlag = generateChallengeForUser(user.username);
        return NextResponse.json({
            encryptedFlag,
            message: "Key to decrypt the message is derived from username",
        });
    } catch (error) {
        console.error("Challenge generation error", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

