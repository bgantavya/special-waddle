import { NextRequest, NextResponse } from "next/server";
import connectDB from "@libs/mongodb";
import Session from "@models/session";
import { verifyToken } from "@libs/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        try {
            const decode = verifyToken(token) as { userId: string };

            const session = await Session.findOne({ userId : decode.userId, token });
            if (!session) {
                return NextResponse.json({ message: "No active session found" }, { status: 404 });
            }

            await Session.findOneAndDelete({ userId: decode.userId, token });

            return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
        } catch (err) {
            return NextResponse.json({ message: err }, { status: 401 });
        }
    } catch (err) {
        console.log("Error in logout route", err);
        return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
    }
}
