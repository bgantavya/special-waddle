import { NextResponse } from 'next/server';
import { verifyToken } from '@libs/auth';
import Property from '@models/property';
import User from '@models/user';
import connectDB from '@libs/mongodb';

export async function GET(req) {
    try {
        await connectDB();
        const token = req.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = verifyToken(token) as { userId: string }; // You need to implement or already have verifyToken
        const userId = decoded.userId;

        const user = await User.findById(userId)
            .populate('listedProperties')
            .populate('boughtProperties')
            .exec();

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            listedProperties: user.listedProperties || [],
            boughtProperties: user.boughtProperties || [],
        }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}
