import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@libs/auth";
import connectDB from "@libs/mongodb";
import User from "@models/user";
import Session from "@models/session";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token) as { userId: string };

        await connectDB();

        // Check session
        const session = await Session.findOne({ userId: decoded.userId, token });
        if (!session) {
            return NextResponse.json({ message: "Session expired" }, { status: 401 });
        }

        // Fetch user
        const user = await User.findById(decoded.userId).select("-password"); // don't send password
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
}
