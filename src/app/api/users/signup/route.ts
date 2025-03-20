import { NextResponse , NextRequest } from "next/server";
import connectToDatabase from "@/db/db";
import User from "@/models/user.model";

import bcryptjs from "bcryptjs";


export async function POST(request: NextRequest) {
    try {
      await connectToDatabase(); 

        const rebody = await request.json();
        const { username, email, password } = rebody;

        console.log(rebody);

        const user = await User.findOne({ email: email });


            
      if (user) {
          return NextResponse.json({ error: "Email already exists" }, { status: 400 });
      }
      const passwordString = String(password);
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(passwordString, salt);

      const newUser = new User({
            username,
            email,
            password: hashedPassword
    });
      await newUser.save();
      return NextResponse.json({userId: newUser._id, message: "User created successfully" });
        
        
          
    } catch (error) {
        console.error("Database connection failed:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }

    
}