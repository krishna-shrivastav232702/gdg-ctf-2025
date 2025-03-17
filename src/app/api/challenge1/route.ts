import { generateChallengeForUser } from "@/lib/encryption";
import { NextRequest,NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const {username} = body;
    if (!username) {
        return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }
    try {
        const encryptedFlag = generateChallengeForUser(username);
        return NextResponse.json({
            encryptedFlag,
            message: "Key to decrypt the message is derived from username",
        });
    } catch (error) {
        console.error("Challenge generation error", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

