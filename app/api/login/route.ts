import { NextResponse, NextRequest } from "next/server";
import connectDB from "@libs/mongodb";
import User from "@models/user";
import Session from "@models/session";
import { comparePassword, generateToken } from "@libs/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const {email, password} = await req.json()
        if(!email || !password) {
            return NextResponse.json({message : "missing fields"}, {status : 400})
        }

        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({message : "invalid credentials"}, {status : 401})
        }
        let isPass = await comparePassword(password, user.password)
        if(!isPass) {
            return NextResponse.json({message : "invalid password"}, {status : 401})
        }

        const token = generateToken({userId : user._id, email : user.email})
        
        const userAgent = req.headers.get("user-agent") || "unknown";

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // expires in 7 days

        await Session.create({
            userId: user._id,
            token,
            userAgent,
            expiresAt,
        });

        const response = NextResponse.json({
            message: "Login successful",
            token,
            user: { _id: user._id, name: user.name, email: user.email },
        }, { status: 200 });

        // Sending the token in a header
        response.headers.set("authorization", `Bearer ${token}`);

        return response;
    }catch(err) {
        // console.log("error in login route", err)
        return NextResponse.json({message: "Internal server error"}, {status : 500})
    }

}