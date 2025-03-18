import connectToDatabase from "@/db/db";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
  try {

      await connectToDatabase();

      const response = NextResponse.json({ 
        message: "Logout successful",
        success :true
       });
       

      return response;



  } catch (error : any) {
      console.error("Database connection failed:", error);
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }



}
