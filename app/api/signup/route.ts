import { NextResponse, NextRequest } from 'next/server'
import connectDB from '@libs/mongodb'
import User from '@models/user'
import { hashPassword } from '@libs/auth'

export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const { name, email, password } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json({ message: "missing fields" }, { status: 400 })
        }

        let isExist = await User.findOne({ email });
        if (isExist) {
            return NextResponse.json({ message: "user already exist" }, { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            email,
            password: hashedPassword,
            name
        })
        await newUser.save()


        return NextResponse.json({ message: "user created" }, { status: 201 })
    } catch (err) {
        // console.log("Error in signup route", err)
        return NextResponse.json({message : "Internal server error"}, {status : 500})
    }
}