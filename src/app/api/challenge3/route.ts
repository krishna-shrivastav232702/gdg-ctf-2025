import connectToDatabase from "@/db/db";
import Submission from "@/models/submission.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectToDatabase();
    const body = await req.json();
    const { flag, userId, questionId } = body;
    if (!flag || !userId || !questionId) {
        return NextResponse.json(
            { message: "Flag, userId, and questionId are required" },
            { status: 400 }
        );
    }
    try {
        const existingCorrectSubmission = await Submission.findOne({
            userId,
            questionId,
            isCorrect: true
        });
        if (existingCorrectSubmission) {
            return NextResponse.json(
                {
                    success: false,
                    message: "You have already solved this challenge!",
                },
                { status: 409 } 
            );
        }
        if (flag == 'code sprint') {
            await User.findByIdAndUpdate(userId, { $inc: { capturedFlags: 1, TotalPoints: 12 } });
            const submission = new Submission({
                userId,
                questionId,
                answer: flag,
                isCorrect: true,
            });
            await submission.save();
            return NextResponse.json(
                {
                    success: true,
                    message: "Congratulations! You found the flag!",
                },
                { status: 200 }
            );
        } else {
            const submission = new Submission({
                userId,
                questionId,
                answer: flag,
                isCorrect: false,
            });
            await submission.save();

            return NextResponse.json(
                {
                    success: false,
                    message: "Incorrect flag. Try again!",
                },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Error validating flag:", error);
        return NextResponse.json(
            {
                success: false,
                message: "An error occurred while validating the flag",
            },
            { status: 500 }
        );

    }

}

